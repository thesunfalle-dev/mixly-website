# Production deployment, preview, and rollback

## Environments

| Environment | URL | Indexing | How it is created |
| --- | --- | --- | --- |
| Production | `https://get-mixly.app` | Indexable pages only (see `sitemap.xml` / `noindex`) | `wrangler versions deploy <id>@100` |
| Preview | `https://<alias>-mixly-website.<account>.workers.dev` | Forced `X-Robots-Tag: noindex, nofollow` on `*.workers.dev` | `wrangler versions upload --preview-alias …` |

There is no separate secret-backed build for the static site. Client JS may embed public analytics/monitoring endpoints (Sentry DSN, PostHog host). Cloudflare credentials (`CLOUDFLARE_API_TOKEN`) stay in local `.env` / CI secrets and must never be committed.

## Pre-flight

```sh
npm install
npm run check:release
```

`check:release` must exit `0` before production promotion. It validates local links, i18n dictionaries, canonical URLs, sitemap contents, article SEO contract, and optional external HTTP checks.

## Upload a version (preview)

```sh
COMMIT=$(git rev-parse HEAD)
ALIAS=$(git rev-parse --abbrev-ref HEAD | tr '/' '-')

npm exec wrangler -- versions upload \
  --preview-alias "$ALIAS" \
  --tag "$COMMIT" \
  --message "$COMMIT"
```

Wrangler prints:

- **Worker Version ID** — use for deploy/rollback
- **Version Preview Alias URL** — smoke-test here first

Confirm preview:

1. Homepage, blog, one article (RU + EN), legal page, `share.html?mix=test&preview=1`
2. Response headers on `*.workers.dev` include `X-Robots-Tag: noindex, nofollow`
3. Version tag/message equals the commit SHA

## Promote to production

```sh
npm exec wrangler -- versions deploy <version-id>@100 --message "$(git rev-parse HEAD)" -y
```

Verify:

```sh
npm exec wrangler -- deployments list
curl -sI https://get-mixly.app/ | head
curl -sS -o /dev/null -w "%{http_code}\n" -L https://get-mixly.app/en/blog/how-to-mix-hookah-tobacco
```

Production is correct only when the active deployment’s **tag/message** matches the intended git SHA.

## Rollback

List deployments, pick the previous version id, then:

```sh
npm exec wrangler -- versions deploy <previous-version-id>@100 --message "rollback to <previous-sha>" -y
# or, when available in the account:
npm exec wrangler -- rollback <previous-version-id>
```

Re-check production URLs after rollback. Keep at least the last known-good version id in the Linear issue or PR.

## Custom domain / HTTPS

- Apex `get-mixly.app` is proxied through Cloudflare Workers assets.
- HSTS is set by `worker.js` (`max-age=31536000`).
- Article clean paths are mapped in `worker.js` (`/en/blog/...` → `.../index.html`).

## Secrets checklist

| Secret / value | Where | Committed? |
| --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | local `.env`, CI | **No** |
| Sentry DSN | `monitoring.js` (public browser DSN) | Yes (expected) |
| PostHog project key | `analytics.js` (public) | Yes (expected) |

Never put API tokens, private keys, or service-role Supabase keys in this repo.

## CI note

GitHub/Cloudflare Workers Builds may upload assets on PR push. Treat PR checks as signal only; **production traffic changes only after an explicit `versions deploy @100`** from a reviewed commit.
