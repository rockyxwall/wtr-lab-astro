# AGENTS.md

## Project Goal

Astro 5 + Tailwind CSS v4 static site that ports the wtr-lab.com novel detail page into a
proper component-based architecture. The `reference/` folder contains original Next.js site
source (saved via SingleFile) that must be matched visually and structurally.

All components now exist and the page renders — work is refinement/polish.

**Reference sources (pick one depending on task):**
- `reference/single-page/single-page.html` — full self-contained HTML (all CSS inlined), single
  line. Use this for screenshot comparisons.
- `reference/single-page-in-chunks/` — HTML partials in `components/`, CSS in `assets/css/`,
  JS in `assets/js/`. Best for reading individual sections (nav, main, footer, etc.).
- `reference/single-page/extracted/` — hand-extracted section snippets (novel header, tabs, etc.)

## Build & Dev Commands

```bash
bun install                # install dependencies (bun.lock is primary)
bun run dev                # start dev server (astro dev) on localhost:4321
bun run build              # production build to dist/
bun run preview            # preview production build
bun run visual-compare     # build + Playwright screenshot diff against reference (uses node, not bun)
```

**Important:** The `visual-compare` script uses Playwright + pixelmatch. It requires Node.js
(not Bun — Playwright hangs on Bun). Run via `node scripts/visual-compare.mjs` if running
outside the npm script. Playwright browsers must be installed (`npx playwright install`).

No test, lint, or formatting tools are configured.

## Project Structure

```
src/
  content/
    config.ts              # Zod schema for novel collection
    novel/                 # Markdown with frontmatter (one per novel slug)
      steady-cultivation.md
  data/                    # JSON data loaded via import.meta.glob
    chapters/              # [{ num, title, date?, url? }]
    reviews/               # { averageRating?, totalVotes?, breakdown?, reviews? }
    recommendations/       # [{ title, cover?, rating?, url? }]
    patrons/               # [{ name, amount, rank? }]
    other-novels/          # [{ title, url }]
  layouts/
    PostLayout.astro       # Full page wrapper: <html>, <head>, body, all components
  components/
    Nav.astro              # Sticky navbar (hamburger, logo, links, search, profile)
    NovelHeader.astro      # Title, cover, stats grid, genres, report button
    UnlockProgress.astro   # AI-Unlock Progress bar (between header and tabs)
    TabAbout.astro         # Novel summary, author's novels, details table, patrons
    TabToc.astro           # Table of Contents chapter list
    TabReviews.astro       # Rating bars + review cards
    TabRecommendations.astro # Horizontal scroll recommendation cards
    Footer.astro           # Footer links + copyright
    SvgSprite.astro        # 60+ SVG icon symbols
    SvgDefs.astro          # 4 linear gradient definitions
  pages/
    index.astro            # Library listing (inline styles, no components)
    novel/[...slug].astro  # Dynamic detail page route
  styles/
    global.css             # Tailwind v4 import + @theme + custom utilities
scripts/
  visual-compare.mjs       # Playwright pixelmatch screenshot comparison (uses Node.js)
public/
  assets/js/
    body-01.js             # Dark mode init IIFE (reads localStorage)
    body-02.js             # Vanilla tab switching logic
reference/                 # Original site saves — do not modify
```

## Code Style

### Imports
- Astro frontmatter imports first (from `astro:*`), then components (relative), then styles
- NO barrel exports, NO index.js re-exports — always import the exact file
- Type imports use `import type { ... }` syntax

### Formatting
- 2-space indentation
- Single quotes for strings (Prettier default; no formatter configured, follow existing style)
- Semicolons in `.ts`/`.mjs`, none in `.astro` scripts (Astro default)
- Trailing commas in multi-line objects/arrays

### Types & Interfaces
- Interfaces: PascalCase, co-located with consumer, all fields optional (`?`) — `Chapter`, `Patron`
- Local variables: camelCase — `coverImage`, `firstGenre`, `chaptersList`
- Props: camelCase matching JSON keys — `siteTitle`, `chineseTitle`, `totalChapters`
- JSON keys: camelCase — `averageRating`, `totalVotes`, `dateAdded`, `authorUrl`
- No shared `types/` directory — interfaces are defined inside each `.astro` component
- Every component defines an `interface Props { ... }` with all fields optional
- Destructure props with defaults: `const { title = "" } = Astro.props;`

### Component Pattern (every .astro)
```
---
// 1. Imports: astro:content, then relative components, then astro:assets
// 2. Interface Props { ... } — PascalCase, all optional
// 3. Destructure Astro.props with sensible defaults
// 4. Computed/local values (derived from props)
// 5. Data loading if needed (only in pages/layouts)
---
<!-- HTML: Tailwind v4 classes only, no inline styles -->
<!-- Components: camelCase props matching JSON keys -->
<style>
  /* Scoped CSS only when Tailwind cannot express the style */
</style>
```
No `client:*` hydration directives — zero JS runtime. No comments in production code.

