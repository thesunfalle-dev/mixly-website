const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data:; script-src 'self' 'unsafe-inline' https://browser.sentry-cdn.com https://us.i.posthog.com https://us-assets.i.posthog.com; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' https://browser.sentry-cdn.com https://o4511777909374976.ingest.de.sentry.io https://us.i.posthog.com; object-src 'none'; upgrade-insecure-requests",
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=(), payment=()',
};

// html_handling is "none" so Assets never issues pretty-URL redirects that loop
// through this worker. Map public URLs → real asset files here instead.
const STATIC_REWRITES = {
  '/': '/index.html',
  '/en': '/en/index.html',
  '/en/': '/en/index.html',
  '/de': '/de/index.html',
  '/de/': '/de/index.html',
  '/blog': '/blog.html',
  '/blog/': '/blog.html',
  '/en/blog': '/en/blog.html',
  '/en/blog/': '/en/blog.html',
  '/de/blog': '/de/blog.html',
  '/de/blog/': '/de/blog.html',
  '/privacy': '/privacy.html',
  '/privacy/': '/privacy.html',
  '/en/privacy': '/en/privacy.html',
  '/en/privacy/': '/en/privacy.html',
  '/de/privacy': '/de/privacy.html',
  '/de/privacy/': '/de/privacy.html',
  '/cookies': '/cookies.html',
  '/cookies/': '/cookies.html',
  '/en/cookies': '/en/cookies.html',
  '/en/cookies/': '/en/cookies.html',
  '/de/cookies': '/de/cookies.html',
  '/de/cookies/': '/de/cookies.html',
  '/terms': '/terms.html',
  '/terms/': '/terms.html',
  '/en/terms': '/en/terms.html',
  '/en/terms/': '/en/terms.html',
  '/de/terms': '/de/terms.html',
  '/de/terms/': '/de/terms.html',
  '/eula': '/eula.html',
  '/eula/': '/eula.html',
  '/en/eula': '/en/eula.html',
  '/en/eula/': '/en/eula.html',
  '/de/eula': '/de/eula.html',
  '/de/eula/': '/de/eula.html',
  '/support': '/support.html',
  '/support/': '/support.html',
  '/en/support': '/en/support.html',
  '/en/support/': '/en/support.html',
  '/de/support': '/de/support.html',
  '/de/support/': '/de/support.html',
  '/share': '/share.html',
  '/share/': '/share.html',
};

const ARTICLE_REWRITES = {
  '/ru/blog/kak-pravilno-smeshivat-tabak-dlya-kalyana':
    '/ru/blog/kak-pravilno-smeshivat-tabak-dlya-kalyana/index.html',
  '/en/blog/how-to-mix-hookah-tobacco': '/en/blog/how-to-mix-hookah-tobacco/index.html',
  '/de/blog/wie-man-shisha-tabak-richtig-mischt':
    '/de/blog/wie-man-shisha-tabak-richtig-mischt/index.html',
  '/ru/blog/sochetaniya-vkusov-dlya-kalyana': '/ru/blog/sochetaniya-vkusov-dlya-kalyana/index.html',
  '/en/blog/hookah-flavor-combinations': '/en/blog/hookah-flavor-combinations/index.html',
  '/de/blog/shisha-geschmackskombinationen': '/de/blog/shisha-geschmackskombinationen/index.html',
  '/ru/blog/miksy-dlya-kalyana-dlya-nachinayushchih':
    '/ru/blog/miksy-dlya-kalyana-dlya-nachinayushchih/index.html',
  '/en/blog/beginner-hookah-mix-recipes': '/en/blog/beginner-hookah-mix-recipes/index.html',
  '/de/blog/shisha-mischungen-fuer-einsteiger':
    '/de/blog/shisha-mischungen-fuer-einsteiger/index.html',
};

// Permanent redirects for retired article slugs (keep indefinitely for SEO).
const ARTICLE_REDIRECTS = {
  '/ru/blog/proportsii-tabaka-dlya-kalyana': '/ru/blog/miksy-dlya-kalyana-dlya-nachinayushchih',
  '/en/blog/hookah-tobacco-mixing-ratios': '/en/blog/beginner-hookah-mix-recipes',
  '/de/blog/shisha-tabak-mischverhaeltnisse': '/de/blog/shisha-mischungen-fuer-einsteiger',
};

function barePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

function resolveAssetPath(pathname) {
  if (STATIC_REWRITES[pathname]) return STATIC_REWRITES[pathname];
  const bare = barePath(pathname);
  if (STATIC_REWRITES[bare]) return STATIC_REWRITES[bare];
  if (ARTICLE_REWRITES[bare]) return ARTICLE_REWRITES[bare];
  if (pathname.endsWith('/') && ARTICLE_REWRITES[barePath(pathname)]) {
    return ARTICLE_REWRITES[barePath(pathname)];
  }
  return null;
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
    const redirectTo = ARTICLE_REDIRECTS[bare];
    if (redirectTo && redirectTo !== bare) {
      const target = new URL(redirectTo, url);
      target.search = url.search;
      return withSecurityHeaders(Response.redirect(target.toString(), 301), url);
    }
    const assetPath = resolveAssetPath(url.pathname);
    const assetRequest = assetPath
      ? new Request(new URL(assetPath, url), request)
      : request;

    const response = await env.ASSETS.fetch(assetRequest);
    return withSecurityHeaders(response, url);
  },
};
