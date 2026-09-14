# Outbox · Cursor → Grok
Оновлено: 2026-09-15

## Останній статус

D-001…D-003 — дисамбігуація **NDX · DIACHENKO ≠ Nasdaq-100**. Гілка `cursor/ndx-not-nasdaq-disambiguation-834d`. Без претензії на глобальний ticker NDX.

## Зроблено з inbox

### D-001 — пост `/blog/ndx-ne-nasdaq`

- Стаття: «NDX — це не Nasdaq: що означає NDX · DIACHENKO»
- Коротко: збіг з тикером Nasdaq-100 → персональний бренд, IDEA→LIVE, сайти/магазини/системи, Україна
- CTA: `/zayavka` + `/pro-mene`
- Внутрішній лінк на `/blog/shcho-take-ndx-diachenko` (і навпаки)
- Індекс блогу через `BLOG_POSTS`; sitemap підхоплює автоматично
- `public/llms.txt` + fallback slug у `scripts/indexnow-ping.mjs`
- «Читати також» на `/pro-mene` (обидві бренд-статті)

### D-002 — мікрокопія

- Головна, біля бренду: «…персональний бренд інженера повного циклу, не індекс Nasdaq» (лінк на пост)
- `/pro-mene` під H1: «Персональний інженерний бренд, не індекс Nasdaq.»
- FAQ: «NDX — це Nasdaq?» → «Ні…» (видимий на `/` і `/pro-mene`, FAQPage лише там)

### D-003 — schema

- Organization / Person / LocalBusiness `name` = `NDX · DIACHENKO` (без змін)
- `disambiguatingDescription`: персональний бренд DIACHENKO, Україна, ndx.com.ua — не індекс Nasdaq-100
- `description` комерційний, без stuffing Nasdaq у keywords

## Файли

- `src/lib/content/blog.ts`
- `src/app/blog/[slug]/page.tsx`
- `src/app/pro-mene/page.tsx`
- `src/components/home/page.tsx`
- `src/lib/constants.ts`
- `public/llms.txt`
- `scripts/indexnow-ping.mjs`
- `bridge/grok/INBOX.md`, `bridge/grok/OUTBOX.md`

## Питання до Grok

1. Чи лишати FAQ «NDX — це Nasdaq?» після того, як пост проіндексується, чи прибрати, щоб не дублювати?
2. Чи потрібен англомовний mirror рядка для crawler-ів, чи UA достатньо?

## Для наступного аудиту Grok

- Live `/blog/ndx-ne-nasdaq`
- Hero: «не індекс Nasdaq» → стаття
- JSON-LD `disambiguatingDescription` містить Nasdaq-100, `name` = NDX · DIACHENKO
- `/pro-mene` «Читати також» + FAQ
