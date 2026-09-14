# Inbox · Grok → Cursor
Оновлено: 2026-09-15

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

- [x] **B-001** Consistent brand naming in metadata & visible chrome
  - Що зробити: primary brand `NDX · DIACHENKO` у layout titles/templates, Organization/Person/WebSite `name`/`alternateName`, footer, about
  - Файли / шляхи: `src/lib/constants.ts`, `src/app/layout.tsx`, `src/lib/page-meta.ts`, `src/components/seo/json-ld.tsx`, footer, `/pro-mene`
  - Done when: однакова brand line у chrome + schema
  - Пріоритет: P0

- [x] **B-002** Entity sameAs & disambiguation
  - Що зробити: `url` ndx.com.ua; `sameAs` Telegram/GitHub; LinkedIn/DOU лише з env; `disambiguatingDescription` UA; WebSite publisher → Organization
  - Файли / шляхи: `src/components/seo/json-ld.tsx`, `src/lib/seo-helpers.ts`, `.env.example`
  - Done when: schema без вигаданих профілів, з disambiguation vs Nasdaq
  - Пріоритет: P0

- [x] **B-003** Brand FAQ / about block
  - Що зробити: 3 Q — «Що таке NDX?», «Хто такий DIACHENKO / NDX?», «NDX — це агенція?»; FAQPage лише де FAQ видимий
  - Файли / шляхи: `src/lib/constants.ts`, home + `/pro-mene`
  - Done when: відповіді без фейкових claim, schema на `/` і `/pro-mene`
  - Пріоритет: P1

- [x] **B-004** Brand landing reinforcement
  - Що зробити: посилити `/pro-mene` H1/lead (бренд + домен + послуги); внутрішні лінки NDX з головної на `/pro-mene`
  - Файли / шляхи: `src/app/pro-mene/page.tsx`, `src/components/home/page.tsx`
  - Done when: перший екран about явний; NDX на home веде на about
  - Пріоритет: P1

- [x] **B-005** Optional brand blog post
  - Що зробити: `/blog/shcho-take-ndx-diachenko` + лінк з `/pro-mene`
  - Файли / шляхи: `src/lib/content/blog.ts`, `src/app/pro-mene/page.tsx`, `public/llms.txt`
  - Done when: пост у блозі, sitemap підхоплює через BLOG_POSTS
  - Пріоритет: P2

- [x] **D-001** Blog post: NDX — це не Nasdaq
  - Що зробити: `/blog/ndx-ne-nasdaq`; тон сайту; CTA `/pro-mene` + `/zayavka`; лінк на `/blog/shcho-take-ndx-diachenko`; індекс, sitemap/BLOG_POSTS, llms.txt, «Читати також» на `/pro-mene`
  - Файли / шляхи: `src/lib/content/blog.ts`, `src/app/blog/[slug]/page.tsx`, `src/app/pro-mene/page.tsx`, `public/llms.txt`
  - Done when: пост у додатку + внутрішні лінки
  - Пріоритет: P0

- [x] **D-002** On-site disambiguation microcopy
  - Що зробити: короткий рядок біля бренду на `/` і `/pro-mene`; FAQ «NDX — це Nasdaq?»
  - Файли / шляхи: `src/components/home/page.tsx`, `src/app/pro-mene/page.tsx`, `src/lib/constants.ts`
  - Done when: видимий рядок, не спам
  - Пріоритет: P0

- [x] **D-003** Schema tweak vs Nasdaq
  - Що зробити: посилити `disambiguatingDescription` природно; Organization `name` лишається `NDX · DIACHENKO`
  - Файли / шляхи: `src/lib/constants.ts`, `src/components/seo/json-ld.tsx`
  - Done when: без keyword stuffing, без фейкових claim
  - Пріоритет: P1

## Нотатки для Cursor

- Репо: ndx.com.ua (Next.js), робоча гілка зазвичай `master`.
- Не комітити й не пушити без явного прохання користувача.
- Не вигадувати фейкові відгуки / AggregateRating у schema.
