function env(key: string, fallback: string) {
  const v = process.env[key]?.trim();
  return v || fallback;
}

export const SITE = {
  brand: "DIACHENKO",
  mark: "NDX",
  signature: "ndx",
  domain: "ndx.com.ua",
  url: "https://ndx.com.ua",
  tagline: "від ідеї до запуску",
  title: "DIACHENKO · NDX — сайти, магазини й системи під ключ",
  description:
    "Роблю сайти, інтернет-магазини та веб-системи від ідеї до запуску. Україна, Київ / remote. ndx.com.ua",
  geo: "Київ · remote · Україна",
} as const;

export const CONTACTS = {
  telegram: env("NEXT_PUBLIC_CONTACT_TELEGRAM", "https://t.me/ndxcom"),
  github: env("NEXT_PUBLIC_CONTACT_GITHUB", "https://github.com/takicomua"),
  linkedin: env("NEXT_PUBLIC_CONTACT_LINKEDIN", "https://linkedin.com/in/"),
  email: env("NEXT_PUBLIC_CONTACT_EMAIL", "hello@ndx.com.ua"),
} as const;

export const NAV = [
  { href: "/poslugy", label: "Послуги" },
  { href: "/keysy", label: "Роботи" },
  { href: "/blog", label: "Блог" },
  { href: "/pro-mene", label: "Про мене" },
  { href: "/kontakt", label: "Контакти" },
] as const;

export type NavActive =
  | "home"
  | "poslugy"
  | "keysy"
  | "blog"
  | "pro-mene"
  | "zayavka"
  | "kontakt"
  | "polityka";

export const HERO = {
  role: "Сайти, магазини й системи під ключ",
  pitch:
    "Одна людина веде проєкт від брифу до запуску: структура, код, дані й деплой. На виході — робочий продукт, а не папка з макетами.",
} as const;

export const SERVICES = {
  eyebrow: "Послуги",
  title: "Що роблю",
  lead: "Чотири напрями. У кожному — від задачі до запущеного результату.",
  items: [
    {
      title: "Сайти та лендінги",
      text: "Корпоративний сайт або сторінка під рекламу: структура, верстка, форми, базова SEO, деплой.",
      tags: "сайт",
      href: "/poslugy/sajty-ta-lendingy",
    },
    {
      title: "Інтернет-магазини",
      text: "Каталог, кошик, оплата, доставка й адмінка — щоб можна було продавати онлайн.",
      tags: "магазин",
      href: "/poslugy/internet-magazyny",
    },
    {
      title: "Кабінети та системи",
      text: "Внутрішні кабінети, панелі й інтеграції під ваші процеси.",
      tags: "система",
      href: "/poslugy/veb-systemy-ta-kabinety",
    },
    {
      title: "Доробка й ремонт",
      text: "Повільний, зламаний або недороблений проєкт — розберу й доведу до стабільної роботи.",
      tags: "ремонт",
      href: "/poslugy/poryatunok-proektu",
    },
  ],
} as const;

export const AUDIENCE = {
  eyebrow: "Для кого",
  title: "Кому це підходить",
  items: [
    {
      title: "Потрібен результат, а не команда з п’яти ролей",
      text: "Одна відповідальність від старту до запуску.",
    },
    {
      title: "Є ідея або вже є хаос у проєкті",
      text: "Можу почати з нуля або зайти в існуючий код.",
    },
    {
      title: "Важливо, щоб це вже працювало",
      text: "Не прототип «на потім» — продукт для реальних користувачів.",
    },
  ],
} as const;

export const ABOUT = {
  eyebrow: "Про мене",
  title: "Хто я",
  lead:
    "Мене звати DIACHENKO. Працюю як NDX: роблю веб-продукти сам — від задачі до запуску.",
  body: [
    "Якщо вам потрібен сайт, магазин або внутрішня система — і ви не хочете збирати окремо дизайнера, фронтендера, бекендера й девопса — це мій формат.",
    "Працюю з бізнесом в Україні й на remote. Беру нові задачі й «завислі» проєкти.",
  ],
  how: [
    { t: "Узгоджуємо", d: "Що саме потрібно, строки й бюджет." },
    { t: "Роблю", d: "Проєктую, пишу код, підключаю дані й сервіси." },
    { t: "Запускаю", d: "Виводжу в прод, перевіряю й передаю вам." },
  ],
  stack:
    "Next.js, React, TypeScript, Node, бази даних, API, SEO-база, сучасний деплой.",
} as const;

export const FAQ = {
  eyebrow: "Питання",
  title: "Часті питання",
  items: [
    {
      q: "Що означає «під ключ»?",
      a: "Я відповідаю за результат від обговорення задачі до запущеного продукту: не лише верстка чи лише бекенд.",
    },
    {
      q: "Які задачі берете?",
      a: "Сайти, лендінги, інтернет-магазини, кабінети, доробку й ремонт існуючих проєктів.",
    },
    {
      q: "Скільки це коштує?",
      a: "Лендінг часто від $400–900, MVP-магазин від $1 500–3 500 — залежить від обсягу. На сторінках послуг є орієнтири; точніше після брифу.",
    },
    {
      q: "Скільки це триває?",
      a: "Лендінг — часто від кількох днів. Сайт або магазин — зазвичай 2–6 тижнів. Точніше скажу після короткого брифу.",
    },
    {
      q: "Як почати?",
      a: "Залиште заявку або напишіть у Telegram / на email. Відповім з орієнтиром по строках і кроках.",
    },
  ],
} as const;

/** Публічні відгуки для сторінки контактів / довіри (без фейкового AggregateRating у schema). */
export const TESTIMONIALS = [
  {
    quote:
      "Запустили лендінг під рекламу за тиждень. Форма й аналітика працюють — можна лити трафік без сюрпризів.",
    who: "Замовник B2B-послуги",
    context: "лендінг · 2025",
  },
  {
    quote:
      "Замість хаосу в таблицях отримали кабінет з ролями. Команда зайшла в роботу з першого дня після релізу.",
    who: "Операційний керівник",
    context: "внутрішній кабінет · NDA",
  },
] as const;

export const CONTACT = {
  title: "Є задача — напишіть",
  text: "Заявка або прямий контакт.",
  place: "Київ · remote · Україна · ndx.com.ua",
  ctaSecondary: "Telegram",
} as const;
