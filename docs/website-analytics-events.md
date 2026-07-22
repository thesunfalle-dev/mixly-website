# Website analytics events

Mixly uses PostHog US Cloud for optional website analytics. This document
describes the events sent by the production integration.

## Consent rule

No analytics script, beacon, or event loads or runs until the visitor actively
allows the `analytics` category. A refusal keeps analytics off. Changing or
withdrawing consent stops future events and clears PostHog client-side state.
The consent choice itself is stored locally as `mixly-analytics-consent`.

PostHog is loaded from and sends events to `https://us.i.posthog.com`. The
configuration disables autocapture, automatic page-view and page-leave capture,
performance capture, heatmaps, automatic error capture, session recording, surveys,
product tours, feature flags, and person profiles.

## Shared properties

Every event should contain only:

- `page_path` — path without query parameters or fragments;
- `locale` — `ru`, `en`, or `de`;
- `content_type` — `home`, `blog`, `article`, `legal`, or `error`;
- `referrer_origin` — origin only, or `direct` when absent.

Do not send an email address, IP address from application code, full referrer,
search terms, free-text content, user identifiers, or query parameters. The
provider may process network metadata needed to receive the request under its
own configuration and agreement.

## Events

| Event | When it is sent | Extra properties |
| --- | --- | --- |
| `page_view` | Once for each document load after consent | shared properties |
| `store_click` | A visitor activates an App Store or Google Play link | `store` (`app_store` or `google_play`), `placement` |
| `language_change` | A visitor selects a different display language | `from_locale`, `to_locale`, `placement` |
| `blog_open` | A visitor opens the blog from a site link | `placement` |
| `article_open` | A visitor opens a published article | `article_slug` from the validated public article slug |

`placement` is limited to a controlled vocabulary maintained in code, such as
`header`, `hero`, `footer`, `blog_card`, or `article_cta`.

## Duplicate prevention

- A full page navigation produces one `page_view`.
- A language change is one `language_change`; it does not synthesize a second
  `page_view` unless the browser subsequently loads a new document.
- A click handler must be installed once per element and must not emit both a
  generic outbound-click event and `store_click` for the same interaction.
- The browser's automatic provider page-view feature must be disabled if Mixly
  sends `page_view` itself.

## Release verification

After a provider is selected and consent is implemented:

1. Verify that an unconsented fresh browser session sends no analytics request.
2. Grant analytics consent and confirm each listed event in the provider's
   real-time view on RU, EN, and DE.
3. Repeat a language change and an App Store click; confirm one event each.
4. Withdraw consent, reload, and confirm no further analytics request is sent.
5. Review an event payload and confirm it contains only the documented
   properties.
