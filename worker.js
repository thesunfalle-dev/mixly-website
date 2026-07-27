const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data:; script-src 'self' 'unsafe-inline' https://browser.sentry-cdn.com https://us.i.posthog.com https://us-assets.i.posthog.com; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' https://browser.sentry-cdn.com https://o4511777909374976.ingest.de.sentry.io https://us.i.posthog.com; object-src 'none'; upgrade-insecure-requests",
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=(), payment=()',
};

// Canonical article paths without trailing slash. Assets html_handling serves the
// directory form with a slash; we must NOT rewrite to …/index.html or Assets
// will 307 back to …/ and create a redirect loop through this worker.
const ARTICLE_PATHS = new Set([
  '/ru/blog/kak-pravilno-smeshivat-tabak-dlya-kalyana',
  '/en/blog/how-to-mix-hookah-tobacco',
  '/de/blog/wie-man-shisha-tabak-richtig-mischt',
  '/ru/blog/sochetaniya-vkusov-dlya-kalyana',
  '/en/blog/hookah-flavor-combinations',
  '/de/blog/shisha-geschmackskombinationen',
  '/ru/blog/proportsii-tabaka-dlya-kalyana',
  '/en/blog/hookah-tobacco-mixing-ratios',
  '/de/blog/shisha-tabak-mischverhaeltnisse',
]);

function barePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

function withSecurityHeaders(response, requestUrl) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }

  const pathname = requestUrl.pathname;
  if (/\.(?:webp|png|jpe?g|gif|svg|woff2|ico)$/i.test(pathname)) {
    headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
  } else if (/\.(?:css|js)$/i.test(pathname)) {
    headers.set('Cache-Control', 'public, max-age=300, must-revalidate');
  } else if (/\.html?$/i.test(pathname) || pathname === '/' || !pathname.includes('.')) {
    headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  }

  if (requestUrl.hostname.endsWith('.workers.dev')) {
    headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const bare = barePath(url.pathname);

    // One-hop normalize for published articles: /path → /path/
    // Then let Assets serve the directory index (200). Do not fetch …/index.html
    // under html_handling=auto-trailing-slash — that 307s back to /path/ forever.
    if (ARTICLE_PATHS.has(bare)) {
      if (!url.pathname.endsWith('/')) {
        url.pathname = `${bare}/`;
        const redirect = Response.redirect(url.toString(), 308);
        return withSecurityHeaders(redirect, url);
      }
    }

    // Locale homes (/en/, /de/) and extensionless marketing/legal paths
    // (/en/blog, /en/privacy, …) are served by Assets html_handling.
    const response = await env.ASSETS.fetch(request);
    return withSecurityHeaders(response, url);
  },
};
