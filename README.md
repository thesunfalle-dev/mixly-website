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
- блог пока не индексируется целиком (`article.html` с `noindex`); отдельные URL журнала добавить в sitemap после появления реальных материалов;
- на Cloudflare Workers/Pages кастомный 404 задаётся через `404.html` + `assets.not_found_handling: "404-page"` в `wrangler.jsonc` (не через Netlify `_redirects` со статусом 404);
- для nginx — `error_page 404 /404.html;` (и при необходимости `403` / `500`).

Язык сайта: RU / EN / DE (переключатель в шапке, `localStorage` ключ `mixly-lang`).
