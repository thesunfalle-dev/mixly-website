(() => {
  'use strict';

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  let navigating = false;
  let controller = null;
  const scriptLoads = new Map();

  const closeMobileMenu = ({ restoreFocus = false } = {}) => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const toggle = document.querySelector('[data-mobile-menu-open], .mobile-menu-toggle');
    mobileMenu?.classList.remove('is-open');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-menu-open');
    if (restoreFocus) toggle?.focus();
  };

  const isPageLink = (link) => {
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return false;
    if (link.closest('dialog') || /^mailto:|^tel:|^javascript:/i.test(link.getAttribute('href') || '')) return false;
    const next = new URL(link.href, location.href);
    const current = new URL(location.href);
    return next.origin === current.origin && !(next.pathname === current.pathname && next.search === current.search);
  };

  const executeInlineScripts = () => {
    document.body.querySelectorAll('script:not([src])').forEach((script) => {
      if (!script.textContent.trim() || script.textContent.includes('__mixlySetLocalizedImage')) return;
      try { Function(script.textContent)(); } catch (error) { console.error('Page script failed after navigation', error); }
    });
  };

  const mountOptionalBlocks = () => {
    if (document.querySelector('[data-premium-block]') && window.MixlyPremium) window.MixlyPremium.mount();
  };

  const loadScript = (src, ready) => {
    if (ready()) return Promise.resolve();
    if (scriptLoads.has(src)) return scriptLoads.get(src);
    const load = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Could not load ${src}`));
      document.head.appendChild(script);
    });
    scriptLoads.set(src, load);
    return load;
  };

  const prepareArticleRuntime = async (incoming) => {
    if (!incoming.querySelector('.article-page')) return;
    await Promise.all([
      loadScript('/static-article-shell.js', () => Boolean(window.MixlyArticleShell)),
      loadScript('/article-toc.js', () => Boolean(window.MixlyArticleToc)),
    ]);
  };

  const mountArticleRuntime = () => {
    if (!document.querySelector('.article-page')) return;
    window.MixlyArticleShell?.mount();
    window.MixlyArticleToc?.mount();
  };

  const updateHead = (incoming) => {
    document.title = incoming.title;
    document.documentElement.lang = incoming.documentElement.lang || document.documentElement.lang;
    ['description', 'theme-color'].forEach((name) => {
      const next = incoming.querySelector(`meta[name="${name}"]`);
      const current = document.querySelector(`meta[name="${name}"]`);
      if (next && current) current.setAttribute('content', next.getAttribute('content') || '');
    });
  };

  const scrollToDestination = (url) => {
    const id = url.hash ? decodeURIComponent(url.hash.slice(1)) : '';
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView({ block: 'start' });
    else window.scrollTo(0, 0);
  };

  const swapPage = (incoming, url, push) => {
    updateHead(incoming);
    document.body.replaceWith(incoming.body.cloneNode(true));
    document.documentElement.dataset.pageNavigation = 'spa';
    if (push) history.pushState({}, '', url.href);

    // The language is already present in the static first-paint markup. This
    // call only restores switcher controls after an in-document navigation.
    if (window.MixlyI18n) window.MixlyI18n.applyLocale(window.MixlyI18n.detectLocale(), false);
    executeInlineScripts();
    mountArticleRuntime();
    mountOptionalBlocks();
    closeMobileMenu();
    requestAnimationFrame(() => scrollToDestination(url));
  };

  const navigate = async (url, { push = true } = {}) => {
    if (navigating) return;
    navigating = true;
    controller?.abort();
    controller = new AbortController();

    try {
      const response = await fetch(url.href, {
        credentials: 'same-origin',
        headers: { Accept: 'text/html' },
        signal: controller.signal,
      });
      if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) throw new Error('HTML page was not returned');
      const incoming = new DOMParser().parseFromString(await response.text(), 'text/html');
      await prepareArticleRuntime(incoming);
      swapPage(incoming, url, push);
    } catch (error) {
      if (error.name !== 'AbortError') location.assign(url.href);
    } finally {
      navigating = false;
    }
  };

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const toggle = event.target.closest('[data-mobile-menu-open], .mobile-menu-toggle');
    if (toggle) {
      const menu = document.querySelector('#mobile-menu');
      if (!menu) return;
      event.preventDefault();
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('mobile-menu-open', open);
      return;
    }

    const link = event.target.closest('a[href]');
    if (!isPageLink(link)) return;
    event.preventDefault();
    navigate(new URL(link.href, location.href));
  }, true);

  window.addEventListener('popstate', () => navigate(new URL(location.href), { push: false }));
  window.addEventListener('pageshow', () => closeMobileMenu());
  window.MixlyPageNav = { navigate };
})();
