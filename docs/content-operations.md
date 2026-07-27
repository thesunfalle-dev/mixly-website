# Контент: backup, restore и URL-миграции

## Источник истины

В текущей архитектуре источник истины — Git-репозиторий `thesunfalle-dev/mixly-website`.
В нём хранятся:

- HTML-страницы, статьи и metadata в корне проекта;
- локализованные статьи: `/{ru,en,de}/blog/<slug>/index.html`;
- локализованный текст в `i18n.js` и `legal-content.js` (+ `npm run generate:legal`);
- SEO статей: `npm run generate:article-seo` / `scripts/enrich-article-seo.mjs`;
- изображения приложения в `images_for_web/` и `assets/blog/`;
- SEO-конфигурация в `robots.txt`, `sitemap.xml` и HTML metadata;
- Worker-правила и article path map в `worker.js`.

Незакоммиченные изменения не являются backup и не должны быть единственной копией контента.
Cloudflare хранит предыдущие Worker versions — это rollback-слой для деплоя, но **не**
замена Git history для правок контента.

## Перед изменением контента

1. Обновить локальную ветку `main` и создать отдельную ветку для изменения.
2. Проверить все изменённые страницы командой `npm run check:release`.
3. Зафиксировать изменение в коммите с понятным описанием.
4. Перед production promotion сохранить commit SHA в tag/message версии Worker, как описано в `README.md`.

Это позволяет сопоставить опубликованную версию с точной версией контента в Git и восстановить только затронутый файл, не откатывая чужие изменения в рабочей папке.

## Восстановление страницы или изображения

1. Найти последний корректный commit в истории GitHub или локального клона.
2. Посмотреть нужную версию файла без изменения рабочей директории:

   ```sh
   git show <commit>:<path>
   ```

3. Восстановить только нужный файл в отдельной ветке:

   ```sh
   git restore --source <commit> -- <path>
   ```

4. Выполнить `npm run check:release`, проверить страницу локально и создать новый commit с причиной восстановления.
5. Загрузить эту версию как preview, затем продвинуть в production по deployment-процессу из `README.md`.

Пример путей: `article.html`, `i18n.js`, `sitemap.xml`, `images_for_web/RU/main_1.png`.

## Slug и 301 redirect

Новые публичные статьи должны получать постоянный URL до публикации. Изменять slug опубликованной статьи можно только вместе с записью в redirect map Worker:

1. Добавить `old path → new path` в `worker.js` как постоянный 301 redirect (рядом с `articlePaths`).
2. Обновить ссылки, related cards, `generate:article-seo`, canonical и sitemap на новый URL.
3. Проверить старый URL, новый URL и все локализованные варианты на preview.
4. Сохранять redirect бессрочно, если для его удаления не принято отдельное SEO-решение. Не удалять его одновременно с миграцией.

Опубликованные кластеры (2026-07): mixing guide, ratios, flavor combinations — по три локали каждый.
`article.html` остаётся `noindex` шаблоном и не входит в sitemap.

### Учебное восстановление

```sh
# посмотреть файл из известного commit
git show HEAD:en/blog/how-to-mix-hookah-tobacco/index.html | head
# восстановить один asset в отдельной ветке
git restore --source HEAD~1 -- assets/blog/kak-pravilno-smeshivat-tabak-hero.png
npm run check
```

После restore — commit, preview, production deploy по `docs/deployment.md`.

## Что уже проверено

- `origin` указывает на GitHub-репозиторий `thesunfalle-dev/mixly-website`;
- текущая версия `article.html` и одного из изображений извлекаются через `git show HEAD:<path>`;
- `sitemap.xml` содержит только реальные индексируемые страницы, а шаблон `article.html` остаётся `noindex`.

Это подтверждает, что Git может быть источником для точечного восстановления. Учебное восстановление в отдельной ветке и проверка истории production Worker выполняются перед закрытием задачи, когда будет доступен общий deploy-процесс.

## Миграция CMS или хостинга

До переноса нужно экспортировать полный Git-репозиторий и список production Worker versions, затем на preview новой платформы проверить:

- все HTML и asset URLs;
- `robots.txt`, sitemap, canonical и `noindex`;
- security headers и HTTPS;
- все 301 redirects;
- `npm run check:release`.

DNS переключать только после успешного preview и сохранения rollback-версии текущего Worker.

## Внешняя проверка

До закрытия задачи владелец проекта должен подтвердить, что GitHub-репозиторий доступен как удалённый backup и что production-хостинг/Cloudflare сохраняет предыдущие Worker versions. После этого нужно выполнить учебное восстановление одного изображения или страницы в отдельной ветке и записать commit SHA в Linear.
