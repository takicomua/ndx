"use client";

import { LeadForm } from "@/components/home/lead-form";
import { LEAD } from "@/lib/lead";

export function BriefPanel({
  heading = "h2",
}: {
  heading?: "h1" | "h2";
}) {
  const Title = heading;

  return (
    <section
      id="brief"
      className="scroll-mt-24 border-t border-[var(--line)] py-20 sm:py-24"
    >
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--dim)]">
            {LEAD.eyebrow}
          </p>
          <Title className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-tight text-[var(--fg)]">
            {LEAD.title}
          </Title>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[var(--dim)]">
            {LEAD.lead}
          </p>

          <div className="mt-10 flex gap-8 border-t border-[var(--line)] pt-8">
            {LEAD.steps.map((s) => (
              <div key={s.n}>
                <p className="font-mono text-[10px] tracking-[0.16em] text-[var(--accent)]">
                  {s.n}
                </p>
                <p className="mt-2 text-sm font-medium text-[var(--fg)]">
                  {s.t}
                </p>
                <p className="mt-1 font-mono text-[10px] text-[var(--dim)]">
                  {s.d}
                </p>
              </div>
            ))}
          </div>

          <ul className="mt-10 space-y-2.5">
            {LEAD.trust.map((t) => (
              <li
                key={t}
                className="flex gap-3 text-[13px] text-[var(--dim)]"
              >
                <span className="mt-[0.35em] h-px w-3 shrink-0 bg-[var(--accent)]/50" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="lead-panel min-w-0">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
