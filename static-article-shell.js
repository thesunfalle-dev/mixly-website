(() => {
  const COPY = {
    ru: { home: 'О приложении', features: 'Возможности', updates: 'Обновления', blog: 'Блог', download: 'Скачать в App Store', menu: 'Открыть меню', menuAria: 'Мобильная навигация', socials: 'Соцсети', app: 'Приложение', docs: 'Документы', privacy: 'Конфиденциальность', cookies: 'Cookies и аналитика', terms: 'Условия использования', eula: 'Лицензия', support: 'Поддержка', age: 'Только для взрослых 18+', tagline: 'Идеи для кальяна, которые хочется сохранить' },
    en: { home: 'About', features: 'Features', updates: 'Updates', blog: 'Blog', download: 'Download on the App Store', menu: 'Open menu', menuAria: 'Mobile navigation', socials: 'Social', app: 'App', docs: 'Legal', privacy: 'Privacy', cookies: 'Cookies & analytics', terms: 'Terms of Use', eula: 'License', support: 'Support', age: 'Adults only 18+', tagline: 'Hookah ideas worth keeping' },
    de: { home: 'Über die App', features: 'Funktionen', updates: 'Updates', blog: 'Blog', download: 'Im App Store laden', menu: 'Menü öffnen', menuAria: 'Mobile Navigation', socials: 'Social', app: 'App', docs: 'Dokumente', privacy: 'Datenschutz', cookies: 'Cookies & Analysen', terms: 'Nutzungsbedingungen', eula: 'Lizenz', support: 'Support', age: 'Nur für Erwachsene 18+', tagline: 'Shisha-Ideen, die man behalten will' }
  };
  const ARTICLES = [
    {
      paths: { ru: '/ru/blog/kak-pravilno-smeshivat-tabak-dlya-kalyana', en: '/en/blog/how-to-mix-hookah-tobacco', de: '/de/blog/wie-man-shisha-tabak-richtig-mischt' },
      copy: {
        ru: { title: 'Как правильно смешивать табак для кальяна', excerpt: 'Базовые пропорции, сочетания вкусов и понятный алгоритм первого микса.' },
        en: { title: 'How to Mix Hookah Tobacco', excerpt: 'A practical starting point for ratios, pairings and your first mixes.' },
        de: { title: 'Shisha-Tabak richtig mischen', excerpt: 'Ein einfacher Einstieg in Mischverhältnisse, Kombinationen und erste Mixe.' }
      }
    },
    {
      paths: { ru: '/ru/blog/proportsii-tabaka-dlya-kalyana', en: '/en/blog/hookah-tobacco-mixing-ratios', de: '/de/blog/shisha-tabak-mischverhaeltnisse' },
      copy: {
        ru: { title: 'Пропорции табака для кальяна: как смешивать вкусы', excerpt: 'Когда подходят 50/50, 70/30 и 60/30/10 и как не переборщить с акцентом.' },
        en: { title: 'Hookah Tobacco Mixing Ratios', excerpt: 'When to use 50/50, 70/30 and 60/30/10 without overdoing an accent.' },
        de: { title: 'Shisha-Tabak: Mischverhältnisse', excerpt: 'Wann 50/50, 70/30 und 60/30/10 sinnvoll sind und wie Akzente dosiert werden.' }
      }
    },
    {
      paths: { ru: '/ru/blog/sochetaniya-vkusov-dlya-kalyana', en: '/en/blog/hookah-flavor-combinations', de: '/de/blog/shisha-geschmackskombinationen' },
      copy: {
        ru: { title: 'Сочетания вкусов для кальяна: что с чем смешивать', excerpt: 'Как сочетать фрукты, ягоды, цитрусы, свежие и десертные вкусы.' },
        en: { title: 'Hookah Flavor Combinations', excerpt: 'How to pair fruit, berries, citrus, fresh and dessert flavors.' },
        de: { title: 'Shisha-Geschmackskombinationen', excerpt: 'So kombinierst du Früchte, Beeren, Zitrus-, frische und Dessert-Aromen.' }
      }
    }
  ];
  const RELATED_COPY = {
    ru: { eyebrow: 'Практика', title: 'Читайте также', aria: 'Связанные статьи' },
    en: { eyebrow: 'Practice', title: 'Read next', aria: 'Related articles' },
    de: { eyebrow: 'Praxis', title: 'Weiterlesen', aria: 'Verwandte Artikel' }
  };
  const link = (href, text) => `<a href="${href}">${text}</a>`;

  function pathForLocation() {
    return window.location.pathname.replace(/\/$/, '');
  }

  function currentArticle() {
    const path = pathForLocation();
    return ARTICLES.find((article) => Object.values(article.paths).includes(path));
  }

  function normalizeToc() {
    const toc = document.querySelector('.article-toc');
    if (!toc) return;

    // Avoid stacking listeners when mount() runs again after SPA navigations.
    if (toc.dataset.tocPinBound === '1') {
      window.dispatchEvent(new Event('resize'));
      return;
    }
    toc.dataset.tocPinBound = '1';

    const desktop = window.matchMedia('(min-width: 981px)');
    const pinTop = 96;
    const edgeGap = 32;
    let pinnedLeft = 0;
    let pinnedWidth = 0;
    let spacer = null;
    let frame = 0;

    const ensureSpacer = () => {
      if (spacer && spacer.isConnected) return spacer;
      spacer = toc.previousElementSibling;
      if (!spacer || spacer.getAttribute('data-article-toc-spacer') !== '1') {
        spacer = document.createElement('div');
        spacer.setAttribute('data-article-toc-spacer', '1');
        spacer.setAttribute('aria-hidden', 'true');
        toc.parentNode.insertBefore(spacer, toc);
      }
      return spacer;
    };

    const clearInline = () => {
      toc.style.position = '';
      toc.style.top = '';
      toc.style.left = '';
      toc.style.width = '';
      toc.style.maxHeight = '';
      toc.style.overflowY = '';
      toc.style.bottom = '';
      if (spacer && spacer.isConnected) {
        spacer.style.display = 'none';
        spacer.style.height = '';
        spacer.style.width = '';
      }
    };

    const measureColumn = () => {
      toc.style.position = 'static';
      toc.style.top = '';
      toc.style.left = '';
      toc.style.width = '';
      toc.style.maxHeight = '';
      toc.style.bottom = '';
      const slot = ensureSpacer();
      slot.style.display = 'none';
      const rect = toc.getBoundingClientRect();
      pinnedLeft = Math.round(rect.left);
      pinnedWidth = Math.max(160, Math.round(rect.width));
      slot.style.display = 'block';
      slot.style.width = `${pinnedWidth}px`;
      slot.style.height = '1px';
      slot.style.pointerEvents = 'none';
      slot.style.visibility = 'hidden';
    };

    const applyPin = () => {
      if (!toc.isConnected) return;
      if (!desktop.matches) {
        clearInline();
        return;
      }

      const footer = document.querySelector('.site-footer');
      const layout = document.querySelector('.article-layout');
      const footerTop = footer ? footer.getBoundingClientRect().top : window.innerHeight;
      const layoutBottom = layout ? layout.getBoundingClientRect().bottom : footerTop;
      // Also respect related/premium blocks after the article layout.
      const related = document.querySelector('.article-related, [data-premium-block]');
      const relatedTop = related ? related.getBoundingClientRect().top : footerTop;
      const stopLine = Math.min(footerTop, layoutBottom, relatedTop) - edgeGap;

      toc.style.position = 'fixed';
      toc.style.left = `${pinnedLeft}px`;
      toc.style.width = `${pinnedWidth}px`;
      toc.style.bottom = 'auto';
      toc.style.overflowY = 'auto';

      const viewportCap = Math.max(120, window.innerHeight - pinTop - edgeGap);
      toc.style.maxHeight = `${viewportCap}px`;
      let tocHeight = toc.getBoundingClientRect().height || toc.offsetHeight;

      let top = pinTop;
      if (top + tocHeight > stopLine) {
        top = stopLine - tocHeight;
      }
      if (top < edgeGap) {
        top = edgeGap;
        const tightCap = Math.max(80, stopLine - top);
        toc.style.maxHeight = `${tightCap}px`;
        tocHeight = toc.getBoundingClientRect().height || toc.offsetHeight;
        top = Math.min(pinTop, stopLine - tocHeight);
        if (top < edgeGap) top = edgeGap;
      }
      toc.style.top = `${Math.round(top)}px`;
    };

    const syncLayout = () => {
      if (!toc.isConnected) return;
      if (!desktop.matches) {
        clearInline();
        return;
      }
      measureColumn();
      applyPin();
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        applyPin();
      });
    };

    syncLayout();
    window.addEventListener('resize', syncLayout);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (desktop.addEventListener) desktop.addEventListener('change', syncLayout);
    else desktop.addListener(syncLayout);
    requestAnimationFrame(() => requestAnimationFrame(syncLayout));
  }

  function addRelatedArticles(article, lang) {
    const content = document.querySelector('.article-page-content');
    if (!content || document.querySelector('.article-related')) return;
    const copy = RELATED_COPY[lang] || RELATED_COPY.en;
    const related = ARTICLES.filter((item) => item !== article);
    const cards = related.map((item) => {
      const itemCopy = item.copy[lang] || item.copy.en;
      return `<article><a href="${item.paths[lang] || item.paths.en}"><p>${copy.eyebrow}</p><h3>${itemCopy.title}</h3><span>${itemCopy.excerpt}</span><b>→</b></a></article>`;
    }).join('');
    content.insertAdjacentHTML('beforeend', `<section class="article-related" aria-labelledby="article-related-title"><h2 id="article-related-title">${copy.title}</h2><div class="article-related-grid" aria-label="${copy.aria}">${cards}</div></section>`);
  }

  function enhanceArticlePage() {
    if (!document.querySelector('.article-page')) return;
    const lang = document.documentElement.lang || 'en';
    const article = currentArticle();
    // Static articles already include related + premium + TOC markup. Still
    // re-bind TOC geometry and ensure premium mounts after SPA body swaps.
    normalizeToc();
    if (article) addRelatedArticles(article, lang);
    const mountPremium = () => window.MixlyPremium?.mount();
    if (window.MixlyPremium) mountPremium();
    else import('/premium-block.js').then(mountPremium).catch(() => {});
  }

  function ensureShell() {
    const lang = document.documentElement.lang || 'en';
    const copy = COPY[lang] || COPY.en;
    const article = currentArticle();
    const header = document.querySelector('.site-header');
    const footer = document.querySelector('.site-footer');
    if (!header || !footer) return;
    // Full static shells (data-shell-static) only need article enhancements.
    if (header.dataset.shellStatic === 'true' || header.dataset.sharedShell === 'true') {
      enhanceArticlePage();
      return;
    }
    header.dataset.sharedShell = 'true';

    let actions = header.querySelector('.header-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'header-actions';
      actions.innerHTML = `<a class="header-cta" href="https://apps.apple.com/app/id6762792005" rel="noopener"><span class="cta-full">${copy.download}</span><span class="cta-short">App Store</span></a>`;
      header.appendChild(actions);
    }
    if (!actions.querySelector('[data-static-lang-switch]')) {
      actions.insertAdjacentHTML('beforeend', `<div class="lang-switch" data-static-lang-switch><button type="button" class="lang-switch-toggle" aria-expanded="false" aria-label="Language">${lang.toUpperCase()}</button><ul class="lang-switch-menu" hidden role="radiogroup" aria-label="Language"><li><button type="button" data-lang="ru" role="radio" aria-checked="${lang === 'ru'}">RU</button></li><li><button type="button" data-lang="en" role="radio" aria-checked="${lang === 'en'}">EN</button></li><li><button type="button" data-lang="de" role="radio" aria-checked="${lang === 'de'}">DE</button></li></ul></div><button class="mobile-menu-toggle" type="button" aria-label="${copy.menu}" aria-controls="mobile-menu" aria-expanded="false"><span></span><span></span><span></span></button>`);
    }
    if (!document.querySelector('#mobile-menu')) header.insertAdjacentHTML('afterend', `<aside class="mobile-menu" id="mobile-menu" aria-label="${copy.menuAria}" aria-hidden="true"><nav aria-label="${copy.menuAria}">${link('/#how-it-works', copy.home)}${link('/#features', copy.features)}${link('/#changelog', copy.updates)}${link('/blog.html', copy.blog)}</nav></aside>`);
    if (!footer.querySelector('.footer-main')) footer.innerHTML = `<div class="footer-main"><div class="footer-brand-block"><a class="brand-app footer-brand" href="/">mixly</a><p>Mixly app © 2026</p></div><div class="footer-links"><div><p>${copy.app}</p>${link('/#how-it-works', copy.home)}${link('/#features', copy.features)}${link('/#changelog', copy.updates)}${link('/blog.html', copy.blog)}<a href="https://apps.apple.com/app/id6762792005" rel="noopener">App Store</a></div><div><p>${copy.docs}</p>${link('/privacy.html', copy.privacy)}${link('/cookies.html', copy.cookies)}${link('/terms.html', copy.terms)}${link('/eula.html', copy.eula)}${link('/support.html', copy.support)}</div></div></div><div class="footer-bottom"><p>${copy.age}</p><p>${copy.tagline}</p></div>`;

    const menu = document.querySelector('#mobile-menu');
    const toggle = header.querySelector('.mobile-menu-toggle');
    const switchToggle = header.querySelector('.lang-switch-toggle');
    const switchMenu = header.querySelector('.lang-switch-menu');
    if (toggle && menu && toggle.dataset.shellBound !== '1') {
      toggle.dataset.shellBound = '1';
      toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(open));
        menu.classList.toggle('is-open', open);
        menu.setAttribute('aria-hidden', String(!open));
        document.body.classList.toggle('mobile-menu-open', open);
      });
    }
    if (switchToggle && switchMenu && switchToggle.dataset.shellBound !== '1') {
      switchToggle.dataset.shellBound = '1';
      switchToggle.addEventListener('click', () => {
        const open = switchToggle.getAttribute('aria-expanded') !== 'true';
        switchToggle.setAttribute('aria-expanded', String(open));
        switchMenu.hidden = !open;
      });
    }
    if (!document.documentElement.dataset.shellLangBound) {
      document.documentElement.dataset.shellLangBound = '1';
      document.addEventListener('click', (event) => {
        const button = event.target.closest('[data-lang]');
        const current = currentArticle();
        if (button && current && current.paths[button.dataset.lang]) {
          window.location.assign(current.paths[button.dataset.lang]);
        }
        const openMenu = document.querySelector('.lang-switch-menu:not([hidden])');
        if (openMenu && !event.target.closest('[data-static-lang-switch]')) {
          const tgl = openMenu.parentElement?.querySelector('.lang-switch-toggle');
          if (tgl) tgl.setAttribute('aria-expanded', 'false');
          openMenu.hidden = true;
        }
      });
      document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        const toggleBtn = document.querySelector('.mobile-menu-toggle[aria-expanded="true"]');
        if (toggleBtn) toggleBtn.click();
        const openMenu = document.querySelector('.lang-switch-menu:not([hidden])');
        if (openMenu) {
          openMenu.hidden = true;
          const tgl = openMenu.parentElement?.querySelector('.lang-switch-toggle');
          if (tgl) {
            tgl.setAttribute('aria-expanded', 'false');
            tgl.focus();
          }
        }
      });
    }

    enhanceArticlePage();
  }

  function init() {
    ensureShell();
  }

  window.MixlyArticleShell = { mount: init, enhance: enhanceArticlePage };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
