#!/usr/bin/env node

/**
 * Injects consistent SEO for localized article pages:
 * hreflang + x-default, Open Graph / Twitter, Article + BreadcrumbList JSON-LD,
 * visible breadcrumb trail. Also repairs invalid <script> before <html>.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://get-mixly.app';
const defaultImage = `${origin}/assets/blog/kak-pravilno-smeshivat-tabak-hero.webp`;

const CLUSTERS = [
  {
    id: 'mix-basics',
    paths: {
      ru: '/ru/blog/kak-pravilno-smeshivat-tabak-dlya-kalyana',
      en: '/en/blog/how-to-mix-hookah-tobacco',
      de: '/de/blog/wie-man-shisha-tabak-richtig-mischt',
    },
    title: {
      ru: 'Как правильно смешивать табак для кальяна',
      en: 'How to Mix Hookah Tobacco',
      de: 'Shisha-Tabak richtig mischen',
    },
    description: {
      ru: 'Как правильно смешивать табак для кальяна: простые пропорции, сочетания вкусов, советы новичкам и типичные ошибки.',
      en: 'How to mix hookah tobacco: simple ratios, flavor pairings, beginner tips, and common mistakes.',
      de: 'Shisha-Tabak richtig mischen: einfache Verhältnisse, Geschmackskombinationen, Tipps für Einsteiger und typische Fehler.',
    },
    image: `${origin}/assets/blog/kak-pravilno-smeshivat-tabak-hero.webp`,
  },
  {
    id: 'mix-ratios',
    paths: {
      ru: '/ru/blog/proportsii-tabaka-dlya-kalyana',
      en: '/en/blog/hookah-tobacco-mixing-ratios',
      de: '/de/blog/shisha-tabak-mischverhaeltnisse',
    },
    title: {
      ru: 'Пропорции табака для кальяна: как смешивать вкусы',
      en: 'Hookah Tobacco Mixing Ratios',
      de: 'Shisha-Tabak: Mischverhältnisse',
    },
    description: {
      ru: 'Пропорции табака для кальяна: 50/50, 70/30, 80/20, 60/30/10, роли вкусов, примеры миксов и как корректировать чашу.',
      en: 'Hookah tobacco mixing ratios: 50/50, 70/30, 80/20, 60/30/10, flavor roles, starter recipes, and how to adjust a bowl.',
      de: 'Shisha-Mischverhältnisse: 50/50, 70/30, 80/20, 60/30/10, Rollen der Aromen, Startrezepte und Feintuning.',
    },
    image: `${origin}/assets/blog/proportsii-tabaka-hero.webp`,
  },
  {
    id: 'mix-flavors',
    paths: {
      ru: '/ru/blog/sochetaniya-vkusov-dlya-kalyana',
      en: '/en/blog/hookah-flavor-combinations',
      de: '/de/blog/shisha-geschmackskombinationen',
    },
    title: {
      ru: 'Сочетания вкусов для кальяна: что с чем смешивать',
      en: 'Hookah Flavor Combinations',
      de: 'Shisha-Geschmackskombinationen',
    },
    description: {
      ru: 'Какие вкусы для кальяна сочетаются: фрукты, ягоды, цитрусы, свежие и десертные профили с примерами.',
      en: 'Discover which hookah flavors work well together: fruit, berries, citrus, fresh and dessert pairings.',
      de: 'Welche Shisha-Geschmäcker passen zusammen: Frucht, Beeren, Zitrus, frische und Dessert-Kombinationen.',
    },
    image: `${origin}/assets/blog/hookah-flavor-combination-fresh.webp`,
  },
];

const BREADCRUMB_COPY = {
  ru: { home: 'Главная', blog: 'Блог', aria: 'Хлебные крошки' },
  en: { home: 'Home', blog: 'Blog', aria: 'Breadcrumbs' },
  de: { home: 'Start', blog: 'Blog', aria: 'Brotkrumen' },
};

function articleFile(path) {
  return resolve(root, `${path.slice(1)}/index.html`);
}

function stripBrokenHeadScripts(html) {
  return html.replace(
    /<!doctype html>\s*(?:<script[^>]*>[\s\S]*?<\/script>\s*)+/i,
    '<!doctype html>\n'
  );
}

function ensureScriptsInHead(html) {
  if (html.includes('src="/monitoring.js"') || html.includes("src='/monitoring.js'")) return html;
  return html.replace(
    '</head>',
    '<script src="/monitoring.js" defer></script><script src="/analytics.js" defer></script></head>'
  );
}

function upsertMeta(html, attr, key, content) {
  const re = new RegExp(`<meta\\s+${attr}="${key}"[^>]*>`, 'i');
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}">`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</title>', `</title>${tag}`);
}

function upsertLink(html, rel, href, hreflang) {
  if (hreflang) {
    const re = new RegExp(`<link\\s+rel="alternate"\\s+hreflang="${hreflang}"[^>]*>`, 'i');
    const tag = `<link rel="alternate" hreflang="${hreflang}" href="${href}">`;
    if (re.test(html)) return html.replace(re, tag);
    return html.replace(/<link\s+rel="canonical"[^>]*>/i, (m) => `${m}${tag}`);
  }
  const re = new RegExp(`<link\\s+rel="${rel}"[^>]*>`, 'i');
  const tag = `<link rel="${rel}" href="${href}">`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</title>', `</title>${tag}`);
}

function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function injectJsonLd(html, blocks) {
  const payload = blocks.map((block) => `<script type="application/ld+json">${JSON.stringify(block)}</script>`).join('');
  // remove previous article/breadcrumb ld+json we may have inserted
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, (match) => {
    if (match.includes('"Article"') || match.includes('"BreadcrumbList"')) return '';
    return match;
  });
  return html.replace('</head>', `${payload}</head>`);
}

function injectBreadcrumb(html, lang, title) {
  const copy = BREADCRUMB_COPY[lang];
  const nav = `<nav class="breadcrumbs" aria-label="${copy.aria}"><ol><li><a href="/">${copy.home}</a></li><li><a href="/blog.html">${copy.blog}</a></li><li aria-current="page">${escapeAttr(title)}</li></ol></nav>`;
  html = html.replace(/<nav class="breadcrumbs"[\s\S]*?<\/nav>/i, '');
  if (/class="back-home"/.test(html)) {
    return html.replace(/<a class="back-home"[\s\S]*?<\/a>/i, (m) => `${m}${nav}`);
  }
  return html.replace(/<main[^>]*>/i, (m) => `${m}${nav}`);
}

function enrich(cluster, lang) {
  const path = cluster.paths[lang];
  const file = articleFile(path);
  if (!existsSync(file)) {
    console.error('missing', file);
    process.exitCode = 1;
    return;
  }

  let html = readFileSync(file, 'utf8');
  html = stripBrokenHeadScripts(html);
  html = ensureScriptsInHead(html);

  const url = `${origin}${path}`;
  const title = cluster.title[lang];
  const description = cluster.description[lang];
  const image = cluster.image || defaultImage;

  // canonical
  html = upsertLink(html, 'canonical', url);

  // hreflang set
  for (const [altLang, altPath] of Object.entries(cluster.paths)) {
    html = upsertLink(html, 'alternate', `${origin}${altPath}`, altLang);
  }
  html = upsertLink(html, 'alternate', `${origin}${cluster.paths.en}`, 'x-default');

  html = upsertMeta(html, 'name', 'description', description);
  html = upsertMeta(html, 'property', 'og:title', title);
  html = upsertMeta(html, 'property', 'og:description', description);
  html = upsertMeta(html, 'property', 'og:type', 'article');
  html = upsertMeta(html, 'property', 'og:url', url);
  html = upsertMeta(html, 'property', 'og:image', image);
  html = upsertMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = upsertMeta(html, 'name', 'twitter:title', title);
  html = upsertMeta(html, 'name', 'twitter:description', description);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: lang,
    mainEntityOfPage: url,
    image: [image],
    author: {
      '@type': 'Organization',
      name: 'Mixly',
      url: origin,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mixly',
      url: origin,
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/assets/mixly-app-icon.png`,
      },
    },
    isPartOf: {
      '@type': 'Blog',
      name: 'Mixly Blog',
      url: `${origin}/blog.html`,
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: BREADCRUMB_COPY[lang].home, item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: BREADCRUMB_COPY[lang].blog, item: `${origin}/blog.html` },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  };

  html = injectJsonLd(html, [articleLd, breadcrumbLd]);
  html = injectBreadcrumb(html, lang, title);

  writeFileSync(file, html);
  console.log('enriched', path);
}

for (const cluster of CLUSTERS) {
  for (const lang of Object.keys(cluster.paths)) enrich(cluster, lang);
}
