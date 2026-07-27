#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const root = resolve(new URL('..', import.meta.url).pathname);
const files = ['403.html', '404.html', '500.html', 'article.html', 'blog.html', 'cookies.html', 'eula.html', 'index.html', 'privacy.html', 'support.html', 'terms.html'];
const locale = 'ru';

const i18nSource = readFileSync(resolve(root, 'i18n.js'), 'utf8');
const context = {
  window: {},
  document: { readyState: 'loading', addEventListener() {} },
};
vm.runInNewContext(i18nSource, context, { filename: 'i18n.js' });
const strings = context.STRINGS[locale];

function replaceLocalizedContents(source) {
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
    if (token.endsWith('/>') || /^(br|img|input|link|meta|source|area|base|embed|hr|param|track|wbr)$/i.test(tag)) continue;
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

function setAttribute(tag, name, value) {
  const pattern = new RegExp(`\\s${name}="[^"]*"`);
  const attribute = ` ${name}="${value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`;
  return pattern.test(tag) ? tag.replace(pattern, attribute) : tag.replace(/\/?>(?=$)/, `${attribute}$&`);
}

function replaceLocalizedAttributes(source) {
  return source.replace(/<[^>]+>/g, (tag) => {
    const ariaKey = tag.match(/\bdata-i18n-aria="([^"]+)"/)?.[1];
    const altKey = tag.match(/\bdata-i18n-alt="([^"]+)"/)?.[1];
    const hrefKey = tag.match(/\bdata-i18n-href="([^"]+)"/)?.[1];
    const imageKey = tag.match(/\bdata-i18n-src="([^"]+)"/)?.[1];
    if (ariaKey in strings) tag = setAttribute(tag, 'aria-label', strings[ariaKey]);
    if (altKey in strings) tag = setAttribute(tag, 'alt', strings[altKey]);
    if (hrefKey in strings) tag = setAttribute(tag, 'href', strings[hrefKey]);
    if (imageKey) {
      const image = { 'shot.main1': 'main_1.webp', 'shot.main2': 'main_2.webp', 'shot.discovery': 'Discovery.png', 'shot.lab': 'Lab.png' }[imageKey];
      if (image) tag = setAttribute(tag, 'src', `/images_for_web/${locale.toUpperCase()}/${image}`);
    }
    return tag;
  });
}

function renderMeta(source, file) {
  const prefix = file === 'index.html' ? 'meta.home' : file === 'blog.html' ? 'meta.blog' : `meta.error.${file.slice(0, -5)}`;
  if (file === 'article.html') {
    return source
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${strings['meta.article.fallbackTitle']}</title>`)
      .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, '$1Статья блога Mixly.$2');
  }
  if (strings[`${prefix}.title`]) source = source.replace(/<title>[\s\S]*?<\/title>/, `<title>${strings[`${prefix}.title`]}</title>`);
  if (strings[`${prefix}.description`]) source = source.replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${strings[`${prefix}.description`]}$2`);
  if (file === 'index.html') {
    source = source.replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${strings['meta.home.ogTitle']}$2`);
    source = source.replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${strings['meta.home.ogDescription']}$2`);
    source = source
      .replace(/"description":\s*"[^"]+"/, `"description": "${strings['meta.home.description']}"`)
      .replace(/"inLanguage":\s*"[^"]+"/, `"inLanguage": "${locale}"`);
  }
  return source;
}

for (const file of files) {
  const path = resolve(root, file);
  let source = readFileSync(path, 'utf8');
  source = source.replace(/<html lang="[^"]+">/, `<html lang="${locale}">`);
  source = replaceLocalizedContents(source);
  source = replaceLocalizedAttributes(source);
  source = renderMeta(source, file);
  writeFileSync(path, source);
}
