# Visual Fidelity & UI Style Guide

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
