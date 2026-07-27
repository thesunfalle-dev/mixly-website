# Error monitoring

The website uses Sentry Browser JavaScript for unhandled runtime errors only.

## Data controls

- Session Replay, tracing, logs, and application metrics are not enabled.
- `sendDefaultPii` is `false`.
- The client removes user data, request headers, cookies, request bodies, and
  URL query strings before an event is sent.
- Events receive only `locale`, `page_path`, and `site_surface` tags in
  addition to Sentry's browser/runtime context.

## Release check

After the next production deployment, open the homepage, blog, and article
page in a fresh browser session. Then use Sentry's **View Sample Error** once
to verify that the project receives an event. Confirm that its stack trace
points to the public JavaScript file and that the `locale` and `page_path`
tags are present. Do not run the sample error repeatedly.

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
