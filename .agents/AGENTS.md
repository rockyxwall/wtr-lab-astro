# Workspace Rules & Project Documentation

Welcome to the `wtr-lab-novel-page` workspace. This document serves as the single source of truth for project structure, design patterns, coding standards, and developer workflow guidelines.

---

## 1. Project Overview & Objective

The objective of this project is to port the original `wtr-lab.com` novel detail page into a highly optimized, component-based static website using **Astro 5** and **Tailwind CSS v4**.

*   **Primary Engine**: Astro 5 (Static Site Generation / SSG).
*   **Styling**: Tailwind CSS v4.
*   **Package Manager & Runtime**: Bun is preferred for dependency management and execution (uses [bun.lock](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/bun.lock) as primary lockfile).
*   **Goal**: Reach pixel-perfect visual and structural parity with the original Next.js website design.
*   **Reference Materials** (historically tracked in Git):
    *   `reference/single-page/single-page.html`: Full, self-contained HTML (all CSS inlined) used as baseline for visual comparisons.
    *   `reference/single-page-in-chunks/`: Extracted HTML partials (nav, main, footer, etc.) and assets (CSS, JS) for structural reference.
    *   `reference/single-page/extracted/`: Snippets of critical sections (headers, tabs, details table).

---

## 2. Directory Structure

Below is the directory mapping for the workspace. Use these links to navigate directly to each module:

```
wtr-lab-novel-page/
├── .agents/
│   └── AGENTS.md                  # Workspace rules and documentation (this file)
├── public/
│   └── assets/
│       └── js/
│           ├── body-01.js         # Early-execution Dark Mode initialization script
│           └── body-02.js         # Tab switching interactive logic
├── scripts/
│   ├── fetch-baselines.mjs        # Script to download reference visual baselines
│   └── visual-compare.mjs         # Playwright-based visual regression comparison tool
├── src/
│   ├── content/
│   │   ├── config.ts              # Zod collection schema for novel contents
│   │   └── novel/
│   │       └── steady-cultivation.md # Novel metadata (Markdown with frontmatter)
│   ├── data/                      # Raw JSON data loaded dynamically
│   │   ├── chapters/              # Chapter lists per novel
│   │   ├── other-novels/          # Related/recommendation links
│   │   ├── patrons/               # Active patron list and tiers
│   │   ├── recommendations/       # Recommended series metadata
│   │   └── reviews/               # Star breakdowns and review logs
│   ├── layouts/
│   │   ├── BaseLayout.astro       # Root HTML document, meta, fonts, and base structure
│   │   └── PostLayout.astro       # Novel layout housing headers, tabs, and recommendations
│   ├── components/
│   │   ├── Nav.astro              # Sticky header navigation (links, search, user dropdown)
│   │   ├── NovelHeader.astro      # Main details card (title, rating, cover, status tags)
│   │   ├── UnlockProgress.astro   # AI-Unlock progress bar state
│   │   ├── TabAbout.astro         # Summary, meta details, patrons, other books
│   │   ├── TabToc.astro           # Dynamic table of contents with chapter listings
│   │   ├── TabReviews.astro       # User reviews with 5-star rating breakdowns
│   │   ├── TabRecommendations.astro # Horizontal carousel of similar novels
│   │   ├── Footer.astro           # Footer nav and copyright declarations
│   │   ├── SvgSprite.astro        # Reusable inline SVG symbols collection
│   │   └── SvgDefs.astro          # Custom linear gradients for SVG rendering
│   ├── pages/
│   │   ├── index.astro            # Library main listing page
│   │   └── novel/
│   │       └── [...slug].astro    # Dynamic novel detail routes resolver
│   └── styles/
│       └── global.css             # Tailwind v4 configuration, theme colors, custom utilities
├── tsconfig.json                  # TypeScript compiler settings
├── astro.config.mjs               # Astro build configuration
└── package.json                   # Project dependencies and script declarations
```

### Direct Shortcuts to Key Files:
*   [package.json](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/package.json)
*   [astro.config.mjs](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/astro.config.mjs)
*   [tsconfig.json](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/tsconfig.json)
*   [global.css](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/styles/global.css)
*   [BaseLayout.astro](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/layouts/BaseLayout.astro)
*   [PostLayout.astro](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/layouts/PostLayout.astro)

---

## 3. Build & Development Workflow

Utilize the following scripts for local development and build verification:

```bash
# Install all dependencies using Bun
bun install

# Start the local development server (runs Astro dev on http://localhost:4321)
bun run dev

# Compile the project into a static production bundle (output to dist/)
bun run build

# Preview the built production output locally
bun run preview

# Download baseline screenshots for visual regression tests
bun run fetch-baselines

# Run visual regression tests comparing current build against baselines
bun run visual-compare
```

