#!/usr/bin/env node
/**
 * Build the second SEO cluster: category «Вкусы» / Tastes / Geschmack.
 * Writes 9 localized article HTML pages (3 topics × RU/EN/DE).
 * Run after: npm run generate:article-seo && npm run generate:article-meta
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const esc = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const UI = {
  ru: {
    home: 'О приложении',
    features: 'Возможности',
    updates: 'Обновления',
    blog: 'Блог',
    download: 'Скачать в App Store',
    menu: 'Открыть меню',
    menuAria: 'Мобильная навигация',
    app: 'Приложение',
    docs: 'Документы',
    privacy: 'Конфиденциальность',
    cookies: 'Cookies и аналитика',
    terms: 'Условия использования',
    eula: 'Лицензия',
    support: 'Поддержка',
    socials: 'Соцсети',
    contacts: 'Контакты',
    age: 'Только для взрослых 18+',
    tagline: 'Идеи для кальяна, которые хочется сохранить',
    related: 'Читайте также',
    relatedAria: 'Связанные статьи',
    toc: 'Содержание',
    tocLabel: 'На этой странице',
    category: 'Вкусы',
    catMeta: 'ВКУСЫ',
  },
  en: {
    home: 'About',
    features: 'Features',
    updates: 'Updates',
    blog: 'Blog',
    download: 'Download on the App Store',
    menu: 'Open menu',
    menuAria: 'Mobile navigation',
    app: 'App',
    docs: 'Legal',
    privacy: 'Privacy',
    cookies: 'Cookies & analytics',
    terms: 'Terms of Use',
    eula: 'License',
    support: 'Support',
    socials: 'Social',
    contacts: 'Contact',
    age: 'Adults only 18+',
    tagline: 'Hookah ideas worth keeping',
    related: 'Read next',
    relatedAria: 'Related articles',
    toc: 'Table of contents',
    tocLabel: 'On this page',
    category: 'Tastes',
    catMeta: 'TASTES',
  },
  de: {
    home: 'Über die App',
    features: 'Funktionen',
    updates: 'Updates',
    blog: 'Blog',
    download: 'Im App Store laden',
    menu: 'Menü öffnen',
    menuAria: 'Mobile Navigation',
    app: 'App',
    docs: 'Dokumente',
    privacy: 'Datenschutz',
    cookies: 'Cookies & Analysen',
    terms: 'Nutzungsbedingungen',
    eula: 'Lizenz',
    support: 'Support',
    socials: 'Social',
    contacts: 'Kontakt',
    age: 'Nur für Erwachsene 18+',
    tagline: 'Shisha-Ideen, die man behalten will',
    related: 'Weiterlesen',
    relatedAria: 'Verwandte Artikel',
    toc: 'Inhaltsverzeichnis',
    tocLabel: 'Auf dieser Seite',
    category: 'Geschmack',
    catMeta: 'GESCHMACK',
  },
};

/** @type {Array<{id:string,paths:Record<string,string>,title:Record<string,string>,lead:Record<string,string>,excerpt:Record<string,string>,images:Array<{src:string,alt:Record<string,string>,caption:Record<string,string>,hero?:boolean}>,sections:Array<{id:string,toc:Record<string,string>,h2:Record<string,string>,html:Record<string,string>}>,faq:Array<{q:Record<string,string>,a:Record<string,string>}>}>} */
const ARTICLES = [
  {
    id: 'choose-base',
    paths: {
      ru: '/ru/blog/kak-vybrat-osnovu-dlya-miksa',
      en: '/en/blog/how-to-choose-hookah-mix-base',
      de: '/de/blog/shisha-mix-basis-waehlen',
    },
    title: {
      ru: 'Как выбрать основу для микса',
      en: 'How to Choose a Hookah Mix Base',
      de: 'Shisha-Mix-Basis wählen',
    },
    lead: {
      ru: 'Основа задаёт направление чаши: как выбрать главный вкус, чтобы микс оставался понятным и сбалансированным.',
      en: 'The base sets the direction of the bowl: how to pick the lead flavor so your mix stays clear and balanced.',
      de: 'Die Basis gibt der Bowl die Richtung: so wählst du das Hauptaroma, damit der Mix klar und ausgewogen bleibt.',
    },
    excerpt: {
      ru: 'Как выбрать главный вкус для микса: роли в чаше, интенсивность и простые критерии.',
      en: 'How to pick the lead flavor for a mix: bowl roles, intensity, and simple criteria.',
      de: 'So wählst du das Hauptaroma für einen Mix: Rollen in der Bowl, Intensität und klare Kriterien.',
    },
    images: [
      {
        src: '/assets/blog/choose-base-hero.webp',
        hero: true,
        alt: {
          ru: 'Чаша с основой из фруктового табака и лёгким акцентом мяты',
          en: 'Hookah bowl with a fruit tobacco base and a light mint accent',
          de: 'Shisha-Bowl mit fruchtiger Tabakbasis und leichtem Minz-Akzent',
        },
        caption: {
          ru: 'Основа занимает большую часть чаши — акцент только подчёркивает её.',
          en: 'The base fills most of the bowl — the accent only supports it.',
          de: 'Die Basis füllt den Großteil der Bowl — der Akzent unterstützt sie nur.',
        },
      },
      {
        src: '/assets/blog/choose-base-roles.webp',
        alt: {
          ru: 'Три чаши: чистая основа, дуэт 50/50 и основа с акцентом',
          en: 'Three bowls: pure base, 50/50 duet, and base with accent',
          de: 'Drei Bowls: reine Basis, 50/50-Duett und Basis mit Akzent',
        },
        caption: {
          ru: 'Слева направо: только основа, равные доли, основа плюс маленький акцент.',
          en: 'Left to right: base only, equal shares, base plus a small accent.',
          de: 'Von links: nur Basis, gleiche Anteile, Basis plus kleiner Akzent.',
        },
      },
      {
        src: '/assets/blog/choose-base-process.webp',
        alt: {
          ru: 'Выбор основы: чаша, контейнеры табака и пинцет',
          en: 'Choosing a base: bowl, tobacco tins, and tweezers',
          de: 'Basis wählen: Bowl, Tabakdosen und Pinzette',
        },
        caption: {
          ru: 'Сначала зафиксируйте основу — остальное подбирайте под неё.',
          en: 'Lock the base first — then choose everything else around it.',
          de: 'Lege zuerst die Basis fest — wähle danach alles andere dazu.',
        },
      },
    ],
    sections: [
      {
        id: 'what-is-base',
        toc: { ru: 'Что такое основа', en: 'What is a base', de: 'Was ist die Basis' },
        h2: {
          ru: 'Что такое основа микса',
          en: 'What a mix base is',
          de: 'Was die Mix-Basis ist',
        },
        html: {
          ru: `<p>Основа — это вкус, который вы должны узнавать первым и который занимает наибольшую долю в чаше. Без понятной основы микс быстро превращается в «кашу»: все ноты звучат сразу и ни одна не ведёт.</p><p>Хорошая основа обычно <strong>стабильная, узнаваемая и не слишком резкая</strong>. Она даёт пространство для поддержки и акцента, а не спорит с ними.</p>`,
          en: `<p>The base is the flavor you should recognize first and the one that takes the largest share in the bowl. Without a clear base, a mix turns into noise: every note speaks at once and none leads.</p><p>A good base is usually <strong>stable, recognizable, and not overly sharp</strong>. It leaves room for support and accent flavors instead of fighting them.</p>`,
          de: `<p>Die Basis ist das Aroma, das du zuerst erkennst und das den größten Anteil in der Bowl hat. Ohne klare Basis wird der Mix schnell unruhig: alle Noten sprechen gleichzeitig und keine führt.</p><p>Eine gute Basis ist meist <strong>stabil, wiedererkennbar und nicht zu scharf</strong>. Sie lässt Raum für Unterstützung und Akzent, statt dagegen zu kämpfen.</p>`,
        },
      },
      {
        id: 'roles',
        toc: { ru: 'Роли вкусов', en: 'Flavor roles', de: 'Aroma-Rollen' },
        h2: {
          ru: 'Три роли в чаше: основа, поддержка, акцент',
          en: 'Three roles in the bowl: base, support, accent',
          de: 'Drei Rollen in der Bowl: Basis, Support, Akzent',
        },
        html: {
          ru: `<p>Перед тем как выбирать вкусы «что с чем», задайте роли:</p><ul><li><strong>Основа (60–80%)</strong> — главный профиль, который ведёт сессию;</li><li><strong>Поддержка (20–35%)</strong> — смягчает, углубляет или добавляет сочность;</li><li><strong>Акцент (5–15%)</strong> — мята, цитрус, специя, лёгкая кислинка; маленькая доля, заметный эффект.</li></ul><p>Если вы только начинаете, хватит двух ролей: основа + поддержка или основа + акцент. Подробный алгоритм сборки — в гайде <a href="/ru/blog/kak-pravilno-smeshivat-tabak-dlya-kalyana">как правильно смешивать табак</a>.</p>`,
          en: `<p>Before you ask “what pairs with what”, assign roles:</p><ul><li><strong>Base (60–80%)</strong> — the main profile that leads the session;</li><li><strong>Support (20–35%)</strong> — softens, deepens, or adds juiciness;</li><li><strong>Accent (5–15%)</strong> — mint, citrus, spice, light tartness; small share, clear effect.</li></ul><p>If you are new, two roles are enough: base + support or base + accent. For the full build process, see <a href="/en/blog/how-to-mix-hookah-tobacco">how to mix hookah tobacco</a>.</p>`,
          de: `<p>Bevor du fragst „was passt wozu“, lege Rollen fest:</p><ul><li><strong>Basis (60–80%)</strong> — das Hauptprofil, das die Session führt;</li><li><strong>Support (20–35%)</strong> — mildert, vertieft oder macht saftiger;</li><li><strong>Akzent (5–15%)</strong> — Minze, Zitrus, Würze, leichte Säure; kleiner Anteil, klarer Effekt.</li></ul><p>Für den Einstieg reichen zwei Rollen: Basis + Support oder Basis + Akzent. Den kompletten Aufbau findest du unter <a href="/de/blog/wie-man-shisha-tabak-richtig-mischt">Shisha-Tabak richtig mischen</a>.</p>`,
        },
      },
      {
        id: 'criteria',
        toc: { ru: 'Критерии выбора', en: 'Selection criteria', de: 'Auswahlkriterien' },
        h2: {
          ru: 'Как выбрать основу: 5 простых критериев',
          en: 'How to choose a base: 5 simple criteria',
          de: 'Basis wählen: 5 einfache Kriterien',
        },
        html: {
          ru: `<ol><li><strong>Знакомый вкус.</strong> Берите то, что вам уже нравится соло — так проще понять, что добавила поддержка.</li><li><strong>Средняя интенсивность.</strong> Слишком громкая основа «съест» всё вокруг; слишком тихая — исчезнет под акцентом.</li><li><strong>Ширина профиля.</strong> Фрукты, ягоды, десертные и «сочные» вкусы чаще работают как база, чем острый цитрус или чистая мята.</li><li><strong>Цель сессии.</strong> Длинная спокойная чаша — мягкая фруктовая/ягодная основа. Короткий яркий микс — можно плотнее и слаще.</li><li><strong>Совместимость с акцентом.</strong> Если хотите мяту или цитрус сверху, основа должна выдерживать свежесть, а не конфликтовать с ней.</li></ol>`,
          en: `<ol><li><strong>Familiar flavor.</strong> Start with something you already like on its own — it is easier to hear what support adds.</li><li><strong>Medium intensity.</strong> A base that is too loud eats everything else; one that is too quiet disappears under the accent.</li><li><strong>Profile width.</strong> Fruit, berry, dessert, and juicy flavors work as a base more often than sharp citrus or pure mint.</li><li><strong>Session goal.</strong> Long calm bowl — soft fruit/berry base. Short bright mix — denser and sweeter can work.</li><li><strong>Accent compatibility.</strong> If you want mint or citrus on top, the base should tolerate freshness instead of clashing with it.</li></ol>`,
          de: `<ol><li><strong>Vertrautes Aroma.</strong> Nimm etwas, das dir solo schon gefällt — so hörst du klarer, was der Support hinzufügt.</li><li><strong>Mittlere Intensität.</strong> Eine zu laute Basis frisst alles andere; eine zu leise verschwindet unter dem Akzent.</li><li><strong>Profilbreite.</strong> Frucht, Beere, Dessert und saftige Aromen eignen sich häufiger als Basis als scharfes Zitrus oder reine Minze.</li><li><strong>Session-Ziel.</strong> Lange ruhige Bowl — weiche Frucht-/Beerenbasis. Kurzer knackiger Mix — dichter und süßer kann passen.</li><li><strong>Akzent-Kompatibilität.</strong> Willst du Minze oder Zitrus oben drauf, muss die Basis Frische vertragen statt dagegen zu streiten.</li></ol>`,
        },
      },
      {
        id: 'good-bases',
        toc: { ru: 'Хорошие базы', en: 'Good bases', de: 'Gute Basen' },
        h2: {
          ru: 'Какие вкусы чаще работают основой',
          en: 'Which flavors often work as a base',
          de: 'Welche Aromen oft als Basis funktionieren',
        },
        html: {
          ru: `<ul><li><strong>Фрукты:</strong> манго, персик, дыня, виноград, яблоко — понятная середина и место для акцента;</li><li><strong>Ягоды:</strong> клубника, малина, черника — яркие, но часто дружат с мятой и цитрусом;</li><li><strong>Десерт:</strong> ваниль, карамель, молочный шоколад — для более «тёплых» миксов;</li><li><strong>Сочные:</strong> арбуз, личи, мультифрукт — хороши, если не перегружены кислинкой.</li></ul><p>Осторожнее с чистой мятой, ледяным охлаждением, гвоздикой и очень кислым цитрусом: они отличные <em>акценты</em>, но редко спокойная основа. Карта профилей — в статье <a href="/ru/blog/vkusovye-profili-kalyana">вкусовые профили кальяна</a>.</p>`,
          en: `<ul><li><strong>Fruit:</strong> mango, peach, melon, grape, apple — a clear mid-line with room for accents;</li><li><strong>Berry:</strong> strawberry, raspberry, blueberry — bright, often friendly with mint and citrus;</li><li><strong>Dessert:</strong> vanilla, caramel, milk chocolate — for warmer mixes;</li><li><strong>Juicy:</strong> watermelon, lychee, multi-fruit — good when not overloaded with sourness.</li></ul><p>Be careful with pure mint, ice cooling, clove, and very sour citrus: excellent <em>accents</em>, rarely a calm base. See the map in <a href="/en/blog/hookah-flavor-profiles">hookah flavor profiles</a>.</p>`,
          de: `<ul><li><strong>Frucht:</strong> Mango, Pfirsich, Melone, Traube, Apfel — klare Mitte mit Raum für Akzente;</li><li><strong>Beere:</strong> Erdbeere, Himbeere, Blaubeere — knackig, oft gut mit Minze und Zitrus;</li><li><strong>Dessert:</strong> Vanille, Karamell, Milchschokolade — für wärmere Mixe;</li><li><strong>Saftig:</strong> Wassermelone, Litschi, Multifrucht — gut, wenn nicht zu sauer überladen.</li></ul><p>Vorsicht bei reiner Minze, Ice-Kühlung, Nelke und sehr saurem Zitrus: starke <em>Akzente</em>, selten eine ruhige Basis. Die Karte findest du unter <a href="/de/blog/shisha-geschmacksprofile">Shisha-Geschmacksprofile</a>.</p>`,
        },
      },
      {
        id: 'process',
        toc: { ru: 'Порядок выбора', en: 'Selection order', de: 'Auswahlreihenfolge' },
        h2: {
          ru: 'Порядок: сначала основа, потом всё остальное',
          en: 'Order: base first, everything else second',
          de: 'Reihenfolge: zuerst Basis, dann der Rest',
        },
        html: {
          ru: `<p>Практичный порядок без перебора десятка банок:</p><ol><li>Выберите основу по настроению (фруктовая / ягодная / десертная).</li><li>Зафиксируйте долю — например 70%.</li><li>Подберите одну поддержку из соседнего профиля или одну яркую ноту акцента.</li><li>Соберите чашу и оцените: слышна ли основа через 5–10 минут.</li><li>Меняйте только один параметр за раз: долю, акцент или крепость.</li></ol><aside class="article-callout"><strong>Один эксперимент — одно изменение</strong><p>Если основа «пропала», сначала уменьшите акцент на 5–10%, а не добавляйте третий вкус.</p></aside>`,
          en: `<p>A practical order without opening ten tins:</p><ol><li>Pick a base by mood (fruit / berry / dessert).</li><li>Lock a share — for example 70%.</li><li>Add one support from a neighboring profile or one bright accent note.</li><li>Pack the bowl and check: is the base still clear after 5–10 minutes?</li><li>Change only one variable next time: share, accent, or strength.</li></ol><aside class="article-callout"><strong>One experiment, one change</strong><p>If the base disappears, first cut the accent by 5–10% instead of adding a third flavor.</p></aside>`,
          de: `<p>Praktische Reihenfolge ohne zehn Dosen zu öffnen:</p><ol><li>Wähle die Basis nach Stimmung (Frucht / Beere / Dessert).</li><li>Fixiere den Anteil — zum Beispiel 70%.</li><li>Nimm einen Support aus dem Nachbarprofil oder einen klaren Akzent.</li><li>Fülle die Bowl und prüfe: ist die Basis nach 5–10 Minuten noch klar?</li><li>Ändere beim nächsten Mal nur eine Variable: Anteil, Akzent oder Stärke.</li></ol><aside class="article-callout"><strong>Ein Experiment, eine Änderung</strong><p>Verschwindet die Basis, reduziere zuerst den Akzent um 5–10% — statt ein drittes Aroma dazuzugeben.</p></aside>`,
        },
      },
      {
        id: 'mistakes',
        toc: { ru: 'Ошибки', en: 'Mistakes', de: 'Fehler' },
        h2: {
          ru: 'Типичные ошибки при выборе основы',
          en: 'Common mistakes when choosing a base',
          de: 'Typische Fehler bei der Basiswahl',
        },
        html: {
          ru: `<ul><li>Брать в основу самый громкий вкус «чтобы было вкусно» — он заглушит поддержку.</li><li>Делать две основы по 50% из несовместимых профилей без общей линии.</li><li>Стартовать с мяты или охлаждения как базы — сессия станет однообразно «холодной».</li><li>Игнорировать крепость: тяжёлая основа + тяжёлый акцент утомляет быстрее. См. <a href="/ru/blog/krepost-tabaka-dlya-kalyana">крепость табака для кальяна</a>.</li></ul>`,
          en: `<ul><li>Using the loudest flavor as the base “so it tastes strong” — it drowns the support.</li><li>Two 50% bases from clashing profiles with no shared line.</li><li>Starting with mint or cooling as the base — the session turns flatly cold.</li><li>Ignoring strength: a heavy base plus a heavy accent fatigues faster. See <a href="/en/blog/hookah-tobacco-strength">hookah tobacco strength</a>.</li></ul>`,
          de: `<ul><li>Das lauteste Aroma als Basis nehmen „damit es knallt“ — der Support geht unter.</li><li>Zwei 50%-Basen aus widersprüchlichen Profilen ohne gemeinsame Linie.</li><li>Mit Minze oder Kühlung als Basis starten — die Session wird einseitig kalt.</li><li>Stärke ignorieren: schwere Basis plus schwerer Akzent ermüdet schneller. Siehe <a href="/de/blog/shisha-tabak-staerke">Shisha-Tabak-Stärke</a>.</li></ul>`,
        },
      },
      {
        id: 'summary',
        toc: { ru: 'Итог', en: 'Takeaway', de: 'Fazit' },
        h2: { ru: 'Короткий итог', en: 'Key takeaway', de: 'Kurzes Fazit' },
        html: {
          ru: `<p>Основа — не «ещё один вкус», а якорь микса. Выберите знакомый профиль средней силы, отдайте ему большую долю, добавьте одну поддержку или акцент и проверяйте, слышна ли основа через несколько минут. Когда база стабильна, проще переходить к <a href="/ru/blog/sochetaniya-vkusov-dlya-kalyana">сочетаниям вкусов</a> и готовым <a href="/ru/blog/miksy-dlya-kalyana-dlya-nachinayushchih">рецептам для начинающих</a>.</p>`,
          en: `<p>The base is not “just another flavor” — it is the anchor of the mix. Pick a familiar mid-strength profile, give it the largest share, add one support or accent, and check that the base still reads after a few minutes. Once the base is stable, it is easier to explore <a href="/en/blog/hookah-flavor-combinations">flavor combinations</a> and <a href="/en/blog/beginner-hookah-mix-recipes">beginner recipes</a>.</p>`,
          de: `<p>Die Basis ist kein „weiteres Aroma“, sondern der Anker des Mixes. Wähle ein vertrautes Profil mit mittlerer Stärke, gib ihm den größten Anteil, nimm einen Support oder Akzent und prüfe, ob die Basis nach ein paar Minuten noch klar ist. Ist die Basis stabil, sind <a href="/de/blog/shisha-geschmackskombinationen">Geschmackskombinationen</a> und <a href="/de/blog/shisha-mischungen-fuer-einsteiger">Einsteiger-Rezepte</a> leichter.</p>`,
        },
      },
    ],
    faq: [
      {
        q: {
          ru: 'Можно ли сделать основу из двух вкусов?',
          en: 'Can two flavors form the base together?',
          de: 'Können zwei Aromen zusammen die Basis bilden?',
        },
        a: {
          ru: 'Да, если они из одной семьи (два фрукта, две ягоды) и вместе дают один понятный профиль. Иначе лучше одна основа и одна поддержка.',
          en: 'Yes, if they are from the same family (two fruits, two berries) and read as one clear profile. Otherwise prefer one base and one support.',
          de: 'Ja, wenn sie aus derselben Familie kommen (zwei Früchte, zwei Beeren) und als ein klares Profil wirken. Sonst lieber eine Basis und ein Support.',
        },
      },
      {
        q: {
          ru: 'Какая доля основы оптимальна для новичка?',
          en: 'What base share is best for beginners?',
          de: 'Welcher Basisanteil eignet sich für Einsteiger?',
        },
        a: {
          ru: 'Ориентир 70/30 или 80/20. Так основа остаётся ведущей, а второй вкус читается как характер, а не конкурент.',
          en: 'Aim for 70/30 or 80/20. The base stays in the lead, and the second flavor reads as character rather than a rival.',
          de: 'Ziele auf 70/30 oder 80/20. Die Basis führt, das zweite Aroma wirkt als Charakter statt als Konkurrent.',
        },
      },
      {
        q: {
          ru: 'Почему основа «пропадает» через 10 минут?',
          en: 'Why does the base fade after 10 minutes?',
          de: 'Warum verschwindet die Basis nach 10 Minuten?',
        },
        a: {
          ru: 'Чаще всего акцент слишком сильный, перегрев или слишком плотная набивка. Уменьшите акцент и проверьте крепость компонентов.',
          en: 'Usually the accent is too strong, heat is too high, or the pack is too dense. Lower the accent and check component strength.',
          de: 'Meist ist der Akzent zu stark, die Hitze zu hoch oder die Packung zu dicht. Reduziere den Akzent und prüfe die Stärke der Komponenten.',
        },
      },
    ],
  },
  {
    id: 'strength',
    paths: {
      ru: '/ru/blog/krepost-tabaka-dlya-kalyana',
      en: '/en/blog/hookah-tobacco-strength',
      de: '/de/blog/shisha-tabak-staerke',
    },
    title: {
      ru: 'Крепость табака для кальяна: как подбирать',
      en: 'Hookah Tobacco Strength: How to Choose It',
      de: 'Shisha-Tabak-Stärke: so wählst du richtig',
    },
    lead: {
      ru: 'Лёгкий, средний или крепкий: как крепость влияет на микс, комфорт сессии и выбор основы.',
      en: 'Light, medium, or strong: how strength shapes the mix, session comfort, and base choice.',
      de: 'Leicht, mittel oder stark: so beeinflusst Stärke Mix, Session-Komfort und Basiswahl.',
    },
    excerpt: {
      ru: 'Как ориентироваться в крепости табака и не перегрузить микс.',
      en: 'How to read tobacco strength and avoid overloading the mix.',
      de: 'So liest du Tabakstärke und überlädst den Mix nicht.',
    },
    images: [
      {
        src: '/assets/blog/strength-levels.webp',
        hero: true,
        alt: {
          ru: 'Три чаши с разной плотностью и крепостью табака',
          en: 'Three bowls showing different tobacco density and strength',
          de: 'Drei Bowls mit unterschiedlicher Tabakdichte und Stärke',
        },
        caption: {
          ru: 'От более лёгкой текстуры к более плотной — крепость ощущается и в теле, и во вкусе.',
          en: 'From lighter texture to denser leaf — strength shows in body and flavor.',
          de: 'Von leichter Textur zu dichterem Blatt — Stärke spürst du in Body und Geschmack.',
        },
      },
      {
        src: '/assets/blog/strength-pack.webp',
        alt: {
          ru: 'Средняя набивка чаши и деревянный пинцет',
          en: 'Medium bowl pack with wooden tweezers',
          de: 'Mittlere Bowl-Packung mit Holzpinzette',
        },
        caption: {
          ru: 'Одинаковая крепость по этикетке может ощущаться по-разному из-за набивки и жара.',
          en: 'The same label strength can feel different with pack and heat.',
          de: 'Dieselbe Stärke auf dem Etikett kann sich durch Packung und Hitze anders anfühlen.',
        },
      },
      {
        src: '/assets/blog/strength-balance.webp',
        alt: {
          ru: 'Сбалансированный микс фруктового табака со свежим акцентом',
          en: 'Balanced fruit tobacco mix with a fresh accent',
          de: 'Ausgewogener Fruchttabak-Mix mit frischem Akzent',
        },
        caption: {
          ru: 'Если основа уже плотная, акцент лучше держать мягким и небольшим.',
          en: 'If the base is already dense, keep the accent soft and small.',
          de: 'Ist die Basis schon dicht, halte den Akzent weich und klein.',
        },
      },
    ],
    sections: [
      {
        id: 'what-strength',
        toc: { ru: 'Что такое крепость', en: 'What strength means', de: 'Was Stärke bedeutet' },
        h2: {
          ru: 'Что обычно имеют в виду под крепостью',
          en: 'What people usually mean by strength',
          de: 'Was mit Stärke meist gemeint ist',
        },
        html: {
          ru: `<p>Крепость — это не только «сколько никотина». В быту под ней понимают <strong>плотность тела, удар, насыщенность и то, как быстро сессия утомляет</strong>. Два табака с одинаковой пометкой light/medium могут ощущаться по-разному из-за листа, сиропа, жара и набивки.</p><p>Для миксов важнее практический вопрос: <em>будет ли чаша комфортной 40–60 минут и не перекроет ли один компонент остальные?</em></p>`,
          en: `<p>Strength is not only “how much nicotine”. In practice it means <strong>body, punch, richness, and how fast a session fatigues you</strong>. Two tins labeled light/medium can feel different because of leaf, syrup, heat, and pack.</p><p>For mixes the useful question is: <em>will the bowl stay comfortable for 40–60 minutes, and will one component drown the rest?</em></p>`,
          de: `<p>Stärke ist nicht nur „wie viel Nikotin“. Praktisch meint man <strong>Body, Druck, Sättigung und wie schnell die Session ermüdet</strong>. Zwei Dosen mit light/medium können sich wegen Blatt, Sirup, Hitze und Packung anders anfühlen.</p><p>Für Mixe zählt die Frage: <em>bleibt die Bowl 40–60 Minuten angenehm, und überdeckt eine Komponente den Rest?</em></p>`,
        },
      },
      {
        id: 'levels',
        toc: { ru: 'Уровни', en: 'Levels', de: 'Stufen' },
        h2: {
          ru: 'Лёгкий, средний, крепкий — практичная шкала',
          en: 'Light, medium, strong — a practical scale',
          de: 'Leicht, mittel, stark — eine praktische Skala',
        },
        html: {
          ru: `<ul><li><strong>Лёгкий:</strong> мягкое тело, удобен для длинных сессий и ярких ароматных акцентов;</li><li><strong>Средний:</strong> универсальная зона для большинства миксов и основ;</li><li><strong>Крепкий:</strong> плотное тело, быстрее утомляет; лучше как осознанный выбор, а не «по умолчанию».</li></ul><p>Если бренд не пишет крепость, ориентируйтесь на ощущение соло: через 10 минут вам комфортно или уже тяжело дышать «плотно»?</p>`,
          en: `<ul><li><strong>Light:</strong> soft body, good for long sessions and bright aromatic accents;</li><li><strong>Medium:</strong> the versatile zone for most mixes and bases;</li><li><strong>Strong:</strong> denser body, fatigues faster; better as a deliberate choice than a default.</li></ul><p>If a brand does not label strength, test solo: after 10 minutes, do you feel comfortable or already breathing “heavy”?</p>`,
          de: `<ul><li><strong>Leicht:</strong> weicher Body, gut für lange Sessions und knackige Akzente;</li><li><strong>Mittel:</strong> die flexible Zone für die meisten Mixe und Basen;</li><li><strong>Stark:</strong> dichterer Body, ermüdet schneller; besser bewusst gewählt als Standard.</li></ul><p>Steht keine Stärke auf der Dose, teste solo: nach 10 Minuten angenehm oder schon „schwer“?</p>`,
        },
      },
      {
        id: 'mix-impact',
        toc: { ru: 'Влияние на микс', en: 'Impact on mixes', de: 'Einfluss auf Mixe' },
        h2: {
          ru: 'Как крепость влияет на микс',
          en: 'How strength affects a mix',
          de: 'Wie Stärke den Mix beeinflusst',
        },
        html: {
          ru: `<p>Крепость компонентов складывается не линейно, но правило простое:</p><ul><li>лёгкая основа + лёгкий акцент — чисто, но иногда «пусто»;</li><li>средняя основа + лёгкий акцент — самый предсказуемый баланс;</li><li>средняя основа + крепкий акцент — акцент легко перетягивает на себя;</li><li>две крепкие доли — риск тяжёлой, короткой сессии.</li></ul><p>Поэтому при выборе <a href="/ru/blog/kak-vybrat-osnovu-dlya-miksa">основы для микса</a> сразу смотрите и на крепость, и на роль вкуса.</p>`,
          en: `<p>Component strength does not stack perfectly linearly, but the rule is simple:</p><ul><li>light base + light accent — clean, sometimes thin;</li><li>medium base + light accent — the most predictable balance;</li><li>medium base + strong accent — the accent can steal the lead;</li><li>two strong shares — risk of a heavy, short session.</li></ul><p>When you pick a <a href="/en/blog/how-to-choose-hookah-mix-base">mix base</a>, check strength and flavor role together.</p>`,
          de: `<p>Stärke addiert sich nicht linear, aber die Regel ist einfach:</p><ul><li>leichte Basis + leichter Akzent — sauber, manchmal dünn;</li><li>mittlere Basis + leichter Akzent — der planbarste Balance-Punkt;</li><li>mittlere Basis + starker Akzent — der Akzent kann die Führung stehlen;</li><li>zwei starke Anteile — Risiko für eine schwere, kurze Session.</li></ul><p>Wenn du die <a href="/de/blog/shisha-mix-basis-waehlen">Mix-Basis</a> wählst, prüfe Stärke und Aroma-Rolle zusammen.</p>`,
        },
      },
      {
        id: 'choose',
        toc: { ru: 'Как подбирать', en: 'How to choose', de: 'So wählst du' },
        h2: {
          ru: 'Как подобрать крепость под задачу',
          en: 'How to match strength to the goal',
          de: 'Stärke zum Ziel passend wählen',
        },
        html: {
          ru: `<ul><li><strong>Дневная / длинная сессия:</strong> лёгкий–средний;</li><li><strong>Вечер с друзьями, 1–2 чаши:</strong> средний;</li><li><strong>Короткий «ударный» микс:</strong> средний–крепкий, но с контролем доли;</li><li><strong>Новичок в миксах:</strong> держите все компоненты в одной зоне крепости.</li></ul><aside class="article-callout"><strong>Не мешайте крайности без нужды</strong><p>Очень лёгкая основа и очень крепкий акцент почти всегда звучат неровно. Сначала выровняйте крепость, потом тонкую ароматику.</p></aside>`,
          en: `<ul><li><strong>Daytime / long session:</strong> light–medium;</li><li><strong>Evening with friends, 1–2 bowls:</strong> medium;</li><li><strong>Short “punchy” mix:</strong> medium–strong, with careful shares;</li><li><strong>New to mixing:</strong> keep all components in the same strength band.</li></ul><aside class="article-callout"><strong>Avoid extremes without a reason</strong><p>A very light base and a very strong accent almost always feel uneven. Align strength first, then fine aroma.</p></aside>`,
          de: `<ul><li><strong>Tagsüber / lange Session:</strong> leicht–mittel;</li><li><strong>Abend mit Freunden, 1–2 Bowls:</strong> mittel;</li><li><strong>Kurzer „punchy“ Mix:</strong> mittel–stark, mit kontrollierten Anteilen;</li><li><strong>Mix-Einsteiger:</strong> halte alle Komponenten in derselben Stärkestufe.</li></ul><aside class="article-callout"><strong>Extreme nur bewusst</strong><p>Sehr leichte Basis und sehr starker Akzent wirken fast immer unruhig. Gleiche zuerst die Stärke an, dann die feine Aromatik.</p></aside>`,
        },
      },
      {
        id: 'heat-pack',
        toc: { ru: 'Жар и набивка', en: 'Heat and pack', de: 'Hitze und Packung' },
        h2: {
          ru: 'Жар и набивка меняют ощущаемую крепость',
          en: 'Heat and pack change perceived strength',
          de: 'Hitze und Packung ändern die gefühlte Stärke',
        },
        html: {
          ru: `<p>Даже средний табак станет «тяжёлым», если перегреть чашу или набить слишком плотно. И наоборот: крепкий лист на аккуратной набивке и контролируемом жаре может быть терпимее.</p><p>Если микс внезапно стал резким — проверьте не только рецепт, но и тепло. Метод и ошибки разбора — в <a href="/ru/blog/kak-pravilno-smeshivat-tabak-dlya-kalyana">гайде по смешиванию</a>.</p>`,
          en: `<p>Even medium tobacco feels “heavy” if you overheat the bowl or pack too tight. Conversely, a stronger leaf with a careful pack and controlled heat can stay manageable.</p><p>If a mix suddenly turns harsh, check heat as well as the recipe. Method and mistakes are covered in the <a href="/en/blog/how-to-mix-hookah-tobacco">mixing guide</a>.</p>`,
          de: `<p>Selbst mittlerer Tabak wirkt „schwer“, wenn du die Bowl überhitzt oder zu dicht packst. Umgekehrt kann stärkeres Blatt mit sauberer Packung und kontrollierter Hitze angenehmer bleiben.</p><p>Wird ein Mix plötzlich scharf, prüfe Hitze und Rezept. Methode und Fehler stehen im <a href="/de/blog/wie-man-shisha-tabak-richtig-mischt">Misch-Guide</a>.</p>`,
        },
      },
      {
        id: 'checklist',
        toc: { ru: 'Чеклист', en: 'Checklist', de: 'Checkliste' },
        h2: {
          ru: 'Быстрый чеклист перед сборкой микса',
          en: 'Quick checklist before you build a mix',
          de: 'Kurze Checkliste vor dem Mix',
        },
        html: {
          ru: `<ul><li>Основа и акцент в одной зоне крепости или акцент мягче основы;</li><li>нет двух «ударных» компонентов по 40%+;</li><li>жар стабильный, без перегрева в первые минуты;</li><li>после 10 минут основа всё ещё читается, дыхание комфортное;</li><li>следующий эксперимент меняет только один параметр.</li></ul><p>Если чеклист «зелёный», можно смело играть с профилями и готовыми схемами из <a href="/ru/blog/miksy-dlya-kalyana-dlya-nachinayushchih">рецептов для начинающих</a>.</p>`,
          en: `<ul><li>Base and accent in the same strength band, or the accent softer than the base;</li><li>no two “punchy” components both above ~40%;</li><li>stable heat, without early overheating;</li><li>after 10 minutes the base still reads and breathing feels fine;</li><li>the next experiment changes only one variable.</li></ul><p>If the checklist is green, explore profiles and the share schemes in the <a href="/en/blog/beginner-hookah-mix-recipes">beginner recipes</a>.</p>`,
          de: `<ul><li>Basis und Akzent in derselben Stärkestufe oder Akzent weicher als die Basis;</li><li>keine zwei „punchy“ Komponenten über ~40%;</li><li>stabile Hitze, ohne frühes Überhitzen;</li><li>nach 10 Minuten ist die Basis noch lesbar und das Atmen angenehm;</li><li>das nächste Experiment ändert nur eine Variable.</li></ul><p>Ist die Checkliste grün, kannst du Profile und die Anteile aus den <a href="/de/blog/shisha-mischungen-fuer-einsteiger">Einsteiger-Rezepten</a> freier nutzen.</p>`,
        },
      },
      {
        id: 'summary',
        toc: { ru: 'Итог', en: 'Takeaway', de: 'Fazit' },
        h2: { ru: 'Короткий итог', en: 'Key takeaway', de: 'Kurzes Fazit' },
        html: {
          ru: `<p>Подбирайте крепость как комфорт сессии, а не как соревнование. Для большинства миксов достаточно средней зоны: основа в medium, акцент не крепче основы. Дальше уточняйте вкус через <a href="/ru/blog/vkusovye-profili-kalyana">профили</a> и готовые <a href="/ru/blog/miksy-dlya-kalyana-dlya-nachinayushchih">рецепты</a>.</p>`,
          en: `<p>Treat strength as session comfort, not a contest. For most mixes, the medium zone is enough: medium base, accent no stronger than the base. Then refine taste with <a href="/en/blog/hookah-flavor-profiles">profiles</a> and <a href="/en/blog/beginner-hookah-mix-recipes">starter recipes</a>.</p>`,
          de: `<p>Behandle Stärke als Session-Komfort, nicht als Wettkampf. Für die meisten Mixe reicht die mittlere Zone: mittlere Basis, Akzent nicht stärker als die Basis. Danach Feintuning über <a href="/de/blog/shisha-geschmacksprofile">Profile</a> und <a href="/de/blog/shisha-mischungen-fuer-einsteiger">Starter-Rezepte</a>.</p>`,
        },
      },
    ],
    faq: [
      {
        q: {
          ru: 'Что делать, если микс слишком крепкий?',
          en: 'What if the mix feels too strong?',
          de: 'Was tun, wenn der Mix zu stark ist?',
        },
        a: {
          ru: 'Уменьшите долю более крепкого компонента, снизьте жар и в следующий раз возьмите более лёгкую основу. Не компенсируйте крепость ещё более ярким ароматом.',
          en: 'Lower the stronger component share, reduce heat, and next time pick a lighter base. Do not mask strength with an even louder aroma.',
          de: 'Reduziere den stärkeren Anteil, senke die Hitze und nimm nächstes Mal eine leichtere Basis. Kaschiere Stärke nicht mit noch lauteren Aromen.',
        },
      },
      {
        q: {
          ru: 'Можно ли мешать light и strong в одной чаше?',
          en: 'Can I mix light and strong in one bowl?',
          de: 'Kann ich light und strong in einer Bowl mischen?',
        },
        a: {
          ru: 'Можно, если сильный компонент — маленький акцент (5–15%). Если обе доли крупные, сессия часто получается неровной.',
          en: 'Yes, if the strong component is a small accent (5–15%). If both shares are large, the session often feels uneven.',
          de: 'Ja, wenn die starke Komponente ein kleiner Akzent ist (5–15%). Sind beide Anteile groß, wirkt die Session oft unruhig.',
        },
      },
      {
        q: {
          ru: 'Крепость важнее вкуса?',
          en: 'Is strength more important than flavor?',
          de: 'Ist Stärke wichtiger als Geschmack?',
        },
        a: {
          ru: 'Нет. Крепость — рамка комфорта, вкус — содержание. Сначала комфортная зона, потом профиль и сочетания.',
          en: 'No. Strength is the comfort frame; flavor is the content. Choose a comfortable band first, then profile and pairings.',
          de: 'Nein. Stärke ist der Komfort-Rahmen, Geschmack der Inhalt. Zuerst die passende Zone, dann Profil und Kombinationen.',
        },
      },
    ],
  },
  {
    id: 'profiles',
    paths: {
      ru: '/ru/blog/vkusovye-profili-kalyana',
      en: '/en/blog/hookah-flavor-profiles',
      de: '/de/blog/shisha-geschmacksprofile',
    },
    title: {
      ru: 'Вкусовые профили кальяна: как в них ориентироваться',
      en: 'Hookah Flavor Profiles: How to Navigate Them',
      de: 'Shisha-Geschmacksprofile: so findest du dich zurecht',
    },
    lead: {
      ru: 'Фрукты, ягоды, свежесть, десерт и другие профили: карта вкусов, чтобы быстрее выбирать основу и миксы.',
      en: 'Fruit, berry, fresh, dessert, and more: a flavor map to choose bases and mixes faster.',
      de: 'Frucht, Beere, Frische, Dessert und mehr: eine Geschmackskarte für schnellere Basis- und Mixwahl.',
    },
    excerpt: {
      ru: 'Карта вкусовых профилей кальяна: что к чему относится и как этим пользоваться.',
      en: 'A map of hookah flavor profiles: what belongs where and how to use it.',
      de: 'Karte der Shisha-Geschmacksprofile: was wohin gehört und wie du sie nutzt.',
    },
    images: [
      {
        src: '/assets/blog/profiles-hero.webp',
        hero: true,
        alt: {
          ru: 'Четыре чаши с табаком разных вкусовых профилей',
          en: 'Four bowls with tobacco from different flavor profiles',
          de: 'Vier Bowls mit Tabak verschiedener Geschmacksprofile',
        },
        caption: {
          ru: 'Фрукт, ягода, свежесть и десерт — четыре опоры большинства миксов.',
          en: 'Fruit, berry, fresh, and dessert — four pillars of most mixes.',
          de: 'Frucht, Beere, Frische und Dessert — vier Säulen der meisten Mixe.',
        },
      },
      {
        src: '/assets/blog/profiles-families.webp',
        alt: {
          ru: 'Три семейства вкусов: тропики, ягоды и десерт',
          en: 'Three flavor families: tropical, berry, and dessert',
          de: 'Drei Aromafamilien: tropisch, beerenig und dessertig',
        },
        caption: {
          ru: 'Внутри одного семейства проще собирать понятные сочетания.',
          en: 'Within one family, clear combinations are easier to build.',
          de: 'Innerhalb einer Familie sind klare Kombinationen einfacher.',
        },
      },
      {
        src: '/assets/blog/profiles-map.webp',
        alt: {
          ru: 'Чаша, разделённая на сегменты разных вкусовых профилей',
          en: 'Bowl divided into segments of different flavor profiles',
          de: 'Bowl in Segmente verschiedener Geschmacksprofile geteilt',
        },
        caption: {
          ru: 'Профиль — это «район» вкуса, а не конкретный бренд.',
          en: 'A profile is a flavor “district”, not a specific brand.',
          de: 'Ein Profil ist ein Geschmacks-„Viertel“, keine Marke.',
        },
      },
    ],
    sections: [
      {
        id: 'what-profile',
        toc: { ru: 'Что такое профиль', en: 'What a profile is', de: 'Was ein Profil ist' },
        h2: {
          ru: 'Профиль — это не бренд и не один вкус',
          en: 'A profile is not a brand or a single flavor',
          de: 'Ein Profil ist keine Marke und kein Einzelaroma',
        },
        html: {
          ru: `<p>Вкусовой профиль — группа похожих ощущений: сладость, кислинка, свежесть, «тепло», плотность. Один и тот же манго у разных брендов может отличаться, но оба остаются в <strong>фруктовом</strong> профиле.</p><p>Профили помогают выбирать основу, фильтровать каталог в Mixly и понимать, почему одни сочетания «сразу работают», а другие требуют точной доли. Это уровень выше, чем просто список пар — пары разобраны в статье <a href="/ru/blog/sochetaniya-vkusov-dlya-kalyana">сочетания вкусов</a>.</p>`,
          en: `<p>A flavor profile is a group of similar sensations: sweetness, tartness, freshness, warmth, density. The same mango can differ across brands, but both still sit in the <strong>fruit</strong> profile.</p><p>Profiles help you choose a base, filter the Mixly catalog, and understand why some pairings “just work” while others need exact shares. That is a higher level than a list of pairs — pairs are covered in <a href="/en/blog/hookah-flavor-combinations">flavor combinations</a>.</p>`,
          de: `<p>Ein Geschmacksprofil ist eine Gruppe ähnlicher Eindrücke: Süße, Säure, Frische, Wärme, Dichte. Dieselbe Mango kann je nach Marke anders wirken, bleibt aber im <strong>Frucht</strong>-Profil.</p><p>Profile helfen bei der Basiswahl, beim Filtern im Mixly-Katalog und erklären, warum manche Kombinationen „einfach passen“ und andere genaue Anteile brauchen. Das ist eine Ebene über reinen Paaren — Paare stehen unter <a href="/de/blog/shisha-geschmackskombinationen">Geschmackskombinationen</a>.</p>`,
        },
      },
      {
        id: 'map',
        toc: { ru: 'Карта профилей', en: 'Profile map', de: 'Profilkarte' },
        h2: {
          ru: 'Базовая карта профилей',
          en: 'A practical profile map',
          de: 'Eine praktische Profilkarte',
        },
        html: {
          ru: `<ul><li><strong>Фруктовые</strong> — манго, персик, яблоко, дыня, виноград, тропики;</li><li><strong>Ягодные</strong> — клубника, малина, черника, смородина;</li><li><strong>Цитрусовые</strong> — лимон, лайм, апельсин, грейпфрут (часто акцент);</li><li><strong>Свежие</strong> — мята, эвкалипт, «лёд», травяная прохлада;</li><li><strong>Десертные</strong> — ваниль, карамель, шоколад, выпечка, сливки;</li><li><strong>Напитки / спец</strong> — кола, чай, специи, орех (точечно).</li></ul><p>Новичку достаточно первых пяти. Спец-профили добавляйте, когда база уже стабильна.</p>`,
          en: `<ul><li><strong>Fruit</strong> — mango, peach, apple, melon, grape, tropicals;</li><li><strong>Berry</strong> — strawberry, raspberry, blueberry, currant;</li><li><strong>Citrus</strong> — lemon, lime, orange, grapefruit (often an accent);</li><li><strong>Fresh</strong> — mint, eucalyptus, ice, herbal cool;</li><li><strong>Dessert</strong> — vanilla, caramel, chocolate, pastry, cream;</li><li><strong>Drink / special</strong> — cola, tea, spice, nut (use sparingly).</li></ul><p>Beginners only need the first five. Add specials once your base is stable.</p>`,
          de: `<ul><li><strong>Frucht</strong> — Mango, Pfirsich, Apfel, Melone, Traube, Tropen;</li><li><strong>Beere</strong> — Erdbeere, Himbeere, Blaubeere, Johannisbeere;</li><li><strong>Zitrus</strong> — Zitrone, Limette, Orange, Grapefruit (oft Akzent);</li><li><strong>Frisch</strong> — Minze, Eukalyptus, Ice, kräuterige Kühle;</li><li><strong>Dessert</strong> — Vanille, Karamell, Schokolade, Gebäck, Sahne;</li><li><strong>Drink / Special</strong> — Cola, Tee, Würze, Nuss (dosiert).</li></ul><p>Einsteigern reichen die ersten fünf. Specials kommen, wenn die Basis sitzt.</p>`,
        },
      },
      {
        id: 'use',
        toc: { ru: 'Как пользоваться', en: 'How to use it', de: 'So nutzt du sie' },
        h2: {
          ru: 'Как пользоваться профилями на практике',
          en: 'How to use profiles in practice',
          de: 'Profile in der Praxis nutzen',
        },
        html: {
          ru: `<ol><li><strong>Выберите профиль-настроение</strong> — хочется сочно, ягодно, свежо или «десертно».</li><li><strong>Возьмите основу внутри профиля</strong> — см. <a href="/ru/blog/kak-vybrat-osnovu-dlya-miksa">как выбрать основу</a>.</li><li><strong>Поддержку ищите рядом</strong> — соседний профиль или тот же.</li><li><strong>Акцент — контраст дозировано</strong> — цитрус/мята к фрукту, кислинка к десерту.</li><li><strong>Проверьте крепость</strong> — профиль не заменяет комфорт тела; см. <a href="/ru/blog/krepost-tabaka-dlya-kalyana">крепость табака</a>.</li></ol>`,
          en: `<ol><li><strong>Pick a mood profile</strong> — juicy, berry, fresh, or dessert.</li><li><strong>Take the base inside that profile</strong> — see <a href="/en/blog/how-to-choose-hookah-mix-base">how to choose a base</a>.</li><li><strong>Look for support nearby</strong> — same or neighboring profile.</li><li><strong>Accent with measured contrast</strong> — citrus/mint on fruit, tartness on dessert.</li><li><strong>Check strength</strong> — profile does not replace body comfort; see <a href="/en/blog/hookah-tobacco-strength">tobacco strength</a>.</li></ol>`,
          de: `<ol><li><strong>Wähle ein Stimmungsprofil</strong> — saftig, beerenig, frisch oder dessertig.</li><li><strong>Nimm die Basis im Profil</strong> — siehe <a href="/de/blog/shisha-mix-basis-waehlen">Basis wählen</a>.</li><li><strong>Support in der Nähe suchen</strong> — gleiches oder Nachbarprofil.</li><li><strong>Akzent dosiert kontrastieren</strong> — Zitrus/Minze zu Frucht, Säure zu Dessert.</li><li><strong>Stärke prüfen</strong> — Profil ersetzt keinen Body-Komfort; siehe <a href="/de/blog/shisha-tabak-staerke">Tabakstärke</a>.</li></ol>`,
        },
      },
      {
        id: 'inside-family',
        toc: { ru: 'Внутри семьи', en: 'Inside a family', de: 'Innerhalb der Familie' },
        h2: {
          ru: 'Сочетания внутри профиля и между профилями',
          en: 'Pairings inside a profile and across profiles',
          de: 'Kombinationen im Profil und über Profile hinweg',
        },
        html: {
          ru: `<p><strong>Внутри профиля</strong> миксы обычно «безопаснее»: манго + маракуйя, клубника + малина, ваниль + карамель. <strong>Между профилями</strong> появляется характер: фрукт + мята, ягода + цитрус, десерт + апельсин.</p><p>Если нужен готовый старт без теории — откройте <a href="/ru/blog/miksy-dlya-kalyana-dlya-nachinayushchih">12 рецептов для начинающих</a>: там доли уже разложены по настроению.</p>`,
          en: `<p><strong>Inside a profile</strong> mixes are usually safer: mango + passion fruit, strawberry + raspberry, vanilla + caramel. <strong>Across profiles</strong> you get character: fruit + mint, berry + citrus, dessert + orange.</p><p>If you want a ready start without theory, open the <a href="/en/blog/beginner-hookah-mix-recipes">12 beginner recipes</a> — shares are already set by mood.</p>`,
          de: `<p><strong>Im Profil</strong> sind Mixe meist sicherer: Mango + Maracuja, Erdbeere + Himbeere, Vanille + Karamell. <strong>Über Profile hinweg</strong> kommt Charakter: Frucht + Minze, Beere + Zitrus, Dessert + Orange.</p><p>Willst du einen fertigen Start ohne Theorie, öffne die <a href="/de/blog/shisha-mischungen-fuer-einsteiger">12 Einsteiger-Rezepte</a> — Anteile sind nach Stimmung gesetzt.</p>`,
        },
      },
      {
        id: 'mixly',
        toc: { ru: 'В Mixly', en: 'In Mixly', de: 'In Mixly' },
        h2: {
          ru: 'Как это связано с Mixly',
          en: 'How this connects to Mixly',
          de: 'Wie das mit Mixly zusammenhängt',
        },
        html: {
          ru: `<p>В приложении фильтры по вкусам, брендам и крепости работают как та же карта: вы задаёте профиль и силу, а Discovery и Lab помогают не начинать каждый раз с нуля. Сохраняйте удачные миксы — так личная «карта профилей» растёт быстрее любой статьи.</p>`,
          en: `<p>In the app, filters by flavor, brand, and strength work like the same map: you set profile and strength, and Discovery plus Lab help you avoid starting from zero each time. Save good mixes — your personal profile map grows faster than any article.</p>`,
          de: `<p>In der App wirken Filter nach Geschmack, Marke und Stärke wie dieselbe Karte: du setzt Profil und Stärke, Discovery und Lab helfen, nicht jedes Mal bei null zu starten. Speichere gute Mixe — deine persönliche Profilkarte wächst schneller als jeder Artikel.</p>`,
        },
      },
      {
        id: 'examples',
        toc: { ru: 'Примеры', en: 'Examples', de: 'Beispiele' },
        h2: {
          ru: 'Примеры «профиль → микс»',
          en: 'Examples: profile → mix direction',
          de: 'Beispiele: Profil → Mix-Richtung',
        },
        html: {
          ru: `<ul><li><strong>Фрукт:</strong> манго как основа → лайм или мята акцентом;</li><li><strong>Ягода:</strong> клубника как основа → мята или лёгкий цитрус;</li><li><strong>Десерт:</strong> ваниль/шоколад → апельсин или ягода для контраста;</li><li><strong>Свежесть:</strong> почти всегда акцент, редко соло-основа на всю чашу.</li></ul><p>Это не жёсткие рецепты, а направления. Конкретные доли удобно смотреть в <a href="/ru/blog/miksy-dlya-kalyana-dlya-nachinayushchih">готовых миксах для начинающих</a>.</p>`,
          en: `<ul><li><strong>Fruit:</strong> mango as base → lime or mint as accent;</li><li><strong>Berry:</strong> strawberry as base → mint or light citrus;</li><li><strong>Dessert:</strong> vanilla/chocolate → orange or berry for contrast;</li><li><strong>Fresh:</strong> almost always an accent, rarely a full-bowl solo base.</li></ul><p>These are directions, not rigid recipes. For exact shares, use the <a href="/en/blog/beginner-hookah-mix-recipes">beginner mix recipes</a>.</p>`,
          de: `<ul><li><strong>Frucht:</strong> Mango als Basis → Limette oder Minze als Akzent;</li><li><strong>Beere:</strong> Erdbeere als Basis → Minze oder leichtes Zitrus;</li><li><strong>Dessert:</strong> Vanille/Schokolade → Orange oder Beere als Kontrast;</li><li><strong>Frisch:</strong> fast immer Akzent, selten Solo-Basis für die ganze Bowl.</li></ul><p>Das sind Richtungen, keine starren Rezepte. Genaue Anteile stehen in den <a href="/de/blog/shisha-mischungen-fuer-einsteiger">Einsteiger-Mischungen</a>.</p>`,
        },
      },
      {
        id: 'summary',
        toc: { ru: 'Итог', en: 'Takeaway', de: 'Fazit' },
        h2: { ru: 'Короткий итог', en: 'Key takeaway', de: 'Kurzes Fazit' },
        html: {
          ru: `<p>Думайте профилями: сначала район вкуса, потом конкретная банка, потом доля. Так проще выбирать основу, не путать крепость с «яркостью» и собирать миксы, к которым хочется возвращаться.</p>`,
          en: `<p>Think in profiles: flavor district first, then the specific tin, then the share. That makes base choice easier, keeps strength separate from “loudness”, and builds mixes worth repeating.</p>`,
          de: `<p>Denke in Profilen: zuerst das Geschmacksviertel, dann die Dose, dann der Anteil. So wählst du die Basis leichter, trennst Stärke von „Lautstärke“ und baust Mixe, zu denen man zurückkehrt.</p>`,
        },
      },
    ],
    faq: [
      {
        q: {
          ru: 'Сколько профилей смешивать в одной чаше?',
          en: 'How many profiles in one bowl?',
          de: 'Wie viele Profile in einer Bowl?',
        },
        a: {
          ru: 'Для старта — один ведущий профиль и максимум один контрастный акцент. Три и больше профилей сразу чаще дают шум.',
          en: 'Start with one leading profile and at most one contrasting accent. Three or more profiles at once often create noise.',
          de: 'Starte mit einem führenden Profil und höchstens einem kontrastreichen Akzent. Drei oder mehr Profile auf einmal erzeugen oft Lärm.',
        },
      },
      {
        q: {
          ru: 'Цитрус — это основа или акцент?',
          en: 'Is citrus a base or an accent?',
          de: 'Ist Zitrus Basis oder Akzent?',
        },
        a: {
          ru: 'Чаще акцент или поддержка. Как основа цитрус бывает резким и быстро утомляет, если не смягчён фруктом или десертом.',
          en: 'More often an accent or support. As a base, citrus can feel sharp and tiring unless softened by fruit or dessert.',
          de: 'Meist Akzent oder Support. Als Basis kann Zitrus scharf und ermüdend wirken, wenn Frucht oder Dessert nicht abfedern.',
        },
      },
      {
        q: {
          ru: 'Чем профиль отличается от сочетания?',
          en: 'How is a profile different from a combination?',
          de: 'Worin unterscheidet sich ein Profil von einer Kombination?',
        },
        a: {
          ru: 'Профиль — класс вкуса. Сочетание — конкретная пара или тройка внутри классов. Сначала карта, потом пары.',
          en: 'A profile is a flavor class. A combination is a specific pair or trio inside those classes. Map first, pairs second.',
          de: 'Ein Profil ist eine Geschmacksklasse. Eine Kombination ist ein konkretes Paar oder Trio darin. Zuerst die Karte, dann die Paare.',
        },
      },
    ],
  },
];

