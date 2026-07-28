#!/usr/bin/env node
/**
 * Render changelog pages + home preview from changelog-content.js (MIX-54).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://get-mixly.app';

const context = {};
vm.runInNewContext(readFileSync(resolve(root, 'changelog-content.js'), 'utf8'), context, {
  filename: 'changelog-content.js',
});
const { CHANGELOG_META, RELEASES } = context;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function publicPath(locale) {
  if (locale === 'ru') return '/changelog';
  return `/${locale}/changelog`;
}

function publicUrl(locale) {
  return `${origin}${publicPath(locale)}`;
}

function homePath(locale) {
  return locale === 'ru' ? '/' : `/${locale}/`;
}

function blogPath(locale) {
  return locale === 'ru' ? '/blog.html' : `/${locale}/blog`;
}

function releaseListHtml(locale, { openFirst = true, permalinkBase = '' } = {}) {
  const meta = CHANGELOG_META[locale];
  return RELEASES.map((release, index) => {
    const labels = release.labels[locale];
    const items = release.items[locale];
    const open = openFirst && (release.open || index === 0) ? ' open' : '';
    const permalink = `${permalinkBase}#${release.id}`;
    const list = items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
    return `<details class="changelog-release" id="${escapeHtml(release.id)}"${open}>
            <summary>
              <span class="changelog-release-title"><strong>${escapeHtml(labels.version)}</strong><span>${escapeHtml(labels.summary)}</span></span>
              <time datetime="${escapeHtml(release.date)}">${escapeHtml(labels.date)}</time>
              <span class="changelog-toggle-icon" aria-hidden="true"></span>
            </summary>
            <div class="changelog-release-body">
              <ul>${list}</ul>
              <p class="changelog-permalink"><a href="${escapeHtml(permalink)}">${escapeHtml(meta.permalinkLabel)} ${escapeHtml(release.version)}</a></p>
            </div>
          </details>`;
  }).join('\n          ');
}

function homeListHtml(locale) {
  // Home keeps full list for parity, generated from the same source (no i18n keys).
  return releaseListHtml(locale, { openFirst: true, permalinkBase: publicPath(locale) });
}

function injectHomeList(html, locale) {
  const list = homeListHtml(locale);
  const cta = CHANGELOG_META[locale].homeCta;
  const path = publicPath(locale);
  const replacement = `<div class="changelog-list" data-i18n-aria="changelog.listAria" aria-label="${escapeHtml(CHANGELOG_META[locale].listAria)}">
          ${list}
        </div>
        <p class="changelog-page-link"><a href="${escapeHtml(path)}">${escapeHtml(cta)}</a></p>`;
  const next = html.replace(
    /<div class="changelog-list"[\s\S]*?<\/div>\s*(?:<p class="changelog-page-link">[\s\S]*?<\/p>\s*)?/,
    `${replacement}\n        `
  );
  if (next === html) {
    throw new Error(`Could not inject changelog list into home for locale ${locale}`);
  }
  return next;
}

function pageHtml(locale) {
  const meta = CHANGELOG_META[locale];
  const path = publicPath(locale);
  const url = publicUrl(locale);
  const lang = locale;
  const home = homePath(locale);
  const blog = blogPath(locale);
  const hreflang = [
    `<link rel="alternate" hreflang="ru" href="${publicUrl('ru')}">`,
    `<link rel="alternate" hreflang="en" href="${publicUrl('en')}">`,
    `<link rel="alternate" hreflang="de" href="${publicUrl('de')}">`,
    `<link rel="alternate" hreflang="x-default" href="${publicUrl('en')}">`,
  ].join('');
  const list = releaseListHtml(locale, { openFirst: true, permalinkBase: path });
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.pageTitle,
    url,
    description: meta.pageDescription,
    isPartOf: { '@id': `${origin}/#website` },
    about: { '@id': `${origin}/#app` },
  };

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(meta.pageDescription)}" />
    <meta name="theme-color" content="#29282B" />
    <link rel="canonical" href="${url}" />${hreflang}
    <meta property="og:title" content="${escapeHtml(meta.pageTitle)}" />
    <meta property="og:description" content="${escapeHtml(meta.pageDescription)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${origin}/assets/mixly-app-icon.png" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(meta.pageTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.pageDescription)}" />
    <title>${escapeHtml(meta.pageTitle)}</title>
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
    <style>html { background: #29282b; }</style>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
    <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
    <link rel="stylesheet" href="/styles.css" /><link rel="expect" href="#content">
    <link rel="preload" href="/assets/Montserrat_400Regular.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/assets/Montserrat_600SemiBold.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/assets/Montserrat_700Bold.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/i18n.js" as="script" fetchpriority="high" />
    <script>
      try {
        if ('scrollRestoration' in history) history.scrollRestoration = 'auto';
      } catch (_) {}
    </script>
    <script src="/monitoring.js" defer></script>
    <script src="/page-nav.js" defer></script>
    <script src="/analytics.js" defer></script>
  </head>
  <body>
    <div class="grain" aria-hidden="true"></div>
    <header class="site-header">
      <a class="brand brand-app" href="${home}" data-i18n-aria="brand.homeAria" aria-label="Mixly">mixly</a>
      <nav data-i18n-aria="nav.mainAria" aria-label="Main">
        <a href="${home}#how-it-works" data-i18n="nav.about">About</a>
        <a href="${home}#features" data-i18n="nav.features">Features</a>
        <a href="${path}" aria-current="page" data-i18n="nav.updates">Updates</a>
        <a href="${blog}" data-i18n="nav.blog">Blog</a>
      </nav>
      <div class="header-actions">
        <a class="header-cta" href="https://apps.apple.com/app/id6762792005" rel="noopener"><span class="cta-full" data-i18n="nav.download">App Store</span><span class="cta-short" data-i18n="nav.downloadShort">App Store</span></a>
        <div class="lang-switch" data-lang-switch>
          <button type="button" class="lang-switch-toggle" aria-expanded="false" data-i18n-aria="lang.label" aria-label="Language">RU</button>
          <ul class="lang-switch-menu" hidden role="radiogroup" data-i18n-aria="lang.label" aria-label="Language">
            <li><button type="button" data-lang="ru" role="radio" aria-checked="false">RU</button></li>
            <li><button type="button" data-lang="en" role="radio" aria-checked="false">EN</button></li>
            <li><button type="button" data-lang="de" role="radio" aria-checked="false">DE</button></li>
          </ul>
        </div>
        <button class="mobile-menu-toggle" type="button" data-i18n-aria="nav.menuOpen" aria-controls="mobile-menu" aria-expanded="false" data-mobile-menu-open aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
    <aside class="mobile-menu" id="mobile-menu" data-i18n-aria="nav.menuAria" aria-hidden="true" aria-label="Menu">
      <nav data-i18n-aria="nav.mobileAria" aria-label="Mobile">
        <a href="${home}#how-it-works" data-i18n="nav.about">About</a>
        <a href="${home}#features" data-i18n="nav.features">Features</a>
        <a href="${path}" aria-current="page" data-i18n="nav.updates">Updates</a>
        <a href="${blog}" data-i18n="nav.blog">Blog</a>
      </nav>
    </aside>
    <main class="blog-page changelog-page" id="content">
      <section class="blog-page-hero" aria-labelledby="changelog-page-title">
        <p class="eyebrow">${escapeHtml(meta.eyebrow)}</p>
        <h1 id="changelog-page-title">${escapeHtml(meta.title)}</h1>
        <p>${escapeHtml(meta.lead)}</p>
      </section>
      <section class="changelog section" aria-label="${escapeHtml(meta.listAria)}">
        <div class="changelog-list">
          ${list}
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <div class="footer-main">
        <div class="footer-brand-block"><a class="brand-app footer-brand" href="${home}">mixly</a><p>Mixly app © 2026</p></div>
        <div class="footer-links">
          <div><p data-i18n="footer.app">App</p><a href="${home}#how-it-works" data-i18n="nav.about">About</a><a href="${home}#features" data-i18n="nav.features">Features</a><a href="${path}" data-i18n="nav.updates">Updates</a><a href="${blog}" data-i18n="nav.blog">Blog</a><a href="https://apps.apple.com/app/id6762792005" rel="noopener">App Store</a></div>
          <div><p data-i18n="footer.docs">Docs</p><a href="${locale === 'ru' ? '/privacy.html' : `/${locale}/privacy`}" data-i18n="footer.privacy">Privacy</a><a href="${locale === 'ru' ? '/cookies.html' : `/${locale}/cookies`}" data-i18n="footer.cookies">Cookies</a><a href="${locale === 'ru' ? '/terms.html' : `/${locale}/terms`}" data-i18n="footer.terms">Terms</a><a href="${locale === 'ru' ? '/eula.html' : `/${locale}/eula`}" data-i18n="footer.eula">EULA</a><a href="${locale === 'ru' ? '/support.html' : `/${locale}/support`}" data-i18n="footer.support">Support</a></div>
        </div>
      </div>
    </footer>
    <script src="/i18n.js" defer></script>
    <script src="/scroll-nav.js" defer></script>
  </body>
</html>
`;
}

// 1) Update root index home list (RU static first-paint)
let indexHtml = readFileSync(resolve(root, 'index.html'), 'utf8');
indexHtml = injectHomeList(indexHtml, 'ru');
writeFileSync(resolve(root, 'index.html'), indexHtml);
console.log('updated index.html changelog list');

// 2) Write RU / EN / DE changelog pages
writeFileSync(resolve(root, 'changelog.html'), pageHtml('ru'));
console.log('wrote changelog.html');

for (const locale of ['en', 'de']) {
  mkdirSync(resolve(root, locale), { recursive: true });
  writeFileSync(resolve(root, locale, 'changelog.html'), pageHtml(locale));
  console.log(`wrote ${locale}/changelog.html`);
}

// 3) Patch en/de home if present (after locale routes may regenerate them)
for (const locale of ['en', 'de']) {
  const path = resolve(root, locale, 'index.html');
  try {
    let html = readFileSync(path, 'utf8');
    html = injectHomeList(html, locale);
    writeFileSync(path, html);
    console.log(`updated ${locale}/index.html changelog list`);
  } catch {
    // regenerated later by generate:locale-routes + re-run
  }
}
