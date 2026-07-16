---
version: alpha
name: WTR-LAB-Design-Analysis
description: A dark-first reading and web novel listing layout for WTR-LAB. The system anchors on a deep slate-gray/dark background (#1b1d23) with bright custom metrics (orange #fd7e14 for ticket/points and AI-Unlock progress) and blue primary action highlights (#5795d9 in dark mode). The reading container caps at 760px on desktop to optimize readability. Interactivity is driven by native CSS variables, Tailwind CSS v4, and ARIA-compliant tab panels.
colors:
  primary: "#4288c9"
  primary-dark: "#5795d9"
  primary-foreground: "#eef2ff"
  background: "#f2f3f4"
  background-dark: "#1b1d23"
  foreground: "#1b1d23"
  foreground-dark: "#a9a9a9"
  card: "#ffffff"
  card-dark: "#1f2129"
  card-foreground: "#212529"
  card-foreground-dark: "#cccccc"
  popover: "#ffffff"
  popover-dark: "#23272c"
  muted: "#dee6ed"
  muted-dark: "#111111"
  muted-foreground: "#7d8283"
  muted-foreground-dark: "#a9b1b7"
  border: "#d4dadb"
  border-dark: "rgba(255, 255, 255, 0.1)"
  input: "#a7adb4"
  input-dark: "rgba(255, 255, 255, 0.15)"
  wtr: "#fd7e14"
  gold: "#ffc107"
  silver: "silver"
  bronze: "#cd7f32"
  rate-5: "#22c55e"
  rate-4: "#84cc16"
  rate-3: "#eab308"
  rate-2: "#f97316"
  rate-1: "#ef4444"
  discord: "#5865f2"
typography:
  display:
    fontFamily: "Nunito Sans, system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.25
  title-lg:
    fontFamily: "Nunito Sans, system-ui, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.3
  title-md:
    fontFamily: "Nunito Sans, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
  body-md:
    fontFamily: "Nunito Sans, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Nunito Sans, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "Nunito Sans, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.4
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 10px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
components:
  card-wrapper:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.border-dark}"
    shadow: "0 1px 3px rgba(0,0,0,0.1)"
    maxWidth: "760px"
  unlock-progress:
    backgroundColor: "{colors.card-dark}"
    borderColor: "rgba(253, 126, 20, 0.18)"
    accentColor: "{colors.wtr}"
    padding: "14px 16px"
    rounded: "{rounded.lg}"
  tab-container:
    backgroundColor: "{colors.muted-dark}"
    padding: "4px"
    gap: "4px"
  tab-trigger:
    backgroundColor: "transparent"
    activeBackgroundColor: "{colors.background-dark}"
    textColor: "{colors.muted-foreground-dark}"
    activeTextColor: "{colors.foreground-dark}"
  nav-bar:
    backgroundColor: "#212529"
    textColor: "#ffffff"
    height: "56px"
  footer:
    backgroundColor: "{colors.card-dark}"
    borderColor: "{colors.border-dark}"
    textColor: "{colors.muted-foreground-dark}"
    padding: "16px"
---

# WTR-LAB UI Design Specification

This document contains the visual layout rules, components, tokens, and code implementations used throughout WTR-LAB. It is structured to allow other AI assistants to instantly recreate the exact interface with full pixel-parity.

---

## 1. Overview
WTR-LAB is a web-based novel reader and library platform built on a clean, **dark-first** philosophy. The system defaults to dark mode, placing copy and metadata within highly legible, centered card layouts.

### Key Characteristics:
*   **Deep Gray Floors**: Main body background is a smooth slate-gray (`{colors.background-dark}` — `#1b1d23`).
*   **Card Container Contrast**: Content blocks are wrapped in card surfaces (`{colors.card-dark}` — `#1f2129`), offset from the floor.
*   **Typography Splits**: Nunito Sans is the core display and body font. JetBrains Mono is the typeface for code blocks, statistical tables, ratings, and chapter listing counters.
*   **Reading Optimization**: The reading layout strictly caps at a container width of `760px` (`.fix-size`) on desktop to ensure comfortable line-lengths, shifting to edge-to-edge (`.fix-edge`) on screens smaller than tablet.
*   **Active Accents**: Accent voltage comes from primary action blues (`#5795d9`) and highlight orange (`#fd7e14`), paired with color-coded status pills (e.g. success rate colors).

---

## 2. Global Colors & Theme Definition

