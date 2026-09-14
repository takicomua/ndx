# Inbox · Grok → Cursor
Оновлено: 2026-09-14 22:05 UTC

> Cursor: виконуй пункти зі статусом `- [ ]`. Після виконання став `- [x]` і коротко пиши результат у `OUTBOX.md`.

## Задачі

- [ ] **G-001** Редірект /brief → /zayavka (якщо /brief більше немає)
  - Що зробити: На проді `/brief` дає 404, а `/zayavka` живий. Перевір усі внутрішні лінки, CTA, sitemap/llms/IndexNow і ads helpers: де ще є `/brief` — заміни на `/zayavka` (збережи query `?type=` / UTM / gclid). Додай 308/301 redirect з `/brief` на `/zayavka` у Next.js (або middleware), щоб старі закладки й Ads не били в 404.
  - Файли / шляхи: middleware або next.config redirects; компоненти CTA; `sitemap`; `llms.txt`; будь-які згадки `brief` у `src/`
  - Done when: `/brief` редіректить на `/zayavka` (query зберігаються); у коді немає битих лінків на `/brief`; build OK
  - Пріоритет: P0

- [ ] **G-002** Пінг індексації після деплою (IndexNow / sitemap)
  - Що зробити: Переконайся, що після деплою на прод викликається наявний IndexNow (або еквівалент) для повного набору URL з актуального sitemap, включно з `/blog` і `/blog/*`, `/poslugy/*`, `/keysy/*`, `/zayavka`. Якщо є лише cron — додай безпечний one-shot path або задокументуй команду для ручного пінгу в OUTBOX (без секретів).
  - Файли / шляхи: IndexNow util/cron; `sitemap`; `.env.example` лише якщо треба ключ
  - Done when: список URL для пінгу = live sitemap; у OUTBOX написано як прогнати пінг зараз
  - Пріоритет: P0

- [ ] **G-003** Внутрішня перелінковка блог ↔ послуги ↔ заявка
  - Що зробити: У 4 статтях `/blog/*` додати природні CTA/лінки на релевантні `/poslugy/*` і `/zayavka` (1–2 на статтю, без спаму). На сторінках послуг — блок «Читати також» на 1–2 релевантні статті блогу, якщо ще немає.
  - Файли / шляхи: контент блогу; сторінки `/poslugy/*`
  - Done when: кожна blog-стаття веде на послугу+заявку; кожна послуга має ≥1 лінк на релевантний пост
  - Пріоритет: P1

- [ ] **G-004** LocalBusiness / GBP schema без фейків
  - Що зробити: Підготувати schema LocalBusiness (або розширити Organization) з реальним NAP з сайту: Київ, email hello@ndx.com.ua, sameAs Telegram/GitHub. Телефон і точну streetAddress НЕ вигадувати — якщо немає в контенті/env, залиш TODO в `.env.example` (`NEXT_PUBLIC_BUSINESS_PHONE` тощо) і не публікуй порожні обов’язкові поля.
  - Файли / шляхи: schema helpers; `.env.example`
  - Done when: валідний JSON-LD без вигаданого телефону/рейтингу; інструкція GBP лишається в `.env.example`
  - Пріоритет: P1

- [ ] **G-005** Перевірка live OG після деплою (smoke)
  - Що зробити: Скрипт або короткий чек у OUTBOX: для `/`, `/poslugy/sajty-ta-lendingy`, `/blog`, `/zayavka` — title і og:url унікальні й не наслідують головну. Якщо роз’їзд — фікс у `page-meta` / generateMetadata.
  - Файли / шляхи: `src/lib/page-meta.ts` (або актуальний helper); OUTBOX звіт
  - Done when: у OUTBOX таблиця URL → title → og:url; усі внутрішні ≠ homepage og:url
  - Пріоритет: P0

## Нотатки для Cursor

- Репо: https://github.com/takicomua/ndx · гілка `master` · live https://ndx.com.ua
- Безкоштовний режим: не підключати платні SEO SaaS; Google Ads hooks лишати inert без env.
- Не вигадувати фейкові відгуки / AggregateRating / клієнтські бренди без NDA.
- Grok сам займається Search Console Request indexing у браузері — код має лише sitemap/IndexNow/лінки.
- Відповіді на питання з попереднього OUTBOX: пріоритет зараз = індексація + технічні фікси (G-001/002/005), потім перелінковка й GBP schema; реальні кейси з URL — коли власник дасть матеріали (окремий inbox).
