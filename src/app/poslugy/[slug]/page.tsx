import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { SITE } from "@/lib/constants";
import {
  getServiceBySlug,
  SERVICE_PAGES,
} from "@/lib/content/services";

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
    openGraph: {
      title: `${page.title} | NDX`,
      description: page.description,
      url,
      type: "website",
    },
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

      <section className="border-b border-[var(--line)] py-16 sm:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--dim)]">
          <Link href="/poslugy" className="hover:text-[var(--accent)] focus-ring">
            SCOPE
          </Link>
          <span className="mx-2 text-[var(--fg)]/20">/</span>
          {page.tags[0]}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(1.9rem,5vw,3rem)] font-medium tracking-tight text-[var(--fg)]">
          {page.h1}
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[var(--dim)]">
          {page.lead}
        </p>
        <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-[var(--fg)]/30">
          {page.tags.join(" · ")}
        </p>
      </section>

      <section className="grid gap-14 border-b border-[var(--line)] py-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-medium text-[var(--fg)]">
            На виході
          </h2>
          <ul className="mt-6 space-y-3">
            {page.outcomes.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-[var(--dim)]"
              >
                <span className="mt-[0.45em] h-px w-3 shrink-0 bg-[var(--accent)]/50" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-xl font-medium text-[var(--fg)]">
            Процес
          </h2>
          <ol className="mt-6 space-y-5">
            {page.process.map((step, i) => (
              <li key={step.t} className="grid grid-cols-[3rem_1fr] gap-3">
                <span className="font-mono text-[11px] text-[var(--accent)]">
                  0{i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-[var(--fg)]">{step.t}</p>
                  <p className="mt-1 text-sm text-[var(--dim)]">{step.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[var(--line)] py-14">
        <h2 className="font-display text-xl font-medium text-[var(--fg)]">FAQ</h2>
        <dl className="mt-8">
          {page.faq.map((item) => (
            <div
              key={item.q}
              className="border-t border-[var(--line)] py-5 first:border-t-0 first:pt-0"
            >
              <dt className="font-display text-base font-medium text-[var(--fg)]">
                {item.q}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-[var(--dim)]">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm text-[var(--dim)]">
          Потрібен орієнтир по строках і бюджету — коротка заявка достатня для
          відповіді.
        </p>
        <Link
          href="/#brief"
          className="inline-flex h-12 shrink-0 items-center bg-[var(--accent)] px-6 text-sm font-medium text-[var(--accent-fg)] transition-[filter] hover:brightness-110 focus-ring"
        >
          До заявки
        </Link>
      </section>
    </SiteChrome>
  );
}