Tailwind CSS v4 is configured inside [global.css](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-astro/src/styles/global.css) with the following custom theme overrides:

```css
@theme {
  --color-background: #f2f3f4;
  --color-foreground: #1b1d23;
  --color-navbar: #212529;
  --color-card: #fff;
  --color-card-foreground: #212529;
  --color-popover: #fff;
  --color-popover-foreground: #212529;
  --color-primary: #4288c9;
  --color-primary-foreground: #eef2ff;
  --color-secondary: #dce3e9;
  --color-secondary-foreground: #18181b;
  --color-muted: #dee6ed;
  --color-muted-foreground: #7d8283;
  --color-accent: #dce3e9;
  --color-accent-foreground: #1b2328;
  --color-destructive: #dc3545;
  --color-destructive-foreground: #fff;
  --color-border: #d4dadb;
  --color-input: #a7adb4;
  --color-ring: #4288c9;
  --color-wtr: #fd7e14;
  --color-wtr-foreground: #fff;
  --color-gold: #ffc107;
  --color-silver: silver;
  --color-bronze: #cd7f32;
  --color-review-rate-1: #ef4444;
  --color-review-rate-2: #f97316;
  --color-review-rate-3: #eab308;
  --color-review-rate-4: #84cc16;
  --color-review-rate-5: #22c55e;
  --color-discord: #5865f2;
  --color-discord-foreground: #fff;
}

.dark {
  --color-background: #1b1d23;
  --color-foreground: #a9a9a9;
  --color-card: #1f2129;
  --color-card-foreground: #ccc;
  --color-popover: #23272c;
  --color-popover-foreground: #ccc;
  --color-primary: #5795d9;
  --color-primary-foreground: #eef2ff;
  --color-secondary: #444e5b;
  --color-secondary-foreground: #eee;
  --color-muted: #111;
  --color-muted-foreground: #a9b1b7;
  --color-accent: #47566c;
  --color-accent-foreground: #fafafa;
  --color-destructive: #dc3545;
  --color-destructive-foreground: #fff;
  --color-border: rgba(255, 255, 255, 0.1);
  --color-input: rgba(255, 255, 255, 0.15);
  --color-ring: #5795d9;
  --color-navbar: #212529;
}
```

---

## 3. Typography & Font Stacks

We pull from Google Fonts inside [BaseLayout.astro](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-astro/src/layouts/BaseLayout.astro):

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Nunito+Sans:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />
```

### Type Hierarchy
| Token | Font Family | Size | Weight | Line Height | Use Case |
|---|---|---|---|---|---|
| `display` | Nunito Sans | 24px | 700 | 1.25 | Main novel header titles |
| `title-lg` | Nunito Sans | 20px | 700 | 1.3 | Card headers / Section titles |
| `title-md` | Nunito Sans | 16px | 600 | 1.4 | Subheaders, rating indicators |
| `body-md` | Nunito Sans | 14px | 400 | 1.55 | Default reading running text |
| `body-sm` | Nunito Sans | 13px | 400 | 1.5 | Footer menu list, descriptions |
| `caption` | Nunito Sans | 12px | 600 | 1.4 | Badges, tags, dates |
| `code` | JetBrains Mono | 12px | 400 | 1.5 | Ratings percentages, counters |

---

## 4. Layout & Spacing Rules

*   **Viewports & Grids**: 
    *   Main content blocks must restrict to `max-w-[760px]` on desktop using the `.fix-size` class.
    *   On screens `< 768px` (mobile), the container expands to edge-to-edge (`.fix-edge`) to maximize usage of readable screens.
*   **Scrollbars**: Custom horizontal scroll containers (`.wtr-scroll`) are used for horizontal carousels (e.g. Similar Novel Recommendations).
*   **Borders & Outlines**: Clean borders (`1px solid {colors.border-dark}`) separate card elements from background floors. Shadows are kept flat or extremely low opacity.

---

## 5. Layout Setup & Dark Mode Early Initialization

To prevent light-flashing during client hydration, the Dark Mode script in [BaseLayout.astro](file:///e:/lazyman/rockyxwall/02_Codeing/01_Github/wtr-lab-astro/src/layouts/BaseLayout.astro) is embedded directly:

```astro
---
import Nav from '../components/Nav.astro'
import SvgSprite from '../components/SvgSprite.astro'
import SvgDefs from '../components/SvgDefs.astro'
import Footer from '../components/Footer.astro'
import '../styles/global.css'

interface Props {
  title?: string;
  ogImage?: string;
  ogType?: string;
}

