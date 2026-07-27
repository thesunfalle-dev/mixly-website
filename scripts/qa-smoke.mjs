#!/usr/bin/env node
/**
 * Production/preview smoke QA for launch readiness (MIX-16).
 * Usage: node scripts/qa-smoke.mjs [origin]
 */

const origin = (process.argv[2] || 'https://get-mixly.app').replace(/\/$/, '');
const paths = [
  '/',
  '/en/',
  '/de/',
  '/blog.html',
  '/en/blog',
  '/de/blog',
  '/privacy.html',
  '/en/privacy',
  '/de/privacy',
  '/cookies.html',
  '/terms.html',
  '/eula.html',
  '/support.html',
  '/share.html?mix=test&preview=1',
  '/404-should-not-exist-mixly-qa',
  '/ru/blog/kak-pravilno-smeshivat-tabak-dlya-kalyana',
  '/en/blog/how-to-mix-hookah-tobacco',
  '/de/blog/wie-man-shisha-tabak-richtig-mischt',
  '/ru/blog/proportsii-tabaka-dlya-kalyana',
  '/en/blog/hookah-flavor-combinations',
  '/de/blog/shisha-tabak-mischverhaeltnisse',
  '/robots.txt',
  '/sitemap.xml',
];

const failures = [];

async function check(path) {
  const url = `${origin}${path}`;
  const started = Date.now();
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'MixlyQASmoke/1.0' },
      signal: AbortSignal.timeout(20_000),
    });
    const ms = Date.now() - started;
    const text = await response.text();
    const expect404 = path.includes('404-should-not-exist');
    const okStatus = expect404 ? response.status === 404 : response.status >= 200 && response.status < 400;
    if (!okStatus) failures.push(`${path}: unexpected status ${response.status}`);
    if (!expect404 && ms > 4000) failures.push(`${path}: slow response ${ms}ms`);
    if (path === '/sitemap.xml' && !text.includes('/en/blog/how-to-mix-hookah-tobacco')) {
      failures.push('sitemap missing localized article URL');
    }
    if (path === '/sitemap.xml' && !text.includes('https://get-mixly.app/en/')) {
      failures.push('sitemap missing locale-prefixed home URL');
    }
    if (path === '/' && !/html lang="ru"/.test(text)) {
      failures.push(`${path}: home must declare html lang=ru`);
    }
    if ((path === '/en/' || path === '/de/') && !/html lang="(en|de)"/.test(text)) {
      failures.push(`${path}: missing localized html lang`);
    }
    if ((path === '/en/' || path === '/de/') && /src="\.\/images_for_web\//.test(text)) {
      failures.push(`${path}: relative images_for_web paths will 404 under locale prefix`);
    }
    if (path === '/en/privacy' && !/<h1 id="legal-title">[^<]+<\/h1>/.test(text)) {
      failures.push('en privacy missing static H1');
    }
    if (path === '/en/privacy' && !/html lang="en"/.test(text)) {
      failures.push('en privacy must declare html lang=en');
    }
    if ((path.includes('/privacy') || path.includes('/terms') || path.includes('/cookies')
      || path.includes('/eula') || path.includes('/support') || path.includes('/share'))
      && !expect404) {
      if (!/name="robots" content="[^"]*noindex/i.test(text)) {
        failures.push(`${path}: expected noindex robots meta`);
      }
    }
    if (path.startsWith('/en/blog/') || path.startsWith('/ru/blog/') || path.startsWith('/de/blog/')) {
      if (!text.includes('BreadcrumbList')) failures.push(`${path}: missing BreadcrumbList JSON-LD`);
      if (!text.includes('class="article-related"')) failures.push(`${path}: missing related articles in HTML`);
      if (!text.includes('data-premium-block')) failures.push(`${path}: missing More Mixly block in HTML`);
      if (!/data-reading-minutes="\d+"/.test(text)) failures.push(`${path}: missing computed reading time`);
      if (!/rel="canonical"/.test(text) || !/hreflang="x-default"/.test(text)) {
        failures.push(`${path}: missing canonical/hreflang`);
      }
      if (/article\.html\?slug=/.test(text)) failures.push(`${path}: still links to query article URLs`);
    }
    if (path === '/blog.html' && /Скоро здесь появятся/.test(text)) {
      failures.push('blog lead still says articles are coming soon');
    }
    if (path === '/privacy.html' && !text.includes('legal-title')) {
      failures.push('privacy missing static legal title');
    }
    if (path === '/privacy.html' && !/Политика конфиденциальности/.test(text)) {
      failures.push('privacy RU title/content mismatch');
    }
    if (path === '/' && !text.includes('MobileApplication')) {
      failures.push('home missing MobileApplication schema');
    }
    if (path === '/sitemap.xml') {
      const locs = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
      for (const loc of locs) {
        if (/\/(privacy|terms|cookies|eula|support|share)(\.html)?$/i.test(loc) || /article\.html\?/.test(loc)) {
          failures.push(`sitemap must not include ${loc}`);
        }
      }
    }
    if (path === '/robots.txt' && !/Sitemap:\s*https:\/\/get-mixly\.app\/sitemap\.xml/i.test(text)) {
      failures.push('robots.txt must reference sitemap.xml');
    }
    const robots = response.headers.get('x-robots-tag') || '';
    if (origin.includes('workers.dev') && !/noindex/i.test(robots)) {
      failures.push(`${path}: preview missing X-Robots-Tag noindex`);
    }
    console.log(`${okStatus ? 'OK' : '!!'} ${response.status} ${String(ms).padStart(4)}ms  ${path}`);
  } catch (error) {
    failures.push(`${path}: ${error.message}`);
    console.log(`!! ERR  ${path}  ${error.message}`);
  }
}

for (const path of paths) {
  // sequential to avoid rate limits and keep logs readable
  // eslint-disable-next-line no-await-in-loop
  await check(path);
}

if (failures.length) {
  console.error(`\nQA smoke failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`\nQA smoke passed against ${origin} (${paths.length} routes).`);
