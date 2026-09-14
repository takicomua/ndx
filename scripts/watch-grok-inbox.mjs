/**
 * Watch bridge/grok/INBOX.md and emit a wake line when new open tasks appear.
 * Usage: node scripts/watch-grok-inbox.mjs
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const INBOX = path.join(ROOT, "bridge", "grok", "INBOX.md");
const STATE = path.join(ROOT, "bridge", "grok", ".watch-state.json");
const INTERVAL_MS = Number(process.env.GROK_WATCH_MS || 15000);

function clean(md) {
  return md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");
}

function openTasks(md) {
  return clean(md)
    .split(/\r?\n/)
    .filter((line) => /^\s*-\s*\[\s\]\s+/.test(line))
    .map((line) => line.trim());
}

function readState() {
  try {
    return JSON.parse(fs.readFileSync(STATE, "utf8"));
  } catch {
    return { fingerprint: "", lastTick: 0 };
  }
}

function writeState(state) {
  fs.writeFileSync(STATE, JSON.stringify(state, null, 2));
}

function fingerprint(tasks, raw) {
  return `${tasks.length}:${Buffer.from(raw).toString("base64url").slice(0, 24)}`;
}

function tick() {
  if (!fs.existsSync(INBOX)) return;
  const raw = fs.readFileSync(INBOX, "utf8");
  const tasks = openTasks(raw);
  if (tasks.length === 0) return;

  const fp = fingerprint(tasks, raw);
  const state = readState();
  if (state.fingerprint === fp) return;

  writeState({ fingerprint: fp, lastTick: Date.now(), count: tasks.length });

  const payload = {
    prompt:
      "Авто-режим Grok bridge: у bridge/grok/INBOX.md з’явились нові відкриті задачі. Прочитай INBOX, виконай усі `- [ ]` (P0→P2), познач `- [x]`, онови bridge/grok/OUTBOX.md. Не коміть без прохання.",
    count: tasks.length,
    sample: tasks.slice(0, 5),
  };

  // Wake line for Cursor agent monitored shell /loop
  console.log(`AGENT_LOOP_TICK_grok_inbox ${JSON.stringify(payload)}`);
}

console.error(`[grok-watch] watching ${INBOX} every ${INTERVAL_MS}ms`);
tick();
setInterval(tick, INTERVAL_MS);
