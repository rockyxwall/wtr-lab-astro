import { chromium } from 'playwright';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, '.temp', 'visual-baselines');

const TARGETS = [
  {
    name: 'novel',
    url: 'https://wtr-lab.com/novel/steady-cultivation',
  },
  {
    name: 'homepage',
    url: 'https://wtr-lab.com/en',
  }
];

async function main() {
  console.log('Starting Baseline Fetcher...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  for (const target of TARGETS) {
    const pageDir = join(OUT_DIR, target.name);
    if (!existsSync(pageDir)) {
      mkdirSync(pageDir, { recursive: true });
    }
    const outFile = join(pageDir, 'single-page.html');
    
    console.log(`\nFetching ${target.name} from ${target.url}...`);
    try {
      await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(2000);
      
      console.log(`  Processing and cleaning HTML...`);
      const processedHtml = await page.evaluate(async (liveOrigin) => {
        // 1. Inline all stylesheets
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        for (const link of links) {
          const href = link.getAttribute('href');
          if (href) {
            try {
              const absoluteUrl = new URL(href, window.location.href).href;
              const res = await fetch(absoluteUrl);
              let css = await res.text();
              
              // Rewrite relative URLs inside the CSS
              css = css.replace(/url\(\s*(['"]?)\/(?!\/)(.*?)\1\s*\)/g, (match, quote, path) => {
                return `url(${quote}${liveOrigin}/${path}${quote})`;
              });
              
              const style = document.createElement('style');
              style.textContent = css;
              link.parentNode.replaceChild(style, link);
            } catch (e) {
              console.error(`Failed to inline stylesheet: ${href}`, e);
            }
          }
        }

        // 2. Rewrite image sources to absolute
        const imgs = Array.from(document.querySelectorAll('img'));
        for (const img of imgs) {
          const src = img.getAttribute('src');
          if (src && src.startsWith('/')) {
            img.setAttribute('src', liveOrigin + src);
          }
          const srcset = img.getAttribute('srcset');
          if (srcset) {
            const absoluteSrcset = srcset.split(',').map(part => {
              const trimmed = part.trim();
              const [url, size] = trimmed.split(/\s+/);
              if (url && url.startsWith('/')) {
                return `${liveOrigin}${url}${size ? ' ' + size : ''}`;
              }
              return trimmed;
            }).join(', ');
            img.setAttribute('srcset', absoluteSrcset);
          }
        }

        // 3. Rewrite anchor hrefs to absolute
        const anchors = Array.from(document.querySelectorAll('a'));
        for (const a of anchors) {
          const href = a.getAttribute('href');
          if (href && href.startsWith('/')) {
            a.setAttribute('href', liveOrigin + href);
          }
        }

        // 4. Rewrite source/use tags to absolute
        const sources = Array.from(document.querySelectorAll('source'));
        for (const src of sources) {
          const srcset = src.getAttribute('srcset');
          if (srcset && srcset.startsWith('/')) {
            src.setAttribute('srcset', liveOrigin + srcset);
          }
        }
        
        const uses = Array.from(document.querySelectorAll('use'));
        for (const use of uses) {
          const href = use.getAttribute('href');
          if (href && href.startsWith('/') && !href.startsWith('#')) {
            use.setAttribute('href', liveOrigin + href);
          }
        }

        // 5. Remove all script tags to prevent dynamic modifications/errors when loaded offline
        const scripts = Array.from(document.querySelectorAll('script'));
        for (const script of scripts) {
          script.parentNode.removeChild(script);
        }

        return document.documentElement.outerHTML;
      }, 'https://wtr-lab.com');

      writeFileSync(outFile, '<!DOCTYPE html>\n' + processedHtml);
      console.log(`  Saved baseline page to ${outFile}`);
    } catch (err) {
      console.error(`  Failed to fetch ${target.name}:`, err);
    }
  }

  await browser.close();
  console.log('\nBaseline setup completed successfully!');
}

main().catch(console.error);
