import type { Metadata } from "next";
import Link from "next/link";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { SITE } from "@/lib/constants";
import { CASE_PAGES } from "@/lib/content/cases";

export const metadata: Metadata = {
  title: "Підходи та кейси",
  description:
    "Як NDX збирає лендінги, магазини MVP і стабілізує проєкти до Live. Підходи повного циклу · Україна.",
  alternates: { canonical: `${SITE.url}/keysy` },
  openGraph: {
    title: `Підходи та кейси | NDX · ${SITE.brand}`,
    description:
      "Практичні контури: лендінг під рекламу, магазин MVP, стабілізація проєкту.",
    url: `${SITE.url}/keysy`,
  },
};

export default function CasesIndexPage() {
  return (
    <SiteChrome active="keysy">
      <PageJsonLd
        type="CollectionPage"
        name="Підходи та кейси NDX"
        description="Практичні контури роботи: лендінги, магазини MVP, стабілізація."
        path="/keysy"
        breadcrumbs={[
          { name: "NDX", path: "/" },
          { name: "Кейси", path: "/keysy" },
        ]}
      />

      <section className="border-b border-[var(--line)] py-16 sm:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--dim)]">
          KEYS
        </p>
        <h1 className="mt-4 font-display text-[clamp(1.9rem,5vw,3rem)] font-medium tracking-tight text-[var(--fg)]">
          Підходи до типових задач
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--dim)]">
          Не портфоліо-галерея, а робочі контури: як входжу в задачу й що
          отримуєте на виході.
        </p>
      </section>

      <ul className="py-6">
        {CASE_PAGES.map((item) => (
          <li
            key={item.slug}
            className="border-t border-[var(--line)] py-8 last:border-b"
          >
            <h2 className="font-display text-xl font-medium tracking-tight text-[var(--fg)] sm:text-2xl">
              <Link
                href={`/keysy/${item.slug}`}
                className="transition-colors hover:text-[var(--accent)] focus-ring"
              >
                {item.h1}
              </Link>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--dim)]">
              {item.lead}
            </p>
            <Link
              href={`/keysy/${item.slug}`}
              className="mt-4 inline-block font-mono text-[10px] tracking-[0.14em] text-[var(--fg)]/40 transition-colors hover:text-[var(--accent)] focus-ring"
            >
              Читати →
            </Link>
          </li>
        ))}
      </ul>
    </SiteChrome>
  );
}
