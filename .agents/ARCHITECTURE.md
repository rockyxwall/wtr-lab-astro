# Architectural & Interactive Mechanics

Details on core runtime abstractions and mechanics.

---

## 1. Theme Switching (Dark Mode)
*   The site uses dark mode by default (`<html>` contains class `dark` and `data-color-scheme="dark"`).
*   [body-01.js](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/public/assets/js/body-01.js) is placed in `<head>` to execute early. It reads the user's preference from `localStorage.getItem('theme')` and toggles the `.dark` class on `document.documentElement` to prevent flashing.
*   Custom light/dark themes are declared inside `@theme` and `.dark` blocks in [global.css](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/styles/global.css).

---

## 2. Interactive Tab Panels
*   Tabs must support standard accessibility (ARIA) attributes:
    *   Tab triggers require `role="tab"`, `aria-selected`, and `data-active` (when active).
    *   Tab panels require `role="tabpanel"`. Inactive panels are hidden via `hidden` and `inert` attributes.
*   Tab interaction behavior is driven by [body-02.js](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/public/assets/js/body-02.js) and a small inline DOM listener in [PostLayout.astro](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/layouts/PostLayout.astro).

---

## 3. Inline SVG System
*   Rather than making individual HTTP requests for SVG assets, a hidden sprite sheet is loaded at the beginning of the body via [SvgSprite.astro](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/components/SvgSprite.astro).
*   Render SVGs using `<use href="#icon-id" />` syntax:
    ```html
    <svg class="icon inline-flex shrink-0 size-6">
      <use href="#icon-chevron-right"></use>
    </svg>
    ```
*   Linear gradients used as fills in SVGs must be defined inside [SvgDefs.astro](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/components/SvgDefs.astro).

---

## 4. Dynamic Data Fetching
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

---

## 5. AI-Unlock Progress Card
*   Renders between the header and tab navigation using [UnlockProgress.astro](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/src/components/UnlockProgress.astro).
*   **Fully Unlocked State** (`unlocked >= total`): Renders a green progress track gradient (`.upc-fill.is-complete`) and displays "All chapters unlocked".
*   **Incomplete State** (`unlocked < total`): Renders an orange/red progress track gradient and displays a "Batch Unlock" call-to-action button.
