"use client";

import { Suspense, useState, type FormEvent, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackLeadSubmit } from "@/lib/analytics";
import { CONTACTS } from "@/lib/constants";
import { LEAD } from "@/lib/lead";
import {
  readTrackingParams,
  type TrackingValues,
} from "@/lib/utm";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "ok" | "err";

function Chip({
  active,
  onClick,
  children,
  solid,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  solid?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 border px-3.5 font-mono text-[11px] tracking-wide transition-colors focus-ring",
        active
          ? solid
            ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)]"
            : "border-[var(--accent)] text-[var(--accent)]"
          : "border-[var(--line)] text-[var(--dim)] hover:border-[var(--fg)]/25 hover:text-[var(--fg)]",
      )}
    >
      {children}
    </button>
  );
}

export function LeadForm() {
  return (
    <Suspense fallback={<LeadFormFields />}>
      <LeadFormFromQuery />
    </Suspense>
  );
}

function LeadFormFromQuery() {
  const pathname = usePathname();
  const search = useSearchParams();
  const urlType = search.get("type")?.trim();
  const defaultType =
    urlType && LEAD.types.some((t) => t.id === urlType)
      ? urlType
      : LEAD.types[0].id;
  const qs = search.toString();
  return (
    <LeadFormFields
      defaultType={defaultType}
      tracking={readTrackingParams(search)}
      page={`${pathname}${qs ? `?${qs}` : ""}`}
    />
  );
}

function LeadFormFields({
  defaultType = LEAD.types[0].id,
  tracking = {},
  page = "",
}: {
  defaultType?: string;
  tracking?: TrackingValues;
  page?: string;
}) {
  const [type, setType] = useState<string>(defaultType);
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
      page:
        page ||
        (typeof window !== "undefined"
          ? `${window.location.pathname}${window.location.search}`
          : ""),
      referrer: typeof document !== "undefined" ? document.referrer : "",
      tracking:
        Object.keys(tracking).length > 0
          ? tracking
          : typeof window !== "undefined"
            ? readTrackingParams(new URLSearchParams(window.location.search))
            : {},
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
      setStatus("ok");
      trackLeadSubmit();
      e.currentTarget.reset();
    } catch {
      setStatus("err");
      setError("Мережева помилка. Напишіть у Telegram напряму.");
    }
  }

  if (status === "ok") {
    return (
      <div className="flex h-full flex-col justify-center px-1 py-4 sm:px-2">
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#7dcea0]">
          OK
        </p>
        <h3 className="mt-4 font-display text-2xl font-medium text-[var(--fg)]">
          {LEAD.successTitle}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--dim)]">
          {LEAD.successText}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a
            href={CONTACTS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center bg-[var(--accent)] px-5 text-sm font-medium text-[var(--accent-fg)] focus-ring"
          >
            Telegram
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="font-mono text-[11px] tracking-wide text-[var(--dim)] transition-colors hover:text-[var(--accent)] focus-ring"
          >
            Ще одна заявка
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <fieldset>
        <legend className="font-mono text-[10px] tracking-[0.18em] text-[var(--dim)]">
          ТИП ЗАДАЧІ
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {LEAD.types.map((t) => (
            <Chip key={t.id} active={type === t.id} solid onClick={() => setType(t.id)}>
              {t.label}
            </Chip>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--dim)]">
            ІМ’Я
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
          <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--dim)]">
            КОНТАКТ
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

      <div className="grid gap-6 sm:grid-cols-2">
        <fieldset>
          <legend className="font-mono text-[10px] tracking-[0.18em] text-[var(--dim)]">
            БЮДЖЕТ
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {LEAD.budgets.map((b) => (
              <Chip
                key={b.id}
                active={budget === b.id}
                onClick={() => setBudget(b.id)}
              >
                {b.label}
              </Chip>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="font-mono text-[10px] tracking-[0.18em] text-[var(--dim)]">
            СТРОКИ
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {LEAD.timelines.map((t) => (
              <Chip
                key={t.id}
                active={timeline === t.id}
                onClick={() => setTimeline(t.id)}
              >
                {t.label}
              </Chip>
            ))}
          </div>
        </fieldset>
      </div>

      <label className="block">
        <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--dim)]">
          ЗАДАЧА
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
        <p className="font-mono text-[12px] text-[#e07a7a]" role="alert">
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

      <div className="flex flex-col gap-4 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 items-center justify-center bg-[var(--accent)] px-7 text-sm font-medium text-[var(--accent-fg)] transition-[filter,opacity] hover:brightness-110 disabled:opacity-60 focus-ring"
        >
          {status === "loading" ? "Надсилаю…" : "Отримати прорахунок"}
        </button>
        <p className="font-mono text-[10px] leading-relaxed tracking-wide text-[var(--fg)]/30 sm:max-w-[14rem] sm:text-right">
          Без спаму. Лише відповідь по задачі.
        </p>
      </div>
    </form>
  );
}
