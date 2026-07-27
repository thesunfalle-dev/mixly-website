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

## Reproducer machine (2026-07-27, after browser `ERR_TIMED_OUT`)

User saw Chrome **ERR_TIMED_OUT** (`get-mixly.app took too long to respond`) with VPN. Immediately afterward, local checks:

| Check | Result |
| --- | --- |
| `dig … A` | `188.114.96.11`, `188.114.97.11` |
| `dig … AAAA` | `2a06:98c1:3120::b`, `2a06:98c1:3121::b` |
| `curl -4 https://get-mixly.app/` | HTTP/2 **200**, CF edge `WAW`, TLS OK |
| `curl -6 https://get-mixly.app/` | HTTP/2 **200**, but connect target was **`::ffff:188.114.96.11`** (IPv4-mapped), **not** native `2a06:98c1:…` |

After dig/curl, the browser loaded the site again without further changes on the origin.

Interpretation:

1. Production/Cloudflare path is healthy once a connection succeeds.
2. Recovery after local DNS/HTTP probes matches a **transient client path** (VPN route, DNS cache, Happy Eyeballs race) rather than a sustained Mixly outage.
3. On this host, **native IPv6 to Cloudflare is not actually used**; `curl -6` falls back to IPv4-mapped addresses. Public AAAA records therefore do not prove the client can reach IPv6 anycast.
4. No Worker/DNS config change is indicated from this evidence alone.

## If it reproduces

Capture and attach to Linear MIX-73:

1. Exact browser error text/code and time (UTC)
2. VPN provider + city/country
3. Device + browser
4. Screenshot
5. `curl -4 -v` and `curl -6 -v` to `https://get-mixly.app/` (note whether `-6` uses `2a06:…` or `::ffff:…`)
6. Whether IPv6-only / IPv4-only network differs
7. Optional: `chrome://net-internals/#dns` clear + reload only after capturing the failing state

Do **not** disable IPv6 or WAF globally without a confirmed rule hit in Cloudflare Security Events.

## Operational stance

- Keep Cloudflare proxy enabled.
- Keep HSTS and security headers from `worker.js`.
- Re-run this path checklist after major DNS or Worker domain changes.
- Prefer documenting client/VPN limitations over site-side “fixes” unless multiple independent networks show the same failure.
