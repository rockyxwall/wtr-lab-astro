# Workspace Rules & Core Constraints

Welcome to the `wtr-lab-novel-page` workspace. This is the master guidelines document loaded into context automatically.

*   **Core Stack**: Astro 5 (Static Site Generation), Tailwind CSS v4, Bun (package manager/lockfile).
*   **Goal**: Reach pixel-perfect visual and structural parity with the original Next.js website design.

---

## 1. Documentation Index (Read for details)

If you need detailed context on structures, interactive logic, styling, or workflows, fetch these files:
*   [Directory Structure & Key Files](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/.agents/STRUCTURE.md)
*   [Architectural & Interactive Mechanics](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/.agents/ARCHITECTURE.md)
*   [Visual Fidelity & UI Style Guide](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/.agents/STYLEGUIDE.md)
*   [Workflow, Testing & Git Guidelines](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/.agents/WORKFLOW.md)

---

## 2. Core Coding Rules

### 2.1 Imports & Formatting
*   **Imports**: Framework (`astro:*`) -> components (relative) -> assets. No barrel files or `index.ts` re-exports. Use `import type` explicitly.
*   **Style**: 2-space indentation. Single quotes for strings. Semicolons required in `.ts`/`.js`/`.mjs` (omitted in Astro frontmatter).

### 2.2 Types & Interfaces
*   **Naming**: `PascalCase` for Interfaces, `camelCase` for variables, props, and JSON keys.
*   **No Global Types**: Interfaces must be co-located inside the `.astro` component that consumes them.
*   **Safety**: All interface fields should be optional (`?`). Destructure props with default fallback values.

### 2.3 Component Pattern
```astro
---
// Imports -> interface Props -> Destructure with defaults -> Computed values
---
<!-- Pure Tailwind v4 HTML structure (Scoped CSS only if Tailwind cannot express it) -->
<style>
  /* Local Scoped Override Only */
</style>
```

> [!WARNING]
> *   **Zero Client-Side JS Hydration**: Do not use `client:*` directives. The page must be zero-JS at runtime on the client side, except for the legacy/vanilla JS scripts placed in the `public/assets/js/` directory.
> *   **Safe Rendering**: Use optional chaining (`?.`) and fallback messages (e.g. "No chapters yet") to ensure pages never throw runtime render exceptions.
