import type { Metadata } from "next";
import Link from "next/link";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { getPostsSorted } from "@/lib/content/blog";
import { buildPageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = buildPageMetadata({
  title: "Блог — ціни, стек, як замовити сайт",
  description:
    "Статті NDX: скільки коштує лендінг і магазин, Next.js vs WordPress, як замовити сайт під ключ в Україні.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getPostsSorted();

  return (
    <SiteChrome active="blog">
      <PageJsonLd
        type="CollectionPage"
        name="Блог NDX"
        description="Long-tail статті про розробку сайтів, ціни й вибір стеку."
        path="/blog"
        breadcrumbs={[
          { name: "NDX", path: "/" },
          { name: "Блог", path: "/blog" },
        ]}
      />

      <section className="mx-auto max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Блог</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--dim)]">
          Практичні відповіді на запити на кшталт «скільки коштує…» і «як
          замовити сайт» — без обіцянок топ-1 за тиждень.
        </p>

        <ul className="list-plain mt-12">
          {posts.map((post) => (
            <li key={post.slug} className="py-6">
              <Link href={`/blog/${post.slug}`} className="group block focus-ring">
                <p className="text-sm text-[var(--dim)]">
                  {post.date} · {post.readMinutes} хв
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight group-hover:text-[var(--accent)]">
                  {post.h1}
                </h2>
                <p className="mt-2 text-[16px] leading-relaxed text-[var(--dim)]">
                  {post.lead}
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
