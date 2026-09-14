import type { Metadata } from "next";
import Link from "next/link";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { SITE } from "@/lib/constants";
import { CASE_PAGES } from "@/lib/content/cases";

export const metadata: Metadata = {
  title: "Роботи",
  description:
    "Приклади задач NDX: лендінги, магазини, кабінети, ремонт проєктів. Україна.",
  alternates: { canonical: `${SITE.url}/keysy` },
};

export default function CasesIndexPage() {
  return (
    <SiteChrome active="keysy">
      <PageJsonLd
        type="CollectionPage"
        name="Роботи NDX"
        description="Приклади задач: сайти, магазини, кабінети, ремонт."
        path="/keysy"
        breadcrumbs={[
          { name: "NDX", path: "/" },
          { name: "Роботи", path: "/keysy" },
        ]}
      />

      <section className="mx-auto max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-4xl font-semibold tracking-tight">
          Роботи
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--dim)]">
          Приклади типових задач. Не портфоліо з логотипами — зрозумілі сценарії
          роботи.
        </p>

        <ul className="list-plain mt-12">
          {CASE_PAGES.map((item) => (
            <li key={item.slug} className="py-6">
              <Link href={`/keysy/${item.slug}`} className="group block focus-ring">
                <p className="text-sm text-[var(--dim)]">{item.type}</p>
                <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight group-hover:text-[var(--accent)]">
                  {item.h1}
                </h2>
                <p className="mt-2 text-[16px] leading-relaxed text-[var(--dim)]">
                  {item.lead}
                </p>
                <span className="mt-3 inline-block text-sm font-semibold text-[var(--accent)]">
                  Читати →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link href="/zayavka" className="btn-primary focus-ring">
            Обговорити задачу
          </Link>
        </div>
      </section>
    </SiteChrome>
  );
}
