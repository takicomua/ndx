/**
 * Отримати TELEGRAM_CHAT_ID для доставки заявок.
 *
 * 1) Створи бота в @BotFather → скопіюй токен
 * 2) З акаунта @ndxcom натисни Start у цього бота (або додай бота адміном у канал @ndxcom)
 * 3) Запусти:
 *    node scripts/telegram-chat-id.mjs <BOT_TOKEN>
 */
const token = process.argv[2] || process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("Usage: node scripts/telegram-chat-id.mjs <BOT_TOKEN>");
  process.exit(1);
}

const res = await fetch(
  `https://api.telegram.org/bot${token}/getUpdates?limit=20`,
);
const data = await res.json();

if (!data.ok) {
  console.error("Telegram error:", data);
  process.exit(1);
}

const rows = [];
for (const u of data.result || []) {
  const msg = u.message || u.channel_post || u.my_chat_member?.chat;
  const chat = msg?.chat || u.my_chat_member?.chat;
  if (!chat) continue;
  rows.push({
    id: chat.id,
    type: chat.type,
    username: chat.username ? `@${chat.username}` : null,
    title: chat.title || [chat.first_name, chat.last_name].filter(Boolean).join(" "),
  });
}

const unique = [...new Map(rows.map((r) => [String(r.id), r])).values()];

if (!unique.length) {
  console.log(
    "Немає оновлень. Відкрий бота з @ndxcom, натисни Start, і запусти скрипт знову.",
  );
  process.exit(0);
}

console.log("Знайдені чати:\n");
for (const c of unique) {
  console.log(`  TELEGRAM_CHAT_ID=${c.id}`);
  console.log(`  type=${c.type}  ${c.username || ""}  ${c.title || ""}`);
  console.log("");
}

const ndx = unique.find((c) => c.username === "@ndxcom");
if (ndx) {
  console.log(`Рекомендовано для @ndxcom:\nTELEGRAM_CHAT_ID=${ndx.id}`);
}
