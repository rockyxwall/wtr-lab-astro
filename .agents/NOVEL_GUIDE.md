# Novel Markdown Page Formatting Guide

This guide details the exact structure, frontmatter fields, and body elements required for any novel markdown file (placed in `src/content/novel/*.md`) to render cleanly and match the design aesthetics of WTR-LAB.

---

## 1. YAML Frontmatter Schema

Each markdown file must start with a YAML frontmatter block. Only define properties that are consumed by the page header, tags, or JSON datasets:

```yaml
---
title: "Steady Cultivation: Starting with a Combination of Work and Rest"
chineseTitle: "稳健修仙：开局词条劳逸结合"
cover: "https://img.wtr-lab.com/cdn/series/...jpg"
status: "Completed"
views: "601K"
chapters: 806
rating: 3.6
readers: 1493
totalChars: "1.68M"
tags:
  - Male
  - Cautious
  # ... other tags
tagCategories:
  Protagonist Archetypes:
    - Male
    - Cautious
  # ... other categories
genres:
  - fantasy
  - xianxia
dataFiles:
  chapters: "steady-cultivation"
  reviews: "steady-cultivation"
  recommendations: "steady-cultivation"
---
```

> [!WARNING]
> Do NOT include `details`, `rankings`, or `dataFiles.patrons` in the YAML frontmatter. These properties are now managed directly inside the markdown body to prevent rendering duplication and layout bugs.

---

## 2. Markdown Body Layout

The body of the markdown file should follow this exact sequence:

### 2.1 Description / Novel Summary
Paragraphs of the summary must be written at the top of the file, before any markdown headings (`##`). These will be rendered fully inside the **Novel Summary** section.
*   Keep text clean and avoid manual line-break tags unless separating paragraphs.

### 2.2 Author's Other Novels Section
Renders as a numbered list under the heading `## Author's Other Novels`.
*   **Format**: Ordered list where each item is a link to the novel page.
```markdown
## Author's Other Novels
1. [Steady Cultivation: Grab It in One Go, Decompose It in an Instant](https://wtr-lab.com/en/novel/66609/steady-cultivation-grab-it-in-one-go-decompose-it-in-an-instant)
2. [Start by Synthesizing Enlightenment Tea, Be Steady and Cautious](https://wtr-lab.com/en/novel/11179/start-by-synthesizing-enlightenment-tea-be-steady-and-cautious)
```

### 2.3 Details Table Section
Renders as a clean key-value table under the heading `## Details`.
*   **Format**: A standard Markdown table with column headers `Detail | Value`.
*   **Titles Row**: Add native and translated titles separated by `<br>`.
*   **Author Row**: Add author link and pinyin link on separate lines using a `<br>` separator.
*   **Rankings Row**: Add Weekly and All Time rankings as links containing `**bold**` numbers.
```markdown
## Details
| Detail | Value |
| :--- | :--- |
| **Titles** | Steady Cultivation: Starting with a Combination of Work and Rest<br>稳健修仙：开局词条劳逸结合 |
| **Status** | Completed |
| **Date Added** | May 6, 2025 |
| **Author** | [呆毛的小鹅](https://url)<br>[Ai Mao De Xiao E](https://url) |
| **Requested** | [Shadow_King](https://url) |
| **Year** | 2025 |
| **Origin** | CN |
| **Language** | Chinese |
| **Rankings** | [Weekly **#42**](#) [All Time **#156**](#) |
```

### 2.4 Novel Patrons Section
Renders as a styled patrons ranking leaderboard under the heading `## Novel Patrons`.
*   **Heading ID**: CSS styling targets the list immediately following `#novel-patrons`. Do not rename this heading.
*   **Format**: Ordered list with name, followed by the ticket count formatted in `**bold**`.
```markdown
## Novel Patrons
1. Julius **150**
2. Goewin **97.15**
3. Shadow_King **50**
4. Reader4 **25**
5. Reader5 **10**
```

---

## 3. Styling & Processing Mechanics

1.  **CSS Grid Tables**: Under the hood, `markdown.css` styles tables as a CSS Grid, formatting the first column to exactly `108px` on desktop and collapsing into a single column on mobile viewports (`< 400px`).
2.  **CSS Counter Badges**: Ordered lists inside `.markdown-content` automatically have list bullets disabled and replaced with custom CSS counters. The patrons list applies specific yellow, gray, and orange backgrounds to the first three rank items.
3.  **Vector SVG Icons**: CSS masks are used to dynamically attach ticket icon prefixes to bold prices, and a crown icon to the patrons section header.
