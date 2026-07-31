export const LEAD = {
  eyebrow: "BRIEF",
  title: "Заявка на прорахунок",
  lead: "Тип задачі, контакт і коротко — що має з’явитись. Відповім з орієнтиром по строках і бюджету.",
  steps: [
    { n: "01", t: "Заявка", d: "форма нижче" },
    { n: "02", t: "Розбір", d: "уточню обсяг" },
    { n: "03", t: "Орієнтир", d: "строки і старт" },
  ],
  trust: [
    "Відповідь протягом дня",
    "Один відповідальний до Live",
    "Можна почати з малого етапу",
  ],
  types: [
    { id: "landing", label: "Лендінг / сайт" },
    { id: "shop", label: "Магазин" },
    { id: "app", label: "Кабінет / система" },
    { id: "rescue", label: "Доробка" },
    { id: "other", label: "Інше" },
  ],
  budgets: [
    { id: "discuss", label: "Обговоримо" },
    { id: "s", label: "до $1k" },
    { id: "m", label: "$1–3k" },
    { id: "l", label: "$3–8k" },
    { id: "xl", label: "$8k+" },
  ],
  timelines: [
    { id: "asap", label: "Швидко" },
    { id: "2w", label: "до 2 тижнів" },
    { id: "1m", label: "до місяця" },
    { id: "flex", label: "Гнучко" },
  ],
  successTitle: "Заявку прийнято",
  successText: "Напишу з орієнтиром найближчим часом. Терміново — дублюйте в Telegram.",
} as const;
