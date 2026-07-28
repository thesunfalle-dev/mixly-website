#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicOrigin = 'https://get-mixly.app';
const errors = [];
const checkExternal = process.argv.includes('--external');
const externalUrls = new Set();

function listHtmlFiles(directory, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relative = `${prefix}${entry.name}`;
    if (entry.isDirectory() && !['node_modules', '.git'].includes(entry.name)) {
      return listHtmlFiles(resolve(directory, entry.name), `${relative}/`);
    }
    return entry.isFile() && extname(entry.name) === '.html' ? [relative] : [];
  });
}
const files = listHtmlFiles(root).sort();
const pages = new Map(files.map((file) => [file, readFileSync(resolve(root, file), 'utf8')]));

const i18nSource = readFileSync(resolve(root, 'i18n.js'), 'utf8');
const pageNavSource = readFileSync(resolve(root, 'page-nav.js'), 'utf8');
const stylesSource = readFileSync(resolve(root, 'styles.css'), 'utf8');
const dictionaryContext = {
  window: {},
  document: {
    readyState: 'loading',
    addEventListener() {},
  },
};
vm.runInNewContext(i18nSource, dictionaryContext, {
  filename: 'i18n.js',
});
const dictionaries = dictionaryContext.STRINGS;
const shotBlock = i18nSource.match(/var SHOT_FILES = \{([\s\S]*?)\n  \};/)?.[1] ?? '';
const shotFiles = Object.fromEntries(
  [...shotBlock.matchAll(/'([^']+)': '([^']+)'/g)]
    .map((match) => [match[1], match[2]]),
);
const publishedBlogCards = {
  ru: '/ru/blog/kak-pravilno-smeshivat-tabak-dlya-kalyana',
  en: '/en/blog/how-to-mix-hookah-tobacco',
  de: '/de/blog/wie-man-shisha-tabak-richtig-mischt',
};

function report(file, message) {
  errors.push(`${file}: ${message}`);
}

if (/sessionStorage/.test(pageNavSource)) {
  report('page-nav.js', 'navigation must not persist transition state between pages');
}
if (!/resetUiState/.test(pageNavSource) || !/closeMobileMenu/.test(pageNavSource)) {
  report('page-nav.js', 'must expose fail-open UI reset that closes the mobile menu');
}