function countWords(html) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(/\s+/).length : 0;
}

function header(lang, ui) {
  const L = (href, text) => `<a href="${href}">${esc(text)}</a>`;
  return (
    `<header class="site-header" data-shell-static="true"><a class="brand brand-app" href="/">mixly</a>` +
    `<nav aria-label="${esc(ui.menuAria)}">${L('/#how-it-works', ui.home)}${L('/#features', ui.features)}${L('/#changelog', ui.updates)}${L('/blog.html', ui.blog)}</nav>` +
    `<div class="header-actions"><a class="header-cta" href="https://apps.apple.com/app/id6762792005" rel="noopener"><span class="cta-full">${esc(ui.download)}</span><span class="cta-short">App Store</span></a>` +
    `<div class="lang-switch" data-lang-switch><button type="button" class="lang-switch-toggle" aria-expanded="false" aria-label="Language">${lang.toUpperCase()}</button>` +
    `<ul class="lang-switch-menu" hidden role="radiogroup" aria-label="Language">` +
    `<li><button type="button" data-lang="ru" role="radio" aria-checked="${lang === 'ru'}">RU</button></li>` +
    `<li><button type="button" data-lang="en" role="radio" aria-checked="${lang === 'en'}">EN</button></li>` +
    `<li><button type="button" data-lang="de" role="radio" aria-checked="${lang === 'de'}">DE</button></li>` +
    `</ul></div>` +
    `<button class="mobile-menu-toggle" type="button" aria-label="${esc(ui.menu)}" aria-controls="mobile-menu" aria-expanded="false"><span></span><span></span><span></span></button></div></header>` +
    `<aside class="mobile-menu" id="mobile-menu" aria-label="${esc(ui.menuAria)}" aria-hidden="true">` +
    `<nav aria-label="${esc(ui.menuAria)}">${L('/#how-it-works', ui.home)}${L('/#features', ui.features)}${L('/#changelog', ui.updates)}${L('/blog.html', ui.blog)}</nav>` +
    `<div class="mobile-menu-lang"><div class="lang-switch lang-switch-mobile" data-lang-switch>` +
    `<div class="lang-switch-segment" role="radiogroup" aria-label="Language">` +
    `<button type="button" data-lang="ru" role="radio" aria-checked="${lang === 'ru'}">RU</button>` +
    `<button type="button" data-lang="en" role="radio" aria-checked="${lang === 'en'}">EN</button>` +
    `<button type="button" data-lang="de" role="radio" aria-checked="${lang === 'de'}">DE</button>` +
    `</div></div></div>` +
    `<div class="mobile-menu-socials"><p>${esc(ui.socials)}</p><div class="mobile-menu-social-links">` +
    `<a href="https://www.instagram.com/get_mixly/" rel="noopener">Instagram</a>` +
    `<a href="https://www.threads.com/@get_mixly" rel="noopener">Threads</a></div></div></aside>`
  );
}

