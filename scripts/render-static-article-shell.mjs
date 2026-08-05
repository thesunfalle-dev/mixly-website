#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const articles = [
  { paths: { ru: '/ru/blog/kak-pravilno-smeshivat-tabak-dlya-kalyana', en: '/en/blog/how-to-mix-hookah-tobacco', de: '/de/blog/wie-man-shisha-tabak-richtig-mischt' }, copy: { ru: ['Как правильно смешивать табак для кальяна', 'Базовые пропорции, сочетания вкусов и понятный алгоритм первого микса.'], en: ['How to Mix Hookah Tobacco', 'A practical starting point for ratios, pairings and your first mixes.'], de: ['Shisha-Tabak richtig mischen', 'Ein einfacher Einstieg in Mischverhältnisse, Kombinationen und erste Mixe.'] } },
  { paths: { ru: '/ru/blog/miksy-dlya-kalyana-dlya-nachinayushchih', en: '/en/blog/beginner-hookah-mix-recipes', de: '/de/blog/shisha-mischungen-fuer-einsteiger' }, copy: { ru: ['Миксы для кальяна для начинающих: готовые рецепты', '12 простых рецептов с долями: фруктовые, свежие, ягодные и десертные миксы.'], en: ['Beginner Hookah Mix Recipes', '12 simple share-based recipes: fruit, fresh, berry, and dessert starter mixes.'], de: ['Shisha-Mischungen für Einsteiger: fertige Rezepte', '12 einfache Rezepte mit Anteilen: fruchtig, frisch, beerenig und dessertig.'] } },
  { paths: { ru: '/ru/blog/sochetaniya-vkusov-dlya-kalyana', en: '/en/blog/hookah-flavor-combinations', de: '/de/blog/shisha-geschmackskombinationen' }, copy: { ru: ['Сочетания вкусов для кальяна: что с чем смешивать', 'Как сочетать фрукты, ягоды, цитрусы, свежие и десертные вкусы.'], en: ['Hookah Flavor Combinations', 'How to pair fruit, berries, citrus, fresh and dessert flavors.'], de: ['Shisha-Geschmackskombinationen', 'So kombinierst du Früchte, Beeren, Zitrus-, frische und Dessert-Aromen.'] } },
];
const ui = {
  ru: { home: 'О приложении', features: 'Возможности', updates: 'Обновления', blog: 'Блог', download: 'Скачать в App Store', menu: 'Открыть меню', menuAria: 'Мобильная навигация', app: 'Приложение', docs: 'Документы', privacy: 'Конфиденциальность', cookies: 'Cookies и аналитика', terms: 'Условия использования', eula: 'Лицензия', support: 'Поддержка', socials: 'Соцсети', contacts: 'Контакты', age: 'Только для взрослых 18+', tagline: 'Идеи для кальяна, которые хочется сохранить', related: 'Читайте также', practice: 'Практика' },
  en: { home: 'About', features: 'Features', updates: 'Updates', blog: 'Blog', download: 'Download on the App Store', menu: 'Open menu', menuAria: 'Mobile navigation', app: 'App', docs: 'Legal', privacy: 'Privacy', cookies: 'Cookies & analytics', terms: 'Terms of Use', eula: 'License', support: 'Support', socials: 'Social', contacts: 'Contact', age: 'Adults only 18+', tagline: 'Hookah ideas worth keeping', related: 'Read next', practice: 'Practice' },
  de: { home: 'Über die App', features: 'Funktionen', updates: 'Updates', blog: 'Blog', download: 'Im App Store laden', menu: 'Menü öffnen', menuAria: 'Mobile Navigation', app: 'App', docs: 'Dokumente', privacy: 'Datenschutz', cookies: 'Cookies & Analysen', terms: 'Nutzungsbedingungen', eula: 'Lizenz', support: 'Support', socials: 'Social', contacts: 'Kontakt', age: 'Nur für Erwachsene 18+', tagline: 'Shisha-Ideen, die man behalten will', related: 'Weiterlesen', practice: 'Praxis' },
};

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const link = (href, text) => `<a href="${href}">${esc(text)}</a>`;