const {
  title = 'WTR-LAB',
  ogImage = '',
  ogType = 'website',
} = Astro.props;
---

<html lang="en" class="dark" data-color-scheme="dark" style="color-scheme: dark;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com/" />
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Nunito+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
    <meta property="og:type" content={ogType} />
    {ogImage && <meta property="og:image" content={ogImage} />}
  </head>
  <body class="wtr-adblock-off bg-background text-foreground font-sans antialiased">
    <SvgSprite />
    <SvgDefs />

    <Nav />
    
    <main>
      <slot />
    </main>

    <Footer />
  </body>
</html>

<script is:inline>
  (function() {
    try {
      const theme = localStorage.getItem('theme') || 'dark';
      const isDark = theme === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.setAttribute('data-color-scheme', theme);
      document.documentElement.style.colorScheme = theme;
    } catch (e) {}
  })();
</script>
```

---

## 6. Detailed Component Implementations & Real Code

Below are the exact component layouts and Tailwind v4 classes for rebuilding parts of the site:

### 6.1 AI-Unlock Progress Meter (`UnlockProgress.astro`)
This component displays translation and translation-unlocked status. It changes from orange/red to green once all chapters are fully unlocked.

```astro
---
interface Props {
  unlocked?: number;
  total?: number;
}

const { unlocked = 806, total = 806 } = Astro.props;
const isComplete = unlocked >= total;
const pct = total > 0 ? Math.min(100, (unlocked / total) * 100) : 0;
---

<section class="unlock-progress-card fix-size fix-edge rounded-none md:rounded-[10px]" aria-labelledby="unlock-heading">
  <h2 id="unlock-heading" class="sr-only">AI-Unlock Progress</h2>
  <div class="upc-header">
    <div class="upc-label">
      <!-- Reusable inline SVG syntax -->
      <svg class="icon inline-flex shrink-0 size-6 icon-sm"><use href="#ticket" class="svg-ticket"></use></svg>
      <span>AI-Unlock Progress</span>
    </div>
    <div class="upc-counter font-mono">
      <span class="upc-unlocked">{unlocked}</span>
      <span class="upc-sep">/</span>
      <span class="upc-total">{total}</span>
    </div>
  </div>
  <div class="upc-track">
    <div class="upc-fill" class:list={[isComplete && "is-complete"]} style={`width: ${pct}%;`}></div>
  </div>
  <div class="upc-footer">
    {isComplete ? (
      <span class="upc-status-done">All chapters unlocked</span>
    ) : (
      <span class="upc-status">{unlocked}/{total} unlocked</span>
    )}
    {!isComplete && (
      <button type="button" class="upc-batch-btn">Batch Unlock</button>
    )}
  </div>
</section>

