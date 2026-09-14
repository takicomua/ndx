import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { SITE } from "@/lib/constants";
import { getServiceBySlug, SERVICE_PAGES } from "@/lib/content/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServiceBySlug(slug);
  if (!page) return {};
  const url = `${SITE.url}/poslugy/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const page = getServiceBySlug(slug);
  if (!page) notFound();
  const path = `/poslugy/${page.slug}`;

  return (
    <SiteChrome active="poslugy">
      <PageJsonLd
        type="Service"
        name={page.title}
        description={page.description}
        path={path}
        breadcrumbs={[
          { name: "NDX", path: "/" },
          { name: "Послуги", path: "/poslugy" },
          { name: page.shortTitle, path },
        ]}
        faq={page.faq}
      />

      <article className="mx-auto max-w-3xl py-16 sm:py-20">
        <p className="text-sm text-[var(--dim)]">
          <Link href="/poslugy" className="hover:text-[var(--accent)] focus-ring">
            Послуги
          </Link>
          <span className="mx-2">/</span>
          {page.shortTitle}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
          {page.h1}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--dim)]">
          {page.lead}
        </p>

        <h2 className="mt-14 font-display text-2xl font-semibold">Що отримаєте</h2>
        <ul className="mt-5 space-y-2 text-[16px] text-[var(--dim)]">
          {page.outcomes.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>

        <h2 className="mt-14 font-display text-2xl font-semibold">Як проходить</h2>
        <ol className="mt-5 space-y-4">
          {page.process.map((step, i) => (
            <li key={step.t} className="flex gap-3 text-[16px]">
              <span className="font-semibold text-[var(--accent)]">{i + 1}.</span>
              <span>
                <span className="font-semibold text-[var(--fg)]">{step.t}.</span>{" "}
                <span className="text-[var(--dim)]">{step.d}</span>
              </span>
            </li>
          ))}
        </ol>

        <h2 className="mt-14 font-display text-2xl font-semibold">Питання</h2>
        <dl className="list-plain mt-5">
          {page.faq.map((item) => (
            <div key={item.q} className="py-4">
              <dt className="font-semibold">{item.q}</dt>
              <dd className="mt-1 text-[16px] text-[var(--dim)]">{item.a}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link href="/zayavka" className="btn-primary focus-ring">
            Заявка
          </Link>
          <Link href="/poslugy" className="text-sm font-semibold focus-ring">
            ← Усі послуги
          </Link>
        </div>
      </article>
    </SiteChrome>
  );
}