function footer(ui) {
  const L = (href, text) => `<a href="${href}">${esc(text)}</a>`;
  return (
    `<footer class="site-footer"><div class="footer-main"><div class="footer-brand-block"><a class="brand-app footer-brand" href="/">mixly</a><p>Mixly app © 2026</p></div>` +
    `<div class="footer-links"><div><p>${esc(ui.app)}</p>${L('/#how-it-works', ui.home)}${L('/#features', ui.features)}${L('/#changelog', ui.updates)}${L('/blog.html', ui.blog)}` +
    `<a href="https://apps.apple.com/app/id6762792005" rel="noopener">App Store</a></div>` +
    `<div><p>${esc(ui.docs)}</p>${L('/privacy.html', ui.privacy)}${L('/cookies.html', ui.cookies)}${L('/terms.html', ui.terms)}${L('/eula.html', ui.eula)}${L('/support.html', ui.support)}</div>` +
    `<div><p>${esc(ui.socials)}</p><a href="https://www.instagram.com/get_mixly/" rel="noopener">Instagram</a><a href="https://www.threads.com/@get_mixly" rel="noopener">Threads</a></div><div><p>${esc(ui.contacts)}</p><a href="mailto:support@get-mixly.app">support@get-mixly.app</a><a href="https://t.me/getmixly" rel="noopener">Telegram</a></div></div></div>` +
    `<div class="footer-bottom"><p>${esc(ui.age)}</p><p>${esc(ui.tagline)}</p></div></footer>`
  );
}

