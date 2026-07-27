/* Mixly website legal content — do not hand-edit casually */
var LEGAL_DOCS = {
  "privacy": {
    "en": {
      "title": "Privacy Policy",
      "meta": "Effective date: July 22, 2026",
      "notice": "Mixly is intended for adults only. The app is an informational catalog and recommendation reference for hookah/shisha flavor mixes. It does not sell, ship, facilitate the sale of, or promote the purchase or consumption of tobacco, nicotine, alcohol, or controlled products.",
      "sections": [
        {
          "id": "s1",
          "title": "1. Who operates Mixly",
          "blocks": [
            { "type": "p", "text": "Mixly is operated by Individual Entrepreneur ULADZISLAU YARMAKOVICH, Batumi, Georgia (\"Mixly\", \"we\", \"us\", or \"our\")." },
            { "type": "p", "text": "Contact email for privacy, support, and legal requests: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." },
            { "type": "p", "text": "Postal address: Georgia, Batumi City, Vakhtang Gorgasali st., N116-118, Floor 11, Apartment N58." }
          ]
        },
        {
          "id": "s2",
          "title": "2. Scope of this policy",
          "blocks": [
            { "type": "p", "text": "This Privacy Policy explains how Mixly handles information when you use the Mixly mobile application and related hosted legal, catalog, analytics, subscription, support, sharing, translation, and community services. It is designed to describe the current behavior of the app." }
          ]
        },
        {
          "id": "s3",
          "title": "3. Information stored on your device",
          "blocks": [
            { "type": "p", "text": "Mixly stores some app data locally on your device so the app can work without an account. This may include:" },
            { "type": "ul", "items": [
              "onboarding preferences, such as selected brands, categories, flavors, and preferred strength;",
              "favorite mix identifiers;",
              "local app state needed to show your personalized mix feed, daily free-access limits, swipe hints, and paywall state;",
              "Labs data, such as custom tobaccos, generated or manual lab mixes, ingredient percentages, and random generation counters;",
              "a locally generated Mixly user ID and optional nickname used for support and community suggestion features;",
              "a locally generated Amplitude device ID used for analytics if analytics is enabled;",
              "temporary share-card images generated on your device when you choose to share a mix image, where that feature is enabled;",
              "language-related app behavior derived from your device locale or in-app language choice."
            ] },
            { "type": "p", "text": "This information is stored on your device using local storage technology such as AsyncStorage and temporary app files. Mixly does not provide email/password registration. You may choose to sign in with Apple on iOS or Google on Android, and an iOS user may explicitly link Google to the same account. For an authenticated account, Mixly stores a private cloud copy of the listed app data in Supabase so it can be restored on another device. The cloud copy is tied to your authenticated Supabase user ID and is protected so other users cannot read it. Some local identity information, such as your generated Mixly user ID and optional nickname, may also be synced to Supabase so support and community features can work. If you choose to copy your Mixly system ID, that value is placed on your device clipboard by the operating system." },
            { "type": "p", "text": "The Mixly website stores your selected display language in localStorage (mixly-lang). If you actively allow optional website analytics, Mixly loads PostHog from its US Cloud. PostHog may store its analytics state in cookies or local storage and process a pseudonymous browser identifier, page path without query parameters, display language, page type, referral origin, and interactions with App Store or Google Play links. We do not enable automatic interaction capture, heatmaps, session recording, advertising, or social-media tracking. Analytics can be refused or changed at any time through the Analytics settings link in the footer. PostHog and its infrastructure may process network metadata, including IP address, to receive events; information may be processed in the United States." }
          ]
        },
        {
          "id": "s4",
          "title": "4. Information processed by backend and service providers",
          "blocks": [
            { "type": "p", "text": "Mixly uses Supabase as a service provider to host catalog data, user profile records, support routing, community mix suggestions, moderation data, community reactions, community comments/reviews, published community mix content, RevenueCat webhook routing, and smart share-link pages. Catalog data may include brands, flavors, mix compositions, source references, and related metadata. The app requests this data from Supabase so it can display, rank, and update mixes." },
            { "type": "p", "text": "When your device connects to Supabase or to hosting services used for legal pages or app infrastructure, those providers may process technical information needed to operate, secure, and troubleshoot the service. This may include IP address, request metadata, device or network metadata, timestamps, error logs, and security logs." },
            { "type": "p", "text": "We use this technical information only for service functionality, security, debugging, abuse prevention, and legal or operational compliance. We do not use it for advertising tracking." }
          ]
        },
        {
          "id": "s5",
          "title": "5. User identity, support, and community features",
          "blocks": [
            { "type": "p", "text": "Mixly creates a pseudonymous local user ID, such as an ID beginning with \"MX-\", and lets you optionally set a nickname. This is not an email/password account, but it may be stored locally and synced to Supabase to identify support requests, rate-limit abuse, show community attribution, and manage community suggestion workflows." },
            { "type": "p", "text": "The app lets you send suggestions, catalog requests, feedback, and community mix suggestions from inside Mixly. Depending on the feature you use, Mixly may send your message text, message type, app language, source label, generated user ID, optional nickname, mix name, mix description, flavors, tobaccos, strength, timestamps, and related technical request data to Supabase Edge Functions." },
            { "type": "p", "text": "Support and feedback messages may be forwarded through messaging or notification service providers used by the Mixly operator for support and product operations. Community mix suggestions may be stored in Supabase for moderation, review, catalog improvement, and possible publication in the app. If a community mix suggestion is approved, the submitted nickname may be shown with the published mix if you provided one." },
            { "type": "p", "text": "Community features may let you react to published community mixes, submit ratings, write review/comment text, edit or delete your own reviews, and request translation of review text. Mixly may process the published mix ID, reaction type, rating, review/comment text, review language, generated user ID, optional nickname, timestamps, and related request metadata. Review/comment text and nickname snapshots may be visible to other users if shown in the community area." },
            { "type": "p", "text": "If you request translation of community review/comment text, Mixly may send the text and target language to third-party translation service providers. Translation providers may process that text and related technical metadata under their own terms and privacy practices." },
            { "type": "p", "text": "Messaging and notification service providers may process message content and related metadata under their own terms and privacy practices. Please do not include sensitive personal information in support, feedback, or suggestion messages unless it is necessary for your request." }
          ]
        },
        {
          "id": "s6",
          "title": "6. Analytics",
          "blocks": [
            { "type": "p", "text": "Mixly uses Amplitude as an analytics service provider to understand basic app usage, improve product quality, diagnose feature performance, and evaluate premium feature flows. Analytics is enabled only when the app is configured with an Amplitude API key." },
            { "type": "p", "text": "Analytics events may include a pseudonymous Amplitude device ID, session ID, event name, event time, platform, operating system name and version, app version, build number, app slug, app language, premium status, active tab, and device locale information such as device language, language tag, region, currency, measurement system, text direction, time zone, and 24-hour-clock setting. If you sign in with Apple or Google, Mixly also sends the pseudonymous Supabase account ID to link analytics across your signed-in devices; it does not send your provider email address or name." },
            { "type": "p", "text": "Analytics event properties may include selected tab, previous tab, screen name, selected onboarding counts, selected strength identifiers, mix ID, mix name, ingredient count, strength level, favorite state, search query length and result count, swipe direction, paywall source, package identifier, product identifier, package type, price, currency, restore status, purchase event status, share status, review rating, review text length, reaction ID, and similar product interaction metadata." },
            { "type": "p", "text": "Amplitude and related analytics infrastructure may also process IP address and request metadata when analytics events are sent. Depending on Amplitude settings, this may be used to derive approximate geographic information such as country, region, or city for product analytics and abuse prevention." },
            { "type": "p", "text": "Successful premium purchase events may include Amplitude revenue fields when RevenueCat exposes product price data. Mixly does not use Amplitude for advertising, ad personalization, or cross-app tracking. We do not intentionally send your name, email address, precise GPS location, contacts, photos, support message text, or full community review/comment text to Amplitude." }
          ]
        },
        {
          "id": "s7",
          "title": "7. Subscriptions and purchases",
          "blocks": [
            { "type": "p", "text": "Mixly may offer premium features through in-app purchases, subscriptions, trials, or lifetime access where available. Purchase processing is handled by Apple App Store, Google Play, and RevenueCat. Mixly does not directly collect or store your full payment card details." },
            { "type": "p", "text": "RevenueCat and the applicable app store may process information needed to show offerings, process purchases, validate receipts, manage subscriptions, restore purchases, and determine whether premium entitlements are active. This may include app user or device identifiers, product and package identifiers, purchase status, receipt or transaction data, entitlement status, store country, currency, price, timestamps, diagnostics, and related technical data." },
            { "type": "p", "text": "RevenueCat purchase webhook events may be routed through Mixly backend services and messaging or notification service providers for operational purchase notifications. These webhook events may include product ID, store, price, currency, entitlement IDs, app user ID, transaction IDs, offering ID, purchase time, expiration time, and event time." }
          ]
        },
        {
          "id": "s8",
          "title": "8. Sharing and links",
          "blocks": [
            { "type": "p", "text": "Mixly lets you share mixes or the app through the operating system share sheet. When you choose to share a mix, Mixly may generate share text, a Mixly deep link, a smart share URL, and, where enabled, a temporary share-card image based on the mix name, ingredients, percentages, description, and app link. The destination app or person you choose to share with is controlled by you and is not controlled by Mixly." },
            { "type": "p", "text": "Smart share-link pages and deep links may process the shared mix ID, request URL, user-agent, IP address, timestamps, and related technical request metadata so the link can open Mixly or redirect to the appropriate app store. Mixly also tracks basic share events in analytics, such as mix ID, source, share mode, and success or failure state." }
          ]
        },
        {
          "id": "s9",
          "title": "9. Data we do not collect directly",
          "blocks": [
            { "type": "p", "text": "In the current release, Mixly does not provide or use:" },
            { "type": "ul", "items": [
              "email/password account registration; Mixly supports only optional Apple and Google account sign-in;",
              "direct card payment processing by Mixly (subscription billing and purchase management are handled by App Store or Google Play);",
              "advertising SDKs or ad personalization;",
              "public social profiles, private chats, or direct messaging between users;",
              "camera, photo library, contacts, precise location, coarse location, microphone, or push notification permissions."
            ] }
          ]
        },
        {
          "id": "s10",
          "title": "10. How we use information",
          "blocks": [
            { "type": "p", "text": "We use information described in this policy to:" },
            { "type": "ul", "items": [
              "provide the app's core catalog, filtering, recommendation, favorites, and onboarding functionality;",
              "load and update catalog and community content;",
              "receive, route, review, and respond where possible to support, feedback, and content suggestion messages;",
              "moderate, improve, approve, reject, and publish community mix suggestions;",
              "operate community reactions, ratings, reviews, review editing, review deletion, and review translation features;",
              "provide premium features, show subscription offerings, validate purchases, restore purchases, and manage premium entitlements;",
              "generate share text, share cards, deep links, smart share links, and app store fallback links when you choose to share content;",
              "measure app usage, feature performance, onboarding, favorites, community interactions, sharing, paywall flows, and purchase funnel events through analytics;",
              "maintain security, prevent abuse, debug errors, and operate backend services;",
              "comply with legal obligations and enforce our Terms of Use and License Agreement."
            ] }
          ]
        },
        {
          "id": "s11",
          "title": "11. Sharing information",
          "blocks": [
            { "type": "p", "text": "We do not sell personal data. We do not share personal data for advertising tracking or ad personalization." },
            { "type": "p", "text": "We may share or allow processing of information with service providers that help operate Mixly, including Supabase, messaging and notification service providers, Amplitude, RevenueCat, Apple App Store, Google Play, translation service providers, hosting providers, email providers, and technical infrastructure providers. These providers process information for service operation, hosting, analytics, subscription management, translation, security, support, and similar purposes." },
            { "type": "p", "text": "We may also disclose information if required by law, legal process, government request, or to protect the rights, safety, and security of Mixly, users, or others." }
          ]
        },
        {
          "id": "s12",
          "title": "12. Retention and deletion",
          "blocks": [
            { "type": "p", "text": "Local app data remains on your device until you delete it, clear app data, reset the app, or uninstall Mixly. If you sign in with Apple or Google, you may delete your account in the app; this deletes the authenticated account and its private cloud app-data snapshot. Signing out removes the local account data from that device after it has had an opportunity to sync." },
            { "type": "p", "text": "Support, feedback, user profile records, analytics records, subscription entitlement records, smart share-link technical logs, community suggestion records, community reaction records, and community review records are retained only as long as reasonably needed for support, app improvement, catalog improvement, moderation, analytics, subscription management, sharing functionality, security, legal, and operational purposes." },
            { "type": "p", "text": "You may delete your own community reviews in the app where that feature is available. You may request deletion of support correspondence, user profile records, community suggestion records, or community review records, or ask privacy questions, by contacting [[a:./support.html#account-deletion]]the public account-deletion request page[[/a]] or [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]. We may need to retain some information if required for legal, security, fraud prevention, billing, dispute-resolution, or legitimate operational reasons." }
          ]
        },
        {
          "id": "s13",
          "title": "13. Children and minors",
          "blocks": [
            { "type": "p", "text": "Mixly is not directed to children or minors. You must be at least 18 years old to use Mixly, or older if a higher age is required by the laws that apply to you. We do not knowingly collect personal information from children or minors." }
          ]
        },
        {
          "id": "s14",
          "title": "14. International processing",
          "blocks": [
            { "type": "p", "text": "Mixly is operated from Georgia and uses service providers that may process information in other countries. These countries may have data protection laws that differ from the laws in your location." }
          ]
        },
        {
          "id": "s15",
          "title": "15. Security",
          "blocks": [
            { "type": "p", "text": "We use reasonable technical and organizational measures designed to protect information handled by Mixly. No method of transmission or storage is completely secure, and we cannot guarantee absolute security." }
          ]
        },
        {
          "id": "s16",
          "title": "16. Changes to this policy",
          "blocks": [
            { "type": "p", "text": "We may update this Privacy Policy when Mixly changes or when legal requirements change. If we make material changes, we will update the effective date and publish the revised policy through the app or the relevant public legal page." }
          ]
        },
        {
          "id": "s17",
          "title": "17. Contact",
          "blocks": [
            { "type": "p", "text": "For privacy, support, or legal questions, contact: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." }
          ]
        }
      ]
    },
    "ru": {
      "title": "Политика конфиденциальности",
      "meta": "Дата вступления в силу: 22 июля 2026",
      "notice": "Mixly предназначен только для взрослых. Приложение является информационным каталогом и справочником рекомендаций по миксам вкусов для кальяна/шиши. Оно не продаёт, не доставляет, не содействует продаже и не продвигает покупку или употребление табака, никотина, алкоголя либо контролируемых товаров.",
      "sections": [
        {
          "id": "s1",
          "title": "1. Кто управляет Mixly",
          "blocks": [
            { "type": "p", "text": "Оператором Mixly является Индивидуальный предприниматель ULADZISLAU YARMAKOVICH, Батуми, Грузия («Mixly», «мы», «нас» или «наш»)." },
            { "type": "p", "text": "Контактный email для запросов по конфиденциальности, поддержке и юридическим вопросам: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." },
            { "type": "p", "text": "Почтовый адрес: Грузия, г. Батуми, ул. Вахтанга Горгасали, N116-118, 11 этаж, квартира N58." }
          ]
        },
        {
          "id": "s2",
          "title": "2. Область применения",
          "blocks": [
            { "type": "p", "text": "Эта Политика конфиденциальности описывает, как Mixly обрабатывает информацию при использовании мобильного приложения Mixly и связанных с ним юридических страниц, сервисов каталога, аналитики, подписок, поддержки, шаринга, перевода и community-функций. Политика предназначена для описания текущего поведения приложения." }
          ]
        },
        {
          "id": "s3",
          "title": "3. Информация, хранящаяся на вашем устройстве",
          "blocks": [
            { "type": "p", "text": "Mixly хранит часть данных локально на вашем устройстве, чтобы приложение могло работать без аккаунта. Это может включать:" },
            { "type": "ul", "items": [
              "предпочтения онбординга, например выбранные бренды, категории, вкусы и предпочитаемую крепость;",
              "идентификаторы избранных миксов;",
              "локальное состояние приложения, необходимое для показа персонализированной ленты миксов, дневных бесплатных лимитов, подсказок свайпа и состояния paywall;",
              "данные Labs, такие как пользовательские табаки, сгенерированные или ручные lab-миксы, проценты ингредиентов и счётчики случайной генерации;",
              "локально созданный Mixly user ID и необязательный никнейм для поддержки и community-функций;",
              "локально созданный Amplitude device ID для аналитики, если аналитика включена;",
              "временные изображения share-card, созданные на вашем устройстве, когда вы выбираете поделиться изображением микса и эта функция включена;",
              "поведение приложения, связанное с языком, определяемое по локали устройства или выбору языка в приложении."
            ] },
            { "type": "p", "text": "Эта информация хранится на устройстве с использованием технологий локального хранилища, таких как AsyncStorage, и временных файлов приложения. Mixly не предоставляет регистрацию по email/паролю. Вы можете войти через Apple на iOS или через Google на Android, а на iOS пользователь может явно привязать Google к тому же аккаунту. Для авторизованного аккаунта Mixly сохраняет приватную облачную копию перечисленных данных в Supabase, чтобы восстановить их на другом устройстве. Эта копия привязана к аутентифицированному Supabase user ID и недоступна другим пользователям. Часть локальной идентификационной информации, например созданный Mixly user ID и необязательный никнейм, также может синхронизироваться с Supabase для работы поддержки и community-функций. Если вы выбираете скопировать свой системный ID Mixly, это значение помещается в буфер обмена устройства средствами операционной системы." },
            { "type": "p", "text": "Сайт Mixly хранит выбранный язык интерфейса в localStorage (mixly-lang). Если вы явно разрешаете необязательную веб-аналитику, Mixly загружает PostHog из US Cloud. PostHog может хранить состояние аналитики в cookies или localStorage и обрабатывать псевдонимный идентификатор браузера, путь страницы без query-параметров, язык интерфейса, тип страницы, origin реферера и переходы по ссылкам App Store или Google Play. Мы не включаем автосбор действий, heatmaps, запись сессий, рекламу или отслеживание в соцсетях. От аналитики можно отказаться или изменить выбор в любой момент по ссылке «Настройки аналитики» в футере. PostHog и его инфраструктура могут обрабатывать сетевые метаданные, включая IP-адрес, для приёма событий; информация может обрабатываться в США." }
          ]
        },
        {
          "id": "s4",
          "title": "4. Информация, обрабатываемая бэкендом и провайдерами сервисов",
          "blocks": [
            { "type": "p", "text": "Mixly использует Supabase как провайдера сервисов для размещения данных каталога, пользовательских профилей, маршрутизации поддержки, community-предложений миксов, данных модерации, community-реакций, community-комментариев/отзывов, опубликованных community-миксов, маршрутизации RevenueCat webhook и smart share-link страниц. Данные каталога могут включать бренды, вкусы, составы миксов, ссылки на источники и связанные метаданные. Приложение запрашивает эти данные у Supabase, чтобы отображать, ранжировать и обновлять миксы." },
            { "type": "p", "text": "Когда ваше устройство подключается к Supabase или к сервисам хостинга, используемым для юридических страниц или инфраструктуры приложения, эти провайдеры могут обрабатывать техническую информацию, необходимую для работы, безопасности и диагностики. Это может включать IP-адрес, метаданные запросов, метаданные устройства или сети, временные метки, журналы ошибок и журналы безопасности." },
            { "type": "p", "text": "Мы используем эту техническую информацию только для функционирования сервиса, безопасности, отладки, предотвращения злоупотреблений, а также для соблюдения юридических и операционных требований. Мы не используем её для рекламного трекинга." }
          ]
        },
        {
          "id": "s5",
          "title": "5. User ID, поддержка и community-функции",
          "blocks": [
            { "type": "p", "text": "Mixly создаёт псевдонимный локальный user ID, например идентификатор, начинающийся с «MX-», и позволяет по желанию указать никнейм. Это не аккаунт с email/паролем, но эти данные могут храниться локально и синхронизироваться с Supabase для идентификации запросов поддержки, ограничения злоупотреблений, отображения community-авторства и работы процессов предложений." },
            { "type": "p", "text": "Приложение позволяет отправлять предложения, запросы по каталогу, обратную связь и community-предложения миксов. В зависимости от функции Mixly может передавать текст сообщения, тип сообщения, язык приложения, метку источника, созданный user ID, необязательный никнейм, название микса, описание микса, вкусы, табаки, крепость, временные метки и связанные технические данные запроса в Supabase Edge Functions." },
            { "type": "p", "text": "Сообщения поддержки и обратной связи могут пересылаться через сервисы сообщений или уведомлений, которые оператор Mixly использует для поддержки и продуктовых операций. Community-предложения миксов могут сохраняться в Supabase для модерации, проверки, улучшения каталога и возможной публикации в приложении. Если community-предложение одобрено, указанный никнейм может отображаться рядом с опубликованным миксом." },
            { "type": "p", "text": "Community-функции могут позволять реагировать на опубликованные community-миксы, отправлять оценки, писать текст отзывов/комментариев, редактировать или удалять свои отзывы и запрашивать перевод текста отзывов. Mixly может обрабатывать ID опубликованного микса, тип реакции, оценку, текст отзыва/комментария, язык отзыва, созданный user ID, необязательный никнейм, временные метки и связанные метаданные запроса. Текст отзыва/комментария и snapshot никнейма могут быть видны другим пользователям, если отображаются в community-разделе." },
            { "type": "p", "text": "Если вы запрашиваете перевод текста community-отзыва/комментария, Mixly может отправить этот текст и целевой язык сторонним поставщикам сервисов перевода. Поставщики перевода могут обрабатывать этот текст и связанные технические метаданные в соответствии со своими условиями и практиками конфиденциальности." },
            { "type": "p", "text": "Сервисы сообщений и уведомлений могут обрабатывать содержание сообщений и связанные метаданные в соответствии со своими условиями и практиками конфиденциальности. Пожалуйста, не указывайте чувствительные персональные данные в сообщениях поддержки, обратной связи или предложений, если это не необходимо для вашего запроса." }
          ]
        },
        {
          "id": "s6",
          "title": "6. Аналитика",
          "blocks": [
            { "type": "p", "text": "Mixly использует Amplitude как провайдера аналитики, чтобы понимать базовое использование приложения, улучшать качество продукта, диагностировать работу функций и оценивать premium-сценарии. Аналитика включается только если приложение настроено с Amplitude API key." },
            { "type": "p", "text": "Аналитические события могут включать псевдонимный Amplitude device ID, session ID, название события, время события, платформу, название и версию операционной системы, версию приложения, build number, app slug, язык приложения, premium-статус, активную вкладку и сведения о локали устройства, такие как язык устройства, language tag, регион, валюта, система измерения, направление текста, часовой пояс и использование 24-часового формата. Если вы входите через Apple или Google, Mixly также отправляет псевдонимный Supabase account ID, чтобы связать аналитику между вашими авторизованными устройствами; email и имя из аккаунта провайдера не отправляются." },
            { "type": "p", "text": "Свойства аналитических событий могут включать выбранную вкладку, предыдущую вкладку, название экрана, количество выбранных элементов онбординга, выбранные идентификаторы крепости, ID микса, название микса, количество ингредиентов, уровень крепости, состояние избранного, длину поискового запроса и количество результатов, направление свайпа, источник paywall, package ID, product ID, тип package, цену, валюту, статус восстановления, статус события покупки, статус шаринга, оценку отзыва, длину текста отзыва, reaction ID и похожие метаданные взаимодействия с продуктом." },
            { "type": "p", "text": "Amplitude и связанная аналитическая инфраструктура также могут обрабатывать IP-адрес и метаданные запроса при отправке аналитических событий. В зависимости от настроек Amplitude это может использоваться для определения примерной географической информации, такой как страна, регион или город, для продуктовой аналитики и предотвращения злоупотреблений." },
            { "type": "p", "text": "События успешной premium-покупки могут включать Amplitude revenue fields, если RevenueCat предоставляет данные цены продукта. Mixly не использует Amplitude для рекламы, персонализации рекламы или cross-app tracking. Мы намеренно не отправляем в Amplitude ваше имя, email, точную GPS-геолокацию, контакты, фотографии, текст сообщений поддержки или полный текст community-отзывов/комментариев." }
          ]
        },
        {
          "id": "s7",
          "title": "7. Подписки и покупки",
          "blocks": [
            { "type": "p", "text": "Mixly может предлагать premium-функции через in-app purchases, подписки, trial-доступ, lifetime-доступ или похожие платные варианты. Обработка покупок выполняется Apple App Store, Google Play и RevenueCat. Mixly напрямую не собирает и не хранит полные данные банковской карты." },
            { "type": "p", "text": "RevenueCat и соответствующий магазин приложений могут обрабатывать информацию, необходимую для показа предложений, обработки покупок, проверки чеков, управления подписками, восстановления покупок и определения активных premium-entitlements. Это может включать идентификаторы пользователя приложения или устройства, идентификаторы продуктов и packages, статус покупки, receipt/transaction data, entitlement status, страну магазина, валюту, цену, временные метки, диагностику и связанные технические данные." },
            { "type": "p", "text": "RevenueCat purchase webhook events могут маршрутизироваться через backend-сервисы Mixly и сервисы сообщений или уведомлений для операционных уведомлений о покупках. Такие webhook events могут включать product ID, store, price, currency, entitlement IDs, app user ID, transaction IDs, offering ID, purchase time, expiration time и event time." }
          ]
        },
        {
          "id": "s8",
          "title": "8. Шаринг и ссылки",
          "blocks": [
            { "type": "p", "text": "Mixly позволяет делиться миксами или приложением через системный share sheet. Когда вы выбираете поделиться миксом, Mixly может создать share text, Mixly deep link, smart share URL и, если функция включена, временное изображение share-card на основе названия микса, ингредиентов, процентов, описания и ссылки на приложение. Приложение-получатель или человек, с которым вы делитесь, выбирается вами и не контролируется Mixly." },
            { "type": "p", "text": "Smart share-link страницы и deep links могут обрабатывать ID микса, URL запроса, user-agent, IP-адрес, временные метки и связанные технические метаданные запроса, чтобы ссылка могла открыть Mixly или перенаправить в подходящий магазин приложений. Mixly также отслеживает базовые события шаринга в аналитике, например ID микса, источник, режим шаринга и статус успеха или ошибки." }
          ]
        },
        {
          "id": "s9",
          "title": "9. Данные, которые мы не собираем напрямую",
          "blocks": [
            { "type": "p", "text": "В текущем релизе Mixly не предоставляет и не использует:" },
            { "type": "ul", "items": [
              "регистрацию или вход через email/пароль; Mixly поддерживает только необязательный вход через аккаунты Apple и Google;",
              "прямую обработку карточных платежей со стороны Mixly (выставление счетов по подписке и управление покупками осуществляются App Store или Google Play);",
              "рекламные SDK или персонализацию рекламы;",
              "публичные социальные профили, приватные чаты или прямые сообщения между пользователями;",
              "разрешения на камеру, фото-библиотеку, контакты, точную/примерную геолокацию, микрофон или push-уведомления."
            ] }
          ]
        },
        {
          "id": "s10",
          "title": "10. Как мы используем информацию",
          "blocks": [
            { "type": "p", "text": "Мы используем информацию, описанную в этой политике, чтобы:" },
            { "type": "ul", "items": [
              "предоставлять основные функции приложения: каталог, фильтры, рекомендации, избранное и онбординг;",
              "загружать и обновлять контент каталога и community-контент;",
              "получать, маршрутизировать, просматривать и по возможности отвечать на сообщения поддержки, обратной связи и предложений;",
              "модерировать, улучшать, одобрять, отклонять и публиковать community-предложения миксов;",
              "обеспечивать работу community-реакций, оценок, отзывов, редактирования отзывов, удаления отзывов и перевода отзывов;",
              "предоставлять premium-функции, показывать предложения подписки, проверять покупки, восстанавливать покупки и управлять premium-entitlements;",
              "создавать share text, share cards, deep links, smart share links и fallback-ссылки на магазины приложений, когда вы выбираете поделиться контентом;",
              "измерять использование приложения, работу функций, онбординг, избранное, community-взаимодействия, шаринг, paywall-сценарии и purchase funnel через аналитику;",
              "поддерживать безопасность, предотвращать злоупотребления, отлаживать ошибки и обеспечивать работу бэкенд-сервисов;",
              "соблюдать юридические обязательства и обеспечивать соблюдение наших Условий использования и Лицензионного соглашения."
            ] }
          ]
        },
        {
          "id": "s11",
          "title": "11. Передача информации",
          "blocks": [
            { "type": "p", "text": "Мы не продаём персональные данные. Мы не передаём персональные данные для рекламного трекинга или персонализации рекламы." },
            { "type": "p", "text": "Мы можем передавать или допускать обработку информации поставщиками сервисов, которые помогают работать Mixly, включая Supabase, сервисы сообщений и уведомлений, Amplitude, RevenueCat, Apple App Store, Google Play, поставщиков сервисов перевода, провайдеров хостинга, провайдеров электронной почты и поставщиков технической инфраструктуры. Эти провайдеры обрабатывают информацию для работы сервиса, хостинга, аналитики, управления подписками, перевода, безопасности, поддержки и аналогичных целей." },
            { "type": "p", "text": "Мы также можем раскрывать информацию, если этого требует закон, судебный или иной правовой процесс, запрос государственных органов, либо для защиты прав, безопасности и защищённости Mixly, пользователей или других лиц." }
          ]
        },
        {
          "id": "s12",
          "title": "12. Срок хранения и удаление",
          "blocks": [
            { "type": "p", "text": "Локальные данные приложения остаются на устройстве, пока вы не удалите их, не очистите данные приложения, не сбросите приложение или не удалите Mixly. Если вы вошли через Apple или Google, вы можете удалить аккаунт в приложении: это удалит аутентифицированный аккаунт и его приватный облачный снимок данных. При выходе локальные данные аккаунта удаляются с устройства после попытки синхронизации." },
            { "type": "p", "text": "Сообщения поддержки, обратной связи, user profile records, аналитические записи, записи premium-entitlement, технические логи smart share links, community-предложения, community-реакции и community-отзывы хранятся только столько времени, сколько разумно необходимо для поддержки, улучшения приложения и каталога, модерации, аналитики, управления подписками, работы шаринга, безопасности, юридических и операционных целей." },
            { "type": "p", "text": "Вы можете удалить свои community-отзывы в приложении, если эта функция доступна. Вы можете запросить удаление переписки с поддержкой, user profile records, community-предложений или community-отзывов, а также задать вопросы по конфиденциальности, обратившись на [[a:./support.html#account-deletion]]публичную страницу запроса на удаление аккаунта[[/a]] или на [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]. Нам может потребоваться сохранить часть информации, если это необходимо по юридическим причинам, для безопасности, предотвращения мошенничества, биллинга, разрешения споров или по обоснованным операционным причинам." }
          ]
        },
        {
          "id": "s13",
          "title": "13. Дети и несовершеннолетние",
          "blocks": [
            { "type": "p", "text": "Mixly не предназначен для детей и несовершеннолетних. Вам должно быть не менее 18 лет для использования Mixly, либо больше, если более высокий возраст требуется законодательством, применимым к вам. Мы сознательно не собираем персональную информацию о детях или несовершеннолетних." }
          ]
        },
        {
          "id": "s14",
          "title": "14. Международная обработка",
          "blocks": [
            { "type": "p", "text": "Mixly управляется из Грузии и использует поставщиков сервисов, которые могут обрабатывать информацию в других странах. В этих странах могут действовать законы о защите данных, отличающиеся от законов вашей страны." }
          ]
        },
        {
          "id": "s15",
          "title": "15. Безопасность",
          "blocks": [
            { "type": "p", "text": "Мы применяем разумные технические и организационные меры, направленные на защиту информации, обрабатываемой Mixly. Ни один способ передачи или хранения данных не является полностью безопасным, и мы не можем гарантировать абсолютную безопасность." }
          ]
        },
        {
          "id": "s16",
          "title": "16. Изменения этой политики",
          "blocks": [
            { "type": "p", "text": "Мы можем обновлять эту Политику конфиденциальности по мере изменения Mixly или требований законодательства. При существенных изменениях мы обновим дату вступления в силу и опубликуем обновлённую политику через приложение или соответствующую публичную юридическую страницу." }
          ]
        },
        {
          "id": "s17",
          "title": "17. Контакты",
          "blocks": [
            { "type": "p", "text": "По вопросам конфиденциальности, поддержки или юридическим вопросам: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." }
          ]
        }
      ]
    },
    "de": {
      "title": "Datenschutzerklärung",
      "meta": "Gültig ab: 22. Juli 2026",
      "notice": "Mixly ist ausschließlich für Erwachsene bestimmt. Die App ist ein informativer Katalog und ein Empfehlungsnachschlagewerk für Geschmacksmischungen für Wasserpfeife/Shisha. Sie verkauft, versendet oder vermittelt keine Tabak-, Nikotin-, Alkohol- oder kontrollierten Produkte und fördert weder deren Kauf noch deren Konsum.",
      "sections": [
        {
          "id": "s1",
          "title": "1. Wer Mixly betreibt",
          "blocks": [
            { "type": "p", "text": "Mixly wird betrieben vom Einzelunternehmer ULADZISLAU YARMAKOVICH, Batumi, Georgien („Mixly“, „wir“, „uns“ oder „unser“)." },
            { "type": "p", "text": "Kontakt-E-Mail für Datenschutz-, Support- und Rechtsanfragen: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." },
            { "type": "p", "text": "Postanschrift: Georgien, Stadt Batumi, Vakhtang-Gorgasali-Str. N116-118, 11. Stock, Wohnung N58." }
          ]
        },
        {
          "id": "s2",
          "title": "2. Geltungsbereich dieser Erklärung",
          "blocks": [
            { "type": "p", "text": "Diese Datenschutzerklärung erläutert, wie Mixly Informationen verarbeitet, wenn Sie die mobile Mixly-Anwendung und die zugehörigen gehosteten Dienste für Rechtstexte, Katalog, Analyse, Abonnements, Support, Teilen, Übersetzung und Community nutzen. Sie beschreibt das aktuelle Verhalten der App." }
          ]
        },
        {
          "id": "s3",
          "title": "3. Auf Ihrem Gerät gespeicherte Informationen",
          "blocks": [
            { "type": "p", "text": "Mixly speichert einige App-Daten lokal auf Ihrem Gerät, damit die App ohne Konto funktioniert. Dazu können gehören:" },
            { "type": "ul", "items": [
              "Onboarding-Einstellungen wie ausgewählte Marken, Kategorien, Geschmacksrichtungen und bevorzugte Stärke;",
              "Kennungen favorisierter Mischungen;",
              "lokaler App-Zustand, der erforderlich ist, um Ihren personalisierten Mix-Feed, tägliche Limits für den kostenlosen Zugang, Wischhinweise und den Paywall-Zustand anzuzeigen;",
              "Labs-Daten wie benutzerdefinierte Tabake, generierte oder manuelle Lab-Mischungen, Zutatenanteile und Zähler für die Zufallsgenerierung;",
              "eine lokal generierte Mixly-Benutzer-ID und ein optionaler Spitzname, die für Support- und Community-Vorschlagsfunktionen verwendet werden;",
              "eine lokal generierte Amplitude-Geräte-ID, die für die Analyse verwendet wird, sofern die Analyse aktiviert ist;",
              "temporäre Share-Card-Bilder, die auf Ihrem Gerät erzeugt werden, wenn Sie ein Mischungsbild teilen und diese Funktion aktiviert ist;",
              "sprachbezogenes App-Verhalten, das aus Ihrer Geräte-Locale oder Ihrer In-App-Sprachauswahl abgeleitet wird."
            ] },
            { "type": "p", "text": "Diese Informationen werden mit lokaler Speichertechnologie wie AsyncStorage und temporären App-Dateien auf Ihrem Gerät gespeichert. Mixly bietet keine Registrierung mit E-Mail/Passwort an. Sie können sich unter iOS mit Apple oder unter Android mit Google anmelden, und ein iOS-Nutzer kann Google ausdrücklich mit demselben Konto verknüpfen. Für ein authentifiziertes Konto speichert Mixly eine private Cloud-Kopie der aufgeführten App-Daten in Supabase, damit sie auf einem anderen Gerät wiederhergestellt werden kann. Die Cloud-Kopie ist mit Ihrer authentifizierten Supabase-Benutzer-ID verknüpft und so geschützt, dass andere Nutzer sie nicht lesen können. Einige lokale Identitätsinformationen, etwa Ihre generierte Mixly-Benutzer-ID und der optionale Spitzname, können ebenfalls mit Supabase synchronisiert werden, damit Support- und Community-Funktionen arbeiten können. Wenn Sie Ihre Mixly-System-ID kopieren, wird dieser Wert vom Betriebssystem in die Zwischenablage Ihres Geräts gelegt." },
            { "type": "p", "text": "Die Mixly-Website speichert Ihre gewählte Anzeigesprache in localStorage (mixly-lang). Wenn Sie optionale Webanalyse ausdrücklich erlauben, lädt Mixly PostHog aus der US Cloud. PostHog kann seinen Analysestatus in Cookies oder localStorage speichern und eine pseudonyme Browserkennung, den Seitenpfad ohne Query-Parameter, Anzeigesprache, Seitentyp, Referrer-Origin sowie Interaktionen mit App-Store- oder Google-Play-Links verarbeiten. Wir aktivieren keine automatische Interaktionserfassung, Heatmaps, Sitzungsaufzeichnungen, Werbung oder Social-Media-Tracking. Sie können die Analyse jederzeit über den Link „Analyse-Einstellungen“ in der Fußzeile ablehnen oder Ihre Auswahl ändern. PostHog und seine Infrastruktur können Netzwerkmetadaten einschließlich der IP-Adresse verarbeiten, um Ereignisse zu empfangen; Informationen können in den Vereinigten Staaten verarbeitet werden." }
          ]
        },
        {
          "id": "s4",
          "title": "4. Vom Backend und von Dienstleistern verarbeitete Informationen",
          "blocks": [
            { "type": "p", "text": "Mixly nutzt Supabase als Dienstleister zum Hosten von Katalogdaten, Benutzerprofildatensätzen, Support-Routing, Community-Mischungsvorschlägen, Moderationsdaten, Community-Reaktionen, Community-Kommentaren/-Bewertungen, veröffentlichten Community-Mischungsinhalten, RevenueCat-Webhook-Routing und Smart-Share-Link-Seiten. Katalogdaten können Marken, Geschmacksrichtungen, Mischungszusammensetzungen, Quellenverweise und zugehörige Metadaten enthalten. Die App fordert diese Daten von Supabase an, um Mischungen anzuzeigen, zu ordnen und zu aktualisieren." },
            { "type": "p", "text": "Wenn sich Ihr Gerät mit Supabase oder mit Hosting-Diensten verbindet, die für Rechtstexte oder App-Infrastruktur verwendet werden, können diese Anbieter technische Informationen verarbeiten, die für den Betrieb, die Sicherheit und die Fehlerbehebung des Dienstes erforderlich sind. Dazu können IP-Adresse, Anfrage-Metadaten, Geräte- oder Netzwerk-Metadaten, Zeitstempel, Fehlerprotokolle und Sicherheitsprotokolle gehören." },
            { "type": "p", "text": "Wir verwenden diese technischen Informationen ausschließlich für die Funktionalität des Dienstes, Sicherheit, Fehlersuche, Missbrauchsprävention sowie zur Einhaltung rechtlicher oder betrieblicher Vorgaben. Wir verwenden sie nicht für Werbetracking." }
          ]
        },
        {
          "id": "s5",
          "title": "5. Benutzeridentität, Support und Community-Funktionen",
          "blocks": [
            { "type": "p", "text": "Mixly erstellt eine pseudonyme lokale Benutzer-ID, etwa eine ID, die mit „MX-“ beginnt, und ermöglicht Ihnen die optionale Festlegung eines Spitznamens. Dies ist kein Konto mit E-Mail/Passwort, kann jedoch lokal gespeichert und mit Supabase synchronisiert werden, um Support-Anfragen zuzuordnen, Missbrauch durch Ratenbegrenzung einzuschränken, die Community-Zuordnung anzuzeigen und Community-Vorschlagsabläufe zu verwalten." },
            { "type": "p", "text": "Über die App können Sie Vorschläge, Katalogwünsche, Feedback und Community-Mischungsvorschläge aus Mixly heraus senden. Je nach genutzter Funktion kann Mixly Ihren Nachrichtentext, den Nachrichtentyp, die App-Sprache, ein Quellenlabel, die generierte Benutzer-ID, den optionalen Spitznamen, den Mischungsnamen, die Mischungsbeschreibung, Geschmacksrichtungen, Tabake, Stärke, Zeitstempel und zugehörige technische Anfragedaten an Supabase Edge Functions senden." },
            { "type": "p", "text": "Support- und Feedback-Nachrichten können über Messaging- oder Benachrichtigungsdienstleister weitergeleitet werden, die der Mixly-Betreiber für Support und Produktbetrieb einsetzt. Community-Mischungsvorschläge können in Supabase zur Moderation, Prüfung, Katalogverbesserung und möglichen Veröffentlichung in der App gespeichert werden. Wird ein Community-Mischungsvorschlag genehmigt, kann der eingereichte Spitzname zusammen mit der veröffentlichten Mischung angezeigt werden, sofern Sie einen angegeben haben." },
            { "type": "p", "text": "Community-Funktionen können es Ihnen ermöglichen, auf veröffentlichte Community-Mischungen zu reagieren, Bewertungen abzugeben, Rezensions-/Kommentartext zu verfassen, Ihre eigenen Rezensionen zu bearbeiten oder zu löschen und die Übersetzung von Rezensionstext anzufordern. Mixly kann die ID der veröffentlichten Mischung, den Reaktionstyp, die Bewertung, den Rezensions-/Kommentartext, die Rezensionssprache, die generierte Benutzer-ID, den optionalen Spitznamen, Zeitstempel und zugehörige Anfrage-Metadaten verarbeiten. Rezensions-/Kommentartext und Momentaufnahmen des Spitznamens können für andere Nutzer sichtbar sein, wenn sie im Community-Bereich angezeigt werden." },
            { "type": "p", "text": "Wenn Sie die Übersetzung von Community-Rezensions-/Kommentartext anfordern, kann Mixly den Text und die Zielsprache an Drittanbieter von Übersetzungsdiensten senden. Übersetzungsanbieter können diesen Text und zugehörige technische Metadaten gemäß ihren eigenen Bedingungen und Datenschutzpraktiken verarbeiten." },
            { "type": "p", "text": "Messaging- und Benachrichtigungsdienstleister können Nachrichteninhalte und zugehörige Metadaten gemäß ihren eigenen Bedingungen und Datenschutzpraktiken verarbeiten. Bitte geben Sie in Support-, Feedback- oder Vorschlagsnachrichten keine sensiblen personenbezogenen Daten an, sofern dies für Ihr Anliegen nicht erforderlich ist." }
          ]
        },
        {
          "id": "s6",
          "title": "6. Analyse",
          "blocks": [
            { "type": "p", "text": "Mixly nutzt Amplitude als Analysedienstleister, um die grundlegende App-Nutzung zu verstehen, die Produktqualität zu verbessern, die Funktionsleistung zu diagnostizieren und Premium-Funktionsabläufe zu bewerten. Die Analyse ist nur aktiviert, wenn die App mit einem Amplitude-API-Schlüssel konfiguriert ist." },
            { "type": "p", "text": "Analyseereignisse können eine pseudonyme Amplitude-Geräte-ID, eine Sitzungs-ID, den Ereignisnamen, die Ereigniszeit, die Plattform, den Namen und die Version des Betriebssystems, die App-Version, die Build-Nummer, den App-Slug, die App-Sprache, den Premium-Status, den aktiven Tab und Informationen zur Geräte-Locale wie Gerätesprache, Sprach-Tag, Region, Währung, Maßsystem, Textrichtung, Zeitzone und Einstellung der 24-Stunden-Uhr umfassen. Wenn Sie sich mit Apple oder Google anmelden, sendet Mixly außerdem die pseudonyme Supabase-Konto-ID, um die Analyse über Ihre angemeldeten Geräte hinweg zu verknüpfen; die E-Mail-Adresse oder der Name Ihres Anbieterkontos werden nicht gesendet." },
            { "type": "p", "text": "Eigenschaften von Analyseereignissen können den ausgewählten Tab, den vorherigen Tab, den Bildschirmnamen, die ausgewählten Onboarding-Anzahlen, die ausgewählten Stärke-Kennungen, die Mix-ID, den Mischungsnamen, die Zutatenanzahl, die Stärkestufe, den Favoritenstatus, die Länge der Suchanfrage und die Anzahl der Ergebnisse, die Wischrichtung, die Paywall-Quelle, die Paket-Kennung, die Produkt-Kennung, den Pakettyp, den Preis, die Währung, den Wiederherstellungsstatus, den Status des Kaufereignisses, den Teilen-Status, die Rezensionsbewertung, die Länge des Rezensionstexts, die Reaktions-ID und ähnliche Metadaten zur Produktinteraktion umfassen." },
            { "type": "p", "text": "Amplitude und die zugehörige Analyseinfrastruktur können beim Senden von Analyseereignissen auch die IP-Adresse und Anfrage-Metadaten verarbeiten. Je nach Amplitude-Einstellungen kann dies verwendet werden, um ungefähre geografische Informationen wie Land, Region oder Stadt für Produktanalyse und Missbrauchsprävention abzuleiten." },
            { "type": "p", "text": "Erfolgreiche Premium-Kaufereignisse können Amplitude-Umsatzfelder enthalten, wenn RevenueCat Produktpreisdaten bereitstellt. Mixly nutzt Amplitude nicht für Werbung, Werbepersonalisierung oder app-übergreifendes Tracking. Wir senden absichtlich weder Ihren Namen, Ihre E-Mail-Adresse, Ihren genauen GPS-Standort, Kontakte, Fotos, Support-Nachrichtentext noch den vollständigen Community-Rezensions-/Kommentartext an Amplitude." }
          ]
        },
        {
          "id": "s7",
          "title": "7. Abonnements und Käufe",
          "blocks": [
            { "type": "p", "text": "Mixly kann Premium-Funktionen über In-App-Käufe, Abonnements, Testphasen oder lebenslangen Zugang anbieten, sofern verfügbar. Die Kaufabwicklung erfolgt über Apple App Store, Google Play und RevenueCat. Mixly erhebt oder speichert Ihre vollständigen Zahlungskartendaten nicht direkt." },
            { "type": "p", "text": "RevenueCat und der jeweilige App-Store können Informationen verarbeiten, die erforderlich sind, um Angebote anzuzeigen, Käufe abzuwickeln, Belege zu validieren, Abonnements zu verwalten, Käufe wiederherzustellen und festzustellen, ob Premium-Berechtigungen aktiv sind. Dazu können App-Benutzer- oder Gerätekennungen, Produkt- und Paketkennungen, Kaufstatus, Beleg- oder Transaktionsdaten, Berechtigungsstatus, Store-Land, Währung, Preis, Zeitstempel, Diagnosedaten und zugehörige technische Daten gehören." },
            { "type": "p", "text": "RevenueCat-Kauf-Webhook-Ereignisse können für betriebliche Kaufbenachrichtigungen über Mixly-Backend-Dienste und Messaging- oder Benachrichtigungsdienstleister geleitet werden. Diese Webhook-Ereignisse können Produkt-ID, Store, Preis, Währung, Berechtigungs-IDs, App-Benutzer-ID, Transaktions-IDs, Angebots-ID, Kaufzeit, Ablaufzeit und Ereigniszeit umfassen." }
          ]
        },
        {
          "id": "s8",
          "title": "8. Teilen und Links",
          "blocks": [
            { "type": "p", "text": "Mixly ermöglicht es Ihnen, Mischungen oder die App über das Teilen-Menü des Betriebssystems zu teilen. Wenn Sie eine Mischung teilen, kann Mixly Teilen-Text, einen Mixly-Deeplink, eine Smart-Share-URL und, sofern aktiviert, ein temporäres Share-Card-Bild auf Basis von Mischungsname, Zutaten, Anteilen, Beschreibung und App-Link erzeugen. Die Ziel-App oder die Person, mit der Sie teilen, wählen Sie selbst; dies wird nicht von Mixly kontrolliert." },
            { "type": "p", "text": "Smart-Share-Link-Seiten und Deeplinks können die geteilte Mix-ID, die Anfrage-URL, den User-Agent, die IP-Adresse, Zeitstempel und zugehörige technische Anfrage-Metadaten verarbeiten, damit der Link Mixly öffnen oder zum passenden App-Store weiterleiten kann. Mixly erfasst außerdem grundlegende Teilen-Ereignisse in der Analyse, etwa Mix-ID, Quelle, Teilen-Modus und Erfolgs- oder Fehlerstatus." }
          ]
        },
        {
          "id": "s9",
          "title": "9. Daten, die wir nicht direkt erheben",
          "blocks": [
            { "type": "p", "text": "In der aktuellen Version bietet oder verwendet Mixly nicht:" },
            { "type": "ul", "items": [
              "Kontoregistrierung mit E-Mail/Passwort; Mixly unterstützt nur die optionale Anmeldung mit Apple- und Google-Konten;",
              "direkte Kartenzahlungsabwicklung durch Mixly (Abonnementabrechnung und Kaufverwaltung erfolgen über App Store oder Google Play);",
              "Werbe-SDKs oder Werbepersonalisierung;",
              "öffentliche soziale Profile, private Chats oder Direktnachrichten zwischen Nutzern;",
              "Berechtigungen für Kamera, Fotobibliothek, Kontakte, genauen Standort, ungefähren Standort, Mikrofon oder Push-Benachrichtigungen."
            ] }
          ]
        },
        {
          "id": "s10",
          "title": "10. Wie wir Informationen verwenden",
          "blocks": [
            { "type": "p", "text": "Wir verwenden die in dieser Erklärung beschriebenen Informationen, um:" },
            { "type": "ul", "items": [
              "die Kernfunktionen der App bereitzustellen: Katalog, Filterung, Empfehlungen, Favoriten und Onboarding;",
              "Katalog- und Community-Inhalte zu laden und zu aktualisieren;",
              "Support-, Feedback- und Inhaltsvorschlagsnachrichten zu empfangen, weiterzuleiten, zu prüfen und wo möglich zu beantworten;",
              "Community-Mischungsvorschläge zu moderieren, zu verbessern, zu genehmigen, abzulehnen und zu veröffentlichen;",
              "Community-Reaktionen, Bewertungen, Rezensionen, das Bearbeiten von Rezensionen, das Löschen von Rezensionen und die Rezensionsübersetzung zu betreiben;",
              "Premium-Funktionen bereitzustellen, Abonnementangebote anzuzeigen, Käufe zu validieren, Käufe wiederherzustellen und Premium-Berechtigungen zu verwalten;",
              "Teilen-Text, Share Cards, Deeplinks, Smart-Share-Links und Ausweichlinks zu App-Stores zu erzeugen, wenn Sie Inhalte teilen;",
              "App-Nutzung, Funktionsleistung, Onboarding, Favoriten, Community-Interaktionen, Teilen, Paywall-Abläufe und Ereignisse des Kauftrichters mittels Analyse zu messen;",
              "Sicherheit zu wahren, Missbrauch zu verhindern, Fehler zu beheben und Backend-Dienste zu betreiben;",
              "rechtlichen Verpflichtungen nachzukommen und unsere Nutzungsbedingungen und Lizenzvereinbarung durchzusetzen."
            ] }
          ]
        },
        {
          "id": "s11",
          "title": "11. Weitergabe von Informationen",
          "blocks": [
            { "type": "p", "text": "Wir verkaufen keine personenbezogenen Daten. Wir geben personenbezogene Daten nicht für Werbetracking oder Werbepersonalisierung weiter." },
            { "type": "p", "text": "Wir können Informationen an Dienstleister weitergeben oder von diesen verarbeiten lassen, die den Betrieb von Mixly unterstützen, darunter Supabase, Messaging- und Benachrichtigungsdienstleister, Amplitude, RevenueCat, Apple App Store, Google Play, Übersetzungsdienstleister, Hosting-Anbieter, E-Mail-Anbieter und Anbieter technischer Infrastruktur. Diese Anbieter verarbeiten Informationen für Dienstbetrieb, Hosting, Analyse, Abonnementverwaltung, Übersetzung, Sicherheit, Support und ähnliche Zwecke." },
            { "type": "p", "text": "Wir können Informationen auch offenlegen, wenn dies gesetzlich, durch ein Gerichts- oder sonstiges Rechtsverfahren, durch eine behördliche Anfrage vorgeschrieben ist oder um die Rechte, Sicherheit und Integrität von Mixly, der Nutzer oder Dritter zu schützen." }
          ]
        },
        {
          "id": "s12",
          "title": "12. Aufbewahrung und Löschung",
          "blocks": [
            { "type": "p", "text": "Lokale App-Daten verbleiben auf Ihrem Gerät, bis Sie sie löschen, die App-Daten leeren, die App zurücksetzen oder Mixly deinstallieren. Wenn Sie sich mit Apple oder Google anmelden, können Sie Ihr Konto in der App löschen; dadurch werden das authentifizierte Konto und dessen private Cloud-App-Daten-Momentaufnahme gelöscht. Beim Abmelden werden die lokalen Kontodaten von diesem Gerät entfernt, nachdem eine Synchronisierung möglich war." },
            { "type": "p", "text": "Support- und Feedback-Nachrichten, Benutzerprofildatensätze, Analysedatensätze, Datensätze zu Abonnementberechtigungen, technische Protokolle von Smart-Share-Links, Community-Vorschlagsdatensätze, Community-Reaktionsdatensätze und Community-Rezensionsdatensätze werden nur so lange aufbewahrt, wie es für Support, App-Verbesserung, Katalogverbesserung, Moderation, Analyse, Abonnementverwaltung, Teilen-Funktionalität, Sicherheit sowie rechtliche und betriebliche Zwecke vernünftigerweise erforderlich ist." },
            { "type": "p", "text": "Sie können Ihre eigenen Community-Rezensionen in der App löschen, sofern diese Funktion verfügbar ist. Sie können die Löschung von Support-Korrespondenz, Benutzerprofildatensätzen, Community-Vorschlagsdatensätzen oder Community-Rezensionsdatensätzen beantragen oder Datenschutzfragen stellen, indem Sie sich an [[a:./support.html#account-deletion]]die öffentliche Seite für Konto-Löschanträge[[/a]] oder an [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]] wenden. Wir müssen möglicherweise einige Informationen aufbewahren, sofern dies aus rechtlichen, Sicherheits-, Betrugspräventions-, Abrechnungs-, Streitbeilegungs- oder berechtigten betrieblichen Gründen erforderlich ist." }
          ]
        },
        {
          "id": "s13",
          "title": "13. Kinder und Minderjährige",
          "blocks": [
            { "type": "p", "text": "Mixly richtet sich nicht an Kinder oder Minderjährige. Sie müssen mindestens 18 Jahre alt sein, um Mixly zu nutzen, oder älter, wenn die für Sie geltenden Gesetze ein höheres Alter verlangen. Wir erheben wissentlich keine personenbezogenen Daten von Kindern oder Minderjährigen." }
          ]
        },
        {
          "id": "s14",
          "title": "14. Internationale Verarbeitung",
          "blocks": [
            { "type": "p", "text": "Mixly wird aus Georgien betrieben und nutzt Dienstleister, die Informationen in anderen Ländern verarbeiten können. In diesen Ländern können Datenschutzgesetze gelten, die sich von den Gesetzen an Ihrem Standort unterscheiden." }
          ]
        },
        {
          "id": "s15",
          "title": "15. Sicherheit",
          "blocks": [
            { "type": "p", "text": "Wir setzen angemessene technische und organisatorische Maßnahmen ein, die dem Schutz der von Mixly verarbeiteten Informationen dienen. Keine Übertragungs- oder Speichermethode ist vollständig sicher, und wir können keine absolute Sicherheit garantieren." }
          ]
        },
        {
          "id": "s16",
          "title": "16. Änderungen dieser Erklärung",
          "blocks": [
            { "type": "p", "text": "Wir können diese Datenschutzerklärung aktualisieren, wenn sich Mixly ändert oder wenn sich rechtliche Anforderungen ändern. Bei wesentlichen Änderungen aktualisieren wir das Gültigkeitsdatum und veröffentlichen die überarbeitete Erklärung über die App oder die entsprechende öffentliche Rechtsseite." }
          ]
        },
        {
          "id": "s17",
          "title": "17. Kontakt",
          "blocks": [
            { "type": "p", "text": "Bei Fragen zu Datenschutz, Support oder rechtlichen Themen wenden Sie sich an: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." }
          ]
        }
      ]
    }
  },
  "cookies": {
    "en": {
      "title": "Cookie & Analytics Policy",
      "meta": "Effective date: July 22, 2026",
      "notice": "This page explains the website storage and optional analytics controls available on the Mixly website.",
      "sections": [
        { "id": "s1", "title": "1. Your choice", "blocks": [
          { "type": "p", "text": "Mixly asks before it enables optional analytics. You can accept or reject it without losing access to the website. To change your choice later, [[a:#analytics-settings]]open analytics settings[[/a]]." }
        ] },
        { "id": "s2", "title": "2. Strictly necessary browser storage", "blocks": [
          { "type": "p", "text": "The website remembers your language, your analytics choice, and a one-time page-transition preference in browser storage. These values are not used for advertising, cross-site tracking, or profiling." }
        ] },
        { "id": "s3", "title": "3. Optional analytics", "blocks": [
          { "type": "p", "text": "If you allow analytics, we use a service provider to understand page visits, language changes, and clicks on app-store links. We do not record sessions, use heatmaps, or automatically capture interactions. More details are in our [[a:./privacy.html]]Privacy Policy[[/a]]." }
        ] },
        { "id": "s4", "title": "4. More information", "blocks": [
          { "type": "p", "text": "For the wider information-handling practices of Mixly, read our [[a:./privacy.html]]Privacy Policy[[/a]]. For questions, contact [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." }
        ] }
      ]
    },
    "ru": {
      "title": "Политика Cookies и аналитики",
      "meta": "Дата вступления в силу: 22 июля 2026",
      "notice": "На этой странице описаны технологии хранения в браузере и управление необязательной аналитикой на сайте Mixly.",
      "sections": [
        { "id": "s1", "title": "1. Ваш выбор", "blocks": [
          { "type": "p", "text": "Mixly спрашивает разрешение перед включением необязательной аналитики. Вы можете принять или отклонить её без потери доступа к сайту. Чтобы позже изменить выбор, [[a:#analytics-settings]]откройте настройки аналитики[[/a]]." }
        ] },
        { "id": "s2", "title": "2. Необходимое хранение в браузере", "blocks": [
          { "type": "p", "text": "Сайт запоминает выбранный язык, ваш выбор аналитики и однократную настройку анимации перехода между страницами в хранилище браузера. Эти значения не используются для рекламы, межсайтового трекинга или построения профиля." }
        ] },
        { "id": "s3", "title": "3. Необязательная аналитика", "blocks": [
          { "type": "p", "text": "Если вы разрешаете аналитику, мы используем сервис, чтобы понимать посещения страниц, смену языка и переходы по ссылкам на магазины приложений. Мы не записываем сессии, не используем heatmaps и не собираем действия автоматически. Подробности — в [[a:./privacy.html]]Политике конфиденциальности[[/a]]." }
        ] },
        { "id": "s4", "title": "4. Дополнительная информация", "blocks": [
          { "type": "p", "text": "Более широкое описание обработки информации приведено в [[a:./privacy.html]]Политике конфиденциальности[[/a]]. По вопросам пишите на [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." }
        ] }
      ]
    },
    "de": {
      "title": "Cookie- & Analyse-Richtlinie",
      "meta": "Gültig ab: 22. Juli 2026",
      "notice": "Diese Seite erläutert die Browser-Speicherung und die Steuerung optionaler Analysen auf der Mixly-Website.",
      "sections": [
        { "id": "s1", "title": "1. Ihre Auswahl", "blocks": [
          { "type": "p", "text": "Mixly fragt, bevor optionale Analysen aktiviert werden. Sie können sie akzeptieren oder ablehnen, ohne den Zugang zur Website zu verlieren. Um Ihre Auswahl später zu ändern, [[a:#analytics-settings]]öffnen Sie die Analyse-Einstellungen[[/a]]." }
        ] },
        { "id": "s2", "title": "2. Notwendige Browser-Speicherung", "blocks": [
          { "type": "p", "text": "Die Website speichert Ihre gewählte Sprache, Ihre Analyse-Auswahl und eine einmalige Einstellung für die Seitenwechsel-Animation im Browser. Diese Werte werden nicht für Werbung, websiteübergreifendes Tracking oder Profilbildung verwendet." }
        ] },
        { "id": "s3", "title": "3. Optionale Analysen", "blocks": [
          { "type": "p", "text": "Wenn Sie Analysen erlauben, nutzen wir einen Dienst, um Seitenbesuche, Sprachwechsel und Klicks auf App-Store-Links zu verstehen. Wir zeichnen keine Sitzungen auf, nutzen keine Heatmaps und erfassen Interaktionen nicht automatisch. Weitere Details finden Sie in unserer [[a:./privacy.html]]Datenschutzerklärung[[/a]]." }
        ] },
        { "id": "s4", "title": "4. Weitere Informationen", "blocks": [
          { "type": "p", "text": "Weitere Informationen zur Verarbeitung durch Mixly finden Sie in unserer [[a:./privacy.html]]Datenschutzerklärung[[/a]]. Fragen richten Sie bitte an [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." }
        ] }
      ]
    }
  },
  "terms": {
    "en": {
      "title": "Terms of Use",
      "meta": "Effective date: June 8, 2026",
      "notice": "Mixly is for adults only and is provided as an informational catalog and recommendation reference. Mixly does not sell, ship, facilitate the sale of, advertise, or promote the purchase or consumption of tobacco, nicotine, alcohol, or controlled products.",
      "sections": [
        {
          "id": "s1",
          "title": "1. Operator and contact",
          "blocks": [
            { "type": "p", "text": "Mixly is operated by Individual Entrepreneur ULADZISLAU YARMAKOVICH, Batumi, Georgia (\"Mixly\", \"we\", \"us\", or \"our\")." },
            { "type": "p", "text": "Contact email: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." },
            { "type": "p", "text": "Postal address: Georgia, Batumi City, Vakhtang Gorgasali st., N116-118, Floor 11, Apartment N58." }
          ]
        },
        {
          "id": "s2",
          "title": "2. Acceptance of these Terms",
          "blocks": [
            { "type": "p", "text": "By downloading, accessing, or using Mixly, you agree to these Terms of Use and to the Mixly License Agreement. If you do not agree, do not use the app." }
          ]
        },
        {
          "id": "s3",
          "title": "3. Adult-only use",
          "blocks": [
            { "type": "p", "text": "You may use Mixly only if you are at least 18 years old and legally allowed to view informational content related to hookah/shisha, tobacco, tobacco-free flavor products, nicotine-related products, or similar regulated goods in your location. If local law requires a higher age, you must meet that higher age." },
            { "type": "p", "text": "You are responsible for complying with all laws, age restrictions, and regulations that apply to you." }
          ]
        },
        {
          "id": "s4",
          "title": "4. Informational purpose only",
          "blocks": [
            { "type": "p", "text": "Mixly provides informational catalog content, mix composition references, flavor categories, brand references, and recommendation-style ranking features. Mixly does not provide professional, medical, health, safety, legal, or regulatory advice." },
            { "type": "p", "text": "No content in Mixly should be understood as a claim that any tobacco, nicotine, hookah, shisha, or related product is safe, healthy, risk-free, lawful for you, or appropriate for your use." }
          ]
        },
        {
          "id": "s5",
          "title": "5. No sales or purchase facilitation",
          "blocks": [
            { "type": "p", "text": "Mixly does not sell regulated goods. Mixly does not process orders, payments, deliveries, reservations, marketplace listings, coupons, affiliate purchases, or retail referrals for tobacco, nicotine, alcohol, or controlled products." },
            { "type": "p", "text": "You must not use Mixly to buy, sell, distribute, advertise, promote, or facilitate regulated goods or illegal activities." }
          ]
        },
        {
          "id": "s6",
          "title": "6. Accuracy and availability of content",
          "blocks": [
            { "type": "p", "text": "Mixly content may include mix names, flavor labels, percentages, strength labels, quality scores, rankings, source references, and catalog metadata. This content is provided for general informational reference only and may be incomplete, inaccurate, outdated, experimental, or based on estimates." },
            { "type": "p", "text": "We may update, remove, reorder, or change catalog content at any time. We do not guarantee that the app or any catalog data will always be available or error-free." }
          ]
        },
        {
          "id": "s7",
          "title": "7. User feedback, community content, and interactions",
          "blocks": [
            { "type": "p", "text": "If you send feedback, suggestions, catalog requests, bug reports, community mix suggestions, reactions, ratings, reviews, comments, or similar material, you grant us a non-exclusive, worldwide, royalty-free permission to use, review, moderate, publish, adapt, translate, analyze, and display that material to operate, improve, and develop Mixly and its catalog without compensation to you. You retain ownership of any rights you have in your submitted content." },
            { "type": "p", "text": "Community mix suggestions, reactions, ratings, reviews, comments, nickname snapshots, and related metadata may be reviewed before or after publication. We may approve, reject, edit, translate, format, hide, remove, or decline to publish community content at our discretion. If you provide a nickname, it may be displayed with approved community content." },
            { "type": "p", "text": "You may be able to edit or delete your own community reviews where the app provides that feature. Deletion may remove the review from public display, but backup, security, moderation, analytics, legal, or operational records may remain where reasonably necessary." },
            { "type": "p", "text": "You must not send unlawful, infringing, abusive, hateful, harassing, misleading, unsafe, promotional, spammy, confidential, or third-party personal information through feedback, support, community suggestion, reaction, rating, review, or comment channels." }
          ]
        },
        {
          "id": "s8",
          "title": "8. Prohibited conduct",
          "blocks": [
            { "type": "p", "text": "You agree not to:" },
            { "type": "ul", "items": [
              "use Mixly for unlawful purposes or to violate age restrictions or regulated-goods laws;",
              "use Mixly to promote or facilitate purchase, sale, distribution, or misuse of tobacco, nicotine, alcohol, or controlled products;",
              "scrape, copy, extract, or compile substantial parts of the catalog or database for a competing or commercial dataset;",
              "interfere with, overload, scan, attack, or attempt unauthorized access to Mixly, Supabase, or related infrastructure;",
              "manipulate, spam, automate, buy, sell, or misrepresent community reactions, ratings, reviews, comments, or suggestions;",
              "reverse engineer the app except where applicable law expressly allows it;",
              "remove copyright, trademark, or other proprietary notices;",
              "misrepresent affiliation with Mixly or with any brand referenced in the app."
            ] }
          ]
        },
        {
          "id": "s9",
          "title": "9. Intellectual property and third-party marks",
          "blocks": [
            { "type": "p", "text": "Mixly, including its app design, UI, code, catalog structure, ranking logic, text, and compiled datasets, is owned by us or licensed to us. Brand names, product names, source names, trademarks, and other third-party identifiers remain the property of their respective owners." },
            { "type": "p", "text": "References to third-party brands or products are for informational identification only. They do not imply endorsement, sponsorship, partnership, authorization, or affiliation." }
          ]
        },
        {
          "id": "s10",
          "title": "10. Premium features, purchases, and subscriptions",
          "blocks": [
            { "type": "p", "text": "Mixly may offer premium features through in-app purchases, subscriptions, trials, lifetime access, or similar paid access options. Prices, billing periods, renewal terms, trial availability, cancellation rules, taxes, refunds, and payment methods are controlled by the applicable app store and may vary by country, platform, and offer." },
            { "type": "p", "text": "Subscription purchases may renew automatically unless cancelled through your Apple App Store or Google Play account settings before renewal, according to the rules of the platform where you purchased. Mixly does not directly process card payments and does not control app store refund decisions." },
            { "type": "p", "text": "Premium access may depend on third-party purchase infrastructure, including RevenueCat, Apple App Store, and Google Play. If purchase validation, restoration, or subscription services are unavailable, premium features may be temporarily unavailable until service is restored." }
          ]
        },
        {
          "id": "s11",
          "title": "11. Sharing, links, and third-party apps",
          "blocks": [
            { "type": "p", "text": "Mixly may let you share mixes, app links, smart links, generated share text, or generated share-card images through your device share sheet. You are responsible for choosing where and with whom you share content. Third-party apps, websites, social networks, messaging services, and recipients may apply their own terms and privacy practices." },
            { "type": "p", "text": "Shared links may open Mixly, redirect to an app store, or show an intermediate page. We do not guarantee that every deep link, smart link, store fallback, share-card image, or shared preview will work on every device, platform, browser, or third-party service." }
          ]
        },
        {
          "id": "s12",
          "title": "12. Translation features",
          "blocks": [
            { "type": "p", "text": "Mixly may provide machine translation for community review or comment text. Translations may be inaccurate, incomplete, delayed, or unavailable. Do not rely on translations for legal, health, safety, or regulatory decisions." }
          ]
        },
        {
          "id": "s13",
          "title": "13. Privacy",
          "blocks": [
            { "type": "p", "text": "Your use of Mixly is also governed by the Mixly Privacy Policy, which explains how information is handled." }
          ]
        },
        {
          "id": "s14",
          "title": "14. Disclaimers",
          "blocks": [
            { "type": "p", "text": "Mixly is provided \"as is\" and \"as available\" without warranties of any kind, whether express, implied, or statutory, to the maximum extent permitted by law. We disclaim warranties of accuracy, reliability, availability, fitness for a particular purpose, non-infringement, and merchantability." }
          ]
        },
        {
          "id": "s15",
          "title": "15. Limitation of liability",
          "blocks": [
            { "type": "p", "text": "To the maximum extent permitted by law, Mixly and its operator will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of data, profits, goodwill, or business opportunities arising from or related to your use of the app." },
            { "type": "p", "text": "Nothing in these Terms limits liability that cannot be limited under applicable law." }
          ]
        },
        {
          "id": "s16",
          "title": "16. Termination",
          "blocks": [
            { "type": "p", "text": "We may suspend or terminate access to Mixly or any related service if you breach these Terms, create legal risk, interfere with the service, or misuse the app. You may stop using Mixly at any time and uninstall the app." }
          ]
        },
        {
          "id": "s17",
          "title": "17. Governing law",
          "blocks": [
            { "type": "p", "text": "These Terms are governed by the laws of Georgia, without regard to conflict-of-law rules, unless mandatory consumer protection laws in your location require otherwise." }
          ]
        },
        {
          "id": "s18",
          "title": "18. Changes to these Terms",
          "blocks": [
            { "type": "p", "text": "We may update these Terms when Mixly changes or legal requirements change. The effective date will show when the latest version applies. Continued use of Mixly after changes means you accept the updated Terms." }
          ]
        },
        {
          "id": "s19",
          "title": "19. Contact",
          "blocks": [
            { "type": "p", "text": "For questions about these Terms, contact: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." }
          ]
        }
      ]
    },
    "ru": {
      "title": "Условия использования",
      "meta": "Дата вступления в силу: 8 июня 2026",
      "notice": "Mixly предназначен только для взрослых и предоставляется как информационный каталог и справочник рекомендаций. Mixly не продаёт, не доставляет, не содействует продаже, не рекламирует и не продвигает покупку или употребление табака, никотина, алкоголя либо контролируемых товаров.",
      "sections": [
        {
          "id": "s1",
          "title": "1. Оператор и контакты",
          "blocks": [
            { "type": "p", "text": "Оператором Mixly является Индивидуальный предприниматель ULADZISLAU YARMAKOVICH, Батуми, Грузия («Mixly», «мы», «нас» или «наш»)." },
            { "type": "p", "text": "Контактный email: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." },
            { "type": "p", "text": "Почтовый адрес: Грузия, г. Батуми, ул. Вахтанга Горгасали, N116-118, 11 этаж, квартира N58." }
          ]
        },
        {
          "id": "s2",
          "title": "2. Принятие настоящих Условий",
          "blocks": [
            { "type": "p", "text": "Загружая, получая доступ или используя Mixly, вы соглашаетесь с настоящими Условиями использования и с Лицензионным соглашением Mixly. Если вы не согласны, не используйте приложение." }
          ]
        },
        {
          "id": "s3",
          "title": "3. Использование только взрослыми",
          "blocks": [
            { "type": "p", "text": "Вы можете использовать Mixly, только если вам не менее 18 лет и вам законодательно разрешено просматривать информационный контент, связанный с кальяном/шишей, табаком, бестабачными вкусовыми продуктами, никотиносодержащими продуктами или аналогичными регулируемыми товарами в вашей юрисдикции. Если местное законодательство требует более высокого возраста, вы должны соответствовать этому более высокому возрасту." },
            { "type": "p", "text": "Вы несёте ответственность за соблюдение всех законов, возрастных ограничений и правил, применимых к вам." }
          ]
        },
        {
          "id": "s4",
          "title": "4. Только информационная цель",
          "blocks": [
            { "type": "p", "text": "Mixly предоставляет информационный контент каталога, справочные данные о составах миксов, категории вкусов, ссылки на бренды и функции ранжирования рекомендательного характера. Mixly не предоставляет профессиональных, медицинских, оздоровительных, связанных с безопасностью, юридических или нормативных консультаций." },
            { "type": "p", "text": "Никакой контент в Mixly не следует понимать как утверждение о том, что какой-либо табак, никотин, кальян, шиша или связанный продукт безопасен, полезен для здоровья, не несёт рисков, законен для вас или подходит для вашего использования." }
          ]
        },
        {
          "id": "s5",
          "title": "5. Отсутствие продаж и содействия покупкам",
          "blocks": [
            { "type": "p", "text": "Mixly не продаёт регулируемые товары. Mixly не обрабатывает заказы, платежи, доставки, бронирования, объявления маркетплейса, купоны, партнёрские покупки или розничные рефералы для табака, никотина, алкоголя или контролируемых товаров." },
            { "type": "p", "text": "Вы не должны использовать Mixly для покупки, продажи, распространения, рекламы, продвижения регулируемых товаров или незаконной деятельности либо содействия им." }
          ]
        },
        {
          "id": "s6",
          "title": "6. Точность и доступность контента",
          "blocks": [
            { "type": "p", "text": "Контент Mixly может включать названия миксов, обозначения вкусов, проценты, обозначения крепости, оценки качества, рейтинги, ссылки на источники и метаданные каталога. Этот контент предоставляется только для общего информационного ознакомления и может быть неполным, неточным, устаревшим, экспериментальным или основанным на оценках." },
            { "type": "p", "text": "Мы можем обновлять, удалять, переупорядочивать или изменять контент каталога в любое время. Мы не гарантируем, что приложение или какие-либо данные каталога всегда будут доступны или без ошибок." }
          ]
        },
        {
          "id": "s7",
          "title": "7. Обратная связь, community-контент и взаимодействия пользователей",
          "blocks": [
            { "type": "p", "text": "Если вы отправляете обратную связь, предложения, запросы по каталогу, отчёты об ошибках, community-предложения миксов, реакции, оценки, отзывы, комментарии или аналогичные материалы, вы предоставляете нам неисключительное, всемирное, безвозмездное разрешение использовать, проверять, модерировать, публиковать, адаптировать, переводить, анализировать и отображать этот материал для работы, улучшения и развития Mixly и его каталога без выплаты вам вознаграждения. Вы сохраняете за собой все права, которые у вас есть в отношении отправленного вами контента." },
            { "type": "p", "text": "Community-предложения миксов, реакции, оценки, отзывы, комментарии, snapshot никнейма и связанные метаданные могут проверяться до или после публикации. Мы можем по своему усмотрению одобрять, отклонять, редактировать, переводить, форматировать, скрывать, удалять community-контент или отказывать в его публикации. Если вы указываете никнейм, он может отображаться рядом с одобренным community-контентом." },
            { "type": "p", "text": "Вы можете иметь возможность редактировать или удалять свои community-отзывы там, где приложение предоставляет такую функцию. Удаление может убрать отзыв из публичного показа, но резервные копии, а также записи для целей безопасности, модерации, аналитики, юридических или операционных целей могут сохраняться, если это разумно необходимо." },
            { "type": "p", "text": "Вы не должны отправлять незаконную, нарушающую права, оскорбительную, разжигающую ненависть, домогательную, вводящую в заблуждение, небезопасную, рекламную, спамную, конфиденциальную информацию или персональные данные третьих лиц через каналы обратной связи, поддержки, community-предложений, реакций, оценок, отзывов или комментариев." }
          ]
        },
        {
          "id": "s8",
          "title": "8. Запрещённое поведение",
          "blocks": [
            { "type": "p", "text": "Вы соглашаетесь не:" },
            { "type": "ul", "items": [
              "использовать Mixly в незаконных целях или для нарушения возрастных ограничений либо законов о регулируемых товарах;",
              "использовать Mixly для продвижения или содействия покупке, продаже, распространению или неправомерному использованию табака, никотина, алкоголя или контролируемых товаров;",
              "выполнять скрейпинг, копировать, извлекать или компилировать существенные части каталога или базы данных для конкурирующего или коммерческого набора данных;",
              "вмешиваться в работу, перегружать, сканировать, атаковать Mixly, Supabase или связанную инфраструктуру либо пытаться получить к ним несанкционированный доступ;",
              "манипулировать, спамить, автоматизировать, покупать, продавать или искажать community-реакции, оценки, отзывы, комментарии или предложения;",
              "выполнять обратную разработку приложения, кроме случаев, когда это прямо разрешено применимым законодательством;",
              "удалять уведомления об авторских правах, товарных знаках или иные уведомления о правах собственности;",
              "искажать факт связи с Mixly или с любым брендом, упомянутым в приложении."
            ] }
          ]
        },
        {
          "id": "s9",
          "title": "9. Интеллектуальная собственность и товарные знаки третьих лиц",
          "blocks": [
            { "type": "p", "text": "Mixly, включая дизайн приложения, интерфейс, код, структуру каталога, логику ранжирования, тексты и скомпилированные наборы данных, принадлежит нам или лицензирован нам. Названия брендов, продуктов, источников, товарные знаки и другие идентификаторы третьих лиц остаются собственностью их соответствующих владельцев." },
            { "type": "p", "text": "Ссылки на бренды или продукты третьих лиц служат только для информационной идентификации. Они не подразумевают одобрения, спонсорства, партнёрства, авторизации или аффилированности." }
          ]
        },
        {
          "id": "s10",
          "title": "10. Premium-функции, покупки и подписки",
          "blocks": [
            { "type": "p", "text": "Mixly может предлагать premium-функции через in-app purchases, подписки, trial-доступ, lifetime-доступ или похожие платные варианты доступа. Цены, периоды оплаты, условия продления, доступность trial, правила отмены, налоги, возвраты и способы оплаты контролируются соответствующим магазином приложений и могут различаться в зависимости от страны, платформы и предложения." },
            { "type": "p", "text": "Покупки по подписке могут продлеваться автоматически, если они не отменены в настройках вашего аккаунта Apple App Store или Google Play до продления, согласно правилам платформы, на которой вы совершили покупку. Mixly напрямую не обрабатывает карточные платежи и не контролирует решения о возврате средств в магазине приложений." },
            { "type": "p", "text": "Premium-доступ может зависеть от сторонней инфраструктуры покупок, включая RevenueCat, Apple App Store и Google Play. Если проверка покупок, восстановление или сервисы подписок недоступны, premium-функции могут быть временно недоступны до восстановления сервиса." }
          ]
        },
        {
          "id": "s11",
          "title": "11. Шаринг, ссылки и сторонние приложения",
          "blocks": [
            { "type": "p", "text": "Mixly может позволять делиться миксами, ссылками на приложение, smart links, сгенерированным share text или сгенерированными изображениями share-card через системный share sheet вашего устройства. Вы несёте ответственность за выбор того, где и с кем вы делитесь контентом. Сторонние приложения, сайты, социальные сети, сервисы сообщений и получатели могут применять свои собственные условия и практики конфиденциальности." },
            { "type": "p", "text": "Общие ссылки могут открывать Mixly, перенаправлять в магазин приложений или показывать промежуточную страницу. Мы не гарантируем, что каждый deep link, smart link, fallback на магазин, изображение share-card или общий предпросмотр будет работать на каждом устройстве, платформе, в браузере или стороннем сервисе." }
          ]
        },
        {
          "id": "s12",
          "title": "12. Функции перевода",
          "blocks": [
            { "type": "p", "text": "Mixly может предоставлять машинный перевод текста community-отзывов или комментариев. Переводы могут быть неточными, неполными, задержанными или недоступными. Не полагайтесь на переводы при принятии юридических, медицинских, связанных с безопасностью или нормативных решений." }
          ]
        },
        {
          "id": "s13",
          "title": "13. Конфиденциальность",
          "blocks": [
            { "type": "p", "text": "Использование вами Mixly также регулируется Политикой конфиденциальности Mixly, которая объясняет, как обрабатывается информация." }
          ]
        },
        {
          "id": "s14",
          "title": "14. Отказ от гарантий",
          "blocks": [
            { "type": "p", "text": "Mixly предоставляется «как есть» и «как доступно», без каких-либо гарантий, будь то явных, подразумеваемых или предусмотренных законом, в максимальной степени, разрешённой законом. Мы отказываемся от гарантий точности, надёжности, доступности, пригодности для конкретной цели, ненарушения прав и товарной пригодности." }
          ]
        },
        {
          "id": "s15",
          "title": "15. Ограничение ответственности",
          "blocks": [
            { "type": "p", "text": "В максимальной степени, разрешённой законом, Mixly и его оператор не несут ответственности за косвенные, случайные, специальные, вытекающие, штрафные или карательные убытки, а также за потерю данных, прибыли, деловой репутации или бизнес-возможностей, возникающие в связи с использованием вами приложения или в связи с ним." },
            { "type": "p", "text": "Ничто в настоящих Условиях не ограничивает ответственность, которая не может быть ограничена согласно применимому законодательству." }
          ]
        },
        {
          "id": "s16",
          "title": "16. Прекращение",
          "blocks": [
            { "type": "p", "text": "Мы можем приостановить или прекратить доступ к Mixly или любому связанному сервису, если вы нарушаете настоящие Условия, создаёте юридический риск, вмешиваетесь в работу сервиса или используете приложение ненадлежащим образом. Вы можете прекратить использование Mixly в любое время и удалить приложение." }
          ]
        },
        {
          "id": "s17",
          "title": "17. Применимое право",
          "blocks": [
            { "type": "p", "text": "Настоящие Условия регулируются законодательством Грузии, без учёта коллизионных норм, если только императивные нормы о защите прав потребителей в вашей юрисдикции не требуют иного." }
          ]
        },
        {
          "id": "s18",
          "title": "18. Изменения настоящих Условий",
          "blocks": [
            { "type": "p", "text": "Мы можем обновлять настоящие Условия по мере изменения Mixly или требований законодательства. Дата вступления в силу показывает, когда применяется последняя версия. Продолжение использования Mixly после изменений означает, что вы принимаете обновлённые Условия." }
          ]
        },
        {
          "id": "s19",
          "title": "19. Контакты",
          "blocks": [
            { "type": "p", "text": "По вопросам о настоящих Условиях обращайтесь: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." }
          ]
        }
      ]
    },
    "de": {
      "title": "Nutzungsbedingungen",
      "meta": "Gültig ab: 8. Juni 2026",
      "notice": "Mixly ist ausschließlich für Erwachsene bestimmt und wird als informativer Katalog und Empfehlungsnachschlagewerk bereitgestellt. Mixly verkauft, versendet, vermittelt, bewirbt oder fördert keine Tabak-, Nikotin-, Alkohol- oder kontrollierten Produkte und weder deren Kauf noch deren Konsum.",
      "sections": [
        {
          "id": "s1",
          "title": "1. Betreiber und Kontakt",
          "blocks": [
            { "type": "p", "text": "Mixly wird betrieben vom Einzelunternehmer ULADZISLAU YARMAKOVICH, Batumi, Georgien („Mixly“, „wir“, „uns“ oder „unser“)." },
            { "type": "p", "text": "Kontakt-E-Mail: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." },
            { "type": "p", "text": "Postanschrift: Georgien, Stadt Batumi, Vakhtang-Gorgasali-Str. N116-118, 11. Stock, Wohnung N58." }
          ]
        },
        {
          "id": "s2",
          "title": "2. Annahme dieser Bedingungen",
          "blocks": [
            { "type": "p", "text": "Indem Sie Mixly herunterladen, darauf zugreifen oder es nutzen, stimmen Sie diesen Nutzungsbedingungen und der Mixly-Lizenzvereinbarung zu. Wenn Sie nicht einverstanden sind, nutzen Sie die App nicht." }
          ]
        },
        {
          "id": "s3",
          "title": "3. Nutzung nur durch Erwachsene",
          "blocks": [
            { "type": "p", "text": "Sie dürfen Mixly nur nutzen, wenn Sie mindestens 18 Jahre alt sind und es Ihnen an Ihrem Standort rechtlich gestattet ist, informative Inhalte zu Wasserpfeife/Shisha, Tabak, tabakfreien Geschmacksprodukten, nikotinbezogenen Produkten oder ähnlichen regulierten Waren anzusehen. Verlangt das örtliche Recht ein höheres Alter, müssen Sie dieses höhere Alter erfüllen." },
            { "type": "p", "text": "Sie sind dafür verantwortlich, alle für Sie geltenden Gesetze, Altersbeschränkungen und Vorschriften einzuhalten." }
          ]
        },
        {
          "id": "s4",
          "title": "4. Ausschließlich informativer Zweck",
          "blocks": [
            { "type": "p", "text": "Mixly stellt informative Katalogsinhalte, Referenzen zu Mischungszusammensetzungen, Geschmackskategorien, Markenverweise und empfehlungsartige Ranking-Funktionen bereit. Mixly bietet keine professionelle, medizinische, gesundheitliche, sicherheitsbezogene, rechtliche oder regulatorische Beratung." },
            { "type": "p", "text": "Kein Inhalt in Mixly ist als Behauptung zu verstehen, dass ein Tabak-, Nikotin-, Wasserpfeifen-, Shisha- oder verwandtes Produkt sicher, gesund, risikofrei, für Sie rechtmäßig oder für Ihre Nutzung geeignet sei." }
          ]
        },
        {
          "id": "s5",
          "title": "5. Kein Verkauf und keine Kaufvermittlung",
          "blocks": [
            { "type": "p", "text": "Mixly verkauft keine regulierten Waren. Mixly wickelt keine Bestellungen, Zahlungen, Lieferungen, Reservierungen, Marktplatzangebote, Gutscheine, Affiliate-Käufe oder Einzelhandelsvermittlungen für Tabak, Nikotin, Alkohol oder kontrollierte Produkte ab." },
            { "type": "p", "text": "Sie dürfen Mixly nicht verwenden, um regulierte Waren oder illegale Aktivitäten zu kaufen, zu verkaufen, zu vertreiben, zu bewerben, zu fördern oder zu vermitteln." }
          ]
        },
        {
          "id": "s6",
          "title": "6. Richtigkeit und Verfügbarkeit der Inhalte",
          "blocks": [
            { "type": "p", "text": "Mixly-Inhalte können Mischungsnamen, Geschmacksbezeichnungen, Anteile, Stärkebezeichnungen, Qualitätsbewertungen, Ranglisten, Quellenverweise und Katalog-Metadaten enthalten. Diese Inhalte dienen nur der allgemeinen informativen Orientierung und können unvollständig, unrichtig, veraltet, experimentell oder auf Schätzungen beruhend sein." },
            { "type": "p", "text": "Wir können Katalogsinhalte jederzeit aktualisieren, entfernen, umordnen oder ändern. Wir garantieren nicht, dass die App oder Katalogdaten stets verfügbar oder fehlerfrei sind." }
          ]
        },
        {
          "id": "s7",
          "title": "7. Nutzer-Feedback, Community-Inhalte und Interaktionen",
          "blocks": [
            { "type": "p", "text": "Wenn Sie Feedback, Vorschläge, Katalogwünsche, Fehlerberichte, Community-Mischungsvorschläge, Reaktionen, Bewertungen, Rezensionen, Kommentare oder ähnliches Material senden, gewähren Sie uns eine nicht-exklusive, weltweite, gebührenfreie Erlaubnis, dieses Material zu nutzen, zu prüfen, zu moderieren, zu veröffentlichen, anzupassen, zu übersetzen, zu analysieren und anzuzeigen, um Mixly und seinen Katalog zu betreiben, zu verbessern und weiterzuentwickeln, ohne Sie dafür zu vergüten. Sie behalten das Eigentum an allen Rechten, die Sie an Ihren eingereichten Inhalten haben." },
            { "type": "p", "text": "Community-Mischungsvorschläge, Reaktionen, Bewertungen, Rezensionen, Kommentare, Momentaufnahmen des Spitznamens und zugehörige Metadaten können vor oder nach der Veröffentlichung geprüft werden. Wir können Community-Inhalte nach eigenem Ermessen genehmigen, ablehnen, bearbeiten, übersetzen, formatieren, ausblenden, entfernen oder deren Veröffentlichung verweigern. Wenn Sie einen Spitznamen angeben, kann dieser bei genehmigten Community-Inhalten angezeigt werden." },
            { "type": "p", "text": "Sie können Ihre eigenen Community-Rezensionen möglicherweise bearbeiten oder löschen, sofern die App diese Funktion bietet. Durch das Löschen kann die Rezension aus der öffentlichen Anzeige entfernt werden, jedoch können Sicherungs-, Sicherheits-, Moderations-, Analyse-, Rechts- oder Betriebsdatensätze verbleiben, soweit dies vernünftigerweise erforderlich ist." },
            { "type": "p", "text": "Sie dürfen über Kanäle für Feedback, Support, Community-Vorschläge, Reaktionen, Bewertungen, Rezensionen oder Kommentare keine rechtswidrigen, rechtsverletzenden, missbräuchlichen, hasserfüllten, belästigenden, irreführenden, unsicheren, werblichen, spamartigen, vertraulichen oder personenbezogenen Informationen Dritter senden." }
          ]
        },
        {
          "id": "s8",
          "title": "8. Verbotenes Verhalten",
          "blocks": [
            { "type": "p", "text": "Sie verpflichten sich, Folgendes zu unterlassen:" },
            { "type": "ul", "items": [
              "Mixly für rechtswidrige Zwecke zu nutzen oder Altersbeschränkungen bzw. Gesetze über regulierte Waren zu verletzen;",
              "Mixly zu nutzen, um den Kauf, Verkauf, Vertrieb oder Missbrauch von Tabak, Nikotin, Alkohol oder kontrollierten Produkten zu fördern oder zu erleichtern;",
              "wesentliche Teile des Katalogs oder der Datenbank für einen konkurrierenden oder kommerziellen Datensatz zu scrapen, zu kopieren, zu extrahieren oder zusammenzustellen;",
              "Mixly, Supabase oder die zugehörige Infrastruktur zu stören, zu überlasten, zu scannen, anzugreifen oder unbefugten Zugriff darauf zu versuchen;",
              "Community-Reaktionen, Bewertungen, Rezensionen, Kommentare oder Vorschläge zu manipulieren, zu spammen, zu automatisieren, zu kaufen, zu verkaufen oder falsch darzustellen;",
              "die App per Reverse Engineering zu untersuchen, außer soweit das anwendbare Recht dies ausdrücklich erlaubt;",
              "Urheberrechts-, Marken- oder sonstige Schutzrechtshinweise zu entfernen;",
              "eine Verbindung zu Mixly oder zu einer in der App genannten Marke falsch darzustellen."
            ] }
          ]
        },
        {
          "id": "s9",
          "title": "9. Geistiges Eigentum und Marken Dritter",
          "blocks": [
            { "type": "p", "text": "Mixly, einschließlich App-Design, Benutzeroberfläche, Code, Katalogstruktur, Ranking-Logik, Text und zusammengestellter Datensätze, steht in unserem Eigentum oder ist uns lizenziert. Markennamen, Produktnamen, Quellennamen, Marken und andere Kennzeichen Dritter bleiben Eigentum ihrer jeweiligen Inhaber." },
            { "type": "p", "text": "Verweise auf Marken oder Produkte Dritter dienen nur der informativen Kennzeichnung. Sie implizieren keine Befürwortung, kein Sponsoring, keine Partnerschaft, keine Autorisierung und keine Verbindung." }
          ]
        },
        {
          "id": "s10",
          "title": "10. Premium-Funktionen, Käufe und Abonnements",
          "blocks": [
            { "type": "p", "text": "Mixly kann Premium-Funktionen über In-App-Käufe, Abonnements, Testphasen, lebenslangen Zugang oder ähnliche kostenpflichtige Zugangsoptionen anbieten. Preise, Abrechnungszeiträume, Verlängerungsbedingungen, Verfügbarkeit von Testphasen, Kündigungsregeln, Steuern, Erstattungen und Zahlungsmethoden werden vom jeweiligen App-Store gesteuert und können je nach Land, Plattform und Angebot variieren." },
            { "type": "p", "text": "Abonnementkäufe können sich automatisch verlängern, sofern sie nicht vor der Verlängerung über die Kontoeinstellungen Ihres Apple App Store oder Google Play gemäß den Regeln der Plattform, auf der Sie gekauft haben, gekündigt werden. Mixly wickelt Kartenzahlungen nicht direkt ab und kontrolliert keine Erstattungsentscheidungen des App-Stores." },
            { "type": "p", "text": "Der Premium-Zugang kann von Kaufinfrastruktur Dritter abhängen, einschließlich RevenueCat, Apple App Store und Google Play. Wenn Kaufvalidierung, Wiederherstellung oder Abonnementdienste nicht verfügbar sind, können Premium-Funktionen vorübergehend nicht verfügbar sein, bis der Dienst wiederhergestellt ist." }
          ]
        },
        {
          "id": "s11",
          "title": "11. Teilen, Links und Apps von Drittanbietern",
          "blocks": [
            { "type": "p", "text": "Mixly kann Ihnen ermöglichen, Mischungen, App-Links, Smart-Links, generierten Teilen-Text oder generierte Share-Card-Bilder über das Teilen-Menü Ihres Geräts zu teilen. Sie sind dafür verantwortlich, zu wählen, wo und mit wem Sie Inhalte teilen. Apps, Websites, soziale Netzwerke, Messaging-Dienste Dritter und Empfänger können ihre eigenen Bedingungen und Datenschutzpraktiken anwenden." },
            { "type": "p", "text": "Geteilte Links können Mixly öffnen, zu einem App-Store weiterleiten oder eine Zwischenseite anzeigen. Wir garantieren nicht, dass jeder Deeplink, Smart-Link, Store-Ausweichlink, jedes Share-Card-Bild oder jede geteilte Vorschau auf jedem Gerät, jeder Plattform, jedem Browser oder Drittanbieterdienst funktioniert." }
          ]
        },
        {
          "id": "s12",
          "title": "12. Übersetzungsfunktionen",
          "blocks": [
            { "type": "p", "text": "Mixly kann maschinelle Übersetzung für Community-Rezensions- oder Kommentartext bereitstellen. Übersetzungen können unrichtig, unvollständig, verzögert oder nicht verfügbar sein. Verlassen Sie sich nicht auf Übersetzungen für rechtliche, gesundheitliche, sicherheitsbezogene oder regulatorische Entscheidungen." }
          ]
        },
        {
          "id": "s13",
          "title": "13. Datenschutz",
          "blocks": [
            { "type": "p", "text": "Ihre Nutzung von Mixly unterliegt zudem der Mixly-Datenschutzerklärung, die erläutert, wie Informationen verarbeitet werden." }
          ]
        },
        {
          "id": "s14",
          "title": "14. Haftungsausschlüsse",
          "blocks": [
            { "type": "p", "text": "Mixly wird „wie besehen“ und „wie verfügbar“ ohne Gewährleistungen jeglicher Art bereitgestellt, seien sie ausdrücklich, konkludent oder gesetzlich, soweit gesetzlich zulässig. Wir schließen Gewährleistungen für Richtigkeit, Zuverlässigkeit, Verfügbarkeit, Eignung für einen bestimmten Zweck, Nichtverletzung von Rechten und Marktgängigkeit aus." }
          ]
        },
        {
          "id": "s15",
          "title": "15. Haftungsbeschränkung",
          "blocks": [
            { "type": "p", "text": "Soweit gesetzlich zulässig, haften Mixly und sein Betreiber nicht für indirekte, zufällige, besondere, Folge-, exemplarische oder Strafschäden oder für den Verlust von Daten, Gewinnen, Geschäftswert oder Geschäftschancen, die sich aus Ihrer Nutzung der App ergeben oder damit zusammenhängen." },
            { "type": "p", "text": "Nichts in diesen Bedingungen beschränkt eine Haftung, die nach anwendbarem Recht nicht beschränkt werden kann." }
          ]
        },
        {
          "id": "s16",
          "title": "16. Kündigung",
          "blocks": [
            { "type": "p", "text": "Wir können den Zugang zu Mixly oder zu einem zugehörigen Dienst sperren oder beenden, wenn Sie gegen diese Bedingungen verstoßen, ein rechtliches Risiko schaffen, den Dienst stören oder die App missbräuchlich nutzen. Sie können die Nutzung von Mixly jederzeit einstellen und die App deinstallieren." }
          ]
        },
        {
          "id": "s17",
          "title": "17. Anwendbares Recht",
          "blocks": [
            { "type": "p", "text": "Diese Bedingungen unterliegen dem Recht Georgiens, ohne Berücksichtigung kollisionsrechtlicher Regelungen, sofern nicht zwingende Verbraucherschutzgesetze an Ihrem Standort etwas anderes verlangen." }
          ]
        },
        {
          "id": "s18",
          "title": "18. Änderungen dieser Bedingungen",
          "blocks": [
            { "type": "p", "text": "Wir können diese Bedingungen aktualisieren, wenn sich Mixly ändert oder sich rechtliche Anforderungen ändern. Das Gültigkeitsdatum gibt an, ab wann die neueste Version gilt. Die fortgesetzte Nutzung von Mixly nach Änderungen bedeutet, dass Sie die aktualisierten Bedingungen akzeptieren." }
          ]
        },
        {
          "id": "s19",
          "title": "19. Kontakt",
          "blocks": [
            { "type": "p", "text": "Bei Fragen zu diesen Bedingungen wenden Sie sich an: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." }
          ]
        }
      ]
    }
  },
  "eula": {
    "en": {
      "title": "License Agreement",
      "meta": "Effective date: June 8, 2026",
      "notice": "This License Agreement governs your right to install and use Mixly. Mixly is an adults-only informational reference app and is not a marketplace, retailer, medical advisor, or consumption-promotion service.",
      "sections": [
        {
          "id": "s1",
          "title": "1. Licensor",
          "blocks": [
            { "type": "p", "text": "The Mixly mobile application is licensed by Individual Entrepreneur ULADZISLAU YARMAKOVICH, Batumi, Georgia (\"Licensor\", \"Mixly\", \"we\", \"us\", or \"our\")." },
            { "type": "p", "text": "Contact email: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." },
            { "type": "p", "text": "Postal address: Georgia, Batumi City, Vakhtang Gorgasali st., N116-118, Floor 11, Apartment N58." }
          ]
        },
        {
          "id": "s2",
          "title": "2. Relationship to other terms",
          "blocks": [
            { "type": "p", "text": "This License Agreement applies together with the Mixly Terms of Use and Privacy Policy. Platform terms from Apple App Store, Google Play, or any other authorized app marketplace also apply to your download and use of Mixly." },
            { "type": "p", "text": "If a platform's mandatory terms conflict with this License Agreement, the mandatory platform terms apply only to the extent of that conflict." }
          ]
        },
        {
          "id": "s3",
          "title": "3. License grant",
          "blocks": [
            { "type": "p", "text": "Subject to your compliance with this License Agreement and the Terms of Use, we grant you a limited, personal, non-exclusive, non-transferable, non-sublicensable, revocable license to install and use Mixly on devices that you own or control, solely for your personal, lawful, adult informational use." }
          ]
        },
        {
          "id": "s4",
          "title": "4. Ownership",
          "blocks": [
            { "type": "p", "text": "Mixly is licensed, not sold. We and our licensors retain all rights, title, and interest in and to the app, including the app design, UI, code, catalog structure, ranking logic, text, graphics, compiled datasets, and related materials." },
            { "type": "p", "text": "Brand names, product names, source names, trademarks, logos, and other third-party identifiers referenced in Mixly remain the property of their respective owners. Their appearance in Mixly is for informational identification only and does not imply endorsement, sponsorship, authorization, partnership, or affiliation." }
          ]
        },
        {
          "id": "s5",
          "title": "5. Restrictions",
          "blocks": [
            { "type": "p", "text": "You must not:" },
            { "type": "ul", "items": [
              "sell, rent, lease, sublicense, redistribute, or commercially exploit Mixly or access to Mixly;",
              "copy, modify, translate, adapt, or create derivative works of Mixly except where applicable law expressly allows it;",
              "reverse engineer, decompile, or attempt to extract source code except where applicable law expressly allows it;",
              "remove or alter proprietary notices;",
              "scrape, export, harvest, or compile substantial parts of the catalog or database for a competing product, commercial dataset, or unauthorized derivative database;",
              "use bots, scripts, crawlers, or automated tools to access Mixly or related backend services without our written permission;",
              "interfere with, overload, bypass, or attack Mixly, Supabase, storage services, or related infrastructure;",
              "manipulate, spam, automate, or misrepresent community suggestions, reactions, ratings, reviews, comments, share links, or analytics events;",
              "use Mixly to facilitate unlawful activity or the purchase, sale, distribution, advertising, or misuse of regulated goods."
            ] }
          ]
        },
        {
          "id": "s6",
          "title": "6. Adults-only and regulated content limitation",
          "blocks": [
            { "type": "p", "text": "You may use Mixly only if you are at least 18 years old and legally allowed to view the app's informational content in your location. If your local law requires a higher age, you must meet that higher age." },
            { "type": "p", "text": "The license granted to you does not permit use of Mixly to promote, encourage, sell, buy, distribute, or facilitate tobacco, nicotine, alcohol, or controlled products." }
          ]
        },
        {
          "id": "s7",
          "title": "7. Updates and availability",
          "blocks": [
            { "type": "p", "text": "We may provide updates, patches, changes, or removals of features, premium access rules, subscription offerings, analytics instrumentation, sharing features, translation features, community features, or catalog content. We are not required to provide any particular update or maintain any feature indefinitely." }
          ]
        },
        {
          "id": "s8",
          "title": "8. Feedback",
          "blocks": [
            { "type": "p", "text": "If you provide feedback, suggestions, bug reports, catalog recommendations, community mix submissions, reactions, ratings, reviews, comments, or similar material, you grant us a non-exclusive, worldwide, royalty-free, transferable, sublicensable license to use, review, moderate, publish, adapt, translate, analyze, and display that material to operate, improve, and develop Mixly without compensation to you." }
          ]
        },
        {
          "id": "s9",
          "title": "9. Third-party services and content",
          "blocks": [
            { "type": "p", "text": "Mixly may use third-party services such as Supabase, messaging and notification service providers, Amplitude, RevenueCat, Apple App Store, Google Play, translation service providers, hosting providers, share-sheet integrations, and email providers. Mixly may also reference third-party source materials, product names, and brand names. We are not responsible for third-party services, websites, products, purchase systems, analytics systems, translation systems, sharing destinations, or content." }
          ]
        },
        {
          "id": "s10",
          "title": "10. Disclaimer of warranties",
          "blocks": [
            { "type": "p", "text": "Mixly is provided \"as is\" and \"as available\". To the maximum extent permitted by law, we disclaim all warranties, whether express, implied, or statutory, including warranties of merchantability, fitness for a particular purpose, title, non-infringement, accuracy, availability, and error-free operation." }
          ]
        },
        {
          "id": "s11",
          "title": "11. Limitation of liability",
          "blocks": [
            { "type": "p", "text": "To the maximum extent permitted by law, we will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of data, profits, goodwill, business opportunities, or other intangible losses arising out of or related to Mixly or this License Agreement." },
            { "type": "p", "text": "Nothing in this License Agreement limits liability that cannot be limited under applicable law." }
          ]
        },
        {
          "id": "s12",
          "title": "12. Termination",
          "blocks": [
            { "type": "p", "text": "This license starts when you install or use Mixly and continues until terminated. You may terminate it by uninstalling the app and stopping all use. We may terminate or suspend the license if you breach this License Agreement, breach the Terms of Use, create legal risk, or misuse the app or backend services." },
            { "type": "p", "text": "After termination, you must stop using Mixly and delete any unauthorized copies. Sections that by their nature should survive termination will survive, including ownership, restrictions, disclaimers, limitation of liability, and governing law." }
          ]
        },
        {
          "id": "s13",
          "title": "13. Platform terms",
          "blocks": [
            { "type": "p", "text": "If you downloaded Mixly from the Apple App Store, Apple and its subsidiaries are third-party beneficiaries of this License Agreement only to the extent required by Apple's applicable terms. Apple is not responsible for providing maintenance or support for Mixly except as required by applicable law." },
            { "type": "p", "text": "If you downloaded Mixly from Google Play, Google Play terms also apply to your use of the app." }
          ]
        },
        {
          "id": "s14",
          "title": "14. Governing law",
          "blocks": [
            { "type": "p", "text": "This License Agreement is governed by the laws of Georgia, without regard to conflict-of-law rules, unless mandatory consumer protection laws in your location require otherwise." }
          ]
        },
        {
          "id": "s15",
          "title": "15. Changes",
          "blocks": [
            { "type": "p", "text": "We may update this License Agreement when Mixly changes or legal requirements change. The effective date will show when the latest version applies. Continued use of Mixly after changes means you accept the updated License Agreement." }
          ]
        },
        {
          "id": "s16",
          "title": "16. Contact",
          "blocks": [
            { "type": "p", "text": "For questions about this License Agreement, contact: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." }
          ]
        }
      ]
    },
    "ru": {
      "title": "Лицензионное соглашение",
      "meta": "Дата вступления в силу: 8 июня 2026",
      "notice": "Настоящее Лицензионное соглашение регулирует ваше право устанавливать и использовать Mixly. Mixly — это информационное справочное приложение только для взрослых, а не маркетплейс, розничный продавец, медицинский консультант или сервис продвижения потребления.",
      "sections": [
        {
          "id": "s1",
          "title": "1. Лицензиар",
          "blocks": [
            { "type": "p", "text": "Мобильное приложение Mixly лицензируется Индивидуальным предпринимателем ULADZISLAU YARMAKOVICH, Батуми, Грузия («Лицензиар», «Mixly», «мы», «нас» или «наш»)." },
            { "type": "p", "text": "Контактный email: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." },
            { "type": "p", "text": "Почтовый адрес: Грузия, г. Батуми, ул. Вахтанга Горгасали, N116-118, 11 этаж, квартира N58." }
          ]
        },
        {
          "id": "s2",
          "title": "2. Связь с другими условиями",
          "blocks": [
            { "type": "p", "text": "Настоящее Лицензионное соглашение применяется совместно с Условиями использования и Политикой конфиденциальности Mixly. Условия платформ Apple App Store, Google Play или любого другого авторизованного магазина приложений также применяются к загрузке и использованию вами Mixly." },
            { "type": "p", "text": "Если императивные условия платформы противоречат настоящему Лицензионному соглашению, императивные условия платформы применяются только в объёме такого противоречия." }
          ]
        },
        {
          "id": "s3",
          "title": "3. Предоставление лицензии",
          "blocks": [
            { "type": "p", "text": "При условии соблюдения вами настоящего Лицензионного соглашения и Условий использования мы предоставляем вам ограниченную, персональную, неисключительную, непередаваемую, несублицензируемую, отзывную лицензию на установку и использование Mixly на устройствах, которыми вы владеете или которые контролируете, исключительно для вашего личного, законного информационного использования взрослым человеком." }
          ]
        },
        {
          "id": "s4",
          "title": "4. Право собственности",
          "blocks": [
            { "type": "p", "text": "Mixly предоставляется по лицензии, а не продаётся. Мы и наши лицензиары сохраняем все права, титул и интересы в отношении приложения, включая дизайн приложения, интерфейс, код, структуру каталога, логику ранжирования, тексты, графику, скомпилированные наборы данных и связанные материалы." },
            { "type": "p", "text": "Названия брендов, продуктов, источников, товарные знаки, логотипы и другие идентификаторы третьих лиц, упомянутые в Mixly, остаются собственностью их соответствующих владельцев. Их появление в Mixly служит только для информационной идентификации и не подразумевает одобрения, спонсорства, авторизации, партнёрства или аффилированности." }
          ]
        },
        {
          "id": "s5",
          "title": "5. Ограничения",
          "blocks": [
            { "type": "p", "text": "Вы не должны:" },
            { "type": "ul", "items": [
              "продавать, сдавать в аренду, во временное пользование, сублицензировать, перераспространять или коммерчески эксплуатировать Mixly либо доступ к Mixly;",
              "копировать, изменять, переводить, адаптировать или создавать производные произведения от Mixly, кроме случаев, когда это прямо разрешено применимым законодательством;",
              "выполнять обратную разработку, декомпиляцию или пытаться извлечь исходный код, кроме случаев, когда это прямо разрешено применимым законодательством;",
              "удалять или изменять уведомления о правах собственности;",
              "выполнять скрейпинг, экспорт, сбор или компиляцию существенных частей каталога или базы данных для конкурирующего продукта, коммерческого набора данных или несанкционированной производной базы данных;",
              "использовать ботов, скрипты, краулеры или автоматизированные инструменты для доступа к Mixly или связанным бэкенд-сервисам без нашего письменного разрешения;",
              "вмешиваться в работу, перегружать, обходить или атаковать Mixly, Supabase, сервисы хранения или связанную инфраструктуру;",
              "манипулировать, спамить, автоматизировать или искажать community-предложения, реакции, оценки, отзывы, комментарии, share links или аналитические события;",
              "использовать Mixly для содействия незаконной деятельности либо покупке, продаже, распространению, рекламе или неправомерному использованию регулируемых товаров."
            ] }
          ]
        },
        {
          "id": "s6",
          "title": "6. Ограничение по возрасту и регулируемому контенту",
          "blocks": [
            { "type": "p", "text": "Вы можете использовать Mixly, только если вам не менее 18 лет и вам законодательно разрешено просматривать информационный контент приложения в вашей юрисдикции. Если местное законодательство требует более высокого возраста, вы должны соответствовать этому более высокому возрасту." },
            { "type": "p", "text": "Предоставленная вам лицензия не разрешает использовать Mixly для продвижения, поощрения, продажи, покупки, распространения табака, никотина, алкоголя или контролируемых товаров либо содействия им." }
          ]
        },
        {
          "id": "s7",
          "title": "7. Обновления и доступность",
          "blocks": [
            { "type": "p", "text": "Мы можем предоставлять обновления, патчи, изменения или удаления функций, правил premium-доступа, предложений подписки, аналитической инструментации, функций шаринга, функций перевода, community-функций или контента каталога. Мы не обязаны предоставлять какое-либо конкретное обновление или поддерживать какую-либо функцию бессрочно." }
          ]
        },
        {
          "id": "s8",
          "title": "8. Обратная связь",
          "blocks": [
            { "type": "p", "text": "Если вы предоставляете обратную связь, предложения, отчёты об ошибках, рекомендации по каталогу, community-заявки на миксы, реакции, оценки, отзывы, комментарии или аналогичные материалы, вы предоставляете нам неисключительную, всемирную, безвозмездную, передаваемую, сублицензируемую лицензию на использование, проверку, модерацию, публикацию, адаптацию, перевод, анализ и отображение этого материала для работы, улучшения и развития Mixly без выплаты вам вознаграждения." }
          ]
        },
        {
          "id": "s9",
          "title": "9. Сторонние сервисы и контент",
          "blocks": [
            { "type": "p", "text": "Mixly может использовать сторонние сервисы, такие как Supabase, сервисы сообщений и уведомлений, Amplitude, RevenueCat, Apple App Store, Google Play, поставщики сервисов перевода, провайдеры хостинга, интеграции share-sheet и провайдеры электронной почты. Mixly также может ссылаться на исходные материалы, названия продуктов и брендов третьих лиц. Мы не несём ответственности за сторонние сервисы, сайты, продукты, системы покупок, аналитические системы, системы перевода, места назначения шаринга или контент." }
          ]
        },
        {
          "id": "s10",
          "title": "10. Отказ от гарантий",
          "blocks": [
            { "type": "p", "text": "Mixly предоставляется «как есть» и «как доступно». В максимальной степени, разрешённой законом, мы отказываемся от всех гарантий, будь то явных, подразумеваемых или предусмотренных законом, включая гарантии товарной пригодности, пригодности для конкретной цели, титула, ненарушения прав, точности, доступности и безошибочной работы." }
          ]
        },
        {
          "id": "s11",
          "title": "11. Ограничение ответственности",
          "blocks": [
            { "type": "p", "text": "В максимальной степени, разрешённой законом, мы не несём ответственности за косвенные, случайные, специальные, вытекающие, штрафные или карательные убытки, а также за потерю данных, прибыли, деловой репутации, бизнес-возможностей или иные нематериальные потери, возникающие в связи с Mixly или настоящим Лицензионным соглашением либо вытекающие из них." },
            { "type": "p", "text": "Ничто в настоящем Лицензионном соглашении не ограничивает ответственность, которая не может быть ограничена согласно применимому законодательству." }
          ]
        },
        {
          "id": "s12",
          "title": "12. Прекращение",
          "blocks": [
            { "type": "p", "text": "Настоящая лицензия начинает действовать при установке или использовании Mixly и продолжается до её прекращения. Вы можете прекратить её, удалив приложение и прекратив любое использование. Мы можем прекратить или приостановить лицензию, если вы нарушаете настоящее Лицензионное соглашение, нарушаете Условия использования, создаёте юридический риск или используете приложение либо бэкенд-сервисы ненадлежащим образом." },
            { "type": "p", "text": "После прекращения вы должны прекратить использование Mixly и удалить любые несанкционированные копии. Разделы, которые по своей природе должны продолжать действовать после прекращения, сохраняют силу, включая право собственности, ограничения, отказы от гарантий, ограничение ответственности и применимое право." }
          ]
        },
        {
          "id": "s13",
          "title": "13. Условия платформ",
          "blocks": [
            { "type": "p", "text": "Если вы загрузили Mixly из Apple App Store, Apple и её дочерние компании являются сторонними бенефициарами настоящего Лицензионного соглашения только в объёме, требуемом применимыми условиями Apple. Apple не несёт ответственности за предоставление обслуживания или поддержки Mixly, за исключением случаев, предусмотренных применимым законодательством." },
            { "type": "p", "text": "Если вы загрузили Mixly из Google Play, условия Google Play также применяются к использованию вами приложения." }
          ]
        },
        {
          "id": "s14",
          "title": "14. Применимое право",
          "blocks": [
            { "type": "p", "text": "Настоящее Лицензионное соглашение регулируется законодательством Грузии, без учёта коллизионных норм, если только императивные нормы о защите прав потребителей в вашей юрисдикции не требуют иного." }
          ]
        },
        {
          "id": "s15",
          "title": "15. Изменения",
          "blocks": [
            { "type": "p", "text": "Мы можем обновлять настоящее Лицензионное соглашение по мере изменения Mixly или требований законодательства. Дата вступления в силу показывает, когда применяется последняя версия. Продолжение использования Mixly после изменений означает, что вы принимаете обновлённое Лицензионное соглашение." }
          ]
        },
        {
          "id": "s16",
          "title": "16. Контакты",
          "blocks": [
            { "type": "p", "text": "По вопросам о настоящем Лицензионном соглашении обращайтесь: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." }
          ]
        }
      ]
    },
    "de": {
      "title": "Lizenzvereinbarung",
      "meta": "Gültig ab: 8. Juni 2026",
      "notice": "Diese Lizenzvereinbarung regelt Ihr Recht, Mixly zu installieren und zu nutzen. Mixly ist eine informative Nachschlage-App ausschließlich für Erwachsene und weder ein Marktplatz, Einzelhändler, medizinischer Berater noch ein Dienst zur Förderung des Konsums.",
      "sections": [
        {
          "id": "s1",
          "title": "1. Lizenzgeber",
          "blocks": [
            { "type": "p", "text": "Die mobile Mixly-Anwendung wird lizenziert vom Einzelunternehmer ULADZISLAU YARMAKOVICH, Batumi, Georgien („Lizenzgeber“, „Mixly“, „wir“, „uns“ oder „unser“)." },
            { "type": "p", "text": "Kontakt-E-Mail: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." },
            { "type": "p", "text": "Postanschrift: Georgien, Stadt Batumi, Vakhtang-Gorgasali-Str. N116-118, 11. Stock, Wohnung N58." }
          ]
        },
        {
          "id": "s2",
          "title": "2. Verhältnis zu anderen Bedingungen",
          "blocks": [
            { "type": "p", "text": "Diese Lizenzvereinbarung gilt zusammen mit den Mixly-Nutzungsbedingungen und der Datenschutzerklärung. Plattformbedingungen von Apple App Store, Google Play oder einem anderen autorisierten App-Marktplatz gelten ebenfalls für Ihren Download und Ihre Nutzung von Mixly." },
            { "type": "p", "text": "Wenn die zwingenden Bedingungen einer Plattform mit dieser Lizenzvereinbarung in Konflikt stehen, gelten die zwingenden Plattformbedingungen nur im Umfang dieses Konflikts." }
          ]
        },
        {
          "id": "s3",
          "title": "3. Lizenzgewährung",
          "blocks": [
            { "type": "p", "text": "Vorbehaltlich Ihrer Einhaltung dieser Lizenzvereinbarung und der Nutzungsbedingungen gewähren wir Ihnen eine beschränkte, persönliche, nicht-exklusive, nicht übertragbare, nicht unterlizenzierbare, widerrufliche Lizenz zur Installation und Nutzung von Mixly auf Geräten, die Sie besitzen oder kontrollieren, ausschließlich für Ihre persönliche, rechtmäßige, informative Nutzung als Erwachsener." }
          ]
        },
        {
          "id": "s4",
          "title": "4. Eigentum",
          "blocks": [
            { "type": "p", "text": "Mixly wird lizenziert, nicht verkauft. Wir und unsere Lizenzgeber behalten alle Rechte, Titel und Ansprüche an der App, einschließlich App-Design, Benutzeroberfläche, Code, Katalogstruktur, Ranking-Logik, Text, Grafiken, zusammengestellter Datensätze und zugehöriger Materialien." },
            { "type": "p", "text": "In Mixly genannte Markennamen, Produktnamen, Quellennamen, Marken, Logos und andere Kennzeichen Dritter bleiben Eigentum ihrer jeweiligen Inhaber. Ihr Erscheinen in Mixly dient nur der informativen Kennzeichnung und impliziert keine Befürwortung, kein Sponsoring, keine Autorisierung, keine Partnerschaft und keine Verbindung." }
          ]
        },
        {
          "id": "s5",
          "title": "5. Beschränkungen",
          "blocks": [
            { "type": "p", "text": "Sie dürfen nicht:" },
            { "type": "ul", "items": [
              "Mixly oder den Zugang zu Mixly verkaufen, vermieten, verleasen, unterlizenzieren, weiterverbreiten oder kommerziell verwerten;",
              "Mixly kopieren, ändern, übersetzen, anpassen oder abgeleitete Werke davon erstellen, außer soweit das anwendbare Recht dies ausdrücklich erlaubt;",
              "Reverse Engineering betreiben, dekompilieren oder versuchen, Quellcode zu extrahieren, außer soweit das anwendbare Recht dies ausdrücklich erlaubt;",
              "Schutzrechtshinweise entfernen oder verändern;",
              "wesentliche Teile des Katalogs oder der Datenbank für ein konkurrierendes Produkt, einen kommerziellen Datensatz oder eine unbefugte abgeleitete Datenbank scrapen, exportieren, sammeln oder zusammenstellen;",
              "Bots, Skripte, Crawler oder automatisierte Tools verwenden, um ohne unsere schriftliche Erlaubnis auf Mixly oder zugehörige Backend-Dienste zuzugreifen;",
              "Mixly, Supabase, Speicherdienste oder die zugehörige Infrastruktur stören, überlasten, umgehen oder angreifen;",
              "Community-Vorschläge, Reaktionen, Bewertungen, Rezensionen, Kommentare, Share-Links oder Analyseereignisse manipulieren, spammen, automatisieren oder falsch darstellen;",
              "Mixly nutzen, um rechtswidrige Aktivitäten oder den Kauf, Verkauf, Vertrieb, die Bewerbung oder den Missbrauch regulierter Waren zu erleichtern."
            ] }
          ]
        },
        {
          "id": "s6",
          "title": "6. Beschränkung auf Erwachsene und regulierte Inhalte",
          "blocks": [
            { "type": "p", "text": "Sie dürfen Mixly nur nutzen, wenn Sie mindestens 18 Jahre alt sind und es Ihnen an Ihrem Standort rechtlich gestattet ist, die informativen Inhalte der App anzusehen. Verlangt Ihr örtliches Recht ein höheres Alter, müssen Sie dieses höhere Alter erfüllen." },
            { "type": "p", "text": "Die Ihnen gewährte Lizenz gestattet nicht die Nutzung von Mixly, um Tabak, Nikotin, Alkohol oder kontrollierte Produkte zu bewerben, zu fördern, zu verkaufen, zu kaufen, zu vertreiben oder zu vermitteln." }
          ]
        },
        {
          "id": "s7",
          "title": "7. Updates und Verfügbarkeit",
          "blocks": [
            { "type": "p", "text": "Wir können Updates, Patches, Änderungen oder Entfernungen von Funktionen, Premium-Zugangsregeln, Abonnementangeboten, Analyse-Instrumentierung, Teilen-Funktionen, Übersetzungsfunktionen, Community-Funktionen oder Katalogsinhalten bereitstellen. Wir sind nicht verpflichtet, ein bestimmtes Update bereitzustellen oder eine Funktion auf unbestimmte Zeit aufrechtzuerhalten." }
          ]
        },
        {
          "id": "s8",
          "title": "8. Feedback",
          "blocks": [
            { "type": "p", "text": "Wenn Sie Feedback, Vorschläge, Fehlerberichte, Katalogempfehlungen, Community-Mischungseinreichungen, Reaktionen, Bewertungen, Rezensionen, Kommentare oder ähnliches Material bereitstellen, gewähren Sie uns eine nicht-exklusive, weltweite, gebührenfreie, übertragbare, unterlizenzierbare Lizenz, dieses Material zu nutzen, zu prüfen, zu moderieren, zu veröffentlichen, anzupassen, zu übersetzen, zu analysieren und anzuzeigen, um Mixly zu betreiben, zu verbessern und weiterzuentwickeln, ohne Sie dafür zu vergüten." }
          ]
        },
        {
          "id": "s9",
          "title": "9. Dienste und Inhalte Dritter",
          "blocks": [
            { "type": "p", "text": "Mixly kann Dienste Dritter nutzen, etwa Supabase, Messaging- und Benachrichtigungsdienstleister, Amplitude, RevenueCat, Apple App Store, Google Play, Übersetzungsdienstleister, Hosting-Anbieter, Teilen-Menü-Integrationen und E-Mail-Anbieter. Mixly kann außerdem auf Quellenmaterialien, Produktnamen und Markennamen Dritter verweisen. Wir sind nicht verantwortlich für Dienste, Websites, Produkte, Kaufsysteme, Analysesysteme, Übersetzungssysteme, Teilen-Ziele oder Inhalte Dritter." }
          ]
        },
        {
          "id": "s10",
          "title": "10. Gewährleistungsausschluss",
          "blocks": [
            { "type": "p", "text": "Mixly wird „wie besehen“ und „wie verfügbar“ bereitgestellt. Soweit gesetzlich zulässig, schließen wir alle Gewährleistungen aus, seien sie ausdrücklich, konkludent oder gesetzlich, einschließlich Gewährleistungen der Marktgängigkeit, Eignung für einen bestimmten Zweck, des Rechtstitels, der Nichtverletzung von Rechten, Richtigkeit, Verfügbarkeit und des fehlerfreien Betriebs." }
          ]
        },
        {
          "id": "s11",
          "title": "11. Haftungsbeschränkung",
          "blocks": [
            { "type": "p", "text": "Soweit gesetzlich zulässig, haften wir nicht für indirekte, zufällige, besondere, Folge-, exemplarische oder Strafschäden oder für den Verlust von Daten, Gewinnen, Geschäftswert, Geschäftschancen oder sonstige immaterielle Verluste, die sich aus Mixly oder dieser Lizenzvereinbarung ergeben oder damit zusammenhängen." },
            { "type": "p", "text": "Nichts in dieser Lizenzvereinbarung beschränkt eine Haftung, die nach anwendbarem Recht nicht beschränkt werden kann." }
          ]
        },
        {
          "id": "s12",
          "title": "12. Kündigung",
          "blocks": [
            { "type": "p", "text": "Diese Lizenz beginnt, wenn Sie Mixly installieren oder nutzen, und gilt bis zu ihrer Beendigung. Sie können sie beenden, indem Sie die App deinstallieren und jede Nutzung einstellen. Wir können die Lizenz beenden oder aussetzen, wenn Sie gegen diese Lizenzvereinbarung oder die Nutzungsbedingungen verstoßen, ein rechtliches Risiko schaffen oder die App bzw. Backend-Dienste missbräuchlich nutzen." },
            { "type": "p", "text": "Nach der Beendigung müssen Sie die Nutzung von Mixly einstellen und unbefugte Kopien löschen. Bestimmungen, die ihrer Natur nach die Beendigung überdauern sollten, bleiben bestehen, einschließlich Eigentum, Beschränkungen, Haftungsausschlüsse, Haftungsbeschränkung und anwendbares Recht." }
          ]
        },
        {
          "id": "s13",
          "title": "13. Plattformbedingungen",
          "blocks": [
            { "type": "p", "text": "Wenn Sie Mixly aus dem Apple App Store heruntergeladen haben, sind Apple und seine Tochtergesellschaften nur in dem von Apples anwendbaren Bedingungen geforderten Umfang Drittbegünstigte dieser Lizenzvereinbarung. Apple ist nicht verpflichtet, Wartung oder Support für Mixly bereitzustellen, außer soweit dies nach anwendbarem Recht erforderlich ist." },
            { "type": "p", "text": "Wenn Sie Mixly von Google Play heruntergeladen haben, gelten auch die Google-Play-Bedingungen für Ihre Nutzung der App." }
          ]
        },
        {
          "id": "s14",
          "title": "14. Anwendbares Recht",
          "blocks": [
            { "type": "p", "text": "Diese Lizenzvereinbarung unterliegt dem Recht Georgiens, ohne Berücksichtigung kollisionsrechtlicher Regelungen, sofern nicht zwingende Verbraucherschutzgesetze an Ihrem Standort etwas anderes verlangen." }
          ]
        },
        {
          "id": "s15",
          "title": "15. Änderungen",
          "blocks": [
            { "type": "p", "text": "Wir können diese Lizenzvereinbarung aktualisieren, wenn sich Mixly ändert oder sich rechtliche Anforderungen ändern. Das Gültigkeitsdatum gibt an, ab wann die neueste Version gilt. Die fortgesetzte Nutzung von Mixly nach Änderungen bedeutet, dass Sie die aktualisierte Lizenzvereinbarung akzeptieren." }
          ]
        },
        {
          "id": "s16",
          "title": "16. Kontakt",
          "blocks": [
            { "type": "p", "text": "Bei Fragen zu dieser Lizenzvereinbarung wenden Sie sich an: [[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]." }
          ]
        }
      ]
    }
  },
  "support": {
    "en": {
      "title": "Mixly Support",
      "meta": "Last updated: April 25, 2026",
      "notice": "Mixly is an adults-only informational catalog and recommendation reference for hookah/shisha flavor mixes. Mixly does not sell, ship, facilitate the sale of, or promote the purchase or consumption of tobacco, nicotine, alcohol, or controlled products.",
      "sections": [
        {
          "id": "s1",
          "title": "Contact us",
          "blocks": [
            { "type": "p", "text": "If you need help with Mixly, want to report an issue, suggest a catalog update, or ask a privacy or legal question, contact us by email:" },
            { "type": "p", "text": "[[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]" }
          ]
        },
        {
          "id": "s2",
          "title": "What we can help with",
          "blocks": [
            { "type": "ul", "items": [
              "app bugs, crashes, or loading issues;",
              "catalog corrections, missing brands, flavors, or mix ideas;",
              "feedback about recommendations, filters, favorites, and app usability;",
              "privacy, terms, license, or other legal questions;",
              "purchase or subscription questions if premium features are available in your app version."
            ] }
          ]
        },
        {
          "id": "account-deletion",
          "title": "Account deletion request",
          "blocks": [
            { "type": "p", "text": "You can delete an Apple- or Google-connected Mixly account inside the app: Profile → Profile details → Delete profile and data. This removes the authenticated Mixly account and its private cloud state." },
            { "type": "p", "text": "If you cannot access the app or account, email [[a:mailto:support@get-mixly.app?subject=Mixly%20account%20deletion%20request]]support@get-mixly.app[[/a]] with the subject “Mixly account deletion request”. Include the email address associated with Apple or Google, if one was shared with Mixly, and do not include passwords, payment-card details, or one-time codes. We may request information needed to verify the request and may retain limited data where required for billing, fraud prevention, security, or law." }
          ]
        },
        {
          "id": "s4",
          "title": "Useful links",
          "blocks": [
            { "type": "ul", "items": [
              "[[a:./privacy.html]]Privacy Policy[[/a]]",
              "[[a:./terms.html]]Terms of Use[[/a]]",
              "[[a:./eula.html]]License Agreement[[/a]]"
            ] },
            { "type": "p", "text": "You can contact us in English, Russian, or German." }
          ]
        }
      ]
    },
    "ru": {
      "title": "Поддержка Mixly",
      "meta": "Последнее обновление: 25 апреля 2026",
      "notice": "Mixly — это информационный каталог и справочник рекомендаций по миксам вкусов для кальяна/шиши только для взрослых. Mixly не продаёт, не доставляет, не содействует продаже и не продвигает покупку или употребление табака, никотина, алкоголя либо контролируемых товаров.",
      "sections": [
        {
          "id": "s1",
          "title": "Свяжитесь с нами",
          "blocks": [
            { "type": "p", "text": "Если вам нужна помощь с Mixly, вы хотите сообщить о проблеме, предложить обновление каталога или задать вопрос по конфиденциальности либо юридический вопрос, напишите нам по email:" },
            { "type": "p", "text": "[[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]" }
          ]
        },
        {
          "id": "s2",
          "title": "С чем мы можем помочь",
          "blocks": [
            { "type": "ul", "items": [
              "ошибки приложения, сбои или проблемы с загрузкой;",
              "исправления каталога, отсутствующие бренды, вкусы или идеи миксов;",
              "обратная связь о рекомендациях, фильтрах, избранном и удобстве использования приложения;",
              "вопросы по конфиденциальности, условиям, лицензии или другие юридические вопросы;",
              "вопросы о покупках или подписке, если premium-функции доступны в вашей версии приложения."
            ] }
          ]
        },
        {
          "id": "account-deletion",
          "title": "Запрос на удаление аккаунта",
          "blocks": [
            { "type": "p", "text": "Вы можете удалить подключённый через Apple или Google аккаунт Mixly внутри приложения: Профиль → Данные профиля → Удалить профиль и данные. Это удаляет аутентифицированный аккаунт Mixly и его приватное облачное состояние." },
            { "type": "p", "text": "Если вы не можете получить доступ к приложению или аккаунту, напишите на [[a:mailto:support@get-mixly.app?subject=Mixly%20account%20deletion%20request]]support@get-mixly.app[[/a]] с темой «Mixly account deletion request». Укажите email, связанный с Apple или Google, если он был предоставлен Mixly, и не указывайте пароли, данные банковских карт или одноразовые коды. Мы можем запросить информацию, необходимую для проверки запроса, и можем сохранить ограниченные данные, если это требуется для биллинга, предотвращения мошенничества, безопасности или по закону." }
          ]
        },
        {
          "id": "s4",
          "title": "Полезные ссылки",
          "blocks": [
            { "type": "ul", "items": [
              "[[a:./privacy.html]]Политика конфиденциальности[[/a]]",
              "[[a:./terms.html]]Условия использования[[/a]]",
              "[[a:./eula.html]]Лицензионное соглашение[[/a]]"
            ] },
            { "type": "p", "text": "Вы можете связаться с нами на английском, русском или немецком языке." }
          ]
        }
      ]
    },
    "de": {
      "title": "Mixly-Support",
      "meta": "Zuletzt aktualisiert: 25. April 2026",
      "notice": "Mixly ist ein informativer Katalog und ein Empfehlungsnachschlagewerk für Geschmacksmischungen für Wasserpfeife/Shisha, ausschließlich für Erwachsene. Mixly verkauft, versendet oder vermittelt keine Tabak-, Nikotin-, Alkohol- oder kontrollierten Produkte und fördert weder deren Kauf noch deren Konsum.",
      "sections": [
        {
          "id": "s1",
          "title": "Kontaktieren Sie uns",
          "blocks": [
            { "type": "p", "text": "Wenn Sie Hilfe mit Mixly benötigen, ein Problem melden, eine Katalogaktualisierung vorschlagen oder eine Datenschutz- oder Rechtsfrage stellen möchten, kontaktieren Sie uns per E-Mail:" },
            { "type": "p", "text": "[[a:mailto:support@get-mixly.app]]support@get-mixly.app[[/a]]" }
          ]
        },
        {
          "id": "s2",
          "title": "Wobei wir helfen können",
          "blocks": [
            { "type": "ul", "items": [
              "App-Fehler, Abstürze oder Ladeprobleme;",
              "Katalogkorrekturen, fehlende Marken, Geschmacksrichtungen oder Mischungsideen;",
              "Feedback zu Empfehlungen, Filtern, Favoriten und Benutzerfreundlichkeit der App;",
              "Fragen zu Datenschutz, Nutzungsbedingungen, Lizenz oder andere rechtliche Fragen;",
              "Fragen zu Kauf oder Abonnement, sofern Premium-Funktionen in Ihrer App-Version verfügbar sind."
            ] }
          ]
        },
        {
          "id": "account-deletion",
          "title": "Antrag auf Kontolöschung",
          "blocks": [
            { "type": "p", "text": "Sie können ein mit Apple oder Google verbundenes Mixly-Konto in der App löschen: Profil → Profildetails → Profil und Daten löschen. Dadurch werden das authentifizierte Mixly-Konto und sein privater Cloud-Zustand entfernt." },
            { "type": "p", "text": "Wenn Sie nicht auf die App oder das Konto zugreifen können, senden Sie eine E-Mail an [[a:mailto:support@get-mixly.app?subject=Mixly%20account%20deletion%20request]]support@get-mixly.app[[/a]] mit dem Betreff „Mixly account deletion request“. Geben Sie die mit Apple oder Google verknüpfte E-Mail-Adresse an, sofern eine an Mixly übermittelt wurde, und geben Sie keine Passwörter, Zahlungskartendaten oder Einmalcodes an. Wir können zur Überprüfung des Antrags erforderliche Informationen anfordern und begrenzte Daten aufbewahren, sofern dies für Abrechnung, Betrugsprävention, Sicherheit oder aufgrund gesetzlicher Vorgaben erforderlich ist." }
          ]
        },
        {
          "id": "s4",
          "title": "Nützliche Links",
          "blocks": [
            { "type": "ul", "items": [
              "[[a:./privacy.html]]Datenschutzerklärung[[/a]]",
              "[[a:./terms.html]]Nutzungsbedingungen[[/a]]",
              "[[a:./eula.html]]Lizenzvereinbarung[[/a]]"
            ] },
            { "type": "p", "text": "Sie können uns auf Englisch, Russisch oder Deutsch kontaktieren." }
          ]
        }
      ]
    }
  }
};
