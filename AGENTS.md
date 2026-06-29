# AGENTS.md

## Project Goal

Astro 5 + Tailwind CSS v4 static site that ports the wtr-lab.com novel detail page into a
proper component-based architecture. The `reference/` folder contains original site source that
must be matched visually and structurally. Currently only data and scaffolding exist —
components still need to be built.

**Reference sources (pick one depending on task):**
- `reference/single-page/single-page.html` — full single-page HTML with all CSS inlined
- `reference/single-page-in-chunks/` — component-based version with `index.html` + HTML partials in `components/`
- `reference/single-page-in-chunks/assets/css/` — CSS files: style-01 (Tailwind v4), style-02 (fonts), style-03 (dupe of 01), style-04 (chapter dark), style-05 (ProseMirror), body-style-06 (bprogress), body-style-07
- `reference/single-page-in-chunks/assets/js/` — body-01.js (dark mode), body-02.js (tab switching), include.js (template fetch)

## Build & Dev Commands

```bash
bun install          # install dependencies (bun.lock is primary; package-lock.json is stale)
bun run dev          # start dev server (astro dev)
bun run build        # production build to dist/
bun run preview      # preview production build
```

No test, lint, or formatting tools are configured.

## Project Structure (Current)

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
  pages/
    index.astro            # Library listing (inline styles, no components)
    novel/[...slug].astro  # Dynamic detail page (imports PostLayout — not yet built)
public/
  assets/js/
    body-01.js             # Dark mode init IIFE (reads localStorage)
    body-02.js             # Vanilla tab switching logic
```

**NOTE:** The following components referenced in `[...slug].astro` do **not exist yet** and must be created to match the reference:
- `src/layouts/PostLayout.astro`
- `src/components/Nav.astro`, `NovelHeader.astro`, `TabAbout.astro`, `TabToc.astro`, `TabReviews.astro`, `TabRecommendations.astro`, `Footer.astro`, `SvgSprite.astro`, `SvgDefs.astro`
- `src/styles/global.css`

## Reference Architecture

The original site uses template-based includes (`<template data-include>` + `include.js`).
The Astro project replaces this with proper `.astro` components. CSS comes from 7 files:
- style-01 / style-03: Tailwind v4 compiled output (identical)
- style-02: `@font-face` for JetBrains Mono + Nunito Sans (Google Fonts)
- style-04: dynamic chapter dark theme
- style-05: ProseMirror editor styles
- body-style-06: bprogress loading bar
- body-style-07: custom theme variables

## Code Style & Naming

### Files
- Components: PascalCase `.astro` — `NovelHeader.astro`, `TabReviews.astro`
- Pages: lowercase, directory-nested — `index.astro`, `novel/[...slug].astro`
- Content: kebab-case `.md` — `steady-cultivation.md`
- Data JSON: kebab-case per novel per category — `chapters/steady-cultivation.json`

### Variables & Types
- Interfaces: PascalCase — `DataFile`, `OtherNovel`, `Patron`, `Chapter`, `ReviewsData`, `Recommendation`
- Local variables: camelCase — `coverImage`, `firstGenre`, `chaptersList`
- Props: camelCase matching JSON keys — `siteTitle`, `chineseTitle`, `totalChapters`
- JSON keys: camelCase — `averageRating`, `totalVotes`, `dateAdded`, `authorUrl`
- Types co-located with consumers; no shared `types/` directory

### Component Pattern
Every `.astro` follows this structure:
```
---
// 1. Imports from astro:content, astro:assets, or relative paths
// 2. Exported Props interface (PascalCase, all optional)
// 3. Destructured props with defaults
// 4. Computed/local values
// 5. Data loading via getData<T>(slug, category)
---
<!-- HTML template with Tailwind v4 utilities -->
```

No `client:*` hydration directives — zero JS runtime.

### TypeScript
- Extends `astro/tsconfigs/strict`
- Path alias `@/*` → `src/*` available but relative imports used throughout
- All data fields optional (`?`) with runtime guards — never assume data exists

### Data Loading (pattern from `[...slug].astro`)
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

### Tab System
Uses `role="tablist"` / `role="tab"` / `role="tabpanel"` with `data-active`, `aria-selected`,
`hidden`, and `inert` attributes. Logic in `public/assets/js/body-02.js` — vanilla DOM.

### SVG Icons
Inline sprite with `<symbol>` elements. Usage:
```html
<svg class="icon inline-flex shrink-0 size-6"><use href="#icon-name"></use></svg>
```

### Dark Mode
`<html class="dark" data-color-scheme="dark" style="color-scheme: dark;">`.
`body-01.js` reads `localStorage.getItem("theme")` and sets both attributes.

### Error Handling
Optional everything. Templates use `{field && ...}` or ternaries.
Missing data returns graceful empty states ("No chapters available yet.").

## Content Schema (src/content/config.ts)

Uses `astro:content` `defineCollection` with Zod. All fields optional except `title`.
Fields: `title`, `chineseTitle`, `cover`, `author`, `status`, `views`, `chapters`,
`rating`, `readers`, `totalChars`, `tags`, `genres`, `details` (author/authorPinyin/authorUrl/
status/dateAdded/requested/requestedUrl/year/origin/language),
`rankings` (weekly/allTime), `dataFiles` (chapters/reviews/recommendations/patrons slugs).

## Visual Fidelity Checklist

When building or modifying components, compare against the reference:
- **Colors**: Use CSS custom properties from reference style-02.css and body-style-07.css (both light & dark)
- **Fonts**: JetBrains Mono (mono) + Nunito Sans (sans) via Google Fonts `@font-face`
- **Tab container**: `bg-border`, `data-active:bg-background`, `grid-cols-2 sm:grid-cols-4`, `gap-1 p-1`
- **Card structure**: `fix-size` (max-width 760px centered), `fix-edge` (edge-to-edge on mobile),
  `shadow rounded-md ring-1 ring-foreground/20`
- **Detail grid**: `grid-cols-[108px_1fr]` with `max-[400px]:grid-cols-1`,
  `even:bg-black/[0.016] dark:even:bg-white/[0.022]`
- **Review bars**: Two-segment bars (solid + 35% opacity), colors from `--review-rate-1` through `--review-rate-5`
- **Similar novels**: `overflow-x-auto` horizontal scroll, `w-44 min-w-44` fixed-width cards
- **Nav**: Sticky, `bg-navbar`, `z-40`, responsive hamburger + search + nav links
- **Footer**: `bg-card`, centered links, separator, copyright line

## Git Conventions

- No specific commit style enforced; follow existing log patterns
- Files in `dist/`, `node_modules/`, `.astro/`, `nul`, `download/` are gitignored
- Do not commit `package-lock.json` if `bun.lock` changes (npm lock is stale)
- Never modify `.gitignore` without explicit request
