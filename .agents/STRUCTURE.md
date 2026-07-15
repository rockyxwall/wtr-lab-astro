# Directory Structure

Detailed directory mapping for the workspace:

```
wtr-lab-novel-page/
├── .agents/
│   ├── AGENTS.md                  # Master rules & index (customization root entry)
│   ├── STRUCTURE.md               # Detailed directory structure (this file)
│   ├── ARCHITECTURE.md            # Interactive mechanics & data loading details
│   ├── STYLEGUIDE.md              # UI style guide & visual checklist
│   └── WORKFLOW.md                # Build, dev, testing & git rules
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

### Shortcuts to Key Files:
*   [package.json](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/package.json)
*   [astro.config.mjs](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/astro.config.mjs)
*   [tsconfig.json](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/tsconfig.json)
*   [global.css](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/styles/global.css)
*   [BaseLayout.astro](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/layouts/BaseLayout.astro)
*   [PostLayout.astro](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/layouts/PostLayout.astro)
