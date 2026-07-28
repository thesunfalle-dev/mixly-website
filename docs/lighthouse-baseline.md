# Lighthouse baseline (MIX-63)

Lab scores: Lighthouse **13.4.1**, form factor **mobile**, throttling **simulate**, Chrome headless.

Date of pre-fix snapshot: **2026-07-28** (production before MIX-63 image/a11y fixes).

## Pre-fix production scores

| Page | Perf | A11y | BP | SEO | Notes |
| --- | ---: | ---: | ---: | ---: | --- |
| `/` | 77–85 | 95 | 100 | 100 | LCP ~5.5s; contrast on testimonial `time`; blog card aria mismatch |
| `/en/` | 74 | 95 | 100 | 100 | Same a11y/LCP pattern |
| `/blog.html` | 80 | 100* | 100 | 100 | *label-content-name-mismatch still failed in detail audits |
| `/en/blog/how-to-mix-hookah-tobacco` | 51 | 100 | 100 | 100 | LCP 6.5s; CLS 0.346 (unsized article imgs); oversized heroes |
| `/privacy.html` | 85 | 100 | 100 | 66 | SEO drop is **expected** (`noindex` / MIX-72) |

### Dominant lab issues (pre-fix)

1. **Image delivery** — Discovery/Lab still PNG (~180 KB); `main_1.webp` incorrectly 1206×2622; article heroes wider than display.
2. **CLS on articles** — hero/body images missing `width`/`height` (how-to-mix cluster).
3. **Accessibility** — blog card `aria-label` shorter than visible link text; testimonial date contrast ~3.9:1 on violet cards.
4. **Render-blocking** — single `styles.css` (~25 KB) remains the main CSS critical path (follow-up: MIX-61).

## Fixes shipped under MIX-63

- Convert app screenshots to sized WebP (`main_*`, `Discovery`, `Lab`) at 414×900.
- Cap blog WebP width at 960 px; refresh optimize script.
- Add explicit `width`/`height` on article figures.
- Drop redundant `aria-label` on blog cards (name comes from visible content).
- Raise testimonial `time` contrast on colored cards.

## How to re-measure

```sh
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
npx lighthouse "https://get-mixly.app/" \
  --chrome-path="$CHROME" \
  --only-categories=performance,accessibility,best-practices,seo \
  --form-factor=mobile --screenEmulation.mobile=true \
  --throttling-method=simulate --quiet --output=json --output-path=/tmp/lh-home.json
```

Record post-deploy scores in the Linear comment on MIX-63 / MIX-66.

## Post-fix production scores (same day, after deploy)

Worker version `f2ea5755-52f8-4a17-bcea-4cb5edcfe944` @ 100%.

| Page | Perf | A11y | BP | SEO | Delta vs pre-fix |
| --- | ---: | ---: | ---: | ---: | --- |
| `/` | **80** | **100** | 100 | 100 | A11y +5; LCP 5.5s → 4.6s |
| `/en/` | **77** | **100** | 100 | 100 | A11y +5 |
| `/blog.html` | **86** | **100** | 100 | 100 | Perf +6 |
| `/en/blog/how-to-mix-hookah-tobacco` | **78** | 100 | 100 | 100 | Perf **+27**; CLS 0.346 → **0** |
| `/privacy.html` | 71 | 100 | 100 | 66 | SEO intentionally low (`noindex`) |

Remaining lab friction (not blockers): unused CSS / render-blocking `styles.css` (MIX-61), minify CSS/JS, optional hero `srcset`.

## Intentional non-goals

- **Legal SEO score** stays low while pages are `noindex`.
- Full CSS code-split / minify pipeline → MIX-61.
- Field CrUX / RUM comparison → after traffic accumulates (MIX-64/65).
