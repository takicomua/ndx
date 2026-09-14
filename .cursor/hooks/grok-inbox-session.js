/**
 * sessionStart: inject pending Grok→Cursor tasks from bridge/grok/INBOX.md
 * Windows-friendly (node). Fail-open if file missing.
 */
const fs = require("fs");
const path = require("path");

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function extractOpenTasks(md) {
  // Strip fenced code + HTML comments so examples don't count as tasks
  const cleaned = md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  const open = [];
  for (const line of cleaned.split(/\r?\n/)) {
    if (/^\s*-\s*\[\s\]\s+/.test(line)) open.push(line.trim());
  }
  return open;
}

(async () => {
  try {
    await readStdin(); // consume hook payload
    const inboxPath = path.join(process.cwd(), "bridge", "grok", "INBOX.md");
    if (!fs.existsSync(inboxPath)) {
      process.stdout.write("{}\n");
      process.exit(0);
    }
    const md = fs.readFileSync(inboxPath, "utf8");
    const open = extractOpenTasks(md);
    if (open.length === 0) {
      process.stdout.write("{}\n");
      process.exit(0);
    }
    const summary = open.slice(0, 12).join("\n");
    const additional_context = [
      "Grok bridge: є відкриті задачі в bridge/grok/INBOX.md.",
      "Якщо користувач просить виконати / згадає Grok — прочитай INBOX і зроби їх, потім онови OUTBOX.",
      "",
      "Відкриті:",
      summary,
    ].join("\n");

    process.stdout.write(
      JSON.stringify({ additional_context }) + "\n",
    );
  } catch {
    process.stdout.write("{}\n");
  }
  process.exit(0);
})();
