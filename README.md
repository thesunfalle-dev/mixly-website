# Mixly website

Статический маркетинговый сайт Mixly. Он изолирован от Expo-приложения и не требует сборщика:
для локального просмотра достаточно открыть корень `website/` через любой статический HTTP-сервер.

```sh
cd website && python3 -m http.server 4173
```

## Страницы

- `index.html` — лендинг
- `blog.html` / `article.html` — блог (пока заглушка «скоро появится»)
- `privacy.html`, `terms.html`, `eula.html`, `support.html` — юридические документы (RU / EN / DE)
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

- `sitemap.xml` содержит только индексируемые страницы; `article.html` и страницы ошибок намеренно исключены и получают `noindex`.
- Каждая индексируемая HTML-страница указывает canonical URL на `https://get-mixly.app`.
- RU / EN / DE сейчас используют один URL и переключаются в браузере, поэтому `hreflang` не добавлен: для него сначала нужны отдельные локализованные URLs и серверно доступная разметка каждой версии.

## Проверка сайта

```sh
npm run check
```

`npm run check` проверяет локальные ссылки и якоря, наличие ключей во всех словарях RU / EN / DE, canonical URL и состав sitemap. `npm run check:external` дополнительно проверяет финальный HTTP-ответ внешних ссылок. `npm run check:release` запускает оба шага; его ненулевой код завершения должен останавливать production deployment.

## Публикация

Wrangler закреплён в `package-lock.json`; перед первой проверкой установи зависимости через `npm install`. Перед публикацией запусти `npm run check:release`. Для preview загрузи версию без выката в production:

```sh
npm exec wrangler -- versions upload --preview-alias <branch-name> --tag <commit-sha> --message <commit-sha>
```

Cloudflare вернёт URL preview на `workers.dev`; он получает HTTP `X-Robots-Tag: noindex, nofollow`. После smoke-check выкати созданную версию через `npm exec wrangler -- versions deploy <version-id>@100`. Текущую production-версию проверяй командой `npm exec wrangler -- deployments list`; её tag/message должен совпадать с commit SHA. Для возврата используй `npm exec wrangler -- rollback <version-id>`.

Для CI нужен секрет `CLOUDFLARE_API_TOKEN`; не добавляй его в репозиторий, `wrangler.jsonc` или клиентский код.
