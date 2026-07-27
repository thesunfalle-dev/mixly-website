# Launch checklist (MIX-16)

## Automated (required)

```sh
npm run check:release
npm run qa:smoke                 # production routes
npm run qa:smoke -- https://<preview-alias>.workers.dev
```

- [ ] `check:release` exits 0
- [ ] `qa:smoke` exits 0 against preview, then production
- [ ] Worker deployment tag/message equals the git SHA (`docs/deployment.md`)

## Product smoke (manual)

### Routes
- [ ] Home, blog, 3 article locales (RU/EN/DE), legal (privacy/terms/eula/cookies/support)
- [ ] `share.html?mix=test&preview=1` and without `preview` (opens app/store)
- [ ] 404 page for unknown path
- [ ] Error pages render if exercised by host

### Navigation
- [ ] Header, footer, hamburger links (blog → home hash, legal, article)
- [ ] After hamburger navigation: menu closed, page scrolls
- [ ] Language switch RU/EN/DE on home/blog/legal (content updates; locale stored)

### Content / SEO
- [ ] Article breadcrumbs visible
- [ ] Related articles point to same locale
- [ ] `sitemap.xml` lists only indexable URLs
- [ ] Legal pages `noindex`; articles indexable

### Accessibility (spot-check)
- [ ] Keyboard: tab through header, open language menu, open download dialog, Escape closes
- [ ] Focus visible on interactive controls
- [ ] Images have meaningful `alt` (hero, dialog icon, article figures)

### Analytics / monitoring
- [ ] With analytics consent: one `page_view` in PostHog
- [ ] Optional single Sentry sample error on preview; then resolve

### Devices
- [ ] Desktop Chrome/Safari
- [ ] Mobile width ~390px
- [ ] iPhone Safari smoke if available

## Blockers policy

- Any **High** bug found during QA is filed as a separate Linear issue and must not remain open at launch.
- Non-blocking polish can stay open with owners/dates.

## Sign-off

| Role | Name | Date |
| --- | --- | --- |
| Eng |  |  |
| Product |  |  |
