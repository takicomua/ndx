import { NextResponse } from "next/server";
import { CONTACTS, SITE } from "@/lib/constants";
import { LEAD } from "@/lib/lead";
import { TRACKING_PARAMS, type TrackingValues } from "@/lib/utm";

export const runtime = "nodejs";

type LeadBody = {
  name?: string;
  contact?: string;
  type?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  company?: string; // honeypot
  page?: string;
  referrer?: string;
  tracking?: TrackingValues;
};

function sanitizePath(value: string | undefined) {
  const v = (value || "").trim();
  if (!v.startsWith("/") || v.length > 300) return "";
  return v;
}

function sanitizeReferrer(value: string | undefined) {
  const v = (value || "").trim();
  if (!v || v.length > 300) return "";
  try {
    const url = new URL(v);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    return url.toString();
  } catch {
    return "";
  }
}

function sanitizeTracking(raw: TrackingValues | undefined): TrackingValues {
  const out: TrackingValues = {};
  if (!raw || typeof raw !== "object") return out;
  for (const key of TRACKING_PARAMS) {
    const value = raw[key];
    if (typeof value === "string") {
      const v = value.trim();
      if (v && v.length <= 200) out[key] = v;
    }
  }
  return out;
}

const RATE = new Map<string, number[]>();

function clientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimit(ip: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const prev = (RATE.get(ip) || []).filter((t) => now - t < windowMs);
  if (prev.length >= limit) return false;
  prev.push(now);
  RATE.set(ip, prev);
  return true;
}

function labelOf(
  list: readonly { id: string; label: string }[],
  id: string | undefined,
) {
  return list.find((x) => x.id === id)?.label || id || "—";
}

function isValidContact(value: string) {
  const v = value.trim();
  if (v.length < 3 || v.length > 120) return false;
  // email, phone, telegram @user, or t.me link
  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ||
    /^\+?[\d\s()-]{7,}$/.test(v) ||
    /^@?[a-zA-Z0-9_]{4,}$/.test(v) ||
    /t\.me\//i.test(v)
  );
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chat = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chat) return { ok: false as const, reason: "telegram_unset" };

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chat,
      text,
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false as const, reason: `telegram_${res.status}`, body };
  }
  return { ok: true as const };
}

async function sendResend(subject: string, text: string) {
  const key = process.env.RESEND_API_KEY?.trim();
  const to = process.env.LEAD_TO_EMAIL?.trim() || CONTACTS.email;
  const from =
    process.env.LEAD_FROM_EMAIL?.trim() || `NDX Lead <onboarding@resend.dev>`;
  if (!key) return { ok: false as const, reason: "resend_unset" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, text }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false as const, reason: `resend_${res.status}`, body };
  }
  return { ok: true as const };
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Забагато спроб. Спробуйте пізніше." },
      { status: 429 },
    );
  }

  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }

  // Honeypot
  if (body.company && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const contact = (body.contact || "").trim();
  const message = (body.message || "").trim();

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json(
      { ok: false, error: "Вкажіть ім’я (мін. 2 символи)." },
      { status: 400 },
    );
  }
  if (!isValidContact(contact)) {
    return NextResponse.json(
      { ok: false, error: "Вкажіть email, телефон або Telegram." },
      { status: 400 },
    );
  }
  if (message.length > 2000) {
    return NextResponse.json(
      { ok: false, error: "Текст занадто довгий." },
      { status: 400 },
    );
  }

  const type = labelOf(LEAD.types, body.type);
  const budget = labelOf(LEAD.budgets, body.budget);
  const timeline = labelOf(LEAD.timelines, body.timeline);
  const page = sanitizePath(body.page);
  const referrer = sanitizeReferrer(body.referrer);
  const tracking = sanitizeTracking(body.tracking);
  const trackingLine = Object.entries(tracking)
    .map(([k, v]) => `${k}=${v}`)
    .join(" ");

  const text = [
    `NDX lead · ${SITE.domain}`,
    ``,
    `Ім’я: ${name}`,
    `Контакт: ${contact}`,
    `Тип: ${type}`,
    `Бюджет: ${budget}`,
    `Строки: ${timeline}`,
    message ? `Задача:\n${message}` : `Задача: —`,
    page ? `Сторінка: ${page}` : null,
    referrer ? `Referrer: ${referrer}` : null,
    trackingLine ? `UTM: ${trackingLine}` : null,
    ``,
    `IP: ${ip}`,
    `At: ${new Date().toISOString()}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const tg = await sendTelegram(text);
  const mail = await sendResend(`[NDX] Заявка — ${name} · ${type}`, text);

  if (!tg.ok && !mail.ok) {
    // Soft success path: accept lead client-side still shows success,
    // but report that delivery needs config — in prod log it.
    console.error("[lead] no delivery channel", { tg, mail });
    return NextResponse.json(
      {
        ok: false,
        error:
          "Канал доставки ще не налаштовано. Напишіть напряму в Telegram або на email.",
        fallback: {
          telegram: CONTACTS.telegram,
          email: CONTACTS.email,
        },
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    via: [tg.ok ? "telegram" : null, mail.ok ? "email" : null].filter(Boolean),
  });
}
