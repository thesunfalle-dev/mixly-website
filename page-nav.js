(() => {
  const VEIL_KEY = 'mixly-page-veil';
  const FADE_OUT_MS = 300;
  const READY_TIMEOUT_MS = 2000;
  const HOME_MIN_VEIL_MS = 140;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const readyHeader = () => {
    document.querySelector('.site-header')?.classList.remove('is-hidden');
  };

  const scrollInstant = (top = 0) => {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo({ top, left: 0, behavior: 'auto' });
    window.scrollTo(0, top);
    html.style.scrollBehavior = previous;
  };

  const isHomePath = (pathname) => {
    const path = pathname.replace(/\/+$/, '') || '/';
    return path === '/' || /\/index\.html$/i.test(path);
  };

  const isInternalNavLink = (link) => {
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return false;
    if (link.origin !== window.location.origin) return false;
    if (link.closest('dialog')) return false;

    const nextUrl = new URL(link.href);
    const current = new URL(window.location.href);
    const sameDocument =
      nextUrl.pathname === current.pathname && nextUrl.search === current.search;
    return !sameDocument;
  };

  const whenImageReady = (img) => {
    if (!img) return Promise.resolve();
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
    if (typeof img.decode === 'function' && img.src) {
      return img.decode().catch(() => undefined);
    }
    return new Promise((resolve) => {
      const done = () => resolve();
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    });
  };

  const frames = (count = 2) =>
    new Promise((resolve) => {
      let left = count;
      const tick = () => {
        left -= 1;
        if (left <= 0) resolve();
        else requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

  const prepareArrivedPage = () => {
    root.classList.add('page-arrived', 'hover-lock');
    readyHeader();
    scrollInstant(0);

    document.querySelector('.hero.reveal')?.classList.add('is-visible');
    document.querySelectorAll('.reveal').forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        section.classList.add('is-visible');
      }
    });

    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.classList.add('is-visible');
        const html = document.documentElement;
        const previous = html.style.scrollBehavior;
        html.style.scrollBehavior = 'auto';
        target.scrollIntoView({ block: 'start', behavior: 'auto' });
        html.style.scrollBehavior = previous;
      }
    }
  };

  const whenPageSettled = async () => {
    prepareArrivedPage();
    scrollInstant(0);

    const waiters = [];
    if (document.fonts?.ready) waiters.push(document.fonts.ready.catch(() => undefined));

    if (document.readyState !== 'complete') {
      waiters.push(new Promise((resolve) => window.addEventListener('load', resolve, { once: true })));
    }

    const criticalImages = isHomePath(location.pathname)
      ? document.querySelectorAll('.hero img[src]')
      : document.querySelectorAll('main img[src]');

    criticalImages.forEach((img) => {
      if (img.getAttribute('src')) waiters.push(whenImageReady(img));
    });

    if (document.querySelector('#article-title') && !document.querySelector('#article-title').textContent) {
      waiters.push(
        new Promise((resolve) => {
          const start = performance.now();
          const tick = () => {
            if (document.querySelector('#article-title')?.textContent || performance.now() - start > 200) {
              resolve();
              return;
            }
            requestAnimationFrame(tick);
          };
          tick();
        })
      );
    }

    await Promise.race([
      Promise.all(waiters),
      new Promise((resolve) => window.setTimeout(resolve, READY_TIMEOUT_MS)),
    ]);

    scrollInstant(location.hash ? window.scrollY : 0);
    await frames(2);
    scrollInstant(location.hash ? window.scrollY : 0);
  };

  const releaseHoverLock = () => {
    const unlock = () => root.classList.remove('hover-lock');
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('pointermove', unlock, { once: true });
    window.setTimeout(unlock, 900);
  };

  // Safari restores scroll as the veil lifts. Freeze body until well after unveil.
  const pinScrollTop = (durationMs = 700) => {
    if (location.hash) return () => {};

    root.classList.add('scroll-pinned');
    scrollInstant(0);

    let active = true;
    const until = performance.now() + durationMs;
    const onScroll = () => {
      if (active) scrollInstant(0);
    };
    const pin = () => {
      if (!active) return;
      if (window.scrollY !== 0) scrollInstant(0);
      if (performance.now() < until) requestAnimationFrame(pin);
      else finish();
    };
    const finish = () => {
      if (!active) return;
      active = false;
      window.removeEventListener('scroll', onScroll);
      root.classList.remove('scroll-pinned');
      scrollInstant(0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(pin);
    window.setTimeout(finish, durationMs + 48);
    return finish;
  };

  const liftVeil = async () => {
    scrollInstant(location.hash ? window.scrollY : 0);

    // Reveal the settled page under the still-opaque veil, then cut/fade the veil.
    root.classList.remove('content-pending');
    await frames(2);
    scrollInstant(location.hash ? window.scrollY : 0);

    // Home: hard cut. A fade window is exactly when Safari restores scroll.
    if (isHomePath(location.pathname)) {
      root.classList.add('veil-instant');
    } else {
      root.classList.remove('veil-instant');
      await frames(2);
    }
    scrollInstant(location.hash ? window.scrollY : 0);
    root.classList.remove('is-veiled');
    scrollInstant(location.hash ? window.scrollY : 0);
    releaseHoverLock();
  };

  const beginArrivedTransition = async () => {
    const started = performance.now();
    root.classList.add('is-veiled', 'veil-instant', 'page-arrived', 'content-pending', 'hover-lock');
    scrollInstant(0);

    // One pin for the whole arrive → unveil → settle window.
    const stopPin = pinScrollTop(isHomePath(location.pathname) ? 2200 : 1600);

    await whenPageSettled();

    if (isHomePath(location.pathname)) {
      const remaining = HOME_MIN_VEIL_MS - (performance.now() - started);
      if (remaining > 0) {
        await new Promise((resolve) => window.setTimeout(resolve, remaining));
      }
    }

    await liftVeil();
    // Keep pin alive briefly after unveil; stopPin also has its own timer.
    window.setTimeout(stopPin, 700);
  };

  if (sessionStorage.getItem(VEIL_KEY) === '1') {
    sessionStorage.removeItem(VEIL_KEY);
    if (!reducedMotion) beginArrivedTransition();
    else {
      root.classList.remove('content-pending', 'is-veiled', 'veil-instant', 'hover-lock');
      scrollInstant(0);
    }
  } else {
    try {
      const nav = performance.getEntriesByType('navigation')[0];
      if (!reducedMotion && nav?.type === 'back_forward' && isHomePath(location.pathname)) {
        beginArrivedTransition();
      } else if (!location.hash) {
        root.classList.remove('content-pending');
        scrollInstant(0);
      }
    } catch (_) {
      root.classList.remove('content-pending');
    }
  }

  window.addEventListener('pageshow', (event) => {
    if (reducedMotion) return;
    if (event.persisted) {
      root.classList.add('page-arrived', 'hover-lock');
      document.querySelector('.hero.reveal')?.classList.add('is-visible');
      readyHeader();
      if (!location.hash) scrollInstant(0);
      releaseHoverLock();
    }
  });

  document.addEventListener(
    'click',
    (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target.closest('a[href]');
      if (!isInternalNavLink(link)) return;

      readyHeader();
      if (reducedMotion) return;

      event.preventDefault();
      sessionStorage.setItem(VEIL_KEY, '1');
      root.classList.remove('veil-instant', 'content-pending');
      root.classList.add('is-veiled');

      try {
        const next = new URL(link.href);
        if (isHomePath(next.pathname)) {
          let folder = 'EN';
          try {
            const stored = localStorage.getItem('mixly-lang');
            if (stored === 'ru' || stored === 'en' || stored === 'de') folder = stored.toUpperCase();
            else {
              const nav = String(navigator.language || 'en').toLowerCase();
              if (nav.indexOf('ru') === 0) folder = 'RU';
              else if (nav.indexOf('de') === 0) folder = 'DE';
            }
          } catch (_) {}
          [`./images_for_web/${folder}/main_1.png`, `./images_for_web/${folder}/main_2.png`].forEach((src) => {
            const warm = new Image();
            warm.src = new URL(src, next.href).href;
          });
        }
      } catch (_) {}

      window.setTimeout(() => {
        window.location.href = link.href;
      }, FADE_OUT_MS);
    },
    true
  );

  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuToggle = document.querySelector('[data-mobile-menu-open]');
  if (mobileMenu && mobileMenuToggle) {
    const closeMobileMenu = () => {
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('mobile-menu-open');
    };

    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('mobile-menu-open', isOpen);
      readyHeader();
    });

    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));
    mobileMenu.addEventListener('click', (event) => {
      if (event.target === mobileMenu) closeMobileMenu();
    });
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) closeMobileMenu();
    });
  }
})();
