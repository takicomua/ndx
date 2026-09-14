import type { Metadata } from "next";
import Link from "next/link";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { SERVICE_PAGES } from "@/lib/content/services";
import { buildPageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = buildPageMetadata({
  title: "Послуги — сайти, магазини, кабінети",
  description:
    "Замовити сайт, лендінг, інтернет-магазин або кабінет під ключ. Орієнтири цін і строків · NDX · DIACHENKO · Україна.",
  path: "/poslugy",
});

export default function ServicesIndexPage() {
  return (
    <SiteChrome active="poslugy">
      <PageJsonLd
        type="CollectionPage"
        name="Послуги NDX"
        description="Сайти, лендінги, інтернет-магазини, кабінети, доробка проєктів — з орієнтирами цін."
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
          Чотири напрями з орієнтирами цін і строків. Оберіть сторінку — там
          обсяг, процес і відповіді на типові комерційні запити.
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
                <p className="mt-2 text-sm text-[var(--fg)]">
                  {item.pricing.ranges[0]?.price}
                  <span className="mx-2 text-[var(--dim)]">·</span>
                  {item.pricing.ranges[0]?.time}
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
