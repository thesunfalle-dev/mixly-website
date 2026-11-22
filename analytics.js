/* Optional, consent-gated website analytics. */
(() => {
  'use strict';

  // Public ingestion key for Mixly Web (908537), never a secret/admin key.
  const API_KEY = 'db21b88f9a5964d33156796fc4dd1692';
  const SDK_URL = 'https://cdn.amplitude.com/libs/analytics-browser-2.48.1-min.js.gz';
  const CONSENT_KEY = 'mixly-analytics-consent';
  const REVOCATION_KEY = 'mixly-analytics-revocation';
  const DEVICE_KEY = 'mixly-amplitude-device-id';
  let client = null;
  let clientLoad = null;
  let sdkLoad = null;
  let consentGeneration = 0;
  let memoryConsent = null;
  let trackedPage = null;
  let clientEpoch = null;
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
    if (memoryConsent !== null) return memoryConsent;
    try { return localStorage.getItem(CONSENT_KEY); } catch (_) { return memoryConsent; }
  }

  function setConsent(value) {
    memoryConsent = value;
    if (value === 'rejected') {
      try { localStorage.setItem(REVOCATION_KEY, crypto.randomUUID()); } catch (_) {}
    }
    try { localStorage.setItem(CONSENT_KEY, value); memoryConsent = null; }
    catch (_) {
      if (value === 'rejected') {
        try { localStorage.removeItem(CONSENT_KEY); } catch (_) {}
      }
    }
  }

  function consentEpoch() {
    try { return localStorage.getItem(REVOCATION_KEY) || ''; } catch (_) { return ''; }
  }

  function contentType() {
    if (document.body.dataset.errorPage) return 'error';
    const path = location.pathname.toLowerCase();
    if (path.endsWith('/blog.html') || /\/blog\/?$/.test(path)) return 'blog';
    if (path.endsWith('/changelog.html') || /\/changelog\/?$/.test(path)) return 'home';
    if (articleSlug()) return 'article';
    if (path.endsWith('/article.html')) return 'article';
    if (/\/(privacy|cookies|terms|eula|support)(?:\.html)?\/?$/.test(path)) return 'legal';
    return 'home';
  }

  function articleSlug() {
    const pathMatch = location.pathname.match(/^\/(?:ru|en|de)\/blog\/([a-z0-9-]{1,64})(?:\/index\.html|\/)?$/i);
    return pathMatch ? pathMatch[1] : null;
  }

  function referrerOrigin() {
    if (!document.referrer) return 'direct';
    try { return new URL(document.referrer).origin; } catch (_) { return 'direct'; }
  }

  function properties() {
    return {
      page_path: document.body.dataset.errorPage ? '/error' : location.pathname.replace(/^\/s\/[^/]+\/?$/, '/s/:code') || '/',
      locale: currentLocale,
      content_type: contentType(),
      referrer_origin: referrerOrigin(),
      environment: location.hostname === 'get-mixly.app' ? 'production' : 'development'
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
    if (!client || getConsent() !== 'accepted') return;
    client.track(name, Object.assign(properties(), extra || {}));
    // Flush immediately so outbound store clicks survive leaving the document.
    client.flush();
  }

  function trackInitialPage() {
    if (!client || getConsent() !== 'accepted') return;
    const page = location.pathname;
    if (trackedPage === page) return;
    trackedPage = page;
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

  function loadSdk() {
    if (window.amplitude) return Promise.resolve(window.amplitude);
    if (sdkLoad) return sdkLoad;
    sdkLoad = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = SDK_URL;
      script.async = true;
      script.referrerPolicy = 'no-referrer';
      script.onload = () => {
        if (window.amplitude) resolve(window.amplitude);
        else reject(new Error('Amplitude did not initialise'));
      };
      script.onerror = () => { script.remove(); reject(new Error('Amplitude failed to load')); };
      document.head.appendChild(script);
    });
    sdkLoad.catch(() => { sdkLoad = null; });
    return sdkLoad;
  }

  function browserId() {
    let id;
    try { id = localStorage.getItem(DEVICE_KEY); } catch (_) {}
    if (!/^[a-f0-9-]{36}$/.test(id || '')) id = crypto.randomUUID();
    try { localStorage.setItem(DEVICE_KEY, id); } catch (_) {}
    return id;
  }

  function loadAmplitude() {
    if (client) { trackInitialPage(); return Promise.resolve(client); }
    // A new consent cycle waits for any previous initialization to clean up.
    if (clientLoad) return clientLoad.then(() => getConsent() === 'accepted' ? loadAmplitude() : null);
    const generation = consentGeneration;
    const epoch = consentEpoch();
    clientEpoch = epoch;
    const allowed = () => getConsent() === 'accepted' && generation === consentGeneration && epoch === consentEpoch();
    const loading = (async () => {
      const sdk = await loadSdk();
      if (!allowed()) return null;
      const instance = sdk.createInstance();
      instance.add({
        name: 'mixly-consent',
        type: 'before',
        async setup(config) {
          const transport = config.transportProvider;
          // Check again at upload time, including scheduled retries after revocation.
          config.transportProvider = {
            async send(url, payload) {
              if (!allowed()) return { status: 'success', statusCode: 200,
                body: { eventsIngested: 0, payloadSizeBytes: 0, serverUploadTime: 0 } };
              // Avoid an asynchronous compression gap between the gate and fetch.
              return transport.send(url, payload, false);
            }
          };
        },
        async execute(event) { return allowed() ? event : null; }
      });
      await instance.init(API_KEY, {
        serverZone: 'US',
        deviceId: browserId(),
        // Never import an arbitrary session identifier from an incoming URL.
        ...(new URLSearchParams(location.search).has('ampSessionId') ? { sessionId: Date.now() } : {}),
        identityStorage: 'localStorage',
        autocapture: false,
        remoteConfig: { fetchRemoteConfig: false },
        enableDiagnostics: false,
        trackingOptions: { ipAddress: false },
        transport: { type: 'fetch', referrerPolicy: 'no-referrer' },
        // Unsent events stay in memory and cannot reappear after withdrawal/reload.
        storageProvider: {
          async isEnabled() { return true; },
          async get() { return undefined; },
          async set() {},
          async remove() {},
          async reset() {}
        }
      }).promise;
      if (!allowed()) {
        if (getConsent() !== 'accepted') { instance.setOptOut(true); clearStoredAnalytics(); }
        return null;
      }
      client = instance;
      trackInitialPage();
      return client;
    })();
    clientLoad = loading.finally(() => { clientLoad = null; });
    return clientLoad;
  }

  function clearStoredAnalytics() {
    try {
      for (const key of [DEVICE_KEY, `AMP_${API_KEY.slice(0, 10)}`, `AMP_unsent_${API_KEY.slice(0, 10)}`]) {
        localStorage.removeItem(key);
      }
    } catch (_) {}
  }

  function clearAnalytics(sharedState = true) {
    consentGeneration += 1;
    if (client && sharedState) client.setOptOut(true);
    client = null;
    clientEpoch = null;
    trackedPage = null;
    if (sharedState) clearStoredAnalytics();
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
    panel.querySelector('[data-consent-privacy]').href = currentLocale === 'ru' ? '/privacy.html' : `/${currentLocale}/privacy`;
  }

  function buildUi() {
    if (document.querySelector('[data-analytics-consent]')) return;
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
      loadAmplitude().catch(() => undefined);
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
      currentLocale = next;
      updateUi(getConsent() === null);
    });

    document.addEventListener('mixly:language-choice', (event) => {
      const { from, to } = event.detail || {};
      if (from !== to && COPY[from] && COPY[to]) {
        capture('language_change', {
          from_locale: from,
          to_locale: to,
          placement: 'language_switcher'
        });
      }
    });

    document.addEventListener('mixly:page', () => {
      currentLocale = locale();
      buildUi();
      updateUi(getConsent() === null);
      trackInitialPage();
    });
    window.addEventListener('storage', (event) => {
      if (![CONSENT_KEY, REVOCATION_KEY, null].includes(event.key)) return;
      memoryConsent = null;
      if (getConsent() === 'accepted' && clientEpoch === consentEpoch() && (client || clientLoad)) return;
      // The other tab owns shared storage; don't overwrite its newer identity.
      clearAnalytics(false);
      if (getConsent() === 'accepted') loadAmplitude().catch(() => undefined);
      updateUi(getConsent() === null);
    });
  }

  function init() {
    currentLocale = locale();
    buildUi();
    bindEvents();
    const consent = getConsent();
    updateUi(consent === null);
    if (consent === 'rejected') clearStoredAnalytics();
    if (consent === 'accepted') loadAmplitude().catch(() => undefined);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
