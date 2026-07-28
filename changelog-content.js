/* Single source of truth for Mixly release notes (MIX-54).
 * Add a new release at the top of RELEASES — then run: npm run generate:changelog
 */
var CHANGELOG_META = {
  ru: {
    pageTitle: 'История обновлений Mixly',
    pageDescription: 'Что нового в приложении Mixly: онбординг, Открытия, Лаборатория, обмен миксами и исправления.',
    eyebrow: 'Что нового',
    title: 'История обновлений Mixly',
    lead: 'Собрали изменения, которые делают поиск, сохранение и обмен миксами удобнее.',
    listAria: 'История обновлений Mixly',
    permalinkLabel: 'Ссылка на версию',
    homeCta: 'Все обновления',
    homePreviewNote: 'Последние версии приложения'
  },
  en: {
    pageTitle: 'Mixly update history',
    pageDescription: 'What is new in the Mixly app: onboarding, Discovery, Lab, mix sharing, and stability fixes.',
    eyebrow: "What's new",
    title: 'Mixly update history',
    lead: 'The changes that make discovering, saving, and sharing mixes easier.',
    listAria: 'Mixly update history',
    permalinkLabel: 'Link to this version',
    homeCta: 'All updates',
    homePreviewNote: 'Latest app versions'
  },
  de: {
    pageTitle: 'Update-Verlauf von Mixly',
    pageDescription: 'Was ist neu in der Mixly-App: Onboarding, Discovery, Labor, Teilen von Mischungen und Stabilitätsverbesserungen.',
    eyebrow: 'Was ist neu',
    title: 'Update-Verlauf von Mixly',
    lead: 'Die Änderungen, die Entdecken, Speichern und Teilen von Mischungen einfacher machen.',
    listAria: 'Update-Verlauf von Mixly',
    permalinkLabel: 'Link zu dieser Version',
    homeCta: 'Alle Updates',
    homePreviewNote: 'Neueste App-Versionen'
  }
};

