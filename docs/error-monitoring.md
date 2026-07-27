# Error monitoring

The website uses Sentry Browser JavaScript for unhandled runtime errors
(`monitoring.js`). The SDK loads after `window.load` on idle so it never
blocks fonts, localization, or hero media.

## Surfaces

| Surface tag | How it is detected |
| --- | --- |
| `website` | default marketing pages |
| `blog` | path ends with `blog.html` |
| `article` | `.article-page` present |
| `legal` | `data-legal-doc` on body |
| `share` | share handoff page |
| `error` | `data-error-page` |

SPA navigation failures in `page-nav.js` call `MixlyMonitoring.captureException`
with `nav_failure=spa_fetch` before falling back to a full page load.

## Data controls

- Session Replay, tracing, logs, and application metrics are not enabled.
- `sendDefaultPii` is `false`.
- The client removes user data, request headers, cookies, request bodies, and
  URL query strings before an event is sent.
- Events receive `locale`, `page_path`, `site_surface`, and `page_navigation`
  (`spa` / `mpa`) tags in addition to Sentry's browser/runtime context.
- Stack frames point at public `/…js` files (no separate source-map build for
  this static site).

## Release check

After production deployment, open homepage, blog, and one article in a fresh
session. Trigger **View Sample Error** once in Sentry (or a single deliberate
test throw in a private preview). Confirm:

- environment is `production` on `get-mixly.app` and `preview` on `workers.dev`
- tags `locale` and `page_path` are present
- stack file paths match deployed public JS

Do not run the sample error repeatedly.

## Incident triage

1. Review only new or unresolved Sentry issues.
2. Check the affected release, `page_path`, browser, and `locale` tags.
3. Reproduce the error without using visitor-specific data.
4. Fix the smallest responsible change, then verify it locally and after
   deployment.
5. Resolve the Sentry issue only after the deployed fix is confirmed.

## Sentry settings to keep

- Keep the project on error monitoring only.
- Enable the Sentry project option to prevent storage of IP addresses.
- Configure notifications for new issues and fatal errors only; do not enable
  alerts for every recurrence.
