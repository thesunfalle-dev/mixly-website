(() => {
  'use strict';

  const reducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const headerOffset = () => {
    const header = document.querySelector('.site-header');
    if (!header) return 24;
    const rect = header.getBoundingClientRect();
    if (rect.height > 0 && rect.bottom > 0 && rect.top < 160) {
      return Math.ceil(rect.bottom) + 18;
    }
    return 24;
  };

  let scrollWait = 0;

  const scrollToElement = (target, options = {}) => {
    if (!target) return Promise.resolve();

    const offset =
      typeof options.offset === 'number' ? options.offset : headerOffset();
    const instant = options.instant === true || reducedMotion();
    const top = Math.max(
      0,
      window.scrollY + target.getBoundingClientRect().top - offset
    );
    const delta = top - window.scrollY;

    window.clearTimeout(scrollWait);

    if (instant || Math.abs(delta) < 2) {
      window.scrollTo(0, top);
      return Promise.resolve();
    }

    window.scrollTo({ top, behavior: 'smooth' });
    const wait = Math.min(850, Math.max(320, Math.abs(delta) * 0.55));
    return new Promise((resolve) => {
      scrollWait = window.setTimeout(resolve, wait);
    });
  };

  const scrollToHash = (hash, options = {}) => {
    if (!hash || hash === '#') return Promise.resolve();
    let target = null;
    try {
      target = document.querySelector(hash);
    } catch (_) {
      return Promise.resolve();
    }
    return scrollToElement(target, options);
  };

  const navigationType = () => {
    try {
      const entry = performance.getEntriesByType('navigation')[0];
      return entry?.type || '';
    } catch (_) {
      return '';
    }
  };

  const bindSectionNav = (options = {}) => {
    const nav = options.nav;
    const sections = Array.from(options.sections || []);
    if (!nav || !sections.length) {
      return { destroy() {}, setActive() {}, refresh() {} };
    }

    const linkSelector = options.linkSelector || 'a[href^="#"]';
    const activeClass = options.activeClass || 'is-active';
    const links = Array.from(nav.querySelectorAll(linkSelector));
    const byId = new Map();
    const currentEl =
      typeof options.currentEl === 'string'
        ? document.querySelector(options.currentEl)
        : options.currentEl || null;
    const dropdown =
      typeof options.dropdown === 'string'
        ? document.querySelector(options.dropdown)
        : options.dropdown || null;

    links.forEach((link) => {
      const id = (link.getAttribute('href') || '').replace(/^#/, '');
      if (id) byId.set(id, link);
    });

    let activeId = '';
    let lockedId = '';
    let lockTimer = 0;
    let frame = 0;

    const setActive = (id, { force } = {}) => {
      if (!id || (!force && id === activeId)) return;
      activeId = id;
      links.forEach((link) => {
        const match = link.getAttribute('href') === `#${id}`;
        link.classList.toggle(activeClass, match);
        if (match) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
        if (match && currentEl) currentEl.textContent = link.textContent || '';
      });
      if (typeof options.onActive === 'function') options.onActive(id);
    };

    const pickActive = () => {
      if (lockedId) {
        setActive(lockedId, { force: true });
        return;
      }
      const offset = headerOffset() + 8;
      let current = sections[0]?.id || '';
      for (let i = 0; i < sections.length; i += 1) {
        const section = sections[i];
        const top = section.getBoundingClientRect().top;
        if (top - offset <= 0) current = section.id;
        else break;
      }
      if (current) setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        pickActive();
      });
    };

    const onClick = (event) => {
      const link = event.target.closest(linkSelector);
      if (!link || !nav.contains(link)) return;
      const href = link.getAttribute('href') || '';
      if (!href.startsWith('#')) return;

      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      lockedId = id;
      setActive(id, { force: true });
      if (history.replaceState) history.replaceState(null, '', href);
      else location.hash = href;

      window.clearTimeout(lockTimer);
      scrollToElement(target).then(() => {
        lockTimer = window.setTimeout(() => {
          lockedId = '';
          pickActive();
        }, 120);
      });
    };

    nav.addEventListener('click', onClick);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    const hashId = (location.hash || '').replace(/^#/, '');
    const isReload = navigationType() === 'reload';

    if (hashId && byId.has(hashId) && !isReload) {
      lockedId = hashId;
      setActive(hashId, { force: true });
      scrollToElement(document.getElementById(hashId), { instant: true }).then(() => {
        lockTimer = window.setTimeout(() => {
          lockedId = '';
          pickActive();
        }, 80);
      });
    } else {
      if (isReload && hashId) {
        try {
          history.replaceState(null, '', location.pathname + location.search);
        } catch (_) {}
        window.scrollTo(0, 0);
      }
      pickActive();
    }

    return {
      setActive,
      refresh: pickActive,
      destroy() {
        window.clearTimeout(scrollWait);
        window.clearTimeout(lockTimer);
        if (frame) cancelAnimationFrame(frame);
        nav.removeEventListener('click', onClick);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      },
    };
  };

  window.MixlyScrollNav = {
    scrollToElement,
    scrollToHash,
    bindSectionNav,
    headerOffset,
  };
})();
