# Analytics code audit (MIX-65) — 2026-07-28

Field funnel conclusions require 2–4 weeks of consented traffic. This pass is a **code + contract** audit only.

## Event contract (production code)

| Event | Guardrails in `analytics.js` | Notes |
| --- | --- | --- |
| `page_view` | `loadedEvents` Set — once per full document load after consent | Autocapture + automatic pageview disabled in PostHog init |
| `store_click` | Click handler with controlled `placement` vocabulary | `store` = `app_store` / `google_play` |
| `language_change` | Fired on explicit locale switch | Does not invent a second `page_view` |
| `blog_open` | On blog content type (`/blog` / `/blog.html`) | `placement: direct` when landing on blog |
| `article_open` | On article path with validated slug | Uses public slug only |

Shared properties: `page_path`, `locale`, `content_type`, `referrer_origin` only.

## Consent

- Consent key: `mixly-analytics-consent`
- PostHog script loads only after `accepted`
- Reject clears client persistence via `clearAnalytics()`
- No analytics category until accept (see also privacy/cookies copy)

## Duplicate risk review

- Initial page: single `page_view` path via `trackInitialPage`
- SPA navigation: does **not** currently emit a second `page_view` on body swap (document load model) — intentional for static multi-page + partial SPA
- Language switch: separate event; path navigation may follow depending on switcher

## Field work still required (do not close MIX-65 on code alone)

1. Fresh session without consent → zero requests to `us.i.posthog.com`
2. Accept → exactly one `page_view` in live view
3. App Store click → one `store_click` with placement
4. Language change RU→EN → one `language_change`
5. Withdraw consent → no further events
6. After 2–4 weeks: funnel home → store by locale/device; CTA placement ranking; high-exit pages

## Interim product notes

- Traffic volume still early post-launch — do not prioritize product changes from partial samples.
- Next scheduled look: with MIX-66 quarterly pass or when Search Console shows steady article impressions.
