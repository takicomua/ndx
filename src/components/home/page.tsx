"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BootScene } from "@/components/home/boot-scene";
import { BrandDecode } from "@/components/home/brand-decode";
import { LeadForm } from "@/components/home/lead-form";
import { PitchReveal } from "@/components/home/pitch-reveal";
import {
  CONTACT,
  CONTACTS,
  FAQ,
  HERO,
  NAV,
  SERVICES,
  SITE,
} from "@/lib/constants";
import { LEAD } from "@/lib/lead";
import { cn } from "@/lib/utils";

const HeroCore = dynamic(
  () => import("@/components/home/hero-core").then((m) => m.HeroCore),
  { ssr: false },
);

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--dim)]">
      {children}
    </p>
  );
}

export function HomePage({ skipIntro = false }: { skipIntro?: boolean }) {
  const [booted, setBooted] = useState(skipIntro);
  const [pitchOn, setPitchOn] = useState(skipIntro);
  const [showCore, setShowCore] = useState(false);
  const onBrandReady = useCallback(() => setPitchOn(true), []);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (!booted) {
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
      };
    }
    document.documentElement.style.overflow = "";
  }, [booted]);

  // Defer WebGL: desktop only, after paint — protects mobile LCP/INP
  useEffect(() => {
    if (!booted) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 1023px)").matches;
    const saveData =
      "connection" in navigator &&
      Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData,
      );
    if (reduce || narrow || saveData) return;

    const id = window.setTimeout(() => setShowCore(true), 900);
    return () => window.clearTimeout(id);
  }, [booted]);

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-black text-[var(--fg)]">
      <div className="pointer-events-none fixed inset-0 -z-10 site-atmosphere" aria-hidden />
      {!skipIntro ? <BootScene onDone={() => setBooted(true)} /> : null}

      <div
        className={cn(
          "transition-opacity duration-500 ease-out",
          booted ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!booted}
      >
        <header className="relative z-20 border-b border-[var(--line)]/80">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
            <a
              href="#top"
              className="font-mono text-[10px] tracking-[0.2em] text-[var(--dim)] transition-colors hover:text-[var(--accent)] focus-ring"
              tabIndex={booted ? undefined : -1}
            >
              <span className="text-[var(--accent)]">{SITE.signature}</span>
              <span className="mx-2 hidden text-[var(--fg)]/20 sm:inline">·</span>
              <span className="hidden sm:inline">{SITE.tagline}</span>
            </a>
            <nav
              className="hidden items-center gap-7 md:flex"
              aria-label="Навігація"
            >
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-mono text-[10px] tracking-[0.16em] text-[var(--dim)] transition-colors hover:text-[var(--accent)] focus-ring"
                  tabIndex={booted ? undefined : -1}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href="#brief"
              className="font-mono text-[10px] tracking-[0.16em] text-[var(--fg)] transition-colors hover:text-[var(--accent)] focus-ring"
              tabIndex={booted ? undefined : -1}
            >
              BRIEF →
            </a>
          </div>
        </header>

        <main id="top" className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
          <section className="relative grid min-h-[min(82dvh,760px)] items-center gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
            {showCore ? <HeroCore /> : null}

            <div className="relative z-10 max-w-xl">
              <p className="font-mono text-[11px] tracking-[0.32em] text-[var(--dim)]">
                {SITE.signature}
              </p>
              {booted && !skipIntro ? (
                <BrandDecode text={SITE.brand} onReady={onBrandReady} />
              ) : (
                <h1 className="mt-3 font-display text-[clamp(3.2rem,12vw,7rem)] font-semibold leading-[0.9] tracking-tight text-[var(--fg)]">
                  {SITE.brand}
                </h1>
              )}
              {/* Always in HTML for SEO; animation only gates polish */}
              <div
                className={cn(
                  "transition-[opacity,transform] duration-700 ease-out",
                  pitchOn || skipIntro
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0",
                )}
              >
                <p className="mt-5 text-lg text-[var(--fg)]/85 sm:text-xl">
                  {HERO.role}
                </p>
                <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-[var(--fg)]/35">
                  {SITE.geo}
                </p>
                <PitchReveal
                  text={HERO.pitch}
                  active={pitchOn || skipIntro}
                  instant={skipIntro}
                />
              </div>
            </div>

            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[42%] items-center justify-end lg:flex"
              aria-hidden
            >
              <span className="select-none font-display text-[clamp(7rem,18vw,14rem)] font-bold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(232,230,225,0.14)]">
                {SITE.mark}
              </span>
            </div>
          </section>

          <section id="services" className="scroll-mt-24 border-t border-[var(--line)] py-20 sm:py-24">
            <div className="max-w-2xl">
              <SectionLabel>{SERVICES.eyebrow}</SectionLabel>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-tight text-[var(--fg)]">
                {SERVICES.title}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--dim)]">
                {SERVICES.lead}
              </p>
            </div>
            <ul className="mt-14">
              {SERVICES.items.map((item, i) => (
                <li
                  key={item.title}
                  className="group grid gap-3 border-t border-[var(--line)] py-8 last:border-b sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="font-mono text-[11px] tracking-wide text-[var(--fg)]/25">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-tight text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] sm:text-2xl">
                      <Link href={item.href} className="focus-ring">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--dim)]">
                      {item.text}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="font-mono text-[10px] tracking-[0.14em] text-[var(--fg)]/30 transition-colors hover:text-[var(--accent)] focus-ring sm:pt-1"
                    tabIndex={booted ? undefined : -1}
                  >
                    {item.tags} →
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link
                href="/poslugy"
                className="font-mono text-[11px] tracking-[0.14em] text-[var(--dim)] transition-colors hover:text-[var(--accent)] focus-ring"
              >
                Усі послуги →
              </Link>
            </p>
          </section>

          <section
            id="brief"
            className="scroll-mt-24 border-t border-[var(--line)] py-20 sm:py-24"
          >
            <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <SectionLabel>{LEAD.eyebrow}</SectionLabel>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-tight text-[var(--fg)]">
                  {LEAD.title}
                </h2>
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

          <section
            id="faq"
            className="scroll-mt-24 border-t border-[var(--line)] py-20 sm:py-24"
          >
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <SectionLabel>{FAQ.eyebrow}</SectionLabel>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-tight text-[var(--fg)]">
                  {FAQ.title}
                </h2>
              </div>
              <dl>
                {FAQ.items.map((item) => (
                  <div
                    key={item.q}
                    className="border-t border-[var(--line)] py-6 first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <dt className="font-display text-base font-medium text-[var(--fg)] sm:text-lg">
                      {item.q}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-[var(--dim)]">
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section
            id="contact"
            className="scroll-mt-24 border-t border-[var(--line)] py-16 sm:py-20"
          >
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-lg">
                <SectionLabel>CONTACT</SectionLabel>
                <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-[var(--fg)] sm:text-3xl">
                  {CONTACT.title}
                </h2>
                <p className="mt-3 text-sm text-[var(--dim)]">{CONTACT.place}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#brief"
                  className="inline-flex h-12 items-center bg-[var(--accent)] px-6 text-sm font-medium text-[var(--accent-fg)] transition-[filter] hover:brightness-110 focus-ring"
                  tabIndex={booted ? undefined : -1}
                >
                  До заявки
                </a>
                <a
                  href={CONTACTS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center border border-[var(--line)] px-6 font-mono text-[11px] tracking-[0.14em] text-[var(--dim)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)] focus-ring"
                  tabIndex={booted ? undefined : -1}
                >
                  {CONTACT.ctaSecondary} →
                </a>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--line)] pt-8 font-mono text-[11px] tracking-wide text-[var(--dim)]">
              <a
                href={`mailto:${CONTACTS.email}`}
                className="transition-colors hover:text-[var(--accent)] focus-ring"
              >
                {CONTACTS.email}
              </a>
              <a
                href={CONTACTS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--accent)] focus-ring"
              >
                GitHub
              </a>
              <a
                href={CONTACTS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--accent)] focus-ring"
              >
                LinkedIn
              </a>
              <Link
                href="/keysy"
                className="transition-colors hover:text-[var(--accent)] focus-ring"
              >
                Keys
              </Link>
              <span className="text-[var(--fg)]/25">{SITE.domain}</span>
            </div>
          </section>
        </main>

        <footer className="border-t border-[var(--line)]">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 font-mono text-[10px] tracking-[0.12em] text-[var(--dim)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span>
              © {year} {SITE.brand}
            </span>
            <span className="text-[var(--accent)]/70">{SITE.mark}</span>
            <span>{SITE.tagline}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
