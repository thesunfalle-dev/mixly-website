# Connectivity diagnostics (MIX-73)

## Incident summary

One-off report: `get-mixly.app` failed to load with VPN enabled, then worked after VPN toggle. Possible causes include VPN DNS cache, IPv4/IPv6 path differences, Cloudflare edge routing, or a transient client network glitch.

## Automated re-check (2026-07-27)

From a European network (Cloudflare edge `WAW`):

| Path | HTTP | CF cache | Notes |
| --- | --- | --- | --- |
| `/` | 200 | HIT | OK |
| `/blog.html` | 200 | HIT | OK |
| `/privacy.html` | 200 | HIT | OK |
| `/terms.html` | 200 | HIT | OK |
| `/share.html?mix=test&preview=1` | 200 | HIT | OK (may 307 to `/share`) |
| `/ru/blog/proportsii-tabaka-dlya-kalyana` | 200 | HIT | OK |
| `/en/blog/how-to-mix-hookah-tobacco` | 200 | HIT | OK |

DNS (public resolvers):

| Resolver | A | AAAA |
| --- | --- | --- |
| `1.1.1.1` | Cloudflare anycast `188.114.96/97.x` | `2a06:98c1:312x::` |
| `8.8.8.8` | Cloudflare anycast `188.114.96/97.x` | `2a06:98c1:312x::` |

Conclusions from this pass:

- Origin/Worker responds consistently for first requests without “warmup” tricks.
- Both IPv4 and IPv6 records are present and point at Cloudflare.
- No evidence of site-side 5xx or NXDOMAIN in this sample.
- The original one-off failure is most consistent with a **client/VPN DNS or routing glitch**, not a permanent misconfiguration of Mixly production.

## If it reproduces

Capture and attach to Linear MIX-73:

1. Exact browser error text/code and time (UTC)
2. VPN provider + city/country
3. Device + browser
4. Screenshot
5. `curl -v https://get-mixly.app/` and Cloudflare **Ray ID** if shown
6. Whether IPv6-only / IPv4-only network differs

Do **not** disable IPv6 or WAF globally without a confirmed rule hit in Cloudflare Security Events.

## Operational stance

- Keep Cloudflare proxy enabled.
- Keep HSTS and security headers from `worker.js`.
- Re-run this path checklist after major DNS or Worker domain changes.
