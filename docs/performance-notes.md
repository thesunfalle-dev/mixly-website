# Performance notes (MIX-15)

## Changes shipped

| Area | Change | Expected impact |
| --- | --- | --- |
| Article heroes | PNG (~1.3–2.0 MB) → WebP (~55–97 KB) | LCP on article pages |
| Worker caching | long-cache for media/fonts; short revalidate for CSS/JS; no-store-ish HTML | repeat visits, TTFB for assets |
| Fonts | already `font-display: optional` + preload | CLS from late font swap |
| App screenshots | intrinsic `width`/`height` on LCP candidates | CLS |
| Monitoring | Sentry idle after `load` | does not compete with LCP |

## Re-optimize images

```sh
node scripts/optimize-blog-images.mjs
# then ensure HTML/SEO generators reference .webp
```

## Measure

```sh
# transfer sizes / status
curl -sS -o /dev/null -w "%{http_code}  %{size_download}B  %{time_total}s  %{url_effective}\n" \
  -L "https://get-mixly.app/en/blog/how-to-mix-hookah-tobacco"

# automated route smoke + soft latency budget
npm run qa:smoke
```

Record Lighthouse mobile scores in Linear when re-running full audits (home, blog, one article).

Baseline tables and re-run commands: [lighthouse-baseline.md](./lighthouse-baseline.md).

## Remaining opportunities

- Optional: image `srcset` for hero phones and article covers.
- CSS modularization / minify pipeline (MIX-61) for unused-CSS and render-blocking CSS.
- Field CrUX comparison after real traffic (MIX-64 / MIX-65).
