(() => {
  'use strict';

  var DOC_META = {
    privacy: { file: 'privacy.html' },
    cookies: { file: 'cookies.html' },
    terms: { file: 'terms.html' },
    eula: { file: 'eula.html' },
    support: { file: 'support.html' }
  };

  var sectionNav = null;
  var tocModeMedia = null;
  var tocModeHandler = null;
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

  function clearTocModeListener() {
    if (tocModeMedia && tocModeHandler) {
      if (tocModeMedia.removeEventListener) tocModeMedia.removeEventListener('change', tocModeHandler);
      else if (tocModeMedia.removeListener) tocModeMedia.removeListener(tocModeHandler);
    }
    tocModeMedia = null;
    tocModeHandler = null;
  }

  function pinDesktopToc(tocEl) {
    if (!tocEl) return;
    var run = function () {
      if (window.MixlyTocPin && typeof window.MixlyTocPin.pin === 'function') {
        window.MixlyTocPin.pin(tocEl, {
          layoutSelector: '.legal-layout',
          spacerAttr: 'data-toc-spacer'
        });
        return true;
      }
      return false;
    };
    if (run()) return;
    var script = document.createElement('script');
    script.src = '/toc-pin.js';
    script.onload = function () { run(); };
    document.head.appendChild(script);
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

  function enhanceExistingStatic(lang) {
    var bodyEl = document.querySelector('#legal-body');
    var tocEl = document.querySelector('#legal-toc');
    if (!bodyEl || !tocEl) return false;
    var sections = Array.prototype.slice.call(bodyEl.querySelectorAll('.legal-section[id]'));
    if (!sections.length) return false;

    // Static HTML is the RU source of truth. Keep it when locale is RU so a
    // failed JS path never wipes a readable no-JS document mid-render.
    if (lang !== 'ru') return false;

    var dropdown = tocEl.querySelector('.legal-toc-dropdown');
    var tocNav = tocEl.querySelector('.legal-toc-nav');
    var tocCurrent = tocEl.querySelector('#legal-toc-current, .legal-toc-current');
    var summary = tocEl.querySelector('.legal-toc-summary');
    if (!dropdown || !tocNav || !tocCurrent) return false;

    clearTocModeListener();
    tocModeMedia = window.matchMedia('(min-width: 981px)');
    tocModeHandler = function () {
      dropdown.open = tocModeMedia.matches;
      if (summary) {
        summary.tabIndex = tocModeMedia.matches ? -1 : 0;
        if (tocModeMedia.matches) summary.setAttribute('aria-hidden', 'true');
        else summary.removeAttribute('aria-hidden');
      }
    };
    tocModeHandler();
    if (tocModeMedia.addEventListener) tocModeMedia.addEventListener('change', tocModeHandler);
    else if (tocModeMedia.addListener) tocModeMedia.addListener(tocModeHandler);

    bindToc(tocNav, sections, tocCurrent, dropdown);
    pinDesktopToc(tocEl);
    return true;
  }

  function renderLegal(lang) {
    var doc = detectDoc();
    var pack = packFor(doc, lang);
    var titleEl = document.querySelector('#legal-title');
    var metaEl = document.querySelector('#legal-meta');
    var noticeEl = document.querySelector('#legal-notice');
    var bodyEl = document.querySelector('#legal-body');
    var tocEl = document.querySelector('#legal-toc');
    if (!titleEl || !metaEl || !bodyEl || !tocEl) return;

    // Prefer static RU markup; only rebuild when switching locale or when the
    // static body is missing (broken shell).
    if (enhanceExistingStatic(lang)) return;
    if (!pack) return;

    var nextTitle = pack.title;
    var nextMeta = pack.meta || '';
    var nextNotice = pack.notice || '';
    var nextBody = document.createElement('div');
    nextBody.className = 'legal-body';
    nextBody.id = 'legal-body';

    var nextToc = document.createElement('aside');
    nextToc.className = 'legal-toc';
    nextToc.id = 'legal-toc';
    nextToc.setAttribute('aria-label', (window.MixlyI18n && window.MixlyI18n.t('legal.toc')) || 'On this page');

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
    nextToc.appendChild(dropdown);

    var sectionNodes = [];
    (pack.sections || []).forEach(function (section) {
      var sectionEl = document.createElement('section');
      sectionEl.id = section.id;
      sectionEl.className = 'legal-section';

      if (doc === 'cookies' && section.id === 's1') {
        var analyticsAnchor = document.createElement('span');
        analyticsAnchor.id = 'analytics-settings';
        sectionEl.appendChild(analyticsAnchor);
      }

      var h2 = document.createElement('h2');
      h2.textContent = section.title;
      sectionEl.appendChild(h2);
      renderBlocks(sectionEl, section.blocks);
      nextBody.appendChild(sectionEl);
      sectionNodes.push(sectionEl);

      var link = document.createElement('a');
      link.href = '#' + section.id;
      link.textContent = section.title.replace(/^\d+\.\s*/, '');
      tocNav.appendChild(link);
    });

    if (!sectionNodes.length) return;

    if (sectionNodes[0]) {
      tocCurrent.textContent = (tocNav.querySelector('a') || {}).textContent || '';
    }

    // Atomic commit: only replace live DOM after a complete build.
    document.title = nextTitle + ' · Mixly';
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', nextNotice || nextTitle);
    titleEl.textContent = nextTitle;
    metaEl.textContent = nextMeta;

    if (noticeEl) {
      noticeEl.textContent = '';
      if (nextNotice) {
        noticeEl.hidden = false;
        noticeEl.appendChild(linkify(nextNotice));
      } else {
        noticeEl.hidden = true;
      }
    }

    bodyEl.replaceWith(nextBody);
    tocEl.replaceWith(nextToc);

    clearTocModeListener();
    tocModeMedia = window.matchMedia('(min-width: 981px)');
    tocModeHandler = function () {
      dropdown.open = tocModeMedia.matches;
      summary.tabIndex = tocModeMedia.matches ? -1 : 0;
      if (tocModeMedia.matches) summary.setAttribute('aria-hidden', 'true');
      else summary.removeAttribute('aria-hidden');
    };
    tocModeHandler();
    if (tocModeMedia.addEventListener) tocModeMedia.addEventListener('change', tocModeHandler);
    else if (tocModeMedia.addListener) tocModeMedia.addListener(tocModeHandler);

    bindToc(tocNav, sectionNodes, tocCurrent, dropdown);
    pinDesktopToc(nextToc);
  }

  var localeBound = false;

  function mount(lang) {
    if (!document.body.hasAttribute('data-legal-doc')) return;
    if (!localeBound) {
      localeBound = true;
      document.addEventListener('mixly:locale', function (event) {
        renderLegal((event.detail && event.detail.lang) || 'en');
      });
    }
    var nextLang =
      lang ||
      (window.MixlyI18n && window.MixlyI18n.getLang && window.MixlyI18n.getLang()) ||
      document.documentElement.lang ||
      'ru';
    renderLegal(nextLang);
  }

  function init() {
    mount();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.MixlyLegal = { render: renderLegal, detectDoc: detectDoc, mount: mount };
})();