function figure(img, lang, lazy) {
  const loading = lazy ? ' loading="lazy"' : '';
  return (
    `<figure class="article-image${img.hero ? ' article-image-hero' : ''}">` +
    `<img width="960" height="540" src="${img.src}" alt="${esc(img.alt[lang])}"${loading}>` +
    `<figcaption>${esc(img.caption[lang])}</figcaption></figure>`
  );
}

function buildBody(article, lang) {
  const body = [];
  const imgs = article.images.filter((i) => !i.hero);
  // Place body images after sections at indexes 1 and 3 (or last available).
  const insertAfter = [1, 3];
  let imgIdx = 0;
  article.sections.forEach((section, index) => {
    body.push(
      `<section id="${section.id}"><h2>${esc(section.h2[lang])}</h2>${section.html[lang]}</section>`
    );
    if (imgIdx < imgs.length && insertAfter.includes(index)) {
      body.push(figure(imgs[imgIdx], lang, true));
      imgIdx += 1;
    }
  });
  while (imgIdx < imgs.length) {
    body.push(figure(imgs[imgIdx], lang, true));
    imgIdx += 1;
  }
  const faqTitle =
    lang === 'ru' ? 'Частые вопросы' : lang === 'de' ? 'Häufige Fragen' : 'Frequently Asked Questions';
  const faqItems = article.faq
    .map(
      (item) =>
        `<div class="article-faq-item"><h3>${esc(item.q[lang])}</h3><p>${esc(item.a[lang])}</p></div>`
    )
    .join('');
  body.push(`<section id="faq"><h2>${faqTitle}</h2>${faqItems}</section>`);
  return body.join('');
}

