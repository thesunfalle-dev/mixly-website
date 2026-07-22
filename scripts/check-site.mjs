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

function report(file, message) {
  errors.push(`${file}: ${message}`);
}

function localFileFor(url) {
  const path = decodeURIComponent(url.pathname);
  if (path === '/') return 'index.html';
  return path.replace(/^\//, '');
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

for (const [file, source] of pages) {
  const translationKeys = [
    ...source.matchAll(/\bdata-i18n(?:-(?:aria|alt))?="([^"]+)"/g),
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
      const expectedPath = file === 'index.html' ? '' : file.endsWith('/index.html') ? file.slice(0, -'/index.html'.length) : file;
      if (canonical !== `${publicOrigin}/${expectedPath}`) {
        report(file, `canonical does not match its public URL: ${canonical}`);
      }
    }
  }
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
  if (['article.html', '403.html', '404.html', '500.html'].includes(targetFile)) {
    report('sitemap.xml', `non-indexable page is included: ${location}`);
  }
}

if (errors.length) {
  console.error(`Site checks failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Site checks passed: ${files.length} HTML pages, 3 locales, sitemap and local links${checkExternal ? ', plus external URLs' : ''}.`);
