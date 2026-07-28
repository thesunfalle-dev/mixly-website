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
    id: 'beginner-recipes',
    paths: {
      ru: '/ru/blog/miksy-dlya-kalyana-dlya-nachinayushchih',
      en: '/en/blog/beginner-hookah-mix-recipes',
      de: '/de/blog/shisha-mischungen-fuer-einsteiger',
    },
    title: {
      ru: 'Миксы для кальяна для начинающих: готовые рецепты',
      en: 'Beginner Hookah Mix Recipes',
      de: 'Shisha-Mischungen für Einsteiger: fertige Rezepte',
    },
    description: {
      ru: 'Готовые миксы для кальяна для начинающих: 12 простых рецептов с долями — фруктовые, свежие, ягодные и десертные.',
      en: 'Beginner hookah mix recipes: 12 simple formulas with shares for fruit, fresh, berry, and dessert bowls.',
      de: 'Shisha-Mischungen für Einsteiger: 12 einfache Rezepte mit Anteilen — fruchtig, frisch, beerenig und dessertig.',
    },
    image: `${origin}/assets/blog/mix-recipes-hero.webp`,

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
  {
    id: 'choose-base',
    paths: {
      ru: '/ru/blog/kak-vybrat-osnovu-dlya-miksa',
      en: '/en/blog/how-to-choose-hookah-mix-base',
      de: '/de/blog/shisha-mix-basis-waehlen',
    },
    title: {
      ru: 'Как выбрать основу для микса',
      en: 'How to Choose a Hookah Mix Base',
      de: 'Shisha-Mix-Basis wählen',
    },
    description: {
      ru: 'Как выбрать основу для микса кальяна: роли вкусов, критерии базы и типичные ошибки.',
      en: 'How to choose a hookah mix base: flavor roles, selection criteria, and common mistakes.',
      de: 'Shisha-Mix-Basis wählen: Aroma-Rollen, Kriterien und typische Fehler.',
    },
    image: `${origin}/assets/blog/choose-base-hero.webp`,
  },
  {
    id: 'strength',
    paths: {
      ru: '/ru/blog/krepost-tabaka-dlya-kalyana',
      en: '/en/blog/hookah-tobacco-strength',
      de: '/de/blog/shisha-tabak-staerke',
    },
    title: {
      ru: 'Крепость табака для кальяна: как подбирать',
      en: 'Hookah Tobacco Strength: How to Choose It',
      de: 'Shisha-Tabak-Stärke: so wählst du richtig',
    },
    description: {
      ru: 'Крепость табака для кальяна: лёгкий, средний, крепкий — как подобрать под микс и комфорт сессии.',
      en: 'Hookah tobacco strength guide: light, medium, strong — how to match strength to your mix and session.',
      de: 'Shisha-Tabak-Stärke: leicht, mittel, stark — so passt du die Stärke an Mix und Session an.',
    },
    image: `${origin}/assets/blog/strength-levels.webp`,
  },
  {
    id: 'profiles',
    paths: {
      ru: '/ru/blog/vkusovye-profili-kalyana',
      en: '/en/blog/hookah-flavor-profiles',
      de: '/de/blog/shisha-geschmacksprofile',
    },
    title: {
      ru: 'Вкусовые профили кальяна: как в них ориентироваться',
      en: 'Hookah Flavor Profiles: How to Navigate Them',
      de: 'Shisha-Geschmacksprofile: so findest du dich zurecht',
    },
    description: {
      ru: 'Вкусовые профили кальяна: фрукты, ягоды, свежесть, десерт — карта для выбора основы и миксов.',
      en: 'Hookah flavor profiles: fruit, berry, fresh, dessert — a map for choosing bases and mixes.',
      de: 'Shisha-Geschmacksprofile: Frucht, Beere, Frische, Dessert — Karte für Basis und Mixe.',
    },
    image: `${origin}/assets/blog/profiles-hero.webp`,
  },
];

const BREADCRUMB_COPY = {
  ru: { home: 'Главная', blog: 'Блог', aria: 'Хлебные крошки' },
  en: { home: 'Home', blog: 'Blog', aria: 'Breadcrumbs' },
  de: { home: 'Start', blog: 'Blog', aria: 'Brotkrumen' },
};

/** Public home/blog paths per locale (match worker STATIC_REWRITES + locale routes). */
function localeHomePath(lang) {
  return lang === 'ru' ? '/' : `/${lang}/`;
}

function localeBlogPath(lang) {
  // RU keeps the .html public form used across the site; EN/DE use extensionless routes.
  return lang === 'ru' ? '/blog.html' : `/${lang}/blog`;
}

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
  const homeHref = localeHomePath(lang);
  const blogHref = localeBlogPath(lang);
  const nav = `<nav class="breadcrumbs" aria-label="${copy.aria}"><ol><li><a href="${homeHref}">${copy.home}</a></li><li><a href="${blogHref}">${copy.blog}</a></li><li aria-current="page">${escapeAttr(title)}</li></ol></nav>`;
  // Breadcrumbs replace the old "back to blog" link on article pages.
  html = html.replace(/<a class="back-home"[\s\S]*?<\/a>\s*/i, '');
  html = html.replace(/<nav class="breadcrumbs"[\s\S]*?<\/nav>/i, '');
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

  const homePath = localeHomePath(lang);
  const blogPath = localeBlogPath(lang);
  const homeUrl = `${origin}${homePath}`;
  const blogUrl = `${origin}${blogPath}`;

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
      url: blogUrl,
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: BREADCRUMB_COPY[lang].home, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: BREADCRUMB_COPY[lang].blog, item: blogUrl },
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
