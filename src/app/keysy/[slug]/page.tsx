import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { BriefLink } from "@/components/site/brief-link";
import { SiteChrome } from "@/components/site/chrome";
import { CASE_PAGES, getCaseBySlug } from "@/lib/content/cases";
import { getServiceBySlug } from "@/lib/content/services";
import { pageMetadata } from "@/lib/page-meta";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_PAGES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getCaseBySlug(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/keysy/${page.slug}`,
    type: "article",
  });
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const page = getCaseBySlug(slug);
  if (!page) notFound();

  const path = `/keysy/${page.slug}`;
  const related = page.services
    .map((s) => getServiceBySlug(s))
    .filter(Boolean);
  const otherCases = CASE_PAGES.filter((c) => c.slug !== page.slug);

  return (
    <SiteChrome active="keysy">
      <PageJsonLd
        type="Article"
        name={page.title}
        description={page.description}
        path={path}
        breadcrumbs={[
          { name: "NDX", path: "/" },
          { name: "Кейси", path: "/keysy" },
          { name: page.h1, path },
        ]}
      />

      <article>
        <header className="border-b border-[var(--line)] py-16 sm:py-20">
          <nav
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--dim)]"
            aria-label="Хлібні крихти"
          >
            <Link href="/" className="hover:text-[var(--accent)] focus-ring">
              ndx
            </Link>
            <span className="mx-2 text-[var(--fg)]/20">/</span>
            <Link href="/keysy" className="hover:text-[var(--accent)] focus-ring">
              кейси
            </Link>
            <span className="mx-2 text-[var(--fg)]/20">/</span>
            <span>{page.h1}</span>
          </nav>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(1.9rem,5vw,3rem)] font-medium tracking-tight text-[var(--fg)]">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[var(--dim)]">
            {page.lead}
          </p>
        </header>

        <section className="border-b border-[var(--line)] py-12">
          <h2 className="font-display text-lg font-medium text-[var(--fg)]">
            Контекст
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--dim)]">
            {page.context}
          </p>
        </section>

        <section className="border-b border-[var(--line)] py-12">
          <h2 className="font-display text-lg font-medium text-[var(--fg)]">
            Підхід
          </h2>
          <ol className="mt-6 space-y-4">
            {page.approach.map((step, i) => (
              <li key={step} className="grid grid-cols-[3rem_1fr] gap-3">
                <span className="font-mono text-[11px] text-[var(--accent)]">
                  0{i + 1}
                </span>
                <p className="text-sm leading-relaxed text-[var(--dim)]">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-b border-[var(--line)] py-12">
          <h2 className="font-display text-lg font-medium text-[var(--fg)]">
            Результат
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--dim)]">
            {page.result}
          </p>
        </section>

        {related.length ? (
          <section className="border-b border-[var(--line)] py-12">
            <h2 className="font-display text-lg font-medium text-[var(--fg)]">
              Пов’язані послуги
            </h2>
            <ul className="mt-5 flex flex-wrap gap-4">
              {related.map((s) =>
                s ? (
                  <li key={s.slug}>
                    <Link
                      href={`/poslugy/${s.slug}`}
                      className="font-mono text-[11px] tracking-[0.12em] text-[var(--dim)] transition-colors hover:text-[var(--accent)] focus-ring"
                    >
                      {s.shortTitle} →
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </section>
        ) : null}

        <section className="border-b border-[var(--line)] py-12">
          <h2 className="font-display text-lg font-medium text-[var(--fg)]">
            Інші підходи
          </h2>
          <ul className="mt-5 flex flex-wrap gap-4">
            {otherCases.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/keysy/${item.slug}`}
                  className="font-mono text-[11px] tracking-[0.12em] text-[var(--dim)] transition-colors hover:text-[var(--accent)] focus-ring"
                >
                  {item.h1} →
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm text-[var(--dim)]">
            Схожа задача — напишіть коротко в Brief.
          </p>
          <BriefLink
            type={page.leadType}
            className="inline-flex h-12 shrink-0 items-center bg-[var(--accent)] px-6 text-sm font-medium text-[var(--accent-fg)] transition-[filter] hover:brightness-110 focus-ring"
          >
            До заявки
          </BriefLink>
        </section>
      </article>
    </SiteChrome>
  );
}
