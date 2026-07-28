# Quarterly website health-check (MIX-66)

Run after major deploys or roughly once a quarter. Create separate Linear issues only for confirmed problems.

## Checklist

1. **Deploy identity** — production Worker version tag/message matches intended git SHA (`wrangler deployments list`).
2. **Status codes** — home, blog, one article (RU/EN/DE), changelog, legal (`noindex` expected), share preview.
3. **Lighthouse lab baseline** — compare to `docs/lighthouse-baseline.md` (home, blog, article, privacy).
4. **Links / locales** — `npm run check:release`.
5. **Sitemap / robots / canonical / hreflang** — spot-check HTML head + Search Console coverage when available.
6. **Analytics consent** — no PostHog requests before accept; one `page_view` after accept (`docs/website-analytics-events.md`).
7. **Error monitoring** — Sentry/Mixly monitoring free of new recurring client errors.
8. **A11y smoke** — keyboard: menu, language switch, blog filters, changelog accordion, article TOC.
9. **CTA / external** — App Store links and Instagram/Threads still resolve.
10. **Security headers** — CSP without `unsafe-eval`; HSTS present.

## Record a pass

Leave a Linear comment on MIX-66 with:

- date
- Worker version id
- Lighthouse scores table
- any new follow-up issue IDs

## First pass (2026-07-28)

| Item | Result |
| --- | --- |
| Worker | `d5d6048d-1102-44ba-ba50-48af8991a6e7` (changelog SEO) |
| `npm run check` | pass (38 HTML pages) |
| Lighthouse | see MIX-63 / `docs/lighthouse-baseline.md` post-fix |
| Changelog URLs | `/changelog`, `/en/changelog`, `/de/changelog` → 200 |
| Legal noindex | intentional (MIX-72) |
| Follow-ups | CSS override merge (MIX-61 remaining), field analytics (MIX-65 after traffic) |

## Final pass (2026-07-28, MIX-86)

| Item | Result |
| --- | --- |
| Git SHA | `cc52931` (+ touch-target CSS patch for changelog permalinks) |
| Worker | `7828f6a7-a9f3-46b0-a67c-444f827fb684` @ 100% (tag = `cc52931…`) |
| `npm run check:release` | pass (38 HTML pages + external) |
| `npm run qa:smoke` | pass (23 production routes) |
| Route matrix | 27×200 for key pages/assets; unknown path → 404 |
| Legal `noindex` | privacy/cookies/terms/eula/support — intentional |
| Security headers | CSP (no `unsafe-eval`), HSTS, nosniff, DENY frame, referrer |
| Breadcrumbs | blog, changelog, legal, articles present; EN/DE articles locale-aware |
| Adaptive | viewport meta; mobile menu; primary breakpoint `max-width: 760px` |
| Lighthouse mobile | see table below / `docs/lighthouse-baseline.md` final pass |
| Critical blockers | **none** |

### Lighthouse mobile (lab, LH 13.4.1, simulate)

| Page | Perf | A11y | BP | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 88 | 95→100* | 100 | 100 | 3.5s | 0 |
| `/en/` | 81 | 95→100* | 100 | 100 | 4.5s | 0 |
| `/blog.html` | 82 | 100 | 100 | 100 | 4.2s | 0 |
| `/en/blog/how-to-mix-hookah-tobacco` | 81 | 100 | 100 | 100 | 4.5s | 0 |
| `/changelog` | 88 | 95→100* | 100 | 100 | 3.6s | 0 |
| `/privacy.html` | 78 | 100 | 100 | 66 | 4.3s | 0 |

\*A11y 95 was only `target-size` on `.changelog-permalink a` — fixed with min-height 44px in CSS (MIX-86).

Desktop home (lab): Perf ~70, A11y 95, CLS 0 (lab variance; mobile is the product baseline).

### Non-blocking follow-ups (no new issues unless product wants them)

1. **Minify / critical CSS** — `styles.css` ~25 KB render-blocking (est. 130–790 ms lab).
2. **Responsive images / srcset** — lab image-delivery savings ~40–80 KB on home/article.
3. **Field analytics / CrUX** — MIX-65 after real traffic.
4. **Legal SEO score** stays low while `noindex` (MIX-72).
