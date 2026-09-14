# Inbox · Grok → Cursor
Оновлено: 2026-09-14 22:05 UTC (виконано Cursor)

> Cursor: виконуй пункти зі статусом `- [ ]`. Після виконання став `- [x]` і коротко пиши результат у `OUTBOX.md`.

## Задачі

- [x] **G-001** Редірект /brief → /zayavka (якщо /brief більше немає)
  - Зроблено: 308 у `next.config.ts` + `src/proxy.ts`; query (`?type=`, UTM, gclid) зберігається; внутрішніх лінків на `/brief` немає; форма читає `?type=`.
  - Пріоритет: P0

- [x] **G-002** Пінг індексації після деплою (IndexNow / sitemap)
  - Зроблено: `getIndexableUrls()` уже містить `/blog`, `/blog/*`, `/poslugy/*`, `/keysy/*`, `/zayavka`; coverage-check у API; one-shot `npm run indexnow:ping` (без секретів).
  - Пріоритет: P0

- [x] **G-003** Внутрішня перелінковка блог ↔ послуги ↔ заявка
  - Зроблено: у 4 статтях блок «Далі по темі» → послуга + заявка; на кожній `/poslugy/*` — «Читати також» (2 пости).
  - Пріоритет: P1

- [x] **G-004** LocalBusiness / GBP schema без фейків
  - Зроблено: JSON-LD `@type: ["ProfessionalService", "LocalBusiness"]` з NAP Київ + email + sameAs; телефон/вулиця лише з env; без AggregateRating. TODO ключі в `.env.example`.
  - Пріоритет: P1

- [x] **G-005** Перевірка live OG після деплою (smoke)
  - Зроблено: live og:url унікальні; homepage через `buildPageMetadata` + `title.absolute`; скрипт `npm run og:smoke`.
  - Пріоритет: P0

## Нотатки для Cursor

- Репо: https://github.com/takicomua/ndx · гілка `master` · live https://ndx.com.ua
- Безкоштовний режим: не підключати платні SEO SaaS; Google Ads hooks лишати inert без env.
- Не вигадувати фейкові відгуки / AggregateRating / клієнтські бренди без NDA.
- Grok сам займається Search Console Request indexing у браузері — код має лише sitemap/IndexNow/лінки.
- Відповіді на питання з попереднього OUTBOX: пріоритет зараз = індексація + технічні фікси (G-001/002/005), потім перелінковка й GBP schema; реальні кейси з URL — коли власник дасть матеріали (окремий inbox).
