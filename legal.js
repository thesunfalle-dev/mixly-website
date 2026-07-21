(() => {
  'use strict';

  var DOC_META = {
    privacy: { file: 'privacy.html' },
    terms: { file: 'terms.html' },
    eula: { file: 'eula.html' },
    support: { file: 'support.html' }
  };

  var sectionNav = null;

  function detectDoc() {
    var fromAttr = document.body.getAttribute('data-legal-doc');
    if (fromAttr && DOC_META[fromAttr]) return fromAttr;
    var path = (location.pathname || '').split('/').pop() || '';
    var base = path.replace(/\.html$/i, '').toLowerCase();
    if (DOC_META[base]) return base;
    return 'privacy';
  }

  function linkify(text) {
    if (!text) return document.createTextNode('');
    var frag = document.createDocumentFragment();
    var re = /\[\[a:([^\]]+)\]\]([\s\S]*?)\[\[\/a\]\]/g;
    var last = 0;
    var match;
    while ((match = re.exec(text))) {
      if (match.index > last) frag.appendChild(document.createTextNode(text.slice(last, match.index)));
      var a = document.createElement('a');
      a.href = match[1];
      a.textContent = match[2];
      if (/^https?:/i.test(match[1]) || /^mailto:/i.test(match[1])) a.rel = 'noopener';
      frag.appendChild(a);
      last = match.index + match[0].length;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    return frag;
  }

  function renderBlocks(container, blocks) {
    (blocks || []).forEach(function (block) {
      if (block.type === 'ul') {
        var ul = document.createElement('ul');
        (block.items || []).forEach(function (item) {
          var li = document.createElement('li');
          li.appendChild(linkify(item));
          ul.appendChild(li);
        });
        container.appendChild(ul);
        return;
      }
      var p = document.createElement('p');
      if (block.className === 'notice' || block.notice) p.className = 'legal-notice';
      p.appendChild(linkify(block.text || ''));
      container.appendChild(p);
    });
  }

  function packFor(doc, lang) {
    var root = window.LEGAL_DOCS && window.LEGAL_DOCS[doc];
    if (!root) return null;
    return root[lang] || root.en || root.ru || null;
  }

  function bindToc(tocNav, sections, currentEl, dropdown) {
    if (sectionNav && sectionNav.destroy) sectionNav.destroy();
    sectionNav = null;
    if (!window.MixlyScrollNav || !tocNav || !sections.length) return;
    sectionNav = window.MixlyScrollNav.bindSectionNav({
      nav: tocNav,
      sections: sections,
      activeClass: 'is-active',
      currentEl: currentEl,
      dropdown: dropdown
    });
  }

  function renderLegal(lang) {
    var doc = detectDoc();
    var pack = packFor(doc, lang);
    var titleEl = document.querySelector('#legal-title');
    var metaEl = document.querySelector('#legal-meta');
    var noticeEl = document.querySelector('#legal-notice');
    var bodyEl = document.querySelector('#legal-body');
    var tocEl = document.querySelector('#legal-toc');
    if (!pack || !titleEl || !metaEl || !bodyEl || !tocEl) return;

    document.title = pack.title + ' · Mixly';
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', pack.notice || pack.title);

    titleEl.textContent = pack.title;
    metaEl.textContent = pack.meta || '';

    if (noticeEl) {
      noticeEl.textContent = '';
      if (pack.notice) {
        noticeEl.hidden = false;
        noticeEl.appendChild(linkify(pack.notice));
      } else {
        noticeEl.hidden = true;
      }
    }

    bodyEl.textContent = '';
    tocEl.textContent = '';

    var dropdown = document.createElement('details');
    dropdown.className = 'legal-toc-dropdown';

    var summary = document.createElement('summary');
    summary.className = 'legal-toc-summary';

    var tocLabel = document.createElement('span');
    tocLabel.className = 'legal-toc-label';
    tocLabel.textContent = (window.MixlyI18n && window.MixlyI18n.t('legal.toc')) || 'On this page';

    var tocCurrent = document.createElement('span');
    tocCurrent.className = 'legal-toc-current';
    tocCurrent.id = 'legal-toc-current';

    summary.append(tocLabel, tocCurrent);
    dropdown.appendChild(summary);

    var tocNav = document.createElement('nav');
    tocNav.className = 'legal-toc-nav';
    tocNav.setAttribute('aria-label', (window.MixlyI18n && window.MixlyI18n.t('legal.tocAria')) || 'Document sections');
    dropdown.appendChild(tocNav);
    tocEl.appendChild(dropdown);

    var sectionNodes = [];
    (pack.sections || []).forEach(function (section) {
      var sectionEl = document.createElement('section');
      sectionEl.id = section.id;
      sectionEl.className = 'legal-section';

      var h2 = document.createElement('h2');
      h2.textContent = section.title;
      sectionEl.appendChild(h2);
      renderBlocks(sectionEl, section.blocks);
      bodyEl.appendChild(sectionEl);
      sectionNodes.push(sectionEl);

      var link = document.createElement('a');
      link.href = '#' + section.id;
      link.textContent = section.title.replace(/^\d+\.\s*/, '');
      tocNav.appendChild(link);
    });

    if (sectionNodes[0]) {
      tocCurrent.textContent = (tocNav.querySelector('a') || {}).textContent || '';
    }

    var desktopToc = window.matchMedia('(min-width: 981px)');
    var syncTocMode = function () {
      dropdown.open = desktopToc.matches;
    };
    syncTocMode();
    if (desktopToc.addEventListener) desktopToc.addEventListener('change', syncTocMode);
    else if (desktopToc.addListener) desktopToc.addListener(syncTocMode);

    summary.addEventListener('click', function (event) {
      if (desktopToc.matches) event.preventDefault();
    });

    bindToc(tocNav, sectionNodes, tocCurrent, dropdown);
  }

  function init() {
    if (!document.body.hasAttribute('data-legal-doc')) return;

    document.addEventListener('mixly:locale', function (event) {
      renderLegal((event.detail && event.detail.lang) || 'en');
    });

    var lang = (window.MixlyI18n && window.MixlyI18n.getLang && window.MixlyI18n.getLang()) || 'en';
    renderLegal(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.MixlyLegal = { render: renderLegal, detectDoc: detectDoc };
})();
