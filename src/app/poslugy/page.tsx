import type { Metadata } from "next";
import Link from "next/link";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { SITE } from "@/lib/constants";
import { SERVICE_PAGES } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Послуги",
  description:
    "Сайти, лендінги, інтернет-магазини, кабінети й доробка проєктів. NDX · DIACHENKO · Україна.",
  alternates: { canonical: `${SITE.url}/poslugy` },
};

export default function ServicesIndexPage() {
  return (
    <SiteChrome active="poslugy">
      <PageJsonLd
        type="CollectionPage"
        name="Послуги NDX"
        description="Сайти, магазини, кабінети, доробка проєктів."
        path="/poslugy"
        breadcrumbs={[
          { name: "NDX", path: "/" },
          { name: "Послуги", path: "/poslugy" },
        ]}
      />

      <section className="mx-auto max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-4xl font-semibold tracking-tight">
          Послуги
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--dim)]">
          Оберіть напрям. На сторінці — що входить, як працюю і відповіді на
          типові питання.
        </p>

        <ul className="list-plain mt-12">
          {SERVICE_PAGES.map((item) => (
            <li key={item.slug} className="py-6">
              <Link href={`/poslugy/${item.slug}`} className="group block focus-ring">
                <h2 className="font-display text-2xl font-semibold tracking-tight group-hover:text-[var(--accent)]">
                  {item.shortTitle}
                </h2>
                <p className="mt-2 text-[16px] leading-relaxed text-[var(--dim)]">
                  {item.lead}
                </p>
                <span className="mt-3 inline-block text-sm font-semibold text-[var(--accent)]">
                  Відкрити →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link href="/zayavka" className="btn-primary focus-ring">
            Залишити заявку
          </Link>
        </div>
      </section>
    </SiteChrome>
  );
}
