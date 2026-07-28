#!/usr/bin/env node
/**
 * Build-time article meta:
 * - reading time from main article body word count
 * - static "More Mixly" promo block in initial HTML
 * - datePublished/dateModified in Article JSON-LD when missing
 *
 * Reading speed assumptions (words per minute):
 *   RU 190 · EN 210 · DE 190  (minimum 1 minute)
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const WPM = { ru: 190, en: 210, de: 190 };
const CAT = { ru: 'ПРАКТИКА', en: 'PRACTICE', de: 'PRAXIS' };
const UNIT = { ru: 'МИН', en: 'MIN', de: 'MIN' };
const PUBLISHED = '2026-07-22';
const MODIFIED = '2026-07-28';

const APPLE_SVG =
  '<svg class="hero-download-icon" aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M16.37 12.31c-.03-2.28 1.86-3.39 1.94-3.44-1.06-1.55-2.7-1.76-3.28-1.78-1.38-.15-2.72.83-3.43.83-.72 0-1.8-.82-2.97-.79-1.51.02-2.93.9-3.71 2.25-1.62 2.8-.41 6.91 1.14 9.18.78 1.11 1.69 2.35 2.88 2.3 1.16-.05 1.59-.74 2.99-.74 1.38 0 1.78.74 3 .71 1.25-.02 2.04-1.12 2.79-2.24.91-1.28 1.27-2.54 1.29-2.61-.03-.01-2.44-.93-2.46-3.97ZM14.14 5.68c.63-.79 1.06-1.87.94-2.96-.91.04-2.05.63-2.71 1.4-.59.68-1.11 1.8-.98 2.85 1.02.08 2.07-.52 2.75-1.29Z"/></svg>';

const PREMIUM = {
  ru: {
    eyebrow: 'Больше Mixly',
    title: 'Больше возможностей внутри Mixly',
    lead: 'Собирай подборку под себя и возвращайся к новым сочетаниям, когда захочется попробовать что-то ещё.',
    aria: 'Что открывает Mixly Premium',
    b1t: 'Более <br>500',
    b1b: 'миксов в полной<br>библиотеке',
    b2t: 'Каждую <br>неделю',
    b2b: 'новые идеи и<br>пополнения',
    b3t: 'Без <br>ограничений',
    b3b: 'фильтры по вкусам,<br>брендам и крепости',
    cta: 'Попробовать Mixly',
  },
  en: {
    eyebrow: 'More Mixly',
    title: 'More inside Mixly',
    lead: 'Build a feed that fits you and come back to new mixes whenever you want to try something else.',
    aria: 'What Mixly Premium unlocks',
    b1t: 'Over <br>500',
    b1b: 'mixes in the full<br>library',
    b2t: 'Every <br>week',
    b2b: 'new ideas and<br>additions',
    b3t: 'No <br>limits',
    b3b: 'filters by flavor,<br>brand, and strength',
    cta: 'Try Mixly',
  },
  de: {
    eyebrow: 'Mehr Mixly',
    title: 'Mehr Möglichkeiten in Mixly',
    lead: 'Baue eine Auswahl für dich und komm zu neuen Mischungen zurück, wenn du etwas anderes ausprobieren willst.',
    aria: 'Was Mixly Premium freischaltet',
    b1t: 'Über <br>500',
    b1b: 'Mischungen in der<br>vollen Bibliothek',
    b2t: 'Jede <br>Woche',
    b2b: 'neue Ideen und<br>Ergänzungen',
    b3t: 'Ohne <br>Limits',
    b3b: 'Filter nach Geschmack,<br>Marke und Stärke',
    cta: 'Mixly ausprobieren',
  },
};

function premiumHtml(lang) {
  const c = PREMIUM[lang] || PREMIUM.en;
  return (
    `<div data-premium-block data-premium-static="true">` +
    `<section class="premium section reveal is-visible" id="premium" aria-labelledby="premium-title">` +
    `<div class="premium-copy"><p class="eyebrow">${c.eyebrow}</p>` +
    `<h2 id="premium-title">${c.title}</h2><p>${c.lead}</p></div>` +
    `<div class="premium-benefits" aria-label="${c.aria}">` +
    `<article><strong>${c.b1t}</strong><p>${c.b1b}</p></article>` +
    `<article><strong>${c.b2t}</strong><p>${c.b2b}</p></article>` +
    `<article><strong>${c.b3t}</strong><p>${c.b3b}</p></article>` +
    `</div>` +
    `<a class="button button-primary premium-cta" href="https://apps.apple.com/app/id6762792005" rel="noopener">` +
    `${APPLE_SVG}<span>${c.cta}</span> <span aria-hidden="true">→</span></a>` +
    `</section></div>`
  );
}

function listArticles() {
  const out = [];
  for (const lang of ['ru', 'en', 'de']) {
    const dir = join(root, lang, 'blog');
    if (!existsSync(dir)) continue;
    for (const slug of readdirSync(dir)) {
      const file = join(dir, slug, 'index.html');
      if (existsSync(file)) out.push({ lang, file, rel: `${lang}/blog/${slug}/index.html` });
    }
  }
  return out;
}

function wordCount(htmlBody) {
  const text = htmlBody.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(/\s+/).length : 0;
}

let updated = 0;
for (const { lang, file, rel } of listArticles()) {
  let source = readFileSync(file, 'utf8');
  const bodyMatch = source.match(
    /class="article-page-content">([\s\S]*?)<\/div>\s*<section class="article-related"/,
  );
  if (!bodyMatch) {
    console.warn(`skip ${rel}: article body not found`);
    continue;
  }
  const words = wordCount(bodyMatch[1]);
  const minutes = Math.max(1, Math.round(words / (WPM[lang] || 200)));
  const meta = `${CAT[lang]} · ${minutes} ${UNIT[lang]}`;
  source = source.replace(
    /<p class="article-meta"[^>]*>[^<]*<\/p>/,
    `<p class="article-meta" data-reading-minutes="${minutes}" data-reading-words="${words}">${meta}</p>`,
  );

  const block = premiumHtml(lang);
  if (/data-premium-block/.test(source)) {
    source = source.replace(
      /<div data-premium-block[\s\S]*?<\/div>(?=\s*<\/main>|\s*<footer)/,
      block,
    );
  } else if (source.includes('</main>')) {
    source = source.replace('</main>', `${block}</main>`);
  }

  if (!/"datePublished"/.test(source)) {
    source = source.replace(
      '"@type":"Article"',
      `"@type":"Article","datePublished":"${PUBLISHED}","dateModified":"${MODIFIED}"`,
    );
  }

  writeFileSync(file, source);
  updated += 1;
  console.log(`${rel}: ${words} words → ${minutes} min`);
}

console.log(`Updated ${updated} article pages.`);
