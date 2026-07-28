#!/usr/bin/env node
/**
 * Build static locale-prefixed marketing/legal pages for MIX-7:
 *   /en/, /de/  (+ /en/blog.html, /en/privacy.html, …)
 * RU remains at site root (/, /blog.html, /privacy.html) as the default locale.
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://get-mixly.app';
const locales = ['en', 'de'];
const marketingFiles = ['index.html', 'blog.html'];
const legalFiles = ['privacy.html', 'cookies.html', 'terms.html', 'eula.html', 'support.html'];

const i18nSource = readFileSync(resolve(root, 'i18n.js'), 'utf8');
const i18nContext = {
  window: {},
  document: { readyState: 'loading', addEventListener() {} },
};
vm.runInNewContext(i18nSource, i18nContext, { filename: 'i18n.js' });
const STRINGS = i18nContext.STRINGS;

const legalContext = {};
vm.runInNewContext(readFileSync(resolve(root, 'legal-content.js'), 'utf8'), legalContext, {
  filename: 'legal-content.js',
});
const LEGAL_DOCS = legalContext.LEGAL_DOCS;

const SHOT_FILES = {
  'shot.main1': 'main_1.webp',
  'shot.main2': 'main_2.webp',
  'shot.discovery': 'Discovery.webp',
  'shot.lab': 'Lab.webp',
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function setAttribute(tag, name, value) {
  const pattern = new RegExp(`\\s${name}="[^"]*"`);
  const attribute = ` ${name}="${String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`;
  return pattern.test(tag) ? tag.replace(pattern, attribute) : tag.replace(/\/?>(?=$)/, `${attribute}$&`);
}

function replaceLocalizedContents(source, strings) {
  const stack = [];
  const ranges = [];
  const tokens = /<\/?([a-zA-Z][\w:-]*)\b[^>]*>/g;
  let match;
  while ((match = tokens.exec(source))) {
    const token = match[0];
    const tag = match[1].toLowerCase();
    if (token.startsWith('</')) {
      const current = stack.pop();
      if (current?.tag === tag && current.key in strings) {
        ranges.push({ start: current.contentStart, end: match.index, value: strings[current.key] });
      }
      continue;
    }
    if (token.endsWith('/>') || /^(br|img|input|link|meta|source|area|base|embed|hr|param|track|wbr)$/i.test(tag)) {
      continue;
    }
    const key = token.match(/\bdata-i18n="([^"]+)"/)?.[1];
    stack.push({ tag, key, contentStart: tokens.lastIndex });
  }

  const outerRanges = ranges
    .sort((a, b) => a.start - b.start || b.end - a.end)
    .filter((range, index, all) => !all.slice(0, index).some((parent) => parent.end >= range.end));

  for (const range of outerRanges.sort((a, b) => b.start - a.start)) {
    source = `${source.slice(0, range.start)}${range.value}${source.slice(range.end)}`;
  }
  return source;
}

function replaceLocalizedAttributes(source, strings, locale) {
  return source.replace(/<[^>]+>/g, (tag) => {
    const ariaKey = tag.match(/\bdata-i18n-aria="([^"]+)"/)?.[1];
    const altKey = tag.match(/\bdata-i18n-alt="([^"]+)"/)?.[1];
    const hrefKey = tag.match(/\bdata-i18n-href="([^"]+)"/)?.[1];
    const imageKey = tag.match(/\bdata-i18n-src="([^"]+)"/)?.[1];
    if (ariaKey && strings[ariaKey] != null) tag = setAttribute(tag, 'aria-label', strings[ariaKey]);
    if (altKey && strings[altKey] != null) tag = setAttribute(tag, 'alt', strings[altKey]);
    if (hrefKey && strings[hrefKey] != null) tag = setAttribute(tag, 'href', strings[hrefKey]);
    if (imageKey && SHOT_FILES[imageKey]) {
      tag = setAttribute(tag, 'src', `/images_for_web/${locale.toUpperCase()}/${SHOT_FILES[imageKey]}`);
    }
    return tag;
  });
}

function absolutizeAssets(source) {
  return source
    .replace(/(href|src)="\.\//g, '$1="/')
    .replace(/url\('\.\//g, "url('/")
    .replace(/url\("\.\//g, 'url("/');
}

function localizeInternalLinks(source, locale) {
  // Assets html_handling serves extensionless paths (/en/blog → en/blog.html).
  const map = {
    'href="/"': `href="/${locale}/"`,
    'href="/#': `href="/${locale}/#`,
    'href="/blog.html"': `href="/${locale}/blog"`,
    'href="/privacy.html"': `href="/${locale}/privacy"`,
    'href="/cookies.html"': `href="/${locale}/cookies"`,
    'href="/terms.html"': `href="/${locale}/terms"`,
    'href="/eula.html"': `href="/${locale}/eula"`,
    'href="/support.html"': `href="/${locale}/support"`,
  };
  for (const [from, to] of Object.entries(map)) {
    source = source.split(from).join(to);
  }
  // Pretty changelog paths (with optional hashes) and .html form.
  source = source.replace(/href="\/changelog(\.html)?(#[^"]*)?"/g, `href="/${locale}/changelog$2"`);
  return source;
}

function publicPath(locale, pageKey) {
  // pageKey: '' | 'blog.html' | 'privacy.html' ...
  if (locale === 'ru') return pageKey ? `/${pageKey}` : '/';
  if (!pageKey) return `/${locale}/`;
  return `/${locale}/${pageKey.replace(/\.html$/, '')}`;
}

function injectHreflang(source, pageKey) {
  const selfPath = (locale) => publicPath(locale, pageKey);
  const tags = ['ru', 'en', 'de']
    .map((locale) => `<link rel="alternate" hreflang="${locale}" href="${origin}${selfPath(locale)}">`)
    .join('');
  const xDefault = `<link rel="alternate" hreflang="x-default" href="${origin}${selfPath('en')}">`;
  const canonical = selfPath; // filled per locale later
  return { tags: tags + xDefault, selfPath };
}

function setCanonicalAndHreflang(source, locale, pageKey) {
  const { tags, selfPath } = injectHreflang(source, pageKey);
  const canonicalUrl = `${origin}${selfPath(locale)}`;
  source = source.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  // strip old hreflang
  source = source.replace(/<link\s+rel="alternate"\s+hreflang="[^"]+"[^>]*>/gi, '');
  if (/rel="canonical"/.test(source)) {
    source = source.replace(/<link\s+rel="canonical"[^>]*>/i, (m) => `${m}${tags}`);
  } else {
    source = source.replace('</title>', `</title><link rel="canonical" href="${canonicalUrl}" />${tags}`);
  }
  source = source.replace(/(property="og:url"\s+content=")[^"]*(")/i, `$1${canonicalUrl}$2`);
  return source;
}

function markLangSwitch(source, locale) {
  source = source.replace(/<html lang="[^"]*">/, `<html lang="${locale}">`);
  // mark active language button
  source = source.replace(
    /(<button type="button" data-lang="(ru|en|de)"[^>]*)(aria-checked="[^"]*")?/g,
    (full, start, lang) => {
      const checked = lang === locale ? 'true' : 'false';
      const cleaned = start.replace(/\saria-checked="[^"]*"/, '');
      return `${cleaned} aria-checked="${checked}"`;
    }
  );
  source = source.replace(
    /(<button type="button" class="lang-switch-toggle"[^>]*>)[A-Z]{2}(<\/button>)/,
    `$1${locale.toUpperCase()}$2`
  );
  return source;
}

function renderMeta(source, file, strings, locale) {
  if (file === 'index.html') {
    if (strings['meta.home.title']) {
      source = source.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(strings['meta.home.title'])}</title>`);
    }
    if (strings['meta.home.description']) {
      source = source.replace(
        /(<meta\s+name="description"\s+content=")[^"]*(")/,
        `$1${escapeHtml(strings['meta.home.description'])}$2`
      );
    }
    if (strings['meta.home.ogTitle']) {
      source = source.replace(
        /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
        `$1${escapeHtml(strings['meta.home.ogTitle'])}$2`
      );
    }
    if (strings['meta.home.ogDescription']) {
      source = source.replace(
        /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
        `$1${escapeHtml(strings['meta.home.ogDescription'])}$2`
      );
    }
  }
  if (file === 'blog.html') {
    if (strings['meta.blog.title']) {
      source = source.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(strings['meta.blog.title'])}</title>`);
    }
    if (strings['meta.blog.description']) {
      source = source.replace(
        /(<meta\s+name="description"\s+content=")[^"]*(")/,
        `$1${escapeHtml(strings['meta.blog.description'])}$2`
      );
    }
  }
  return source;
}

function linkify(value) {
  return escapeHtml(value).replace(
    /\[\[a:([^\]]+)\]\]([\s\S]*?)\[\[\/a\]\]/g,
    (_, href, label) => {
      let nextHref = href;
      if (nextHref.startsWith('./')) nextHref = nextHref.slice(1);
      if (nextHref.startsWith('/') && !nextHref.startsWith('//') && !/^\/(ru|en|de)(\/|$)/.test(nextHref)) {
        // leave absolute site paths; localize marketing links later if needed
      }
      return `<a href="${nextHref}">${label}</a>`;
    }
  );
}

function renderLegalBody(doc, locale) {
  const pack = LEGAL_DOCS[doc][locale] || LEGAL_DOCS[doc].en || LEGAL_DOCS[doc].ru;
  const sections = pack.sections
    .map((section, index) => {
      const blocks = section.blocks
        .map((block) => {
          if (block.type === 'ul') {
            return `<ul>${block.items.map((item) => `<li>${linkify(item)}</li>`).join('')}</ul>`;
          }
          return `<p${block.className === 'notice' || block.notice ? ' class="legal-notice"' : ''}>${linkify(block.text)}</p>`;
        })
        .join('');
      const anchor = doc === 'cookies' && index === 0 ? '<span id="analytics-settings"></span>' : '';
      return `<section id="${section.id}" class="legal-section">${anchor}<h2>${escapeHtml(section.title)}</h2>${blocks}</section>`;
    })
    .join('');
  const toc = pack.sections
    .map((section) => `<a href="#${section.id}">${escapeHtml(section.title.replace(/^\d+\.\s*/, ''))}</a>`)
    .join('');
  return {
    header: `<h1 id="legal-title">${escapeHtml(pack.title)}</h1><p class="legal-meta" id="legal-meta">${escapeHtml(pack.meta || '')}</p><p class="legal-notice" id="legal-notice">${linkify(pack.notice || '')}</p>`,
    body: `<div class="legal-body" id="legal-body">${sections}</div>`,
    toc: `<aside class="legal-toc" id="legal-toc" aria-label="On this page"><details class="legal-toc-dropdown" open><summary class="legal-toc-summary"><span class="legal-toc-label">On this page</span><span class="legal-toc-current" id="legal-toc-current">${escapeHtml(pack.sections[0]?.title.replace(/^\d+\.\s*/, '') || '')}</span></summary><nav class="legal-toc-nav" aria-label="Document sections">${toc}</nav></details></aside>`,
    title: pack.title,
    notice: pack.notice || pack.title,
  };
}

function renderMarketing(file, locale) {
  const strings = STRINGS[locale] || STRINGS.en;
  let source = readFileSync(resolve(root, file), 'utf8');
  source = replaceLocalizedContents(source, strings);
  source = replaceLocalizedAttributes(source, strings, locale);
  source = renderMeta(source, file, strings, locale);
  source = absolutizeAssets(source);
  source = localizeInternalLinks(source, locale);
  source = markLangSwitch(source, locale);
  const pageKey = file === 'index.html' ? '' : file;
  source = setCanonicalAndHreflang(source, locale, pageKey);
  if (file === 'blog.html') {
    const homeHref = publicPath(locale, '');
    const blogLabel = strings['nav.blog'] || 'Blog';
    const crumbs = renderBreadcrumbsNav(locale, blogLabel, homeHref);
    source = source.replace(/<a class="back-home"[\s\S]*?<\/a>\s*/i, '');
    source = source.replace(/<nav class="breadcrumbs"[\s\S]*?<\/nav>\s*/i, '');
    source = source.replace(/<main[^>]*>/i, (m) => `${m}\n      ${crumbs}\n      `);
    source = injectBreadcrumbListJsonLd(source, locale, 'blog.html', blogLabel);
  }
  // Prefer absolute asset paths already; ensure i18n still works for interactive bits
  return source;
}

function breadcrumbHomeLabel(locale) {
  const strings = STRINGS[locale] || STRINGS.en;
  return strings['nav.home'] || (locale === 'de' ? 'Start' : locale === 'ru' ? 'Главная' : 'Home');
}

function breadcrumbAria(locale) {
  const strings = STRINGS[locale] || STRINGS.en;
  return strings['nav.breadcrumbs'] || (locale === 'de' ? 'Brotkrumen' : locale === 'ru' ? 'Хлебные крошки' : 'Breadcrumbs');
}

function renderBreadcrumbsNav(locale, currentLabel, homeHref) {
  return (
    `<nav class="breadcrumbs" data-i18n-aria="nav.breadcrumbs" aria-label="${escapeHtml(breadcrumbAria(locale))}">` +
    `<ol><li><a href="${homeHref}" data-i18n="nav.home">${escapeHtml(breadcrumbHomeLabel(locale))}</a></li>` +
    `<li aria-current="page">${escapeHtml(currentLabel)}</li></ol></nav>`
  );
}

function injectBreadcrumbListJsonLd(source, locale, pageKey, currentLabel) {
  const homePath = publicPath(locale, '');
  const pagePath = publicPath(locale, pageKey);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: breadcrumbHomeLabel(locale), item: `${origin}${homePath}` },
      { '@type': 'ListItem', position: 2, name: currentLabel, item: `${origin}${pagePath}` },
    ],
  };
  // Drop prior BreadcrumbList blocks we may have injected on re-run.
  source = source.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, (match) =>
    match.includes('"BreadcrumbList"') ? '' : match
  );
  return source.replace('</head>', `<script type="application/ld+json">${JSON.stringify(ld)}</script></head>`);
}

function renderLegal(file, locale) {
  const doc = file.replace(/\.html$/, '');
  const legal = renderLegalBody(doc, locale);
  let source = readFileSync(resolve(root, file), 'utf8');
  const strings = STRINGS[locale] || STRINGS.en;
  source = replaceLocalizedContents(source, strings);
  source = replaceLocalizedAttributes(source, strings, locale);
  source = source.replace(
    /<h1 id="legal-title">[\s\S]*?<\/h1>\s*<p class="legal-meta" id="legal-meta">[\s\S]*?<\/p>\s*<p class="legal-notice" id="legal-notice">[\s\S]*?<\/p>/,
    legal.header
  );
  source = source.replace(/<div class="legal-body" id="legal-body">[\s\S]*?<\/div>/, legal.body);
  source = source.replace(/<aside class="legal-toc" id="legal-toc"[\s\S]*?<\/aside>/, legal.toc);
  // Replace legacy back-home or existing crumbs with locale-correct breadcrumbs.
  const homeHref = publicPath(locale, '');
  const crumbs = renderBreadcrumbsNav(locale, legal.title, homeHref);
  source = source.replace(/<a class="back-home"[\s\S]*?<\/a>\s*/i, '');
  source = source.replace(/<nav class="breadcrumbs"[\s\S]*?<\/nav>\s*/i, '');
  source = source.replace(/<main[^>]*>/i, (m) => `${m}\n      ${crumbs}\n      `);
  source = source.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(legal.title)} · Mixly</title>`);
  source = source.replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${escapeHtml(legal.notice)}$2`);
  source = absolutizeAssets(source);
  source = localizeInternalLinks(source, locale);
  source = markLangSwitch(source, locale);
  source = setCanonicalAndHreflang(source, locale, file);
  source = injectBreadcrumbListJsonLd(source, locale, file, legal.title);
  return source;
}

function writeLocaleFile(locale, relativePath, content) {
  const out = resolve(root, locale, relativePath === 'index.html' ? 'index.html' : relativePath);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, content);
  console.log('wrote', `${locale}/${relativePath === 'index.html' ? 'index.html' : relativePath}`);
}

// Root RU pages: add hreflang without changing body language strategy
function enhanceRootHreflang(file, pageKey) {
  const path = resolve(root, file);
  let source = readFileSync(path, 'utf8');
  source = setCanonicalAndHreflang(source, 'ru', pageKey);
  writeFileSync(path, source);
  console.log('hreflang root', file);
}

function enhanceRootBreadcrumbJsonLd(file, pageKey, currentLabel) {
  const path = resolve(root, file);
  let source = readFileSync(path, 'utf8');
  source = injectBreadcrumbListJsonLd(source, 'ru', pageKey, currentLabel);
  writeFileSync(path, source);
  console.log('breadcrumb ld+json root', file);
}

for (const locale of locales) {
  for (const file of marketingFiles) {
    writeLocaleFile(locale, file, renderMarketing(file, locale));
  }
  for (const file of legalFiles) {
    writeLocaleFile(locale, file, renderLegal(file, locale));
  }
}

enhanceRootHreflang('index.html', '');
enhanceRootHreflang('blog.html', 'blog.html');
for (const file of legalFiles) enhanceRootHreflang(file, file);

// Root RU static pages get BreadcrumbList JSON-LD (visible crumbs are already in templates).
enhanceRootBreadcrumbJsonLd('blog.html', 'blog.html', STRINGS.ru['nav.blog'] || 'Блог');
for (const file of legalFiles) {
  const doc = file.replace(/\.html$/, '');
  const title = LEGAL_DOCS[doc]?.ru?.title || STRINGS.ru[`footer.${doc}`] || doc;
  enhanceRootBreadcrumbJsonLd(file, file, title);
}

console.log('locale routes rendered for', locales.join(', '));
