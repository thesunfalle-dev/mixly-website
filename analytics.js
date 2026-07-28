/* Optional, consent-gated website analytics. */
(() => {
  'use strict';

  const PROJECT_TOKEN = 'phc_tMF4eB2JqYkAiwWzQExrBzvxU2cxiHp49xHcAmJN5Lr5';
  const API_HOST = 'https://us.i.posthog.com';
  const CONSENT_KEY = 'mixly-analytics-consent';
  const loadedEvents = new Set();
  let posthog = null;
  let posthogLoad = null;
  let currentLocale = 'en';

  const COPY = {
    ru: {
      title: 'Аналитика сайта',
      body: 'С вашего согласия мы используем необязательную аналитику, чтобы улучшать сайт и понимать, какие разделы полезны.',
      accept: 'Принять',
      reject: 'Отклонить',
      privacy: 'Политика конфиденциальности'
    },
    en: {
      title: 'Website analytics',
      body: 'With your consent, we use optional analytics to improve the website and understand which parts are useful.',
      accept: 'Accept',
      reject: 'Reject',
      privacy: 'Privacy Policy'
    },
    de: {
      title: 'Website-Analyse',
      body: 'Mit Ihrer Einwilligung verwenden wir optionale Analysen, um die Website zu verbessern und zu verstehen, welche Bereiche hilfreich sind.',
      accept: 'Akzeptieren',
      reject: 'Ablehnen',
      privacy: 'Datenschutzerklärung'
    }
  };

  function locale() {
    const value = document.documentElement.lang;
    return Object.prototype.hasOwnProperty.call(COPY, value) ? value : 'en';
  }

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (_) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (_) {}
  }

  function contentType() {
    if (document.body.dataset.errorPage) return 'error';
    const path = location.pathname.toLowerCase();
    if (path.endsWith('/blog.html') || /\/blog\/?$/.test(path)) return 'blog';
    if (path.endsWith('/changelog.html') || /\/changelog\/?$/.test(path)) return 'home';
    if (/^\/(?:ru|en|de)\/blog\/[a-z0-9-]{1,64}\/?$/.test(path)) return 'article';
    if (path.endsWith('/article.html')) return 'article';
    if (/\/(privacy|terms|eula|support)\.html$/.test(path)) return 'legal';
    return 'home';
  }

  function articleSlug() {
    const querySlug = new URLSearchParams(location.search).get('slug');
    if (querySlug && /^[a-z0-9-]{1,64}$/i.test(querySlug)) return querySlug;
    const pathMatch = location.pathname.match(/^\/(?:ru|en|de)\/blog\/([a-z0-9-]{1,64})\/?$/i);
    return pathMatch ? pathMatch[1] : null;
  }

  function referrerOrigin() {
    if (!document.referrer) return 'direct';
    try { return new URL(document.referrer).origin; } catch (_) { return 'direct'; }
  }

  function properties() {
    return {
      page_path: location.pathname || '/',
      locale: currentLocale,
      content_type: contentType(),
      referrer_origin: referrerOrigin()
    };
  }

  function placement(element) {
    if (element.closest('.site-header')) return 'header';
    if (element.closest('.site-footer')) return 'footer';
    if (element.closest('.blog-preview-grid, .blog-page-grid')) return 'blog_card';
    if (element.closest('.hero')) return 'hero';
    if (element.closest('dialog')) return 'download_dialog';
    return 'content';
  }

  function capture(name, extra) {
    if (!posthog || getConsent() !== 'accepted') return;
    posthog.capture(name, Object.assign(properties(), extra || {}));
  }

  function trackInitialPage() {
    if (loadedEvents.has('page_view')) return;
    loadedEvents.add('page_view');
    capture('page_view');

    const type = contentType();
    if (type === 'blog') capture('blog_open', { placement: 'direct' });
    if (type === 'article') {
      const slug = articleSlug();
      if (slug) {
        capture('article_open', { article_slug: slug, placement: 'direct' });
      }
    }
  }

  function loadPostHog() {
    if (posthog) {
      trackInitialPage();
      return Promise.resolve(posthog);
    }

    if (posthogLoad) return posthogLoad;

    posthogLoad = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `${API_HOST}/static/array.js`;
      script.async = true;
      script.onload = () => {
        if (getConsent() !== 'accepted') {
          resolve(null);
          return;
        }
        const client = window.posthog;
        if (!client || typeof client.init !== 'function') {
          reject(new Error('PostHog did not initialise'));
          return;
        }
        client.init(PROJECT_TOKEN, {
          api_host: API_HOST,
          autocapture: false,
          capture_pageview: false,
          capture_pageleave: false,
          capture_performance: false,
          capture_heatmaps: false,
          capture_exceptions: false,
          capture_console_errors: false,
          capture_unhandled_errors: false,
          capture_unhandled_rejections: false,
          disable_session_recording: true,
          disable_surveys: true,
          disable_product_tours: true,
          disable_feature_flags: true,
          person_profiles: 'never'
        });
        posthog = client;
        trackInitialPage();
        resolve(client);
      };
      script.onerror = () => reject(new Error('PostHog failed to load'));
      document.head.appendChild(script);
    });
    posthogLoad.catch(() => undefined).finally(() => { posthogLoad = null; });
    return posthogLoad;
  }

  function clearAnalytics() {
    if (posthog) {
      try { posthog.persistence.clear(); } catch (_) {}
    }
    posthog = null;
  }

  function updateUi(showPanel) {
    const copy = COPY[currentLocale];
    const panel = document.querySelector('[data-analytics-consent]');
    if (!panel) return;

    panel.hidden = !showPanel;
    panel.querySelector('[data-consent-title]').textContent = copy.title;
    panel.querySelector('[data-consent-body]').textContent = copy.body;
    panel.querySelector('[data-consent-accept]').textContent = copy.accept;
    panel.querySelector('[data-consent-reject]').textContent = copy.reject;
    panel.querySelector('[data-consent-privacy]').textContent = copy.privacy;
  }

  function buildUi() {
    const panel = document.createElement('aside');
    panel.className = 'analytics-consent';
    panel.hidden = true;
    panel.setAttribute('data-analytics-consent', '');
    panel.setAttribute('aria-labelledby', 'analytics-consent-title');
    panel.innerHTML = `
      <div class="analytics-consent-mark" aria-hidden="true">◌</div>
      <div class="analytics-consent-copy">
        <h2 id="analytics-consent-title" data-consent-title></h2>
        <p data-consent-body></p>
        <a href="/privacy.html" data-consent-privacy></a>
      </div>
      <div class="analytics-consent-actions">
        <button class="analytics-consent-reject" type="button" data-consent-reject></button>
        <button class="analytics-consent-accept" type="button" data-consent-accept></button>
      </div>`;
    document.body.appendChild(panel);

    panel.querySelector('[data-consent-accept]').addEventListener('click', () => {
      setConsent('accepted');
      updateUi(false);
      loadPostHog().catch(() => undefined);
    });
    panel.querySelector('[data-consent-reject]').addEventListener('click', () => {
      setConsent('rejected');
      clearAnalytics();
      updateUi(false);
    });
  }

  function bindEvents() {
    document.addEventListener('click', (event) => {
      const settingsLink = event.target.closest('a[href="#analytics-settings"]');
      if (settingsLink) {
        event.preventDefault();
        updateUi(true);
        return;
      }
      const link = event.target.closest('a[href]');
      if (!link) return;
      const href = link.href;
      if (/^https:\/\/(apps\.apple\.com|play\.google\.com)\//.test(href)) {
        capture('store_click', {
          store: href.includes('apps.apple.com') ? 'app_store' : 'google_play',
          placement: placement(link)
        });
      }
    });

    document.addEventListener('mixly:locale', (event) => {
      const next = event.detail && event.detail.lang;
      if (!Object.prototype.hasOwnProperty.call(COPY, next)) return;
      const previous = currentLocale;
      currentLocale = next;
      updateUi(getConsent() === null);
      if (previous !== next) {
        capture('language_change', {
          from_locale: previous,
          to_locale: next,
          placement: 'language_switcher'
        });
      }
    });
  }

  function init() {
    currentLocale = locale();
    buildUi();
    bindEvents();
    const consent = getConsent();
    updateUi(consent === null);
    if (consent === 'accepted') loadPostHog().catch(() => undefined);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
