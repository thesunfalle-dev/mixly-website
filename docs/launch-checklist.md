# Launch checklist

## Before deployment

- [ ] `npm run check:release` passes (record external-service rate limits separately).
- [ ] Review the final diff and confirm no credentials or generated local files are included.
- [ ] Deploy the exact reviewed commit to a preview Worker and smoke-test all public pages in RU, EN, and DE.

## Immediately after production deployment

- [ ] Confirm homepage, blog, article template, legal pages, support page and 404 return the expected responses.
- [ ] Verify production `cookies.html`, sitemap, canonical URLs and security headers.
- [ ] Confirm a consented PostHog event and a Sentry test error arrive; then clear the test error.
- [ ] Confirm the Worker version/tag matches the deployed commit and retain the prior version for rollback.
- [ ] Submit or refresh the sitemap in Search Console after the public URLs are live.
