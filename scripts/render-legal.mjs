#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const documents = ['privacy', 'cookies', 'terms', 'eula', 'support'];
const context = {};
vm.runInNewContext(readFileSync(resolve(root, 'legal-content.js'), 'utf8'), context, { filename: 'legal-content.js' });

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function linkify(value) {
  return escapeHtml(value).replace(/\[\[a:([^\]]+)\]\]([\s\S]*?)\[\[\/a\]\]/g, (_, href, label) => `<a href="${href}">${label}</a>`);
}

function renderBlocks(blocks) {
  return blocks.map((block) => {
    if (block.type === 'ul') return `<ul>${block.items.map((item) => `<li>${linkify(item)}</li>`).join('')}</ul>`;
    return `<p${block.className === 'notice' || block.notice ? ' class="legal-notice"' : ''}>${linkify(block.text)}</p>`;
  }).join('');
}

function render(doc) {
  const pack = context.LEGAL_DOCS[doc].ru;
  const sections = pack.sections.map((section, index) => `<section id="${section.id}" class="legal-section">${doc === 'cookies' && index === 0 ? '<span id="analytics-settings"></span>' : ''}<h2>${escapeHtml(section.title)}</h2>${renderBlocks(section.blocks)}</section>`).join('');
  const toc = pack.sections.map((section) => `<a href="#${section.id}">${escapeHtml(section.title.replace(/^\d+\.\s*/, ''))}</a>`).join('');
  return {
    header: `<h1 id="legal-title">${escapeHtml(pack.title)}</h1><p class="legal-meta" id="legal-meta">${escapeHtml(pack.meta || '')}</p><p class="legal-notice" id="legal-notice">${linkify(pack.notice || '')}</p>`,
    body: `<div class="legal-body" id="legal-body">${sections}</div>`,
    toc: `<aside class="legal-toc" id="legal-toc" aria-label="Содержание"><details class="legal-toc-dropdown" open><summary class="legal-toc-summary"><span class="legal-toc-label">Содержание</span><span class="legal-toc-current" id="legal-toc-current">${escapeHtml(pack.sections[0]?.title.replace(/^\d+\.\s*/, '') || '')}</span></summary><nav class="legal-toc-nav" aria-label="Разделы документа">${toc}</nav></details></aside>`,
  };
}

for (const doc of documents) {
  const file = resolve(root, `${doc}.html`);
  const fallback = render(doc);
  let html = readFileSync(file, 'utf8');
  html = html.replace(/<h1 id="legal-title">[\s\S]*?<\/h1>\s*<p class="legal-meta" id="legal-meta">[\s\S]*?<\/p>\s*<p class="legal-notice" id="legal-notice">[\s\S]*?<\/p>/, fallback.header);
  html = html.replace(/<div class="legal-body" id="legal-body">[\s\S]*?<\/div>/, fallback.body);
  html = html.replace(/<aside class="legal-toc" id="legal-toc" aria-label="[^"]*">[\s\S]*?<\/aside>/, fallback.toc);
  writeFileSync(file, html);
}
