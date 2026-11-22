#!/usr/bin/env node
/**
 * Render changelog pages + home preview from changelog-content.js (MIX-54).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CHANGELOG_META, escapeHtml, injectHomeList, publicPath, releaseListHtml } from './changelog-render.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://get-mixly.app';

function publicUrl(locale) {
  return `${origin}${publicPath(locale)}`;
}

function homePath(locale) {
  return locale === 'ru' ? '/' : `/${locale}/`;
}

function blogPath(locale) {
  return locale === 'ru' ? '/blog' : `/${locale}/blog`;
}

const BREADCRUMB_COPY = {
  ru: { home: 'Главная', aria: 'Хлебные крошки' },
  en: { home: 'Home', aria: 'Breadcrumbs' },
  de: { home: 'Start', aria: 'Brotkrumen' },
};

function pageHtml(locale) {
  const meta = CHANGELOG_META[locale];
  const path = publicPath(locale);
  const url = publicUrl(locale);
  const lang = locale;
  const home = homePath(locale);
  const blog = blogPath(locale);
  const contactLabel = locale === 'ru' ? 'Контакты' : locale === 'de' ? 'Kontakt' : 'Contact';
  const crumbs = BREADCRUMB_COPY[locale] || BREADCRUMB_COPY.en;
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
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: crumbs.home, item: `${origin}${home}` },
      { '@type': 'ListItem', position: 2, name: meta.title, item: url },
    ],
  };
  const breadcrumbs = `<nav class="breadcrumbs" aria-label="${escapeHtml(crumbs.aria)}"><ol><li><a href="${home}">${escapeHtml(crumbs.home)}</a></li><li aria-current="page">${escapeHtml(meta.title)}</li></ol></nav>`;

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
    <script type="application/ld+json">${JSON.stringify(breadcrumbLd)}</script>
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
      ${breadcrumbs}
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
          <div><p data-i18n="footer.contacts">${contactLabel}</p><a href="mailto:support@get-mixly.app">support@get-mixly.app</a><a href="https://t.me/getmixly" rel="noopener">Telegram</a></div>
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

// 3) Patch en/de home if present; locale routes use the same renderer.
for (const locale of ['en', 'de']) {
  const path = resolve(root, locale, 'index.html');
  try {
    let html = readFileSync(path, 'utf8');
    html = injectHomeList(html, locale);
    writeFileSync(path, html);
    console.log(`updated ${locale}/index.html changelog list`);
  } catch {
    // Localized homes will be rendered by generate:locale-routes if not present yet.
  }
}