/** Newest first. id becomes the stable URL hash (#v1-0-5). */
var RELEASES = [
  {
    version: '1.0.5',
    id: 'v1-0-5',
    date: '2026-07-14',
    open: true,
    labels: {
      ru: { version: 'Версия 1.0.5', summary: 'Быстрее начинай знакомство с Mixly.', date: '14 июля 2026' },
      en: { version: 'Version 1.0.5', summary: 'A faster start with Mixly.', date: 'July 14, 2026' },
      de: { version: 'Version 1.0.5', summary: 'Ein schnellerer Start mit Mixly.', date: '14. Juli 2026' }
    },
    items: {
      ru: [
        'Обновили онбординг, чтобы начать было проще и быстрее.',
        'Улучшили навигацию онбординга, сохранение предпочтений и переходы между экранами.',
        'Исправили мелкие ошибки и повысили стабильность приложения.'
      ],
      en: [
        'Refreshed onboarding for a faster start.',
        'Improved onboarding navigation, saved preferences, and screen transitions.',
        'Fixed minor bugs and made stability improvements for a smoother experience.'
      ],
      de: [
        'Das Onboarding für einen schnelleren Start überarbeitet.',
        'Onboarding-Navigation, gespeicherte Einstellungen und Bildschirmübergänge verbessert.',
        'Kleinere Fehler behoben und die Stabilität für ein flüssigeres Erlebnis verbessert.'
      ]
    }
  },
  {
    version: '1.0.4',
    id: 'v1-0-4',
    date: '2026-07-13',
    labels: {
      ru: { version: 'Версия 1.0.4', summary: 'Стало проще начать, открывать миксы и делиться ими.', date: '13 июля 2026' },
      en: { version: 'Version 1.0.4', summary: 'An easier way to get started, discover mixes, and share them.', date: 'July 13, 2026' },
      de: { version: 'Version 1.0.4', summary: 'Einfacher starten, Mischungen entdecken und teilen.', date: '13. Juli 2026' }
    },
    items: {
      ru: [
        'Добавили создание профиля через «Войти с Apple».',
        'Улучшили онбординг, чтобы быстрее настроить предпочтения.',
        'Сделали персонализацию миксов точнее под твой вкус.',
        'Обновили карточки для более наглядного обмена миксами.',
        'Улучшили «Открытия»: миксы сообщества, реакции, отзывы и стабильность карточек.',
        'Исправили ошибки и повысили общую стабильность приложения.'
      ],
      en: [
        'Added profile creation with Sign in with Apple.',
        'Improved onboarding to help you set up your preferences faster.',
        'Improved mix personalization for recommendations that better match your taste.',
        'Refined mix sharing with cleaner, more visual share cards.',
        'Improved Discovery with community mixes, reactions, reviews, and more stable cards.',
        'Fixed several bugs and improved overall app stability.'
      ],
      de: [
        'Profilerstellung mit „Mit Apple anmelden“ hinzugefügt.',
        'Onboarding verbessert, damit du deine Einstellungen schneller festlegen kannst.',
        'Personalisierung von Mischungen für Empfehlungen verbessert, die besser zu deinem Geschmack passen.',
        'Das Teilen von Mischungen mit klareren, visuellen Share-Karten verfeinert.',
        'Discovery mit Community-Mischungen, Reaktionen, Bewertungen und stabileren Karten verbessert.',
        'Mehrere Fehler behoben und die allgemeine Stabilität der App verbessert.'
      ]
    }
  },
  {
    version: '1.0.3',
    id: 'v1-0-3',
    date: '2026-06-10',
    labels: {
      ru: { version: 'Версия 1.0.3', summary: 'Улучшили обмен, «Открытия» и стабильность.', date: '10 июня 2026' },
      en: { version: 'Version 1.0.3', summary: 'Improved sharing, Discovery, and overall stability.', date: 'June 10, 2026' },
      de: { version: 'Version 1.0.3', summary: 'Teilen, Discovery und die Stabilität verbessert.', date: '10. Juni 2026' }
    },
    items: {
      ru: [
        'Сделали карточки для обмена миксами понятнее и нагляднее.',
        'Теперь карточками проще делиться с друзьями.',
        'Добавили в «Открытия» миксы сообщества, реакции и отзывы.',
        'Сделали карточки в «Открытиях» стабильнее и единообразнее.',
        'Исправили ошибки и улучшили общую стабильность приложения.'
      ],
      en: [
        'Improved mix sharing with cleaner, more visual share cards.',
        'Made share cards easier to send to friends.',
        'Improved Discovery with community mixes, reactions, and reviews.',
        'Made Discovery cards more stable and consistent.',
        'Fixed several bugs and improved overall app stability.'
      ],
      de: [
        'Das Teilen von Mischungen mit klareren, visuellen Share-Karten verbessert.',
        'Share-Karten einfacher an Freunde versendbar gemacht.',
        'Discovery mit Community-Mischungen, Reaktionen und Bewertungen verbessert.',
        'Discovery-Karten stabiler und einheitlicher gemacht.',
        'Mehrere Fehler behoben und die allgemeine Stabilität der App verbessert.'
      ]
    }
  },
  {
    version: '1.0.2',
    id: 'v1-0-2',
    date: '2026-05-29',
    labels: {
      ru: { version: 'Версия 1.0.2', summary: 'Открывать и делиться миксами стало проще.', date: '29 мая 2026' },
      en: { version: 'Version 1.0.2', summary: 'Discovering and sharing mixes is now easier.', date: 'May 29, 2026' },
      de: { version: 'Version 1.0.2', summary: 'Mischungen entdecken und teilen ist jetzt einfacher.', date: '29. Mai 2026' }
    },
    items: {
      ru: [
        'Добавили «Открытия» — раздел с миксами сообщества, реакциями и отзывами.',
        'Улучшили обмен миксами и диплинки, чтобы переходы по общим миксам работали плавнее.',
        'Обновили инструменты Лаборатории для создания и управления своими миксами.',
        'Улучшили названия, описания и локализацию миксов.',
        'Исправили ошибки и повысили стабильность приложения.'
      ],
      en: [
        'Added Discovery, a new community section with reactions and reviews.',
        'Improved mix sharing and deep links, so opening shared mixes feels smoother.',
        'Updated Labs tools for creating and managing your own mixes.',
        'Improved mix names, descriptions, and localization.',
        'Fixed bugs and made the app more stable.'
      ],
      de: [
        'Discovery hinzugefügt, einen neuen Community-Bereich mit Reaktionen und Bewertungen.',
        'Teilen von Mischungen und Deep Links verbessert, damit sich geteilte Mischungen flüssiger öffnen.',
        'Labor-Werkzeuge zum Erstellen und Verwalten eigener Mischungen aktualisiert.',
        'Namen, Beschreibungen und Lokalisierung von Mischungen verbessert.',
        'Fehler behoben und die App stabiler gemacht.'
      ]
    }
  },
  {
    version: '1.0.1',
    id: 'v1-0-1',
    date: '2026-05-11',
    labels: {
      ru: { version: 'Версия 1.0.1', summary: 'Новая функция: Лаборатория.', date: '11 мая 2026' },
      en: { version: 'Version 1.0.1', summary: 'New feature — Lab.', date: 'May 11, 2026' },
      de: { version: 'Version 1.0.1', summary: 'Neue Funktion: Labor.', date: '11. Mai 2026' }
    },
    items: {
      ru: [
        'Добавили Лабораторию: создай домашнюю коллекцию табаков и сохраняй собственные миксы.',
        'Улучшили стабильность и производительность приложения.'
      ],
      en: [
        'New feature — Lab. Create your home lab, add your own tobaccos, and save custom mixes.',
        'Improved overall stability and performance.'
      ],
      de: [
        'Labor hinzugefügt: eigene Tabake sammeln und eigene Mischungen speichern.',
        'Stabilität und Leistung der App verbessert.'
      ]
    }
  }
];
