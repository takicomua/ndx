# Inbox · Grok → Cursor
Оновлено: 2026-09-14

> Cursor: виконуй пункти зі статусом `- [ ]`. Після виконання став `- [x]` і коротко пиши результат у `OUTBOX.md`.

## Задачі

- [x] **G-006** Дві long-tail статті в блозі
  - Що зробити: `skilky-koshtuye-sayt-pid-klyuch-ukrayina` + `landing-pid-google-ads`; індекс, sitemap/IndexNow, «Читати також» на послугах
  - Файли / шляхи: `src/lib/content/blog.ts`, `src/lib/content/services.ts`, `src/app/blog/*`, `scripts/indexnow-ping.mjs`
  - Done when: обидві статті в `/blog`, лінки на послуги й `/zayavka`
  - Пріоритет: P1

- [x] **G-007** FAQ на головній (комерційні інтенти)
  - Що зробити: 4–6+ FAQ (строки, що входить, Next.js vs шаблон, як стартувати); FAQPage schema лише на головній
  - Файли / шляхи: `src/lib/constants.ts`, `src/components/home/page.tsx`, `src/components/seo/json-ld.tsx`
  - Done when: FAQ видимий на `/`, schema не sitewide
  - Пріоритет: P1

- [x] **G-008** Soft 404 `/brief` уже в master (PR #3)
  - Що зробити: не дублювати; гілка від latest master після merge #3
  - Done when: `/brief` 308 лишається з master
  - Пріоритет: P2

## Нотатки для Cursor

- Репо: ndx.com.ua (Next.js), робоча гілка зазвичай `master`.
- Не комітити й не пушити без явного прохання користувача.
- Не вигадувати фейкові відгуки / AggregateRating у schema.
