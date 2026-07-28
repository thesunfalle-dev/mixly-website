# CSS architecture (MIX-61)

Production still serves a single `/styles.css`. Source of truth for edits is the modular tree under `css/`.

## Modules (cascade order)

| File | Responsibility |
| --- | --- |
| `css/00-tokens.css` | `:root` tokens, fonts, view transitions, base reset |
| `css/01-base.css` | Early layout primitives, first hero/section rules |
| `css/02-components-chrome.css` | Download dialog, header refinements, intro, ritual |
| `css/03-home-content.css` | Journal, testimonials, changelog, premium |
| `css/04-chrome-blog.css` | Footer, language switch, mobile menu, blog cards |
| `css/05-pages-legal-error.css` | Legal pages, error pages, mid-page media queries |
| `css/06-article-toc-utilities.css` | Article layout, TOC pin, lightbox, utilities |

`css/manifest.json` lists build order and breakpoints.

## Breakpoints

| Token | Query | Use |
| --- | --- | --- |
| mobile | `max-width: 760px` | phones, compact nav, stacked sections |
| tablet | `max-width: 980px` | article TOC collapses, denser grids |
| desktop | `min-width: 981px` | fixed article TOC, wide layouts |
| reduced motion | `prefers-reduced-motion: reduce` | disable marquees / heavy motion |
| hover | `hover: hover` | hover-only affordances |

Prefer adding new rules next to the component’s primary module instead of appending overrides at the end of `styles.css`.

## Workflow

```sh
# edit css/03-home-content.css (example)
npm run build:css
npm run check
```

`npm run build:css` regenerates root `styles.css` from the modules (banners like `/* === file === */` are stripped).

## Follow-ups

- Merge historical override layers for `.hero` / `.premium` / `.site-header` into single component blocks (behavior-preserving).
- Minify the built bundle for Lighthouse unused-CSS / transfer savings.
- Optional visual snapshot smoke for 320 / 768 / 1200 viewports.
