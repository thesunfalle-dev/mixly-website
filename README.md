# Mixly website

Статический маркетинговый сайт Mixly. Он изолирован от Expo-приложения и не требует сборщика:
для локального просмотра достаточно открыть корень `website/` через любой статический HTTP-сервер.

```sh
cd website && python3 -m http.server 4173
```

## Страницы

- `index.html` — лендинг
- `blog.html` / `article.html` — блог (пока заглушка «скоро появится»)
- `share.html` — smart-link handoff для app share (`?mix=`, `?lab=`, `?preview=1`); deep link + fallback в App Store / Play; `noindex`, не в sitemap
- `privacy.html`, `cookies.html`, `terms.html`, `eula.html`, `support.html` — публичные юридические документы (RU / EN / DE), намеренно исключённые из индексации через `noindex, follow`
- `404.html`, `403.html`, `500.html` — страницы ошибок (`noindex`)

Перед публикацией:

- канонический домен: `https://get-mixly.app` (см. `robots.txt`, `sitemap.xml`, `og:*` / `canonical` в `index.html`);
- выкладывать **только** содержимое `website/` как document root (legal-ссылки уже внутри этой папки);
- не публиковать составы и рецепты Premium-миксов в статических страницах;
- страница блога индексируется; шаблон `article.html` остаётся с `noindex` до публикации реальных материалов, после чего для каждой статьи нужен отдельный URL в sitemap;
- на Cloudflare Workers/Pages кастомный 404 задаётся через `404.html` + `assets.not_found_handling: "404-page"` в `wrangler.jsonc` (не через Netlify `_redirects` со статусом 404);
- security headers задаются в `worker.js`. Этот же Worker возвращает `X-Robots-Tag: noindex, nofollow` на preview URLs `*.workers.dev`; перед включением HSTS для поддоменов или preload нужно отдельно убедиться, что все поддомены обслуживаются по HTTPS;
- для nginx — `error_page 404 /404.html;` (и при необходимости `403` / `500`).

Язык сайта: RU / EN / DE (переключатель в шапке, `localStorage` ключ `mixly-lang`).

## Техническое SEO

- `sitemap.xml` содержит только индексируемые страницы; `article.html`, `share.html`, legal и страницы ошибок намеренно исключены / `noindex`.
- Каждая индексируемая HTML-страница указывает canonical URL на `https://get-mixly.app`.
- Локализованные статьи публикуются как отдельные URL (`/ru/blog/...`, `/en/blog/...`, `/de/blog/...`) с взаимным `hreflang`, `x-default`, Open Graph, `Article` + `BreadcrumbList` JSON-LD и видимыми breadcrumbs. Обновление: `npm run generate:article-seo`.
- Главная и `blog.html` пока остаются single-URL с client-side locale switcher; полный префиксный роутинг `/ru|en|de/` для home/blog/legal — отдельный этап MIX-7.
- На главной JSON-LD связывает `Organization`, `WebSite` и `MobileApplication` (включая App Store `downloadUrl`).

## Проверка сайта

```sh
npm run check
```

`npm run check` проверяет локальные ссылки и якоря, наличие ключей во всех словарях RU / EN / DE, canonical URL и состав sitemap. `npm run check:external` дополнительно проверяет финальный HTTP-ответ внешних ссылок. `npm run check:release` запускает оба шага; его ненулевой код завершения должен останавливать production deployment.

## Публикация

Полный runbook: [`docs/deployment.md`](docs/deployment.md) (preview, production, rollback, secrets).

Кратко:

```sh
npm install
npm run check:release
COMMIT=$(git rev-parse HEAD)
npm exec wrangler -- versions upload --preview-alias <branch> --tag "$COMMIT" --message "$COMMIT"
# smoke preview URL (*.workers.dev always noindex)
npm exec wrangler -- versions deploy <version-id>@100 --message "$COMMIT" -y
npm exec wrangler -- deployments list   # tag/message must match commit SHA
```

Секрет `CLOUDFLARE_API_TOKEN` — только в `.env`/CI, не в репозитории.
