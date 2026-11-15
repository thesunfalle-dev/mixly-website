# Website analytics events

Mixly sends optional website analytics to the Amplitude **Mixly Web** project
(`908537`) using Browser SDK 2.48.1 and US ingestion at
`https://api2.amplitude.com/2/httpapi`.

## Consent and browser storage

The site loads the Amplitude SDK only after the visitor accepts analytics. It
stores the choice in localStorage under `mixly-analytics-consent`, the
pseudonymous browser ID under `mixly-amplitude-device-id`, and SDK session state
under the project-specific `AMP_` key. Unsent events stay in memory.

Selecting Reject in Analytics settings stops further collection and clears the
browser ID and this project's SDK state. The site updates the local
`mixly-analytics-revocation` marker so other tabs discard uploads queued before
withdrawal, even if the visitor accepts again before those tabs catch up. The
marker stays on the device.

The integration sends the five events below and disables SDK autocapture, remote
configuration, diagnostics, IP address collection, and session replay.

## Shared properties

Each event includes these website properties:

- `page_path` is the path without query parameters or fragments. Short share
  links use `/s/:code` and error pages use `/error`.
- `locale` is `ru`, `en`, or `de`.
- `content_type` is `home`, `blog`, `article`, `legal`, or `error`.
- `referrer_origin` is the document referrer's origin, or `direct` when absent.
- `environment` is `production` on the live site and `development` on previews
  and local runs. Filter live-site reports by `environment = production`.

Keep account identifiers, email addresses, full referrers, query parameters,
search terms, and other free text out of event payloads. The SDK adds delivery
metadata, including the pseudonymous device ID, session ID, event time, event
IDs, SDK version, user agent, platform, and browser language. Browser identity
uses the locally generated ID. If an incoming URL contains `ampSessionId`, the
site supplies a fresh local session ID. The SDK omits the IP field and Amplitude
can process network metadata to receive requests.
[Amplitude Browser SDK event format](https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2/verify-events)

## Events

| Event | When it is sent | Extra properties |
| --- | --- | --- |
| `page_view` | Once per displayed page, including client-side page navigation after consent | None |
| `store_click` | A visitor activates an App Store or Google Play link | `store` (`app_store` or `google_play`), `placement` |
| `language_change` | A visitor selects a different display language, before any resulting navigation | `from_locale`, `to_locale`, `placement` (`language_switcher`) |
| `blog_open` | A visitor opens the blog, including a direct visit | `placement` (`direct`) |
| `article_open` | A visitor opens a published article | `article_slug` from the article path, `placement` (`direct`) |

`placement` uses the controlled vocabulary in `analytics.js`, including
`direct`, `header`, `hero`, `footer`, `blog_card`, and `language_switcher`.

## Duplicate prevention

- Count one `page_view` per full document load or client-side path change.
- Count one `language_change` for an explicit selection in the language switcher.
  A subsequent page navigation has its own `page_view`.
- Count one `store_click` per activation. The site handles store links through
  a single delegated click listener.

## Release verification

Run `node --test scripts/test-analytics.mjs` to check the consent and event logic
locally before the browser checks.

1. Open the site in a fresh browser profile. Confirm the Network panel shows no
   Amplitude requests before consent and after selecting Reject.
2. Follow Cookies & Analytics in the footer, open analytics settings, and accept.
   In the **Mixly Web** project, open User Lookup and find the `device_id` from
   the ingestion request. Confirm one `page_view` in Activity with Live event
   updates enabled.
3. Open the blog and an article through site navigation. Confirm one
   `page_view` for each page and one `blog_open` or `article_open` as appropriate.
   Confirm one event per language change and one per App Store or Google Play
   link activation. Spot-check RU, EN, and DE.
4. Inspect event payloads for the documented properties and check the expected
   environment. Verify that query parameters, share codes, full referrers, and
   account identifiers are absent.
5. Open the site in a second tab. In the first tab, open Analytics settings and
   select Reject. Confirm the browser ID and project-specific Amplitude keys are
   cleared and further navigation and reloads in either tab generate no
   Amplitude requests.