const legalRuntime = readFileSync(resolve(root, 'legal.js'), 'utf8');
if (/bodyEl\.textContent\s*=\s*['"]['"]/.test(legalRuntime) && !/replaceWith/.test(legalRuntime)) {
  report('legal.js', 'must not clear legal body before a successful rebuild (keep static HTML fail-open)');
}
if (!/enhanceExistingStatic|lang !== 'ru'/.test(legalRuntime)) {
  report('legal.js', 'must keep static RU legal markup when locale is Russian');
}
if (!/\.app-shot[^{]*\{[^}]*background:\s*#343436/.test(stylesSource) && !/app-shot[^{]*background:\s*#343436/.test(stylesSource)) {
  report('styles.css', 'app screenshots must use a neutral surface background, not pure black');
}
if (!/FETCH_TIMEOUT_MS|AbortController/.test(pageNavSource)) {
  report('page-nav.js', 'must time out stuck SPA fetches and fall back to hard navigation');
}
if (!/mobile-menu-open/.test(pageNavSource) || !/unlockScroll|overflow/.test(pageNavSource)) {
  report('page-nav.js', 'must clear mobile-menu scroll lock before and after navigation');
}
if (/landing-rise|phones-arrive|visual-arrive|cta-arrive/.test(stylesSource)) {
  report('styles.css', 'first-paint entrance animations must not restart content after navigation');
}
if (!/@view-transition\s*\{\s*navigation:\s*auto;/.test(stylesSource)) {
  report('styles.css', 'same-origin documents must opt in to native view transitions');
}

function localFileFor(url) {
  const path = decodeURIComponent(url.pathname);
  if (path === '/') return 'index.html';
  if (path === '/en' || path === '/en/') return 'en/index.html';
  if (path === '/de' || path === '/de/') return 'de/index.html';
  if (path === '/ru' || path === '/ru/') return 'index.html';
  // Assets html_handling serves /en/blog from en/blog.html
  const extensionless = path.match(/^\/(en|de)\/(blog|privacy|cookies|terms|eula|support)$/);
  if (extensionless) return `${extensionless[1]}/${extensionless[2]}.html`;
  const relative = path.replace(/^\//, '');
  if (relative.endsWith('/')) return `${relative}index.html`;
  return relative;
}

for (const [locale, path] of Object.entries(publishedBlogCards)) {
  if (dictionaries[locale]['blog.card.first.href'] !== path) {
    report('i18n.js', `published ${locale} blog-card URL is incorrect`);
  }
  const targetFile = `${path.slice(1)}/index.html`;
  const target = pages.get(targetFile);
  if (!target) {
    report('i18n.js', `published ${locale} blog-card URL has no local page: ${path}`);
  } else if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(target)) {
    report('i18n.js', `published ${locale} blog-card URL is not indexable: ${path}`);
  }
  if (checkExternal) externalUrls.add(`${publicOrigin}${path}`);
}

for (const [locale, entries] of Object.entries(dictionaries)) {
  for (const [key, value] of Object.entries(entries)) {
    if (typeof value !== 'string' || !value.trim()) report('i18n.js', `empty ${locale} translation: ${key}`);
    if (locale !== 'ru' && /[А-Яа-яЁё]/.test(value)) {
      report('i18n.js', `Cyrillic text in ${locale} translation: ${key}`);
    }
  }
}

function idsIn(source) {
  return new Set([...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
}

for (const file of ['privacy.html', 'cookies.html', 'terms.html', 'eula.html', 'support.html']) {
  const source = pages.get(file);
  if (!/<h1 id="legal-title">\s*[^<\s][\s\S]*?<\/h1>/.test(source)) {
    report(file, 'static legal fallback is missing its H1');
  }
  const body = source.match(/<div class="legal-body" id="legal-body">([\s\S]*?)<\/div>/)?.[1] ?? '';
  if (!/<section id="[^"]+" class="legal-section">/.test(body)) {
    report(file, 'static legal fallback is missing document sections');
  }
  if (!/<aside class="legal-toc" id="legal-toc"[\s\S]*?<a href="#[^"]+">/.test(source)) {
    report(file, 'static legal fallback is missing table-of-contents anchors');
  }
}

for (const [file, source] of pages) {
  // Utility handoff pages stay out of the marketing shell / view-transition contract.
  if (file !== 'share.html' && !source.includes('<link rel="expect" href="#content">')) {
    report(file, 'must identify its main content for a consistent navigation snapshot');
  }
  if (/\bi18n-pending\b/.test(source)) {
    report(file, 'must not hide the document while localization initializes');
  }
  if (/sessionStorage\.getItem\(['"]mixly-page-veil['"]\)/.test(source)) {
    report(file, 'must not restore the retired page-veil transition');
  }

  const translationKeys = [
    ...source.matchAll(/\bdata-i18n(?:-(?:aria|alt|href))?="([^"]+)"/g),
  ].map((match) => match[1]);

  for (const key of translationKeys) {
    for (const locale of ['ru', 'en', 'de']) {
      if (!(key in dictionaries[locale])) report(file, `missing ${locale} translation key: ${key}`);
    }
  }

  const links = [...source.matchAll(/<[^>]+\s(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const link of links) {
    if (/^https?:\/\//.test(link)) {
      if (!link.startsWith('https://')) report(file, `external link must use HTTPS: ${link}`);
      else externalUrls.add(link);
      continue;
    }
    if (/^\/\//.test(link) || /^(?:data|mailto|tel|javascript):/i.test(link)) continue;

    const target = new URL(link, `${publicOrigin}/${file}`);
    let targetFile = localFileFor(target);
    if (!pages.has(targetFile) && pages.has(`${targetFile}/index.html`)) targetFile = `${targetFile}/index.html`;
    if (!pages.has(targetFile) && !existsSync(resolve(root, targetFile))) {
      report(file, `local link does not exist: ${link}`);
      continue;
    }

    if (target.hash && pages.has(targetFile)) {
      const targetIds = idsIn(pages.get(targetFile));
      if (!targetIds.has(target.hash.slice(1))) report(file, `anchor does not exist: ${link}`);
    }
  }

  for (const key of [...source.matchAll(/\bdata-i18n-src="([^"]+)"/g)].map((match) => match[1])) {
    const image = shotFiles[key];
    if (!image) {
      report(file, `unknown localized image key: ${key}`);
      continue;
    }
    for (const locale of ['RU', 'EN', 'DE']) {
      if (!existsSync(resolve(root, 'images_for_web', locale, image))) {
        report(file, `missing localized image: ${locale}/${image}`);
      }
    }
  }

  const noindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(source);
  if (!noindex) {
    const canonical = source.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
    if (!canonical) report(file, 'missing canonical URL');
    else {
      let expectedPath =
        file === 'index.html'
          ? ''
          : file === 'en/index.html'
            ? 'en/'
            : file === 'de/index.html'
              ? 'de/'
              : file.endsWith('/index.html')
                ? file.slice(0, -'/index.html'.length)
                : file;
      // Locale marketing/legal files are published extensionless via Assets html_handling.
      expectedPath = expectedPath.replace(/^(en|de)\/(blog|privacy|cookies|terms|eula|support)\.html$/, '$1/$2');
      if (canonical !== `${publicOrigin}/${expectedPath}`) {
        report(file, `canonical does not match its public URL: ${canonical}`);
      }
    }
  }
}

for (const file of ['403.html', '404.html', '500.html', 'article.html', 'blog.html', 'cookies.html', 'eula.html', 'index.html', 'privacy.html', 'support.html', 'terms.html']) {
  const source = pages.get(file);
  if (source.includes('<script src="./i18n.js" defer') || source.includes('<script src="/i18n.js" defer')) {
    report(file, 'localization must run before the first visible frame, not as a deferred script');
  }
  const preloadsI18n = source.includes('<link rel="preload" href="/i18n.js" as="script"') || source.includes('<link rel="preload" href="./i18n.js" as="script"');
  const runsI18n = source.includes('<script src="/i18n.js"></script>') || source.includes('<script src="./i18n.js"></script>');
  if (!preloadsI18n || !runsI18n) {
    report(file, 'must preload and run localization at the end of the parsed document');
  }
  // Prefer root-absolute i18n URLs so SPA locale prefixes never break the script.
  if (source.includes('href="./i18n.js"') || source.includes('src="./i18n.js"')) {
    report(file, 'i18n script URLs must be root-absolute (/i18n.js)');
  }
}

for (const file of ['403.html', '404.html', '500.html', 'article.html', 'blog.html', 'cookies.html', 'eula.html', 'index.html', 'privacy.html', 'support.html', 'terms.html']) {
  const source = pages.get(file);
  if (!source.startsWith('<!doctype html>\n<html lang="ru">')) {
    report(file, 'default first-paint markup must match the Russian fallback locale');
  }
}

const homePage = pages.get('index.html');
if (!homePage.includes('window.__mixlySetLocalizedImage')) {
  report('index.html', 'localized images must be assigned before the deferred i18n runtime');
}
if (!/src="\/images_for_web\/RU\/main_[12]\.webp"/.test(homePage)) {
  report('index.html', 'Russian first-paint markup must include Russian hero screenshots');
}
if (/src="\.\/images_for_web\//.test(homePage) || homePage.includes('./images_for_web/')) {
  report('index.html', 'shot image paths must be root-absolute so /en/ and /de/ do not 404');
}
if (readFileSync(resolve(root, 'i18n.js'), 'utf8').includes("'./images_for_web/'") || readFileSync(resolve(root, 'i18n.js'), 'utf8').includes('"./images_for_web/"')) {
  report('i18n.js', 'shotSrc must use root-absolute /images_for_web/ paths');
}
if (readFileSync(resolve(root, 'page-nav.js'), 'utf8').includes('Function(script.textContent)')) {
  report('page-nav.js', 'SPA inline script runner must not use Function()/eval under CSP');
}
if (!i18nSource.includes('bindSwitchers: bindSwitchers') && !i18nSource.includes('bindSwitchers:bindSwitchers')) {
  report('i18n.js', 'must export bindSwitchers for SPA rebind after body swap');
}
if (!pageNavSource.includes('bindSwitchers')) {
  report('page-nav.js', 'SPA swap must rebind language switchers after body replace');
}

for (const file of ['index.html', 'blog.html']) {
  const source = pages.get(file);
  if (/article\.html\?slug=(?:base|brands|practice)/.test(source)) {
    report(file, 'public blog cards must not link to unpublished article templates');
  }
  if (!/data-i18n-href="blog\.card\.first\.href"/.test(source)) {
    report(file, 'published article card must use a localized URL');
  }
}

// URL is the source of truth: unprefixed routes are RU, never localStorage-first.
if (!/return 'ru'/.test(i18nSource) || !/Unprefixed public routes are the RU locale/.test(i18nSource)) {
  report('i18n.js', 'localeFromPath must treat unprefixed public routes as RU (URL over localStorage)');
}
if (/function detectLocale\(\) \{[\s\S]*?localStorage\.getItem\(STORAGE_KEY\)/.test(i18nSource)
  && !/function preferredLocale\(\)/.test(i18nSource)) {
  report('i18n.js', 'detectLocale must not prefer localStorage over the open URL');
}

const blogLeadForbidden = [
  'Скоро здесь появятся',
  'Coming soon',
  'are coming soon',
  'Bald erscheinen',
];
for (const file of ['blog.html', 'en/blog.html', 'de/blog.html']) {
  const source = pages.get(file) || '';
  for (const phrase of blogLeadForbidden) {
    if (source.includes(phrase)) report(file, `blog lead still looks empty/upcoming: ${phrase}`);
  }
  if (!/data-i18n="blog\.page\.lead"/.test(source)) {
    report(file, 'blog page must keep a localized lead paragraph');
  }
}
if ((dictionaries.ru['blog.page.lead'] || '').includes('Скоро')) {
  report('i18n.js', 'RU blog.page.lead must not imply the blog is empty');
}

for (const file of files.filter((file) => /^(ru|en|de)\/blog\//.test(file))) {
  const source = pages.get(file);
  if (!source.includes('/article-toc.js')) report(file, 'localized article must load the shared article runtime');
  if (!source.includes('/page-nav.js')) report(file, 'localized article must keep internal navigation in the current document');
  if (!source.includes('/static-article-shell.js')) report(file, 'localized article must load the shared shell before first paint');
  if (!source.includes('data-shell-static="true"')) report(file, 'localized article must include the shared header before scripts run');
  if (!source.includes('class="article-related"')) report(file, 'localized article must include related articles before scripts run');
  if (!source.includes('class="footer-main"')) report(file, 'localized article must include the full footer before scripts run');
  if (!source.includes('data-premium-block')) {
    report(file, 'article must include More Mixly promo in initial HTML');
  }
  if (!source.includes('data-reading-minutes=')) {
    report(file, 'article meta must expose build-time reading minutes derived from body text');
  } else {
    const minutes = Number(source.match(/data-reading-minutes="(\d+)"/)?.[1] || 0);
    const words = Number(source.match(/data-reading-words="(\d+)"/)?.[1] || 0);
    const bodyMatch = source.match(/class="article-page-content">([\s\S]*?)<\/div>\s*<section class="article-related"/);
    if (!bodyMatch) {
      report(file, 'could not isolate article body for reading-time verification');
    } else {
      const text = bodyMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const counted = text.split(/\s+/).filter(Boolean).length;
      if (Math.abs(counted - words) > 2) {
        report(file, `reading-time word count mismatch (stored ${words}, body ${counted})`);
      }
      const lang = file.slice(0, 2);
      const wpm = lang === 'en' ? 210 : 190;
      const expected = Math.max(1, Math.round(counted / wpm));
      if (minutes !== expected) {
        report(file, `reading minutes ${minutes} do not match body word count (${counted} words → ${expected} min)`);
      }
    }
  }
  // Related cards must stay in the same locale and never include the current path.
  const selfPath = `/${file.replace(/\/index\.html$/, '')}`;
  const relatedBlock = source.match(/class="article-related"[\s\S]*?<\/section>/)?.[0] || '';
  if (relatedBlock.includes(selfPath)) {
    report(file, 'related articles must not include the current article');
  }
  if (/article\.html\?slug=/.test(relatedBlock)) {
    report(file, 'related articles must not use query-based article URLs');
  }
  const lang = file.slice(0, 2);
  const wrongLocale = lang === 'ru' ? /href="\/(?:en|de)\// : lang === 'en' ? /href="\/(?:ru|de)\// : /href="\/(?:ru|en)\//;
  if (wrongLocale.test(relatedBlock)) {
    report(file, 'related articles must not mix locales');
  }
}
if (!existsSync(resolve(root, 'static-article-shell.js'))) report('static-article-shell.js', 'shared static article shell is missing');
if (!readFileSync(resolve(root, 'static-article-shell.js'), 'utf8').includes('window.MixlyArticleShell')) {
  report('static-article-shell.js', 'shared article shell must be callable after an in-document navigation');
}
if (!readFileSync(resolve(root, 'article-toc.js'), 'utf8').includes('window.MixlyArticleToc')) {
  report('article-toc.js', 'article table of contents must be callable after an in-document navigation');
}
if (!pageNavSource.includes('preparePageRuntime') || !pageNavSource.includes('mountPageRuntime')) {
  report('page-nav.js', 'in-document navigation must load and mount article and legal enhancements');
}
if (!pageNavSource.includes('legal.js') || !pageNavSource.includes('scroll-nav.js')) {
  report('page-nav.js', 'SPA navigation to legal pages must load legal + scroll-nav runtimes');
}
const workerSource = readFileSync(resolve(root, 'worker.js'), 'utf8');
const wranglerSource = readFileSync(resolve(root, 'wrangler.jsonc'), 'utf8');
if (!workerSource.includes('ARTICLE_REWRITES') || !workerSource.includes('STATIC_REWRITES')) {
  report('worker.js', 'must explicitly rewrite marketing and article paths when html_handling is none');
}
if (!/"html_handling"\s*:\s*"none"/.test(wranglerSource)) {
  report('wrangler.jsonc', 'html_handling must be none to avoid Assets trailing-slash redirect loops');
}
if (!existsSync(resolve(root, 'premium-block.js'))) report('premium-block.js', 'shared More Mixly component is missing');
if (!pages.get('index.html').includes('data-premium-block')) {
  report('index.html', 'home page must mount the shared More Mixly component');
}
if (!pages.get('article.html').includes('/premium-block.js')) {
  report('article.html', 'article template must load the shared More Mixly component');
}
if (!readFileSync(resolve(root, 'static-article-shell.js'), 'utf8').includes("import('/premium-block.js')")) {
  report('static-article-shell.js', 'published articles must load the shared More Mixly component');
}

if (checkExternal) {
  for (const url of externalUrls) {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
        signal: AbortSignal.timeout(10_000),
      });
      if (response.ok) continue;

      if (response.status === 405 || response.status === 403) {
        const fallback = await fetch(url, {
          method: 'GET',
          redirect: 'follow',
          signal: AbortSignal.timeout(10_000),
        });
        if (fallback.ok) continue;
        report('external', `${url} returned HTTP ${fallback.status}`);
        continue;
      }

      report('external', `${url} returned HTTP ${response.status}`);
    } catch (error) {
      report('external', `${url} could not be checked: ${error.message}`);
    }
  }
}

const sitemap = readFileSync(resolve(root, 'sitemap.xml'), 'utf8');
for (const location of [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])) {
  if (!location.startsWith(`${publicOrigin}/`)) {
    report('sitemap.xml', `URL uses an unexpected origin: ${location}`);
    continue;
  }
  let targetFile = localFileFor(new URL(location));
  if (!pages.has(targetFile) && pages.has(`${targetFile}/index.html`)) targetFile = `${targetFile}/index.html`;
  if (!pages.has(targetFile)) report('sitemap.xml', `URL does not point to a page: ${location}`);
  if ([
    'article.html',
    '403.html',
    '404.html',
    '500.html',
    'share.html',
    'privacy.html',
    'cookies.html',
    'terms.html',
    'eula.html',
    'support.html',
  ].includes(targetFile)) {
    report('sitemap.xml', `non-indexable page is included: ${location}`);
  }
}

const sharePage = pages.get('share.html');
if (!sharePage) {
  report('share.html', 'smart-link handoff page is missing');
} else {
  if (!/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(sharePage)) {
    report('share.html', 'must be noindex (utility handoff page)');
  }
  if (!/mixly:\/\/mix\//.test(sharePage) || !/mixly:\/\/lab\?data=/.test(sharePage)) {
    report('share.html', 'must build mix and lab deep links');
  }
  if (!/id6762792005/.test(sharePage) || !/com\.vladyarmakovich\.mixly/.test(sharePage)) {
    report('share.html', 'must include App Store and Play Store fallbacks');
  }
  if (!/preview/.test(sharePage)) {
    report('share.html', 'must support preview=1 to skip auto-redirect');
  }
}

const home = pages.get('index.html') || '';
if (!/"@type":\s*"Organization"/.test(home) || !/"@type":\s*"WebSite"/.test(home)) {
  report('index.html', 'home JSON-LD must include Organization and WebSite entities');
}
if (!/"@type":\s*"MobileApplication"/.test(home) || !/downloadUrl/.test(home)) {
  report('index.html', 'home JSON-LD must describe the Mixly MobileApplication with downloadUrl');
}

const blog = pages.get('blog.html') || '';
if (!/property="og:title"/.test(blog) || !/twitter:card/.test(blog)) {
  report('blog.html', 'blog index must include Open Graph and Twitter metadata');
}

const localizedArticles = [...pages.keys()].filter((file) => /^(?:ru|en|de)\/blog\/.+\/index\.html$/.test(file));
if (localizedArticles.length < 9) {
  report('articles', `expected 9 localized article pages, found ${localizedArticles.length}`);
}
for (const file of localizedArticles) {
  const source = pages.get(file);
  if (!source.includes('hreflang="ru"') || !source.includes('hreflang="en"') || !source.includes('hreflang="de"') || !source.includes('hreflang="x-default"')) {
    report(file, 'localized article must expose full hreflang set including x-default');
  }
  if (!/property="og:title"/.test(source) || !/property="og:image"/.test(source)) {
    report(file, 'localized article must include Open Graph title and image');
  }
  if (!/"@type":"Article"/.test(source) || !/"@type":"BreadcrumbList"/.test(source)) {
    report(file, 'localized article must include Article and BreadcrumbList JSON-LD');
  }
  if (!/class="breadcrumbs"/.test(source)) {
    report(file, 'localized article must include visible breadcrumb navigation');
  }
  if (/<!doctype html>\s*<script/i.test(source)) {
    report(file, 'scripts must not appear before the root <html> element');
  }
  if (/assets\/blog\/kak-pravilno-smeshivat-tabak-[^"']+\.png/.test(source)) {
    report(file, 'article cluster images must use optimized WebP assets, not multi‑MB PNG');
  }
}

for (const name of [
  'assets/blog/kak-pravilno-smeshivat-tabak-hero.webp',
  'assets/blog/how-to-mix-pairings.webp',
  'assets/blog/how-to-mix-proportions.webp',
]) {
  if (!existsSync(resolve(root, name))) report(name, 'optimized WebP asset is missing');
}

if (!/Cache-Control/.test(readFileSync(resolve(root, 'worker.js'), 'utf8'))) {
  report('worker.js', 'must set Cache-Control for static assets and HTML');
}

if (errors.length) {
  console.error(`Site checks failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Site checks passed: ${files.length} HTML pages, 3 locales, sitemap and local links${checkExternal ? ', plus external URLs' : ''}.`);
