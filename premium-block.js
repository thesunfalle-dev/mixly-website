(() => {
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
    return `<section class="premium section reveal" id="premium" aria-labelledby="premium-title"><div class="premium-copy"><p class="eyebrow" data-i18n="premium.eyebrow">${copy.eyebrow}</p><h2 id="premium-title" data-i18n="premium.title">${copy.title}</h2><p data-i18n="premium.lead">${copy.lead}</p></div><div class="premium-benefits" data-i18n-aria="premium.benefitsAria" aria-label="${copy.benefitsAria}"><article><strong data-i18n="premium.b1.title" data-i18n-html>${copy.b1Title}</strong><p data-i18n="premium.b1.body" data-i18n-html>${copy.b1Body}</p></article><article><strong data-i18n="premium.b2.title" data-i18n-html>${copy.b2Title}</strong><p data-i18n="premium.b2.body" data-i18n-html>${copy.b2Body}</p></article><article><strong data-i18n="premium.b3.title" data-i18n-html>${copy.b3Title}</strong><p data-i18n="premium.b3.body" data-i18n-html>${copy.b3Body}</p></article></div><a class="button button-primary premium-cta" href="https://apps.apple.com/app/id6762792005" rel="noopener"><span data-i18n="premium.cta">${copy.cta}</span> <span aria-hidden="true">→</span></a></section>`;
  }

  function ensureArticleHost() {
    if (document.querySelector('[data-premium-block]') || !document.querySelector('.article-page')) return;
    const footer = document.querySelector('.site-footer');
    if (!footer) return;
    const host = document.createElement('div');
    host.setAttribute('data-premium-block', '');
    footer.before(host);
  }

  function mount() {
    ensureArticleHost();
    const lang = document.documentElement.lang || 'en';
    document.querySelectorAll('[data-premium-block]').forEach((host) => {
      if (host.dataset.premiumMounted === 'true') return;
      host.dataset.premiumMounted = 'true';
      host.innerHTML = markup(lang);
      const section = host.querySelector('.premium');
      if (section && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          if (!entries[0].isIntersecting) return;
          section.classList.add('is-visible');
          observer.disconnect();
        }, { threshold: 0.12 });
        observer.observe(section);
      }
    });
  }

  window.MixlyPremium = { mount };
  mount();
})();