<style>
.unlock-progress-card {
  background: #fff;
  border: 1px solid rgba(253, 126, 20, 0.22);
  margin-bottom: 0.5rem;
  padding: 14px 16px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
}
.dark .unlock-progress-card {
  background: linear-gradient(135deg, #1a1c24 0%, #252836 100%);
  border-color: rgba(253, 126, 20, 0.18);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.04);
}
.upc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.upc-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #c96a00;
}
.dark .upc-label {
  color: rgba(253, 126, 20, 0.8);
}
.upc-counter {
  display: flex;
  align-items: baseline;
  gap: 3px;
}
.upc-unlocked {
  color: #fd7e14;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
}
.upc-sep {
  color: #ccc;
  font-size: 13px;
}
.dark .upc-sep {
  color: rgba(255, 255, 255, 0.25);
}
.upc-total {
  color: #999;
  font-size: 14px;
  font-weight: 500;
}
.dark .upc-total {
  color: rgba(255, 255, 255, 0.45);
}
.upc-track {
  background: #f0f0f0;
  border-radius: 3px;
  height: 5px;
  margin-bottom: 9px;
  overflow: hidden;
}
.dark .upc-track {
  background: rgba(255, 255, 255, 0.07);
}
.upc-fill {
  background: linear-gradient(90deg, #d96b0a, #fd7e14, #ffaa60);
  border-radius: 3px;
  height: 100%;
  transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
.upc-fill.is-complete {
  background: linear-gradient(90deg, #15803d, #22c55e, #4ade80);
}
.dark .upc-fill {
  box-shadow: 0 0 10px rgba(253, 126, 20, 0.55);
}
.dark .upc-fill.is-complete {
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.55);
}
.upc-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.upc-status {
  color: #999;
  font-size: 11px;
}
.dark .upc-status {
  color: rgba(255, 255, 255, 0.38);
}
.upc-status-done {
  color: #16a34a;
  font-size: 11px;
  font-weight: 600;
}
.dark .upc-status-done {
  color: #4ade80;
}
.upc-batch-btn {
  color: #c96a00;
  cursor: pointer;
  white-space: nowrap;
  background: rgba(253, 126, 20, 0.08);
  border: 1px solid rgba(253, 126, 20, 0.35);
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 600;
  transition: background 0.2s, border-color 0.2s;
}
.dark .upc-batch-btn {
  color: #fd7e14;
  background: rgba(253, 126, 20, 0.12);
  border-color: rgba(253, 126, 20, 0.3);
}
</style>
```

---

### 6.2 Novel Recommendations Carousel (`TabRecommendations.astro`)
This component displays similar novels in a horizontal scrolling row. Standard requirements state that anchor links should surround the cover thumbnail, leaving the title text separated for separate click behaviors.

```astro
---
interface Recommendation {
  title: string;
  cover?: string;
  rating?: number;
  url?: string;
}

interface Props {
  recommendations?: Recommendation[];
}

const { recommendations = [] } = Astro.props;
---

<div role="tabpanel" tabindex="-1" data-index="3" data-slot="tabs-content" hidden inert data-orientation="horizontal">
  {recommendations.length > 0 ? (
    <ul class="flex h-full gap-2 overflow-x-auto pb-1.5 wtr-scroll">
      {recommendations.map(r => (
        <li class="flex shrink-0 flex-col rounded-md bg-card text-sm text-card-foreground shadow border border-border w-44 min-w-44">
          <a href={r.url || "#"} target="_blank" class="block">
            <div class="image-wrap relative rounded-md aspect-[3/4] w-full rounded-b-none overflow-hidden">
              {r.cover ? (
                <img src={r.cover} alt={r.title} class="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div class="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">No Cover</div>
              )}
              {r.rating && (
                <span class="status top-right absolute top-1 right-1 text-xs bg-black/70 text-white px-1.5 py-0.5 rounded font-mono">
                  {r.rating.toFixed(1)} ★
                </span>
              )}
            </div>
          </a>
          <div class="p-2">
            <h3 class="text-xs font-medium text-foreground line-clamp-2 leading-snug">{r.title}</h3>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p class="text-xs text-muted-foreground text-center py-8">No recommendations available.</p>
  )}
</div>
```

---

### 6.3 Star Ratings and User Reviews Panel (`TabReviews.astro`)
This panel features rating percentage blocks built with double segments (representing rating value + 35% opacity track background). Colors must match rates: `--color-review-rate-1` through `--color-review-rate-5`.

```astro
---
interface ReviewsData {
  averageRating?: number;
  totalVotes?: number;
  breakdown?: { 5: number; 4: number; 3: number; 2: number; 1: number };
  reviews?: Array<{ user: string; rating: number; text: string; date?: string; likes?: number }>;
}

interface Props {
  reviewsData?: ReviewsData;
}

const { reviewsData } = Astro.props;
const avg = reviewsData?.averageRating || 0;
const totalVotes = reviewsData?.totalVotes || 0;
const breakdown = reviewsData?.breakdown || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
const reviews = reviewsData?.reviews || [];

const total = Object.values(breakdown).reduce((a, b) => a + b, 0) || 1;

const stars = [5, 4, 3, 2, 1];
const rateColors = [
  "bg-[var(--color-review-rate-5)]",
  "bg-[var(--color-review-rate-4)]",
  "bg-[var(--color-review-rate-3)]",
  "bg-[var(--color-review-rate-2)]",
  "bg-[var(--color-review-rate-1)]",
];
---

<div role="tabpanel" tabindex="-1" data-index="2" data-slot="tabs-content" hidden inert data-orientation="horizontal">
  {totalVotes > 0 && (
    <section aria-label="Rating breakdown" class="mb-4">
      <div class="flex items-center justify-between mb-2">
        <span class="font-bold text-sm">Rating {avg.toFixed(1)}/5.0</span>
        <span class="text-foreground text-xs font-mono">{totalVotes} votes</span>
      </div>
      <div class="space-y-1.5">
        {stars.map((star, i) => {
          const count = breakdown[star as keyof typeof breakdown] || 0;
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <div class="flex items-center gap-2 text-xs font-mono">
              <span class="w-4 text-right text-muted-foreground shrink-0">{star}</span>
              <svg class="icon inline-flex shrink-0 size-3 text-amber-400"><use href="#star"></use></svg>
              <div class="flex-1 h-3 rounded-full bg-muted overflow-hidden flex relative">
                <!-- Double segments track -->
                <div class="h-full rounded-full transition-all" style={`width: ${pct}%`} class:list={[rateColors[i]]}></div>
                <div class="h-full rounded-full opacity-35" style={`width: ${pct}%`} class:list={[rateColors[i]]}></div>
              </div>
              <span class="w-20 text-right text-muted-foreground shrink-0">{Math.round(pct)}% ({count})</span>
            </div>
          );
        })}
      </div>
    </section>
  )}

  <section aria-labelledby="reviews-heading">
    <h2 id="reviews-heading" class="flex items-center gap-2 mt-4 mb-2 pl-2.5 border-l-2 border-l-primary text-base font-semibold text-card-foreground">
      Reviews
    </h2>

    {reviews.length > 0 ? (
      <div class="space-y-3 mb-4">
        {reviews.map(r => (
          <article class="rounded-lg border border-border p-3">
            <header class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                  {r.user.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span class="text-xs font-medium text-foreground">{r.user}</span>
                  <div class="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg class="icon inline-flex shrink-0 size-3" class:list={[star <= r.rating ? "text-amber-400" : "text-muted"]}>
                        <use href="#star"></use>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              {r.date && <span class="text-xs text-muted-foreground">{r.date}</span>}
            </header>
            <p class="text-xs text-foreground/80 leading-relaxed">{r.text}</p>
            <footer class="flex items-center gap-3 mt-2">
              {r.likes !== undefined && (
                <button class="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
                  <svg class="icon inline-flex shrink-0 size-3.5"><use href="#like"></use></svg>
                  <span>{r.likes}</span>
                </button>
              )}
              <button class="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <svg class="icon inline-flex shrink-0 size-3.5"><use href="#reply"></use></svg>
                <span>Reply</span>
              </button>
            </footer>
          </article>
        ))}
      </div>
    ) : (
      <p class="text-xs text-muted-foreground text-center py-8">No reviews yet.</p>
    )}
  </section>
</div>
```

---

## 7. Responsive Behavior & Collapsing Strategy

### Layout Breakpoints
*   **Mobile (< 768px)**:
    *   Detail grids switch from 2 columns (`grid-cols-[108px_1fr]`) to single column below `400px` screen width.
    *   Navigation drops standard links into drawer menus; search icon takes priority.
    *   Main wrapper panels use edge-to-edge layout (`.fix-edge`) losing their margins/rounded borders to conserve reading viewport space.
*   **Tablet (768px - 1024px)**:
    *   Main layouts centered within container margins.
    *   Navigation rows adapt into compact text/icons.
*   **Desktop (> 1024px)**:
    *   Nav links fully expand.
    *   Max reading content is bounded inside `max-w-[760px]`.

---

## 8. Do's and Don'ts

### Do
*   **Keep zero-JS hydration**: Keep interactions relying on pure class changes or lightweight vanilla scripts placed in `public/assets/js/`.
*   **Strictly map theme colors**: Never write custom colors like `bg-red-500` or `text-blue-200`; use tailwind mapping (e.g. `bg-[var(--color-review-rate-1)]` or `bg-primary`).
*   **Co-locate components**: Keep type interfaces and style adjustments within their matching `.astro` files.
*   **Use optional chaining**: To prevent crashes during SSG compile, always optional-chain (`?.`) dynamic variables and define fallback arrays (`= []`).

### Don't
*   **Don't wrap entire lists in link tags**: Ensure card links cover only images/covers, preventing unwanted page triggers when clicking adjacent title texts.
*   **Don't ignore ARIA attributes**: Always include correct role tags (`role="tab"`, `role="tabpanel"`) and active indicators (`data-active`, `aria-selected="true"`) on tabs.
*   **Don't use absolute sizing for reading copy**: Let layouts expand and wrap organically inside the `760px` boundary constraints.

---

## 9. Known Gaps

*   **SVG Icons Ingestion**: Icons rely on a global sprite definition inside `public` and `SvgSprite.astro`. Rendering an icon requires `<use href="#icon-id" />` referencing the sprite layout.
*   **Custom Dark Mode Script**: The early execution toggler script must be loaded inside the HTML `<head>` directly without async/defer properties to prevent flashing.
