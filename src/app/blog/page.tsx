import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { getPostsSorted } from "@/lib/content/blog";
import { buildPageMetadata } from "@/lib/page-meta";

const BLOG_IMAGES: Record<string, string> = {
  "yak-zamovyty-sayt-pid-klyuch": "/images/blog-order.png",
  "nextjs-chy-wordpress": "/images/blog-next-wp.png",
  "skilky-koshtuye-internet-magazyn": "/images/blog-shop-cost.png",
  "skilky-koshtuye-lending-ukrayina": "/images/blog-landing-cost.png",
};

export const metadata: Metadata = buildPageMetadata({
  title: "Блог — ціни, лендінг під Ads, як замовити сайт",
  description:
    "Статті NDX: скільки коштує сайт під ключ, лендінг під Google Ads, ціни на магазин, Next.js vs шаблон, як замовити сайт в Україні.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getPostsSorted();

  return (
    <SiteChrome active="blog">
      <PageJsonLd
        type="CollectionPage"
        name="Блог NDX"
        description="Long-tail статті про розробку сайтів, ціни, лендінг під Ads і вибір стеку."
        path="/blog"
        breadcrumbs={[
          { name: "NDX", path: "/" },
          { name: "Блог", path: "/blog" },
        ]}
      />

      <div className="section-band">
        <h1>Блог</h1>
      </div>
      <p className="about-intro__lead !mb-8 text-center">
        Практичні відповіді на запити на кшталт «скільки коштує сайт під ключ»
        і «лендінг під Google Ads» — без обіцянок топ-1 за тиждень.
      </p>

      <div className="product-grid">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="product-card focus-ring"
          >
            <div className="product-card__media relative aspect-[4/3] overflow-hidden">
              <Image
                src={BLOG_IMAGES[post.slug] ?? "/images/blog-order.png"}
                alt=""
                fill
                sizes="(max-width:640px) 100vw, (max-width:900px) 90vw, 560px"
                className="object-cover"
              />
              <span className="product-card__shade" aria-hidden />
              <span className="product-card__badge">{post.readMinutes}′</span>
            </div>
            <p className="product-card__meta">{post.date}</p>
            <h2 className="product-card__title">{post.h1}</h2>
            <p className="product-card__price">{post.lead}</p>
          </Link>
        ))}
      </div>
    </SiteChrome>
  );
}
