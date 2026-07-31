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
  tagline: "IDEA → LIVE",
  title:
    "Інженер повного циклу | NDX · DIACHENKO — сайти, магазини, системи · Україна",
  description:
    "NDX · DIACHENKO — інженер повного циклу (Україна, remote / Київ). Сайти, інтернет-магазини, кабінети й веб-системи від ідеї до продакшену. Один контур — без розривів між ролями. ndx.com.ua",
  geo: "Україна · Київ · remote",
} as const;

export const CONTACTS = {
  telegram: env("NEXT_PUBLIC_CONTACT_TELEGRAM", "https://t.me/"),
  github: env("NEXT_PUBLIC_CONTACT_GITHUB", "https://github.com/takicomua"),
  linkedin: env("NEXT_PUBLIC_CONTACT_LINKEDIN", "https://linkedin.com/in/"),
  email: env("NEXT_PUBLIC_CONTACT_EMAIL", "hello@ndx.com.ua"),
} as const;

export const NAV = [
  { href: "/poslugy", label: "Scope" },
  { href: "#brief", label: "Brief" },
  { href: "/keysy", label: "Keys" },
  { href: "#faq", label: "FAQ" },
] as const;

export const HERO = {
  role: "Інженер повного циклу",
  pitch:
    "Не збираю «шматочки ролей» — закриваю контур сам: від ідеї й хаосу до архітектури, коду, даних і деплою. Сайт, магазин чи система — на виході те, чим уже можна користуватись.",
} as const;

export const SERVICES = {
  eyebrow: "SCOPE",
  title: "Що закриваю повним циклом",
  lead:
    "Одна відповідальність від брифу до запуску — сайт, магазин або система під ваш бізнес.",
  items: [
    {
      title: "Сайти та лендінги",
      text: "Структура, код, SEO-основа, деплой. Корпоративний сайт чи лендінг під рекламу — одразу в прод.",
      tags: "сайт · лендінг",
      href: "/poslugy/sajty-ta-lendingy",
    },
    {
      title: "Інтернет-магазини",
      text: "Каталог, кошик, оплата, доставка, адмінка. Магазин як робоча система, не шаблон «для галочки».",
      tags: "e-commerce",
      href: "/poslugy/internet-magazyny",
    },
    {
      title: "Веб-системи та кабінети",
      text: "Кабінети, панелі, API й інтеграції. Збираю й виводжу в прод, щоб команда працювала з дня один.",
      tags: "product · API",
      href: "/poslugy/veb-systemy-ta-kabinety",
    },
    {
      title: "Порятунок проєкту",
      text: "Повільне, зламане чи незавершене — розбираю, лагоджу й доводжу до стабільного релізу.",
      tags: "fix · re-launch",
      href: "/poslugy/poryatunok-proektu",
    },
  ],
} as const;

/** Kept for JSON-LD / SEO */
export const AUDIENCE = {
  eyebrow: "FOR",
  title: "Кому потрібен інженер повного циклу",
  items: [
    {
      title: "Коли треба результат, а не ролі",
      text: "Одна людина доводить до Live — без збірки команди з п’яти ролей.",
    },
    {
      title: "Коли є ідея або хаос",
      text: "Новий продукт чи зламана система: входжу в будь-якій точці й закриваю контур.",
    },
    {
      title: "Коли важливий прод",
      text: "Не прототип «на потім» — запущений продукт для реальних користувачів.",
    },
  ],
} as const;

export const FAQ = {
  eyebrow: "FAQ",
  title: "Коротко про роботу",
  items: [
    {
      q: "Що таке «інженер повного циклу»?",
      a: "Одна відповідальність за шлях IDEA → LIVE: задача, архітектура, код, дані, деплой і передача робочого результату.",
    },
    {
      q: "Які задачі берете?",
      a: "Лендінги, сайти, інтернет-магазини, кабінети, кастомні системи, доробку існуючих проєктів.",
    },
    {
      q: "Скільки триває?",
      a: "Лендінг — від кількох днів. Сайт або магазин — зазвичай 2–6 тижнів. Точніше після брифу.",
    },
    {
      q: "Як почати?",
      a: "Заявка в Brief на сайті або повідомлення в Telegram. Відповім з орієнтиром по строках і наступному кроку.",
    },
  ],
} as const;

export const CONTACT = {
  title: "Є задача — закрию повним циклом.",
  text: "Заявка на прорахунок або прямий контакт.",
  place: "Україна · Київ · remote · ndx.com.ua",
  ctaSecondary: "Telegram",
} as const;
