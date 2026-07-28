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

## Follow-ups (phase 2)

Historical cascade still has multiple rewrite layers (especially `.hero`, `.premium`, `.site-header`, repeated `max-width: 760px` blocks — ~28 mobile media queries). Phase 1 only modularized ownership by file; it did **not** collapse overrides.

Next concrete steps:

1. For each component, keep the **last** winning rule set in its module and delete earlier dead assignments after visual check.
2. Group mobile rules per component into one `@media (max-width: 760px)` block inside that module.
3. Minify the built bundle only after override collapse (current minify savings ~4 KiB).
4. Optional visual snapshot smoke for 320 / 768 / 1200 viewports (RU/EN/DE home + blog + article + legal).
