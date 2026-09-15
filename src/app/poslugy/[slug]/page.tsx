import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { getPostBySlug } from "@/lib/content/blog";
import { getCaseBySlug } from "@/lib/content/cases";
import { getServiceBySlug, SERVICE_PAGES } from "@/lib/content/services";
import { buildPageMetadata } from "@/lib/page-meta";
import { zayavkaHref } from "@/lib/utm";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServiceBySlug(slug);
  if (!page) return {};
  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: `/poslugy/${page.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const page = getServiceBySlug(slug);
  if (!page) notFound();
  const path = `/poslugy/${page.slug}`;
  const relatedCases = page.relatedCaseSlugs
    .map((s) => getCaseBySlug(s))
    .filter(Boolean);
  const relatedPosts = page.relatedPostSlugs
    .map((s) => getPostBySlug(s))
    .filter(Boolean);
  const applyHref = zayavkaHref(page.leadType);

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
        offers={page.pricing.ranges.map((r) => ({
          name: r.name,
          price: r.price,
          description: r.time,
        }))}
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

        <div className="mt-8 space-y-4 text-[16px] leading-relaxed text-[var(--dim)]">
          {page.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl font-semibold">Кому підходить</h2>
        <ul className="mt-5 space-y-2 text-[16px] text-[var(--dim)]">
          {page.forWhom.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>

        <h2 className="mt-14 font-display text-2xl font-semibold">Що входить</h2>
        <ul className="mt-5 space-y-2 text-[16px] text-[var(--dim)]">
          {page.includes.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[var(--dim)]">
          Зазвичай не входить: {page.notIncludes.join("; ").toLowerCase()}.
        </p>

        <h2 className="mt-14 font-display text-2xl font-semibold">
          {page.pricing.label} цін і строків
        </h2>
        <p className="mt-3 text-[16px] leading-relaxed text-[var(--dim)]">
          {page.pricing.note}
        </p>
        <ul className="mt-6 space-y-4">
          {page.pricing.ranges.map((r) => (
            <li
              key={r.name}
              className="border-b border-[var(--line)] pb-4 last:border-0"
            >
              <p className="font-semibold text-[var(--fg)]">{r.name}</p>
              <p className="mt-1 text-[16px] text-[var(--dim)]">
                {r.price}
                <span className="mx-2 text-[var(--line)]">·</span>
                {r.time}
              </p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-display text-2xl font-semibold">Що отримаєте</h2>
        <ul className="mt-5 space-y-2 text-[16px] text-[var(--dim)]">
          {page.outcomes.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>

        <h2 className="mt-14 font-display text-2xl font-semibold">Як проходить</h2>
        <ol className="book-toc mt-5">
          {page.process.map((step, i) => (
            <li key={step.t}>
              <span className="book-toc__n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="book-toc__t">{step.t}</p>
                <p className="book-toc__d">{step.d}</p>
              </div>
            </li>
          ))}
        </ol>

        {relatedCases.length ? (
          <>
            <h2 className="mt-14 font-display text-2xl font-semibold">Приклади робіт</h2>
            <ul className="mt-5 space-y-3">
              {relatedCases.map((c) =>
                c ? (
                  <li key={c.slug}>
                    <Link
                      href={`/keysy/${c.slug}`}
                      className="font-semibold text-[var(--accent)] focus-ring"
                    >
                      {c.h1} →
                    </Link>
                    <p className="mt-1 text-sm text-[var(--dim)]">{c.lead}</p>
                  </li>
                ) : null,
              )}
            </ul>
          </>
        ) : null}

        {relatedPosts.length ? (
          <>
            <h2 className="mt-14 font-display text-2xl font-semibold">
              Читати також
            </h2>
            <ul className="mt-5 space-y-3">
              {relatedPosts.map((p) =>
                p ? (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="font-semibold text-[var(--accent)] focus-ring"
                    >
                      {p.h1} →
                    </Link>
                    <p className="mt-1 text-sm text-[var(--dim)]">{p.lead}</p>
                  </li>
                ) : null,
              )}
            </ul>
          </>
        ) : null}

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
          <Link href={applyHref} className="btn-primary focus-ring">
            Заявка / орієнтир
          </Link>
          <Link href="/poslugy" className="text-sm font-semibold focus-ring">
            ← Усі послуги
          </Link>
        </div>
      </article>
    </SiteChrome>
  );
}
