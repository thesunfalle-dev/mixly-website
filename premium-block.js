(() => {
  const APPLE_ICON =
    '<svg class="hero-download-icon" aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M16.37 12.31c-.03-2.28 1.86-3.39 1.94-3.44-1.06-1.55-2.7-1.76-3.28-1.78-1.38-.15-2.72.83-3.43.83-.72 0-1.8-.82-2.97-.79-1.51.02-2.93.9-3.71 2.25-1.62 2.8-.41 6.91 1.14 9.18.78 1.11 1.69 2.35 2.88 2.3 1.16-.05 1.59-.74 2.99-.74 1.38 0 1.78.74 3 .71 1.25-.02 2.04-1.12 2.79-2.24.91-1.28 1.27-2.54 1.29-2.61-.03-.01-2.44-.93-2.46-3.97ZM14.14 5.68c.63-.79 1.06-1.87.94-2.96-.91.04-2.05.63-2.71 1.4-.59.68-1.11 1.8-.98 2.85 1.02.08 2.07-.52 2.75-1.29Z"/></svg>';

  const COPY = {
    ru: {
      eyebrow: 'Больше Mixly', title: 'Больше возможностей внутри Mixly',
      lead: 'Собирай подборку под себя и возвращайся к новым сочетаниям, когда захочется попробовать что-то ещё.',
      benefitsAria: 'Что открывает Mixly Premium', b1Title: 'Более <br>500', b1Body: 'миксов в полной<br>библиотеке',
      b2Title: 'Каждую <br>неделю', b2Body: 'новые идеи и<br>пополнения', b3Title: 'Без <br>ограничений',
      b3Body: 'фильтры по вкусам,<br>брендам и крепости', cta: 'Попробовать Mixly',
    },
    en: {
      eyebrow: 'More Mixly', title: 'More inside Mixly',
      lead: 'Build a feed that fits you and come back to new mixes whenever you want to try something else.',
      benefitsAria: 'What Mixly Premium unlocks', b1Title: 'Over <br>500', b1Body: 'mixes in the full<br>library',
      b2Title: 'Every <br>week', b2Body: 'new ideas and<br>additions', b3Title: 'No <br>limits',
      b3Body: 'filters by flavor,<br>brand, and strength', cta: 'Try Mixly',
    },
    de: {
      eyebrow: 'Mehr Mixly', title: 'Mehr Möglichkeiten in Mixly',
      lead: 'Baue eine Auswahl für dich und komm zu neuen Mischungen zurück, wenn du etwas anderes ausprobieren willst.',
      benefitsAria: 'Was Mixly Premium freischaltet', b1Title: 'Über <br>500', b1Body: 'Mischungen in der<br>vollen Bibliothek',
      b2Title: 'Jede <br>Woche', b2Body: 'neue Ideen und<br>Ergänzungen', b3Title: 'Ohne <br>Limits',
      b3Body: 'Filter nach Geschmack,<br>Marke und Stärke', cta: 'Mixly ausprobieren',
    },
  };

  function markup(lang) {
    const copy = COPY[lang] || COPY.en;
    return `<section class="premium section reveal" id="premium" aria-labelledby="premium-title"><div class="premium-copy"><p class="eyebrow" data-i18n="premium.eyebrow">${copy.eyebrow}</p><h2 id="premium-title" data-i18n="premium.title">${copy.title}</h2><p data-i18n="premium.lead">${copy.lead}</p></div><div class="premium-benefits" data-i18n-aria="premium.benefitsAria" aria-label="${copy.benefitsAria}"><article><strong data-i18n="premium.b1.title" data-i18n-html>${copy.b1Title}</strong><p data-i18n="premium.b1.body" data-i18n-html>${copy.b1Body}</p></article><article><strong data-i18n="premium.b2.title" data-i18n-html>${copy.b2Title}</strong><p data-i18n="premium.b2.body" data-i18n-html>${copy.b2Body}</p></article><article><strong data-i18n="premium.b3.title" data-i18n-html>${copy.b3Title}</strong><p data-i18n="premium.b3.body" data-i18n-html>${copy.b3Body}</p></article></div><a class="button button-primary premium-cta" href="https://apps.apple.com/app/id6762792005" rel="noopener">${APPLE_ICON}<span data-i18n="premium.cta">${copy.cta}</span> <span aria-hidden="true">→</span></a></section>`;
  }

  function ensureArticleHost() {
    if (document.querySelector('[data-premium-block]') || !document.querySelector('.article-page')) return;
    const footer = document.querySelector('.site-footer');
    if (!footer) return;
    const host = document.createElement('div');
    host.setAttribute('data-premium-block', '');
    footer.before(host);
  }

  function observeReveal(section) {
    if (!section || section.classList.contains('is-visible') || !('IntersectionObserver' in window)) {
      section?.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      section.classList.add('is-visible');
      observer.disconnect();
    }, { threshold: 0.12 });
    observer.observe(section);
  }

  function mount() {
    ensureArticleHost();
    const lang = document.documentElement.lang || 'en';
    document.querySelectorAll('[data-premium-block]').forEach((host) => {
      if (host.dataset.premiumMounted === 'true') return;
      // Keep server-rendered article promo in the initial HTML.
      if (host.getAttribute('data-premium-static') === 'true' && host.querySelector('.premium')) {
        host.dataset.premiumMounted = 'true';
        observeReveal(host.querySelector('.premium'));
        return;
      }
      host.dataset.premiumMounted = 'true';
      host.innerHTML = markup(lang);
      observeReveal(host.querySelector('.premium'));
    });
  }

  window.MixlyPremium = { mount };
  mount();
})();
