/* Runtime error monitoring for the public website. */
(() => {
  'use strict';

  const DSN = 'https://d467d5e933bea909cab75c10b415704a@o4511777909374976.ingest.de.sentry.io/4511777933033552';
  const SDK_SRC = 'https://browser.sentry-cdn.com/10.42.0/bundle.min.js';
  let initialized = false;
  const queue = [];

  function pagePath(value) {
    try {
      const url = new URL(value, location.origin);
      return url.pathname || '/';
    } catch (_) {
      return '/';
    }
  }

  function locale() {
    const lang = String(document.documentElement.lang || '').toLowerCase();
    return lang === 'ru' || lang === 'de' || lang === 'en' ? lang : 'en';
  }

  function surface() {
    if (document.body?.hasAttribute('data-error-page')) return 'error';
    if (document.querySelector('.article-page')) return 'article';
    if (document.body?.hasAttribute('data-legal-doc')) return 'legal';
    if (/blog\.html$/i.test(location.pathname)) return 'blog';
    if (/share\.html?$|\/share$/i.test(location.pathname)) return 'share';
    return 'website';
  }

  function releaseName() {
    const meta = document.querySelector('meta[name="mixly-release"]');
    if (meta?.content) return meta.content;
    // Public static site: browser sources are the deployed JS files themselves.
    return `mixly-website@${location.hostname}`;
  }

  function redactEvent(event) {
    delete event.user;

    if (event.request) {
      event.request.url = pagePath(event.request.url || location.href);
      delete event.request.headers;
      delete event.request.cookies;
      delete event.request.data;
      delete event.request.query_string;
    }

    if (event.breadcrumbs) {
      event.breadcrumbs.forEach((breadcrumb) => {
        if (!breadcrumb.data) return;
        ['from', 'to', 'url'].forEach((key) => {
          if (breadcrumb.data[key]) breadcrumb.data[key] = pagePath(breadcrumb.data[key]);
        });
        delete breadcrumb.data.headers;
        delete breadcrumb.data.body;
      });
    }

    event.tags = Object.assign({}, event.tags, {
      locale: locale(),
      page_path: pagePath(location.href),
      site_surface: surface(),
      page_navigation: document.documentElement.dataset.pageNavigation || 'mpa',
    });
    return event;
  }

  function flushQueue() {
    if (!window.Sentry) return;
    while (queue.length) {
      const item = queue.shift();
      try {
        if (item.type === 'exception') window.Sentry.captureException(item.error, item.context);
        else window.Sentry.captureMessage(item.message, item.context);
      } catch (_) {
        /* ignore */
      }
    }
  }

  function captureException(error, context) {
    if (window.Sentry && initialized) {
      window.Sentry.captureException(error, context);
      return;
    }
    queue.push({ type: 'exception', error, context });
  }

  function init() {
    if (initialized || !window.Sentry) return;
    initialized = true;
    window.Sentry.init({
      dsn: DSN,
      environment: location.hostname === 'get-mixly.app' ? 'production' : 'preview',
      release: releaseName(),
      sendDefaultPii: false,
      tracesSampleRate: 0,
      enableLogs: false,
      beforeSend: redactEvent,
    });
    flushQueue();
  }

  function loadSdk() {
    if (window.Sentry) {
      init();
      return;
    }

    const script = document.createElement('script');
    script.src = SDK_SRC;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.mixlySentrySdk = '';
    script.addEventListener('load', init, { once: true });
    document.head.appendChild(script);
  }

  // Error reporting must never compete with CSS, fonts, localization, or hero media.
  window.addEventListener(
    'load',
    () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadSdk, { timeout: 2000 });
      } else {
        window.setTimeout(loadSdk, 0);
      }
    },
    { once: true }
  );

  window.MixlyMonitoring = { captureException, pagePath, locale, surface };
})();
