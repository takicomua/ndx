import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { SERVICE_PAGES } from "@/lib/content/services";
import { buildPageMetadata } from "@/lib/page-meta";

const SERVICE_IMAGES = [
  "/images/svc-landing.png",
  "/images/svc-shop.png",
  "/images/svc-system.png",
  "/images/svc-repair.png",
] as const;

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

      <div className="section-band !px-0">
        <h1>Послуги</h1>
      </div>

      <div className="product-grid">
        {SERVICE_PAGES.map((item, i) => (
          <Link
            key={item.slug}
            href={`/poslugy/${item.slug}`}
            className="product-card focus-ring"
          >
            <div className="product-card__media relative aspect-[4/3] overflow-hidden">
              <Image
                src={SERVICE_IMAGES[i] ?? SERVICE_IMAGES[0]}
                alt=""
                fill
                sizes="(max-width:640px) 100vw, 640px"
                className="object-cover"
              />
              <span className="product-card__shade" aria-hidden />
            </div>
            <p className="product-card__meta">
              {item.pricing.ranges[0]?.price} · {item.pricing.ranges[0]?.time}
            </p>
            <h2 className="product-card__title">{item.shortTitle}</h2>
            <p className="product-card__price">{item.lead}</p>
          </Link>
        ))}
      </div>

      <div className="px-0 pb-10">
        <Link href="/zayavka" className="btn-primary focus-ring">
          Залишити заявку
        </Link>
      </div>
    </SiteChrome>
  );
}
