/** Shared release markup for the changelog and localized home generators. */
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const context = {};
vm.runInNewContext(readFileSync(new URL('../changelog-content.js', import.meta.url), 'utf8'), context, {
  filename: 'changelog-content.js',
});
export const { CHANGELOG_META, RELEASES } = context;

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function publicPath(locale) {
  if (locale === 'ru') return '/changelog';
  return `/${locale}/changelog`;
}

export function releaseListHtml(locale, { openFirst = true, permalinkBase = '' } = {}) {
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

export function injectHomeList(html, locale) {
  const meta = CHANGELOG_META[locale];
  const path = publicPath(locale);
  const list = releaseListHtml(locale, { openFirst: true, permalinkBase: path });
  const replacement = `<div class="changelog-list" data-i18n-aria="changelog.listAria" aria-label="${escapeHtml(meta.listAria)}">
          ${list}
        </div>
        <p class="changelog-page-link"><a href="${escapeHtml(path)}">${escapeHtml(meta.homeCta)}</a></p>`;
  // Match through the section end so nested release bodies cannot leave duplicates (MIX-83).
  const pattern = /<div class="changelog-list"[\s\S]*?\s*(?=<\/section>)/;
  if (!pattern.test(html)) {
    throw new Error(`Could not inject changelog list into home for locale ${locale}`);
  }
  return html.replace(pattern, `${replacement}\n      `);
}