> [!IMPORTANT]
> The `visual-compare` suite uses Playwright and pixelmatch under the hood. 
> *   **Do not run `visual-compare` inside Bun** (Playwright execution is known to hang in the Bun runtime). Always execute it using Node.js directly or via `bun run visual-compare` (which runs Astro build then spawns the Node-based comparison).
> *   Make sure Playwright browsers are installed locally before running: `npx playwright install chromium`.

---

## 4. Coding Standards & Conventions

### 4.1 Imports Organization
1.  Astro framework and core library imports first (e.g. `import { getCollection } from 'astro:content'`).
2.  Relative component imports next (e.g. `import BaseLayout from './BaseLayout.astro'`).
3.  Styles and asset imports last.
4.  **No barrel exports or `index.ts` re-exports**: Always import files directly by their specific path to optimize build times and readability.
5.  Always use the explicit `import type` syntax when importing TypeScript interfaces/types:
    ```typescript
    import type { InferEntrySchema } from 'astro:content';
    ```

### 4.2 Formatting & Style
*   **Indentation**: Strict 2-space indentation.
*   **Quotes**: Use single quotes `'` for strings (Prettier style) except when writing frontmatter strings or JSON keys.
*   **Semicolons**:
    *   **Required** in all `.ts`, `.js`, and `.mjs` scripts.
    *   **Omitted** in frontmatter code blocks within `.astro` components (standard Astro default).
*   **Trailing Commas**: Always include trailing commas in multi-line objects, arrays, and imports.

### 4.3 TypeScript Types & Interfaces
*   **Naming**: Interface and Type names must be `PascalCase` (e.g., `Chapter`, `ReviewsData`).
*   **Prop Names**: Use `camelCase` matching their corresponding JSON key representation (e.g., `averageRating`, `totalVotes`).
*   **JSON Keys**: Standardized to `camelCase` (e.g., `authorUrl`, `dateAdded`).
*   **Local Variables**: Use `camelCase` for variable definitions (e.g., `chaptersList`, `reviewsData`).
*   **Co-location**:
    *   Do **not** use a shared/global `types/` directory.
    *   Define interfaces directly inside the component consuming them.
*   **Flexibility**: Mark fields as optional (`?`) in interfaces unless they are strictly guaranteed to exist.
*   **Props Destructuring**: Every component must define an `interface Props` and destructure props with default values:
    ```typescript
    interface Props {
      title?: string;
      cover?: string;
    }
    const { title = '', cover = '' } = Astro.props;
    ```

### 4.4 Astro Component Template Pattern
Astro components must adhere to the following structure:
```astro
---
// 1. Imports (Framework -> Components -> Assets)
import BaseLayout from '../layouts/BaseLayout.astro'

// 2. Props Interface Definition (all properties optional where possible)
interface Props {
  title?: string
}

// 3. Prop Destructuring with Default Values
const { title = 'Default Title' } = Astro.props

// 4. Derived & Computed local values
const capitalizedTitle = title.toUpperCase()
---
<!-- HTML Structure using pure Tailwind CSS classes -->
<div class="card bg-card text-foreground">
  <h1>{capitalizedTitle}</h1>
  <slot />
</div>

<style>
  /* Scoped CSS only: restricted to styles that Tailwind v4 cannot express natively */
</style>
```

> [!WARNING]
> *   Do **not** use `client:*` directives for hydration. The entire application must be zero-JS at runtime on the client side, except for the legacy/vanilla JS scripts placed in the `public/assets/js/` directory.
> *   Remove all debug and developer comments in production code.

### 4.5 Error Handling & Data Safety
*   **Optional Chaining**: Use optional chaining (`?.`) extensively to safeguard against undefined/missing data blocks: `{details?.status || 'Unknown'}`.
*   **Conditional Rendering**: Use logical short-circuit operators (`{condition && ...}`) or ternary operators for inline layout switching.
*   **Graceful Degradation**: Always provide fallback messages for missing arrays or objects (e.g., *"No chapters available yet."*, *"No reviews yet."*).
*   **No Runtime Exceptions**: Ensure pages can render and mount without throwing rendering exceptions if a data file or field is absent.

---

## 5. Architectural & Interactive Mechanics

### 5.1 Theme Switching (Dark Mode)
*   The site uses dark mode by default (`<html>` contains class `dark` and `data-color-scheme="dark"`).
*   [body-01.js](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/public/assets/js/body-01.js) is placed in `<head>` to execute early. It reads the user's preference from `localStorage.getItem('theme')` and toggles the `.dark` class on `document.documentElement` to prevent flashing.
*   Custom light/dark themes are declared inside `@theme` and `.dark` blocks in [global.css](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/styles/global.css).

