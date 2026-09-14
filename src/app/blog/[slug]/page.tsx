import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { BLOG_POSTS, getPostBySlug } from "@/lib/content/blog";
import { getServiceBySlug } from "@/lib/content/services";
import { buildPageMetadata } from "@/lib/page-meta";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const related = post.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter(Boolean);

  return (
    <SiteChrome active="blog">
      <PageJsonLd
        type="Article"
        name={post.title}
        description={post.description}
        path={path}
        datePublished={post.date}
        breadcrumbs={[
          { name: "NDX", path: "/" },
          { name: "Блог", path: "/blog" },
          { name: post.h1, path },
        ]}
      />

      <article className="mx-auto max-w-3xl py-16 sm:py-20">
        <p className="text-sm text-[var(--dim)]">
          <Link href="/blog" className="hover:text-[var(--accent)] focus-ring">
            Блог
          </Link>
          <span className="mx-2">/</span>
          {post.date} · {post.readMinutes} хв читання
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
          {post.h1}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--dim)]">
          {post.lead}
        </p>

        {post.sections.map((section) => (
          <section key={section.h} className="mt-12">
            <h2 className="font-display text-2xl font-semibold">{section.h}</h2>
            <div className="mt-4 space-y-3 text-[16px] leading-relaxed text-[var(--dim)]">
              {section.p.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </section>
        ))}

        {related.length ? (
          <aside className="mt-14 border-t border-[var(--line)] pt-10">
            <h2 className="font-display text-2xl font-semibold">Далі по темі</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--dim)]">
              Якщо плануєте запуск, а не лише теорію — дивіться{" "}
              {related.map((s, i) =>
                s ? (
                  <span key={s.slug}>
                    {i > 0 ? (i === related.length - 1 ? " або " : ", ") : null}
                    <Link
                      href={`/poslugy/${s.slug}`}
                      className="font-semibold text-[var(--accent)] focus-ring"
                    >
                      {s.shortTitle.toLowerCase()}
                    </Link>
                  </span>
                ) : null,
              )}
              . Орієнтир по строках і бюджету — через{" "}
              <Link
                href={post.cta.href}
                className="font-semibold text-[var(--accent)] focus-ring"
              >
                заявку
              </Link>
              .
            </p>
          </aside>
        ) : null}

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link href={post.cta.href} className="btn-primary focus-ring">
            {post.cta.text}
          </Link>
          <Link href="/blog" className="text-sm font-semibold focus-ring">
            ← Усі статті
          </Link>
        </div>
      </article>
    </SiteChrome>
  );
}
