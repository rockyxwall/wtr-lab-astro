# Build, Development & Git Workflow

## 1. Development & Build Commands

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
> *   **Do not run `visual-compare` inside Bun** (Playwright execution is known to hang in the Bun runtime). Always execute it using Node.js directly or via `bun run visual-compare`.
> *   Make sure Playwright browsers are installed locally before running: `npx playwright install chromium`.

---

## 2. QA Visual Testing (Regression Tests)

We run pixel-by-pixel comparisons of our built static pages against baselines:
1. Make sure local dev server can start.
2. Run `bun run visual-compare`.
3. The comparison engine outputs screenshots and regression diffs into `.temp/visual-compare/`.
4. Viewport dimensions validated: `1440x900`, `1024x768`, `768x1024`, and `375x812`.
5. Acceptable pass threshold is set to `< 5%` total pixel diff.

---

## 3. Git & Contribution Policies

*   **Exclusions**: Avoid tracking built assets (`dist/`), compiler outputs (`.astro/`, `.temp/`), `node_modules`, and system files in Git commits.
*   **Lockfiles**: Always update [bun.lock](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-novel-page/bun.lock) as the primary lockfile. Do not commit `package-lock.json` if npm did not perform the installation.
*   **Configuration**: Do not modify `.gitignore` unless explicitly requested.
