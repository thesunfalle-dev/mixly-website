const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data:; script-src 'self' 'unsafe-inline' https://browser.sentry-cdn.com https://us.i.posthog.com https://us-assets.i.posthog.com; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' https://browser.sentry-cdn.com https://o4511777909374976.ingest.de.sentry.io https://us.i.posthog.com; object-src 'none'; upgrade-insecure-requests",
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=(), payment=()',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const articlePaths = {
      '/ru/blog/kak-pravilno-smeshivat-tabak-dlya-kalyana': '/ru/blog/kak-pravilno-smeshivat-tabak-dlya-kalyana/index.html',
      '/en/blog/how-to-mix-hookah-tobacco': '/en/blog/how-to-mix-hookah-tobacco/index.html',
      '/de/blog/wie-man-shisha-tabak-richtig-mischt': '/de/blog/wie-man-shisha-tabak-richtig-mischt/index.html',
      '/ru/blog/sochetaniya-vkusov-dlya-kalyana': '/ru/blog/sochetaniya-vkusov-dlya-kalyana/index.html',
      '/en/blog/hookah-flavor-combinations': '/en/blog/hookah-flavor-combinations/index.html',
      '/de/blog/shisha-geschmackskombinationen': '/de/blog/shisha-geschmackskombinationen/index.html',
      '/ru/blog/proportsii-tabaka-dlya-kalyana': '/ru/blog/proportsii-tabaka-dlya-kalyana/index.html',
      '/en/blog/hookah-tobacco-mixing-ratios': '/en/blog/hookah-tobacco-mixing-ratios/index.html',
      '/de/blog/shisha-tabak-mischverhaeltnisse': '/de/blog/shisha-tabak-mischverhaeltnisse/index.html',
    };
    const assetRequest = articlePaths[url.pathname]
      ? new Request(new URL(articlePaths[url.pathname], url), request)
      : request;
    const response = await env.ASSETS.fetch(assetRequest);
    const headers = new Headers(response.headers);

    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      headers.set(name, value);
    }

    const pathname = new URL(request.url).pathname;
    // Long-cache fingerprinted-like static media/fonts; keep HTML revalidatable.
    if (/\.(?:webp|png|jpe?g|gif|svg|woff2|ico)$/i.test(pathname)) {
      headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
    } else if (/\.(?:css|js)$/i.test(pathname)) {
      headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    } else if (/\.html?$/i.test(pathname) || pathname === '/' || !pathname.includes('.')) {
      headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    }

    if (new URL(request.url).hostname.endsWith('.workers.dev')) {
      headers.set('X-Robots-Tag', 'noindex, nofollow');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