function header(lang, copy) {
  return (
    `<header class="site-header" data-shell-static="true"><a class="brand brand-app" href="/">mixly</a>` +
    `<nav aria-label="${esc(copy.menuAria)}">${link('/#how-it-works', copy.home)}${link('/#features', copy.features)}${link('/#changelog', copy.updates)}${link('/blog.html', copy.blog)}</nav>` +
    `<div class="header-actions"><a class="header-cta" href="https://apps.apple.com/app/id6762792005" rel="noopener"><span class="cta-full">${esc(copy.download)}</span><span class="cta-short">App Store</span></a>` +
    `<div class="lang-switch" data-lang-switch><button type="button" class="lang-switch-toggle" aria-expanded="false" aria-label="Language">${lang.toUpperCase()}</button>` +
    `<ul class="lang-switch-menu" hidden role="radiogroup" aria-label="Language">` +
    `<li><button type="button" data-lang="ru" role="radio" aria-checked="${lang === 'ru'}">RU</button></li>` +
    `<li><button type="button" data-lang="en" role="radio" aria-checked="${lang === 'en'}">EN</button></li>` +
    `<li><button type="button" data-lang="de" role="radio" aria-checked="${lang === 'de'}">DE</button></li>` +
    `</ul></div>` +
    `<button class="mobile-menu-toggle" type="button" aria-label="${esc(copy.menu)}" aria-controls="mobile-menu" aria-expanded="false"><span></span><span></span><span></span></button></div></header>` +
    `<aside class="mobile-menu" id="mobile-menu" aria-label="${esc(copy.menuAria)}" aria-hidden="true">` +
    `<nav aria-label="${esc(copy.menuAria)}">${link('/#how-it-works', copy.home)}${link('/#features', copy.features)}${link('/#changelog', copy.updates)}${link('/blog.html', copy.blog)}</nav>` +
    `<div class="mobile-menu-lang"><div class="lang-switch lang-switch-mobile" data-lang-switch>` +
    `<div class="lang-switch-segment" role="radiogroup" aria-label="Language">` +
    `<button type="button" data-lang="ru" role="radio" aria-checked="${lang === 'ru'}">RU</button>` +
    `<button type="button" data-lang="en" role="radio" aria-checked="${lang === 'en'}">EN</button>` +
    `<button type="button" data-lang="de" role="radio" aria-checked="${lang === 'de'}">DE</button>` +
    `</div></div></div>` +
    `<div class="mobile-menu-socials"><p>${esc(copy.socials)}</p><div class="mobile-menu-social-links">` +
    `<a href="https://www.instagram.com/get_mixly/" rel="noopener">Instagram</a>` +
    `<a href="https://www.threads.com/@get_mixly" rel="noopener">Threads</a></div></div></aside>`
  );
}

function footer(copy) {
  return `<footer class="site-footer"><div class="footer-main"><div class="footer-brand-block"><a class="brand-app footer-brand" href="/">mixly</a><p>Mixly app © 2026</p></div><div class="footer-links"><div><p>${esc(copy.app)}</p>${link('/#how-it-works', copy.home)}${link('/#features', copy.features)}${link('/#changelog', copy.updates)}${link('/blog.html', copy.blog)}<a href="https://apps.apple.com/app/id6762792005" rel="noopener">App Store</a></div><div><p>${esc(copy.docs)}</p>${link('/privacy.html', copy.privacy)}${link('/cookies.html', copy.cookies)}${link('/terms.html', copy.terms)}${link('/eula.html', copy.eula)}${link('/support.html', copy.support)}</div><div><p>${esc(copy.socials)}</p><a href="https://www.instagram.com/get_mixly/" rel="noopener">Instagram</a><a href="https://www.threads.com/@get_mixly" rel="noopener">Threads</a></div><div><p>${esc(copy.contacts)}</p><a href="mailto:support@get-mixly.app">support@get-mixly.app</a><a href="https://t.me/getmixly" rel="noopener">Telegram</a></div></div></div><div class="footer-bottom"><p>${esc(copy.age)}</p><p>${esc(copy.tagline)}</p></div></footer>`;
}

for (const item of articles) {
  for (const [lang, path] of Object.entries(item.paths)) {
    const file = resolve(root, `${path.slice(1)}/index.html`);
    let source = readFileSync(file, 'utf8');
    const copy = ui[lang];
    source = source.replace(/<header class="site-header">[\s\S]*?<\/header>(?:<aside class="mobile-menu"[\s\S]*?<\/aside>)?/, header(lang, copy));
    source = source.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, footer(copy));
    const related = articles.filter((candidate) => candidate !== item).map((candidate) => {
      const [title, excerpt] = candidate.copy[lang];
      return `<article><a href="${candidate.paths[lang]}"><p>${esc(copy.practice)}</p><h3>${esc(title)}</h3><span>${esc(excerpt)}</span><b>→</b></a></article>`;
    }).join('');
    const block = `<section class="article-related" aria-labelledby="article-related-title"><h2 id="article-related-title">${esc(copy.related)}</h2><div class="article-related-grid" aria-label="${esc(copy.related)}">${related}</div></section>`;
    source = source.replace(/<section class="article-related"[\s\S]*?<\/section>(?=<\/article><aside class="article-toc")/, '');
    source = source.replace('</article><aside class="article-toc"', `${block}</article><aside class="article-toc"`);
    writeFileSync(file, source);
  }
}