### Error Handling
- Optional chaining everywhere: `{details?.status || "Unknown"}`
- Templates use `{condition && ...}` or ternaries for conditional rendering
- Missing data returns graceful empty states ("No chapters available yet.", "No reviews yet.")
- No runtime error boundaries — page should always render something, even with missing data

### CSS Naming (src/styles/global.css)
- Utility classes: lowercase-kebab `.icon`, `.fix-size`, `.wrap-break-word`, `.wtr-scroll`
- Modifier variants: `.status.top-right` (compound selector)
- Dark mode via `.dark` parent class and `@variant dark (&:is(.dark *))`
- Theme via `@theme { --color-*: ... }` — all custom colors use `--color-` prefix
- SVG icons: `.icon { fill: currentColor; width: 14px; height: 14px; }`

## Key Conventions

### Dark Mode
`<html class="dark" data-color-scheme="dark" style="color-scheme: dark;">` by default.
`body-01.js` reads `localStorage.getItem("theme")` on load and toggles `dark` class.
Dark overrides live in `.dark { --color-*: ... }` block in `global.css`.

### Tab System
ARIA roles: `role="tablist"` / `role="tab"` / `role="tabpanel"`.
Attributes: `data-active`, `aria-selected`, `hidden`, `inert`.
Tab switching JS in `body-02.js` and inline `<script>` in `PostLayout.astro`.
Initial state: About tab visible (`data-active`), others hidden (`hidden inert`).

### SVG Icons
Inline sprite in `<div id="svg-sprite-container">` (hidden) with `<symbol>` elements.
Usage: `<svg class="icon inline-flex shrink-0 size-6"><use href="#icon-name"></use></svg>`.
New icons: add `<symbol viewBox="..." id="name">` to `SvgSprite.astro`, then reference by `#name`.

### Data Loading
```typescript
const dataModules = import.meta.glob('../../data/**/*.json', { eager: true });
function getData<T>(slug: string, category: string): T | undefined {
  for (const [path, mod] of Object.entries(dataModules)) {
    if (path.includes(`/data/${category}/${slug}.json`)) {
      return (mod as DataFile).default as T;
    }
  }
  return undefined;
}
```
Note: `getData` returns `undefined` gracefully when no data file exists.

### AI-Unlock Progress Card
The reference has an unlock-progress card between NovelHeader and the tabs card.
Our `UnlockProgress.astro` component renders this. When all chapters are unlocked
(unlocked >= total), it shows green gradient + "All chapters unlocked" status.
When incomplete, it shows orange gradient + "Batch Unlock" button.

## Visual Fidelity Checklist

When building or modifying components, compare against `reference/single-page-in-chunks/`:
- **Colors**: CSS custom properties from `global.css` @theme (both light & dark)
- **Fonts**: JetBrains Mono (mono) + Nunito Sans (sans) via Google Fonts `<link>` in PostLayout
- **Tab container**: `bg-border`, `data-active:bg-background`, `grid-cols-2 sm:grid-cols-4`, `gap-1 p-1`
- **Card structure**: `fix-size` (max-width 760px centered), `fix-edge` (edge-to-edge on mobile),
  `shadow rounded-md ring-1 ring-foreground/20 bg-card`
- **Detail grid**: `grid-cols-[108px_1fr]` with `max-[400px]:grid-cols-1`,
  `even:bg-black/[0.016] dark:even:bg-white/[0.022]`
- **Review bars**: Two-segment bars (solid + 35% opacity), colors from `--review-rate-1` through `--review-rate-5`
- **Similar/Recommendation cards**: `rounded-md shadow border-border w-44 min-w-44`,
  `flex shrink-0 flex-col`, link wraps only cover image, title in separate div
- **Nav**: Sticky, `bg-navbar`, `z-40`, responsive hamburger (`lg:hidden`) + desktop nav links
- **Footer**: `bg-card`, centered links, separator (`h-px w-full bg-border`), copyright line

## Visual Comparison (screenshot diff)

```bash
# Prerequisites: Playwright must be installed (run once):
npx playwright install chromium

# Run comparison (starts dev server, takes screenshots, compares):
bun run visual-compare

# Or manually:
bun run build
bun run dev &
node scripts/visual-compare.mjs
```

Screenshots and diffs go to `screenshot-diffs/`. 4 viewports: 1440x900, 1024x768, 768x1024, 375x812.
Threshold is 0.15 (15% per-pixel tolerance). Pass threshold is <5% diff.
Note: ~70-85% diff is expected vs Next.js reference due to font rendering, framework artifacts.

## Git Conventions

- No specific commit style enforced; follow existing log patterns
- Files in `dist/`, `node_modules/`, `.astro/`, `nul`, `download/`, `screenshot-diffs/` are gitignored
- Do not commit `package-lock.json` if `bun.lock` changes (npm lock is stale)
- Never modify `.gitignore` without explicit request
