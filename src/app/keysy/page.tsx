import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { CASE_PAGES } from "@/lib/content/cases";
import { buildPageMetadata } from "@/lib/page-meta";

const CASE_IMAGES: Record<string, string> = {
  "lending-pid-reklamu": "/images/case-landing.png",
  "magazyn-mvp": "/images/case-shop.png",
  "kabinet-komandy": "/images/case-cabinet.png",
  "stabilizaciya-proektu": "/images/case-fix.png",
};

export const metadata: Metadata = buildPageMetadata({
  title: "Роботи — кейси сайтів, магазинів, кабінетів",
  description:
    "Кейси NDX: лендінги, інтернет-магазини, кабінети, ремонт проєктів. Ніша, стек, докази результату (деталі клієнтів за NDA).",
  path: "/keysy",
});

export default function CasesIndexPage() {
  return (
    <SiteChrome active="keysy">
      <PageJsonLd
        type="CollectionPage"
        name="Роботи NDX"
        description="Кейси: сайти, магазини, кабінети, ремонт — з доказами й стеком."
        path="/keysy"
        breadcrumbs={[
          { name: "NDX", path: "/" },
          { name: "Роботи", path: "/keysy" },
        ]}
      />

      <div className="section-band !px-0">
        <h1>Роботи / кейси</h1>
      </div>

      <div className="product-grid">
        {CASE_PAGES.map((item) => (
          <Link
            key={item.slug}
            href={`/keysy/${item.slug}`}
            className="product-card focus-ring"
          >
            <div className="product-card__media relative aspect-[4/3] overflow-hidden">
              <Image
                src={CASE_IMAGES[item.slug] ?? "/images/case-landing.png"}
                alt=""
                fill
                sizes="(max-width:640px) 100vw, (max-width:900px) 90vw, 560px"
                className="object-cover"
              />
              <span className="product-card__shade" aria-hidden />
            </div>
            <p className="product-card__meta">
              {item.year} · {item.niche}
            </p>
            <h2 className="product-card__title">{item.h1}</h2>
            <p className="product-card__price">{item.lead}</p>
          </Link>
        ))}
      </div>

      <div className="px-0 pb-10">
        <Link href="/zayavka" className="btn-primary focus-ring">
          Обговорити задачу
        </Link>
      </div>
    </SiteChrome>
  );
}
