# Extracted WTR-LAB Static Site

Generated from `page/wtr-lab-static-cleaned.html` without modifying the source file.

- `index.html` is the page shell.
- `components/` contains the body chunks: SVG sprite/defs, navigation, main content, and captured frame.
- `assets/css/` contains extracted style blocks.
- `assets/js/` contains extracted scripts and the chunk loader.

The chunks are loaded with `fetch()`, so serve this folder over HTTP. From the repository root:

```powershell
npx http-server wtr-lab-site -p 4173
```
