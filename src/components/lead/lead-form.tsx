"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { trackLeadSubmit } from "@/lib/analytics";
import { CONTACTS } from "@/lib/constants";
import { LEAD } from "@/lib/lead";

type Status = "idle" | "loading" | "ok" | "err";

function typeFromQuery(search: URLSearchParams) {
  const raw = search.get("type")?.trim();
  if (raw && LEAD.types.some((t) => t.id === raw)) return raw;
  return LEAD.types[0].id;
}

export function LeadForm({ initialType }: { initialType?: string }) {
  return (
    <Suspense
      fallback={
        <LeadFormFields
          initialType={initialType || LEAD.types[0].id}
        />
      }
    >
      <LeadFormFromQuery initialType={initialType} />
    </Suspense>
  );
}

function LeadFormFromQuery({ initialType }: { initialType?: string }) {
  const search = useSearchParams();
  return (
    <LeadFormFields initialType={initialType || typeFromQuery(search)} />
  );
}

function LeadFormFields({ initialType }: { initialType: string }) {
  const [type, setType] = useState<string>(initialType);
  const [budget, setBudget] = useState<string>(LEAD.budgets[0].id);
  const [timeline, setTimeline] = useState<string>(LEAD.timelines[3].id);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      contact: String(fd.get("contact") || ""),
      message: String(fd.get("message") || ""),
      company: String(fd.get("company") || ""),
      type,
      budget,
      timeline,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("err");
        setError(data.error || "Не вдалося надіслати. Спробуйте ще раз.");
        return;
      }
      trackLeadSubmit({ type, budget, timeline });
      setStatus("ok");
      e.currentTarget.reset();
    } catch {
      setStatus("err");
      setError("Мережева помилка. Напишіть у Telegram напряму.");
    }
  }

  if (status === "ok") {
    return (
      <div className="flex h-full flex-col justify-center py-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
          Готово
        </p>
        <h3 className="mt-3 font-display text-2xl font-medium text-[var(--fg)]">
          {LEAD.successTitle}
        </h3>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[var(--dim)]">
          {LEAD.successText}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={CONTACTS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary h-11 px-5 focus-ring"
          >
            Telegram
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm text-[var(--dim)] transition-colors hover:text-[var(--fg)] focus-ring"
          >
            Ще одна заявка
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <label className="block">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--dim)]">
          Тип задачі
        </span>
        <select
          className="field select-field mt-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Тип задачі"
        >
          {LEAD.types.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--dim)]">
            Ім’я
          </span>
          <input
            name="name"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            placeholder="Як звертатись"
            className="field mt-2"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--dim)]">
            Контакт
          </span>
          <input
            name="contact"
            required
            maxLength={120}
            autoComplete="email"
            placeholder="Telegram / email / телефон"
            className="field mt-2"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--dim)]">
            Бюджет
          </span>
          <select
            className="field select-field mt-2"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            aria-label="Бюджет"
          >
            {LEAD.budgets.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--dim)]">
            Строки
          </span>
          <select
            className="field select-field mt-2"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            aria-label="Строки"
          >
            {LEAD.timelines.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--dim)]">
          Задача
        </span>
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Що має з’явитись на виході, референси, дедлайн…"
          className="field mt-2 min-h-[7rem] resize-y"
        />
      </label>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {error ? (
        <p className="text-sm text-[#b42318]" role="alert">
          {error}{" "}
          <a
            href={CONTACTS.telegram}
            className="underline underline-offset-2 hover:text-[var(--accent)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram →
          </a>
        </p>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary disabled:opacity-60 focus-ring"
        >
          {status === "loading" ? "Надсилаю…" : "Отримати прорахунок"}
        </button>
        <p className="text-sm text-[var(--dim)] sm:max-w-[14rem] sm:text-right">
          Без спаму. Лише відповідь по задачі.
        </p>
      </div>
    </form>
  );
}