function relatedHtml(article, lang, ui) {
  const others = ARTICLES.filter((a) => a.id !== article.id);
  const cards = others
    .map((a) => {
      return (
        `<article><a href="${a.paths[lang]}"><p>${esc(ui.category)}</p>` +
        `<h3>${esc(a.title[lang])}</h3><span>${esc(a.excerpt[lang])}</span><b>→</b></a></article>`
      );
    })
    .join('');
  return (
    `<section class="article-related" aria-labelledby="article-related-title">` +
    `<h2 id="article-related-title">${esc(ui.related)}</h2>` +
    `<div class="article-related-grid" aria-label="${esc(ui.relatedAria)}">${cards}</div></section>`
  );
}

function tocHtml(article, lang, ui) {
  const links = article.sections
    .map((s) => `<a href="#${s.id}">${esc(s.toc[lang])}</a>`)
    .join('');
  const faqLabel = lang === 'ru' ? 'FAQ' : lang === 'de' ? 'FAQ' : 'FAQ';
  return (
    `<aside class="article-toc" aria-label="${esc(ui.toc)}">` +
    `<details class="article-toc-dropdown" open>` +
    `<summary class="article-toc-summary"><span class="article-toc-label">${esc(ui.tocLabel)}</span>` +
    `<span class="article-toc-current" aria-live="polite"></span></summary>` +
    `<nav class="article-toc-nav">${links}<a href="#faq">${faqLabel}</a></nav></details></aside>`
  );
}

