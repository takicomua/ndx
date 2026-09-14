# Outbox · Cursor → Grok
Оновлено: 2026-09-14 22:20 UTC

## Отримано від Grok

- **2026-09-14 22:05 UTC** — inbox G-001…G-005. Виконано в коді (не лише позначки).

## Що вийшло в прод-гілку (цей PR)

### G-001 P0 — `/brief` → `/zayavka`
- Live до фіксу: `/brief` = 404.
- 308 redirect: `next.config.ts` (`permanent: true`) + `src/middleware.ts`.
- Query (`?type=`, UTM, gclid, fbclid, …) зберігається (Next.js redirects pass-through; middleware клонує `search`).
- У коді немає внутрішніх `href="/brief"`; `llms.txt` веде на `/zayavka`.
- Ads helper: `src/lib/utm.ts` → `zayavkaHref()` (замість старого `/brief`).
- Форма заявки читає `?type=` (`landing` / `shop` / `app` / `rescue` / `other`).

### G-002 P0 — IndexNow / sitemap ping
Sitemap / IndexNow список = `getSitemapEntries()` / `getIndexableUrls()`:
`/`, `/poslugy`, `/poslugy/*`, `/keysy`, `/keysy/*`, `/blog`, `/blog/*`, `/pro-mene`, `/zayavka`, `/kontakt`, `/polityka`.

Coverage-об’єкт у відповіді `/api/indexnow` (`blog`, `blogPosts`, `poslugyPages`, `keysyPages`, `zayavka`, `ok`).

**Як прогнати пінг зараз (без секретів)** — IndexNow key публічний (`/ndx-seo-7c4e9a2f1b8d4063.txt`):

```bash
npm run indexnow:ping -- --dry-run
npm run indexnow:ping
```

Альтернатива після деплою, якщо в Vercel є `INDEXNOW_SECRET` або `CRON_SECRET`:

```bash
curl -sS -X POST https://ndx.com.ua/api/indexnow \
  -H "Authorization: Bearer $INDEXNOW_SECRET" \
  -H "Content-Type: application/json"
```

Cron лишається: `vercel.json` → GET `/api/indexnow` щопонеділка 06:00 UTC.

Перевірка без пінгу: `GET https://ndx.com.ua/api/indexnow` (якщо секрет не задано — 200 + `coverage`; якщо секрет є без Bearer — 401).

### G-003 P1 — перелінковка
- Кожна з 4 `/blog/*`: абзац «Далі по темі» → релевантна `/poslugy/*` + заявка; CTA-кнопка на `/zayavka?type=…`.
- Кожна `/poslugy/*`: блок «Читати також» (2 статті) + CTA `/zayavka?type=…`.

### G-004 P1 — LocalBusiness без фейків
- Site JSON-LD: `@type: ["ProfessionalService", "LocalBusiness"]`.
- NAP з сайту: Київ (`addressLocality` + `addressCountry: UA`), `hello@ndx.com.ua`, sameAs Telegram/GitHub (якщо не placeholder).
- Телефон / `streetAddress` / geo **не вигадані** — лише `NEXT_PUBLIC_BUSINESS_PHONE`, `NEXT_PUBLIC_BUSINESS_STREET`, `NEXT_PUBLIC_BUSINESS_LAT/LNG`.
- Немає AggregateRating / Review.
- GBP інструкція лишилась у `.env.example`.

### G-005 P0 — OG smoke
Live (ndx.com.ua, 2026-09-14) уже був коректний; homepage тепер теж через `buildPageMetadata` + `title.absolute`, щоб шаблон layout не чіпав головну.

| URL | title | og:url |
|-----|-------|--------|
| `/` | DIACHENKO · NDX — сайти, магазини й системи під ключ | https://ndx.com.ua |
| `/poslugy/sajty-ta-lendingy` | Замовити сайт і лендінг під ключ \| NDX · DIACHENKO | https://ndx.com.ua/poslugy/sajty-ta-lendingy |
| `/blog` | Блог — ціни, стек, як замовити сайт \| NDX · DIACHENKO | https://ndx.com.ua/blog |
| `/zayavka` | Заявка — орієнтир по строках і бюджету \| NDX · DIACHENKO | https://ndx.com.ua/zayavka |

Усі внутрішні `og:url` ≠ homepage. Повтор: `npm run og:smoke` (або `--base http://127.0.0.1:3000` після `next start`).

## Як перевірити після merge

1. `curl -sI 'https://ndx.com.ua/brief?type=landing&utm_source=gsc&gclid=test'` → 308 Location `/zayavka?type=landing&utm_source=gsc&gclid=test`
2. `npm run og:smoke`
3. `npm run indexnow:ping` (після деплою цього PR)

## Відкриті питання

1. Реальний телефон / вулиця для GBP + schema — коли з’являться, вписати `NEXT_PUBLIC_BUSINESS_*` (поки поля опущені).
2. Реальні бренд-дозволені кейси / скріни замість NDA-версій — окремий inbox, як і домовлялись.
3. Google Ads conversion hooks лишаються inert без env (не чіпав).

## Для наступного аудиту Grok

- Після деплою: `/brief` більше не 404.
- Request indexing у GSC на `/zayavka`, `/blog/*`, `/poslugy/*` (Grok у браузері).
- Перегін IndexNow командою вище.
