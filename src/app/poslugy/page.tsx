import type { Metadata } from "next";
import Link from "next/link";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { SITE } from "@/lib/constants";
import { SERVICE_PAGES } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Послуги",
  description:
    "Повний цикл: сайти та лендінги, інтернет-магазини, веб-системи й кабінети, порятунок проєктів. NDX · Україна · remote.",
  alternates: { canonical: `${SITE.url}/poslugy` },
  openGraph: {
    title: `Послуги | NDX · ${SITE.brand}`,
    description:
      "Сайти, магазини, кабінети й стабілізація проєктів — один відповідальний до Live.",
    url: `${SITE.url}/poslugy`,
  },
};

export default function ServicesIndexPage() {
  return (
    <SiteChrome active="poslugy">
      <PageJsonLd
        type="CollectionPage"
        name="Послуги NDX"
        description="Повний цикл розробки: сайти, магазини, системи, порятунок проєктів."
        path="/poslugy"
        breadcrumbs={[
          { name: "NDX", path: "/" },
          { name: "Послуги", path: "/poslugy" },
        ]}
      />

      <section className="border-b border-[var(--line)] py-16 sm:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--dim)]">
          SCOPE
        </p>
        <h1 className="mt-4 font-display text-[clamp(1.9rem,5vw,3rem)] font-medium tracking-tight text-[var(--fg)]">
          Послуги повного циклу
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--dim)]">
          Одна відповідальність від брифу до запуску. Оберіть напрям — на
          сторінці деталі, процес і FAQ.
        </p>
      </section>

      <ul className="py-6">
        {SERVICE_PAGES.map((item, i) => (
          <li
            key={item.slug}
            className="grid gap-3 border-t border-[var(--line)] py-8 last:border-b sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-8"
          >
            <span className="font-mono text-[11px] tracking-wide text-[var(--fg)]/25">
              0{i + 1}
            </span>
            <div>
              <h2 className="font-display text-xl font-medium tracking-tight text-[var(--fg)] sm:text-2xl">
                <Link
                  href={`/poslugy/${item.slug}`}
                  className="transition-colors hover:text-[var(--accent)] focus-ring"
                >
                  {item.shortTitle}
                </Link>
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--dim)]">
                {item.lead}
              </p>
            </div>
            <Link
              href={`/poslugy/${item.slug}`}
              className="font-mono text-[10px] tracking-[0.14em] text-[var(--fg)]/40 transition-colors hover:text-[var(--accent)] focus-ring sm:pt-1"
            >
              Детальніше →
            </Link>
          </li>
        ))}
      </ul>

      <div className="border-t border-[var(--line)] py-14">
        <Link
          href="/#brief"
          className="inline-flex h-12 items-center bg-[var(--accent)] px-6 text-sm font-medium text-[var(--accent-fg)] transition-[filter] hover:brightness-110 focus-ring"
        >
          Залишити заявку
        </Link>
      </div>
    </SiteChrome>
  );
}