function renderArticle(article, lang) {
  const ui = UI[lang];
  const path = article.paths[lang];
  const hero = article.images.find((i) => i.hero) || article.images[0];
  const bodyHtml = buildBody(article, lang);
  const fullForCount = bodyHtml;
  const words = countWords(fullForCount);
  const wpm = lang === 'en' ? 210 : 190;
  const minutes = Math.max(1, Math.round(words / wpm));
  const meta = `${ui.catMeta} · ${minutes} ${lang === 'en' ? 'MIN' : lang === 'de' ? 'MIN' : 'МИН'}`;

  const titleTag = `${article.title[lang]} — Mixly`;
  const description = article.excerpt[lang];

  return (
    `<!doctype html><html lang="${lang}"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `<meta name="description" content="${esc(description)}">` +
    `<meta name="theme-color" content="#29282B">` +
    `<title>${esc(titleTag)}</title>` +
    `<link rel="canonical" href="https://get-mixly.app${path}">` +
    `<link rel="icon" href="/favicon.svg" type="image/svg+xml">` +
    `<link rel="stylesheet" href="/styles.css">` +
    `<link rel="expect" href="#content">` +
    `<link rel="preload" href="/assets/Montserrat_400Regular.woff2" as="font" type="font/woff2" crossorigin>` +
    `<link rel="preload" href="/assets/Montserrat_600SemiBold.woff2" as="font" type="font/woff2" crossorigin>` +
    `<script src="/article-toc.js" defer></script>` +
    `<script src="/page-nav.js" defer></script>` +
    `<script src="/toc-pin.js" defer></script>` +
    `<script src="/static-article-shell.js" defer></script>` +
    `<script src="/monitoring.js" defer></script>` +
    `<script src="/analytics.js" defer></script>` +
    `</head><body><div class="grain" aria-hidden="true"></div>${header(lang, ui)}` +
    `<main class="article-page" id="content">` +
    `<nav class="breadcrumbs" aria-label="Breadcrumbs"><ol>` +
    `<li><a href="${lang === 'ru' ? '/' : `/${lang}/`}">${lang === 'ru' ? 'Главная' : lang === 'de' ? 'Start' : 'Home'}</a></li>` +
    `<li><a href="${lang === 'ru' ? '/blog.html' : `/${lang}/blog`}">${esc(ui.blog)}</a></li>` +
    `<li aria-current="page">${esc(article.title[lang])}</li></ol></nav>` +
    `<div class="article-layout"><article>` +
    `<header class="article-page-header">` +
    `<p class="article-meta" data-reading-minutes="${minutes}" data-reading-words="${words}">${meta}</p>` +
    `<h1>${esc(article.title[lang])}</h1>` +
    `<p>${esc(article.lead[lang])}</p></header>` +
    figure(hero, lang, false) +
    `<div class="article-page-content">${bodyHtml}</div>` +
    relatedHtml(article, lang, ui) +
    `</article>${tocHtml(article, lang, ui)}</div>` +
    // premium placeholder — regenerate:article-meta will inject localized block
    `<div data-premium-block data-premium-static="true"></div>` +
    `</main>${footer(ui)}</body></html>`
  );
}

for (const article of ARTICLES) {
  for (const lang of ['ru', 'en', 'de']) {
    const path = article.paths[lang];
    const file = resolve(root, `${path.slice(1)}/index.html`);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, renderArticle(article, lang));
    console.log('wrote', path);
  }
}

console.log('Tastes cluster: 9 pages written.');
export { ARTICLES };