### 5.2 Interactive Tab Panels
*   Tabs must support standard accessibility (ARIA) attributes:
    *   Tab triggers require `role="tab"`, `aria-selected`, and `data-active` (when active).
    *   Tab panels require `role="tabpanel"`. Inactive panels are hidden via `hidden` and `inert` attributes.
*   Tab interaction behavior is driven by [body-02.js](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/public/assets/js/body-02.js) and a small inline DOM listener in [PostLayout.astro](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/layouts/PostLayout.astro).

### 5.3 Inline SVG System
*   Rather than making individual HTTP requests for SVG assets, a hidden sprite sheet is loaded at the beginning of the body via [SvgSprite.astro](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/components/SvgSprite.astro).
*   Render SVGs using `<use href="#icon-id" />` syntax:
    ```html
    <svg class="icon inline-flex shrink-0 size-6">
      <use href="#icon-chevron-right"></use>
    </svg>
    ```
*   Linear gradients used as fills in SVGs must be defined inside [SvgDefs.astro](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/components/SvgDefs.astro).

### 5.4 Dynamic Data Fetching
JSON files are queried dynamically using Vite's `import.meta.glob` within the pages layer:
```typescript
const dataModules = import.meta.glob('../../data/**/*.json', { eager: true });

function getData<T>(slug: string, category: string): T | undefined {
  for (const [path, mod] of Object.entries(dataModules)) {
    if (path.includes(`/data/${category}/${slug}.json`)) {
      return (mod as { default: T }).default;
    }
  }
  return undefined;
}
```

### 5.5 AI-Unlock Progress Card
*   Renders between the header and tab navigation using [UnlockProgress.astro](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/components/UnlockProgress.astro).
*   **Fully Unlocked State** (`unlocked >= total`): Renders a green progress track gradient (`.upc-fill.is-complete`) and displays "All chapters unlocked".
*   **Incomplete State** (`unlocked < total`): Renders an orange/red progress track gradient and displays a "Batch Unlock" call-to-action button.

---

## 6. Visual Fidelity & UI Style Guide

When editing components, check against the style guides and baseline pages:

*   **Colors**: Custom properties under `@theme` (with `--color-` prefix) in [global.css](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/styles/global.css). Do not use arbitrary colors (e.g. `bg-red-500`) unless mapping directly to the theme tokens.
*   **Typography**: Nunito Sans for the copy/sans-serif text, JetBrains Mono for monospace labels and numbers. Both loaded in [BaseLayout.astro](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/layouts/BaseLayout.astro).
*   **Card Wrapper Class**:
    *   Maximum width on desktop: `max-w-[760px]` (`.fix-size`).
    *   Mobile behavior: Edge-to-edge layout (`.fix-edge`).
    *   Attributes: `shadow rounded-none md:rounded-md ring-1 ring-foreground/20 bg-card`.
*   **Tabs Container**: `bg-border gap-1 p-1 grid grid-cols-2 sm:grid-cols-4`. Active tab has `bg-background` and `shadow-sm`.
*   **Detail Grid Table**: Alternating background strips on rows (`even:bg-black/[0.016] dark:even:bg-white/[0.022]`). Columns layout: `grid-cols-[108px_1fr]` (collapses to `grid-cols-1` under `400px` screen width).
*   **Review Progress Bars**: Star rating percentage bars are built with double segments (representing rating value + 35% opacity track background). Colors must match rates: `--color-review-rate-1` through `--color-review-rate-5`.
*   **Recommendations**: Scrollable series cards must be encapsulated in a flexible, horizontal scrolling row (`wtr-scroll`). Link anchors should cover only the book jacket thumbnail, leaving the title text separated.

---

## 7. QA Visual Testing (Regression Tests)

We run pixel-by-pixel comparisons of our built static pages against baselines using Playwright and `pixelmatch`:

1.  Make sure local dev server can start.
2.  Run `bun run visual-compare`.
3.  The comparison engine outputs screenshots and regression diffs into `.temp/visual-compare/`.
4.  Viewport dimensions validated: `1440x900`, `1024x768`, `768x1024`, and `375x812`.
5.  Acceptable pass threshold is set to `< 5%` total pixel diff.

---

## 8. Git & Contribution Policies

*   **Exclusions**: Avoid tracking built assets (`dist/`), compiler outputs (`.astro/`, `.temp/`), `node_modules`, and system files in Git commits.
*   **Lockfiles**: Always update [bun.lock](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/bun.lock) as the primary lockfile. Do not commit `package-lock.json` if npm did not perform the installation.
*   **Configuration**: Do not modify `.gitignore` unless explicitly requested.
