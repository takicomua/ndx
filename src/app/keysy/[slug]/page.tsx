import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { CASE_PAGES, getCaseBySlug } from "@/lib/content/cases";
import { getServiceBySlug } from "@/lib/content/services";
import { buildPageMetadata } from "@/lib/page-meta";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_PAGES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getCaseBySlug(slug);
  if (!page) return {};
  return buildPageMetadata({
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
  const related = page.services.map((s) => getServiceBySlug(s)).filter(Boolean);

  return (
    <SiteChrome active="keysy">
      <PageJsonLd
        type="Article"
        name={page.title}
        description={page.description}
        path={path}
        breadcrumbs={[
          { name: "NDX", path: "/" },
          { name: "Роботи", path: "/keysy" },
          { name: page.h1, path },
        ]}
      />

      <article className="mx-auto max-w-3xl py-16 sm:py-20">
        <p className="text-sm text-[var(--dim)]">
          <Link href="/keysy" className="hover:text-[var(--accent)] focus-ring">
            Роботи
          </Link>
          <span className="mx-2">/</span>
          {page.type}
          <span className="mx-2">·</span>
          {page.year}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
          {page.h1}
        </h1>
        <p className="mt-2 text-sm text-[var(--dim)]">
          {page.niche}
          {page.nda ? " · деталі клієнта за NDA" : null}
        </p>
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--dim)]">
          {page.lead}
        </p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {page.metrics.map((m) => (
            <div key={m.label}>
              <dt className="text-xs uppercase tracking-[0.12em] text-[var(--dim)]">
                {m.label}
              </dt>
              <dd className="mt-1 font-semibold text-[var(--fg)]">{m.value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-14 font-display text-2xl font-semibold">Задача</h2>
        <p className="mt-3 text-[16px] leading-relaxed text-[var(--dim)]">
          {page.task}
        </p>

        <h2 className="mt-14 font-display text-2xl font-semibold">Що зробив</h2>
        <ol className="mt-4 space-y-2 text-[16px] text-[var(--dim)]">
          {page.solution.map((step, i) => (
            <li key={step}>
              {i + 1}. {step}
            </li>
          ))}
        </ol>

        <h2 className="mt-14 font-display text-2xl font-semibold">Результат</h2>
        <p className="mt-3 text-[16px] leading-relaxed text-[var(--dim)]">
          {page.result}
        </p>

        <h2 className="mt-14 font-display text-2xl font-semibold">Докази / артефакти</h2>
        <ul className="mt-4 space-y-2 text-[16px] text-[var(--dim)]">
          {page.evidence.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>

        <h2 className="mt-14 font-display text-2xl font-semibold">Стек</h2>
        <p className="mt-3 text-[16px] text-[var(--dim)]">{page.stack.join(" · ")}</p>

        {related.length ? (
          <p className="mt-10 text-sm text-[var(--dim)]">
            Послуга:{" "}
            {related.map((s, i) =>
              s ? (
                <span key={s.slug}>
                  {i > 0 ? ", " : null}
                  <Link
                    href={`/poslugy/${s.slug}`}
                    className="font-semibold text-[var(--accent)] focus-ring"
                  >
                    {s.shortTitle}
                  </Link>
                </span>
              ) : null,
            )}
          </p>
        ) : null}

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link href="/zayavka" className="btn-primary focus-ring">
            Схожа задача
          </Link>
          <Link href="/keysy" className="text-sm font-semibold focus-ring">
            ← Усі роботи
          </Link>
        </div>
      </article>
    </SiteChrome>
  );
}
