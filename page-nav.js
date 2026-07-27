(() => {
  'use strict';

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  let navigating = false;
  let controller = null;
  let pendingTimer = 0;
  let navGeneration = 0;
  const scriptLoads = new Map();
  const FETCH_TIMEOUT_MS = 8000;
  const PENDING_HINT_MS = 160;

  const clearPendingHint = () => {
    window.clearTimeout(pendingTimer);
    pendingTimer = 0;
    document.documentElement.removeAttribute('data-nav-pending');
  };

  const unlockScroll = () => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.classList.remove('mobile-menu-open', 'hover-lock');
    document.documentElement.classList.remove(
      'is-veiled',
      'content-pending',
      'scroll-pinned',
      'i18n-pending'
    );
  };

  const closeMobileMenu = ({ restoreFocus = false } = {}) => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const toggle = document.querySelector('[data-mobile-menu-open], .mobile-menu-toggle');
    mobileMenu?.classList.remove('is-open');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-menu-open');
    unlockScroll();
    if (restoreFocus) toggle?.focus();
  };

  const closeDialogs = () => {
    document.querySelectorAll('dialog[open]').forEach((dialog) => {
      try {
        dialog.close();
      } catch (_) {
        dialog.removeAttribute('open');
      }
    });
  };

  const resetUiState = ({ restoreFocus = false } = {}) => {
    closeMobileMenu({ restoreFocus });
    closeDialogs();
    unlockScroll();
    clearPendingHint();
  };

  const normalizePath = (pathname) => {
    if (!pathname || pathname === '/') return '/';
    return pathname.replace(/\/index\.html$/i, '/').replace(/\/+$/, '') || '/';
  };

  const isPageLink = (link) => {
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return false;
    if (link.closest('dialog') || /^mailto:|^tel:|^javascript:/i.test(link.getAttribute('href') || '')) {
      return false;
    }
    const next = new URL(link.href, location.href);
    const current = new URL(location.href);
    if (next.origin !== current.origin) return false;
    // Same document hash navigation stays native so the browser scrolls.
    if (
      normalizePath(next.pathname) === normalizePath(current.pathname) &&
      next.search === current.search
    ) {
      return false;
    }
    return true;
  };

  const executeInlineScripts = () => {
    // Re-run body inline scripts after SPA body swap. Avoid Function()/eval —
    // production CSP allows 'unsafe-inline' but not 'unsafe-eval'.
    document.body.querySelectorAll('script:not([src])').forEach((oldScript) => {
      if (!oldScript.textContent.trim() || oldScript.textContent.includes('__mixlySetLocalizedImage')) return;
      try {
        const script = document.createElement('script');
        script.textContent = oldScript.textContent;
        oldScript.replaceWith(script);
      } catch (error) {
        console.error('Page script failed after navigation', error);
      }
    });
  };

  const mountOptionalBlocks = () => {
    if (document.querySelector('[data-premium-block]') && window.MixlyPremium) {
      window.MixlyPremium.mount();
    }
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

  const isArticleDoc = (doc) => Boolean(doc.querySelector('.article-page'));
  const isLegalDoc = (doc) => Boolean(doc.body && doc.body.hasAttribute('data-legal-doc'));

  const preparePageRuntime = async (incoming) => {
    const tasks = [];
    if (isArticleDoc(incoming)) {
      tasks.push(
        loadScript('/static-article-shell.js', () => Boolean(window.MixlyArticleShell)),
        loadScript('/article-toc.js', () => Boolean(window.MixlyArticleToc)),
        loadScript('/premium-block.js', () => Boolean(window.MixlyPremium)),
      );
    }
    if (isLegalDoc(incoming)) {
      tasks.push(
        loadScript('/i18n.js', () => Boolean(window.MixlyI18n)),
        loadScript('/scroll-nav.js', () => Boolean(window.MixlyScrollNav)),
        loadScript('/legal-content.js', () => Boolean(window.LEGAL_DOCS)),
        loadScript('/legal.js', () => Boolean(window.MixlyLegal)),
      );
    }
    if (tasks.length) await Promise.all(tasks);
  };

  const mountPageRuntime = () => {
    if (document.querySelector('.article-page')) {
      window.MixlyArticleShell?.mount();
      window.MixlyArticleToc?.mount();
      window.MixlyPremium?.mount();
    }
    if (document.body.hasAttribute('data-legal-doc')) {
      const lang =
        (window.MixlyI18n && window.MixlyI18n.getLang && window.MixlyI18n.getLang()) ||
        document.documentElement.lang ||
        'ru';
      if (window.MixlyLegal?.mount) window.MixlyLegal.mount(lang);
      else if (window.MixlyLegal?.render) window.MixlyLegal.render(lang);
    }
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
    if (target) {
      const header = document.querySelector('.site-header');
      const offset = header ? Math.ceil(header.getBoundingClientRect().height) + 12 : 24;
      const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset);
      window.scrollTo(0, top);
      return;
    }
    window.scrollTo(0, 0);
  };

  const swapPage = (incoming, url, push) => {
    updateHead(incoming);
    document.body.replaceWith(incoming.body.cloneNode(true));
    document.documentElement.dataset.pageNavigation = 'spa';
    if (push) history.pushState({}, '', url.href);

    // Locale is already in static first-paint markup; rebind switcher after swap.
    // Body clone replaces [data-lang-switch] nodes — bindSwitchers must run again
    // or the language menu stays dead until a full reload.
    if (window.MixlyI18n) {
      window.MixlyI18n.bindSwitchers?.();
      window.MixlyI18n.applyLocale(window.MixlyI18n.detectLocale(), false);
    }
    executeInlineScripts();
    mountPageRuntime();
    mountOptionalBlocks();
    resetUiState();
    requestAnimationFrame(() => scrollToDestination(url));
  };

  const hardNavigate = (url) => {
    resetUiState();
    location.assign(url.href);
  };

  const navigate = async (url, { push = true } = {}) => {
    navGeneration += 1;
    const generation = navGeneration;
    controller?.abort();
    controller = new AbortController();
    navigating = true;
    clearPendingHint();
    pendingTimer = window.setTimeout(() => {
      if (generation === navGeneration) {
        document.documentElement.setAttribute('data-nav-pending', '1');
      }
    }, PENDING_HINT_MS);

    const timeout = window.setTimeout(() => controller?.abort(), FETCH_TIMEOUT_MS);

    try {
      const response = await fetch(url.href, {
        credentials: 'same-origin',
        headers: { Accept: 'text/html' },
        signal: controller.signal,
      });
      if (generation !== navGeneration) return;
      if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) {
        throw new Error('HTML page was not returned');
      }
      const html = await response.text();
      if (!html || html.length < 200) {
        throw new Error('Empty HTML page was returned');
      }
      const incoming = new DOMParser().parseFromString(html, 'text/html');
      // SPA must land with footer / related / TOC content present in the body.
      if (isArticleDoc(incoming) && !incoming.querySelector('.site-footer')) {
        throw new Error('Article shell missing footer');
      }
      await preparePageRuntime(incoming);
      if (generation !== navGeneration) return;
      swapPage(incoming, url, push);
    } catch (error) {
      if (error.name === 'AbortError') {
        // Superseded by a newer navigation, or timed out.
        if (generation === navGeneration) hardNavigate(url);
        return;
      }
      if (window.MixlyMonitoring?.captureException) {
        window.MixlyMonitoring.captureException(error, {
          tags: { nav_failure: 'spa_fetch', target_path: url.pathname },
        });
      }
      if (generation === navGeneration) hardNavigate(url);
    } finally {
      window.clearTimeout(timeout);
      if (generation === navGeneration) {
        navigating = false;
        clearPendingHint();
      }
    }
  };

  const prefetch = (url) => {
    try {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url.href;
      link.as = 'document';
      // Replace prior prefetch tip if any.
      document.querySelectorAll('link[data-mixly-prefetch]').forEach((node) => node.remove());
      link.setAttribute('data-mixly-prefetch', '1');
      document.head.appendChild(link);
    } catch (_) {
      /* ignore */
    }
  };

  document.addEventListener(
    'click',
    (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

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
        if (!open) unlockScroll();
        return;
      }

      // Close control inside the menu (if present).
      if (event.target.closest('.mobile-menu-close')) {
        event.preventDefault();
        closeMobileMenu({ restoreFocus: true });
        return;
      }

      const link = event.target.closest('a[href]');
      if (!link) return;

      // Always unlock scroll / close overlay before following a link from the
      // hamburger or while the menu scroll-lock is active — including same-page hashes.
      if (link.closest('.mobile-menu') || document.body.classList.contains('mobile-menu-open')) {
        closeMobileMenu();
      }

      if (!isPageLink(link)) return;
      event.preventDefault();
      // Close again for footer links that never opened the menu, just in case.
      resetUiState();
      navigate(new URL(link.href, location.href));
    },
    true
  );

  document.addEventListener(
    'pointerenter',
    (event) => {
      const link = event.target.closest?.('a[href]');
      if (!isPageLink(link)) return;
      if (!link.closest('.site-footer, .mobile-menu, .site-header')) return;
      prefetch(new URL(link.href, location.href));
    },
    true
  );

  window.addEventListener('popstate', () => {
    resetUiState();
    navigate(new URL(location.href), { push: false });
  });
  window.addEventListener('pageshow', () => resetUiState());
  window.addEventListener('pagehide', () => resetUiState());

  // Fail-open: never leave a leftover scroll lock from older builds / bfcache.
  resetUiState();

  window.MixlyPageNav = { navigate, resetUiState, closeMobileMenu };
})();

