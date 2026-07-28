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
