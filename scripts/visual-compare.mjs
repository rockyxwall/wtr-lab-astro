import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'tablet-1024',  width: 1024, height: 768 },
  { name: 'mobile-768',   width: 768,  height: 1024 },
  { name: 'mobile-375',   width: 375,  height: 812 },
];

const REF_HTML = `file:///${ROOT.replace(/\\/g, '/')}/reference/single-page/single-page.html`;
const ASTRO_URL = 'http://localhost:4321/novel/steady-cultivation';
const OUT_DIR = join(ROOT, 'screenshot-diffs');

async function takeScreenshot(page, url, viewport, label) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  const path = join(OUT_DIR, `${label}-${viewport.name}.png`);
  await page.screenshot({ path });
  return path;
}

function ensureSameSize(img1, img2) {
  const w = Math.max(img1.width, img2.width);
  const h = Math.max(img1.height, img2.height);
  if (img1.width !== w || img1.height !== h) {
    const padded = new PNG({ width: w, height: h, fill: true });
    PNG.bitblt(img1, padded, 0, 0, img1.width, img1.height, 0, 0);
    return padded;
  }
  return img1;
}

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('=== Screenshot Visual Comparison ===\n');
  console.log(`Reference: ${REF_HTML}`);
  console.log(`Astro:     ${ASTRO_URL}\n`);

  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n--- ${vp.name} (${vp.width}x${vp.height}) ---`);

    const refPath = await takeScreenshot(page, REF_HTML, vp, 'reference');
    console.log(`  Reference: ${refPath}`);

    const astroPath = await takeScreenshot(page, ASTRO_URL, vp, 'astro');
    console.log(`  Astro:     ${astroPath}`);

    let refImg = PNG.sync.read(readFileSync(refPath));
    let astroImg = PNG.sync.read(readFileSync(astroPath));

    const w = refImg.width;
    const h = refImg.height;
    const diff = new PNG({ width: w, height: h });

    const mismatched = pixelmatch(refImg.data, astroImg.data, diff.data, w, h, {
      threshold: 0.15,
      alpha: 0.5,
    });

    const diffPath = join(OUT_DIR, `diff-${vp.name}.png`);
    writeFileSync(diffPath, PNG.sync.write(diff));

    const totalPx = w * h;
    const pct = (mismatched / totalPx) * 100;
    const pass = pct < 5;
    results.push({ viewport: vp.name, mismatched, total: totalPx, percent: pct.toFixed(2), pass, diffPath });
    console.log(`  Diff:      ${diffPath}`);
    console.log(`  Result:    ${pass ? 'PASS' : 'FAIL'} (${mismatched}/${totalPx} = ${pct.toFixed(2)}%)`);
  }

  await browser.close();

  console.log('\n=== SUMMARY ===');
  for (const r of results) {
    console.log(`  ${r.viewport}: ${r.pass ? '✓' : '✗'} ${r.mismatched} px (${r.percent}%)`);
  }

  const allPass = results.every(r => r.pass);
  console.log(`\nOverall: ${allPass ? 'ALL PASS ✓' : 'SOME FAILURES ✗'}`);
  console.log(`\nDiff images saved to: ${OUT_DIR}`);
  process.exit(allPass ? 0 : 1);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
