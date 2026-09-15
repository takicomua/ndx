import Image from "next/image";
import Link from "next/link";
import { FaqPageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import {
  CONTACT,
  CONTACTS,
  FAQ,
  HERO,
  SERVICES,
  SITE,
} from "@/lib/constants";
import { CASE_PAGES } from "@/lib/content/cases";

const SERVICE_IMAGES = [
  "/images/svc-landing.png",
  "/images/svc-shop.png",
  "/images/svc-system.png",
  "/images/svc-repair.png",
] as const;

const CASE_IMAGES: Record<string, string> = {
  "lending-pid-reklamu": "/images/case-landing.png",
  "magazyn-mvp": "/images/case-shop.png",
  "kabinet-komandy": "/images/case-cabinet.png",
  "stabilizaciya-proektu": "/images/case-fix.png",
};

export function HomePage() {
  const cases = CASE_PAGES.slice(0, 4);

  return (
    <SiteChrome active="home" flush>
      <FaqPageJsonLd items={FAQ.items} />
      <section className="look-hero">
        <div className="look-hero__visual" aria-hidden />
        <div className="look-hero__badge">
          <p className="look-hero__mark">{SITE.mark}</p>
          <h1 className="look-hero__title">
            New
            <br />
            drop
            <br />
            {SITE.brand}
          </h1>
        </div>
      </section>

      <div className="site-rail">
        <div className="section-band">
          <h2>{HERO.role}</h2>
        </div>

        <div className="cat-stack">
          <Link
            href="/poslugy"
            className="cat-banner relative aspect-square overflow-hidden focus-ring"
          >
            <span className="cat-banner__media absolute inset-0" aria-hidden>
              <Image
                src="/images/cat-services.png"
                alt=""
                fill
                sizes="(max-width:640px) 100vw, 360px"
                className="object-cover"
                priority
              />
            </span>
            <span className="cat-banner__shade" aria-hidden />
            <span className="cat-banner__label">Послуги · під ключ</span>
          </Link>
          <Link
            href="/keysy"
            className="cat-banner relative aspect-square overflow-hidden focus-ring"
          >
            <span className="cat-banner__media absolute inset-0" aria-hidden>
              <Image
                src="/images/cat-works.png"
                alt=""
                fill
                sizes="(max-width:640px) 100vw, 360px"
                className="object-cover"
                priority
              />
            </span>
            <span className="cat-banner__shade" aria-hidden />
            <span className="cat-banner__label">Роботи · кейси</span>
          </Link>
        </div>

        <div className="section-band">
          <h2>Що роблю</h2>
        </div>

        <div className="product-grid product-grid--lead">
          {SERVICES.items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
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
              <p className="product-card__meta">{item.tags}</p>
              <h3 className="product-card__title">{item.title}</h3>
              <p className="product-card__price">{item.text}</p>
            </Link>
          ))}
        </div>

        <div className="philosophy-wrap py-14 text-center sm:py-20">
          <p className="text-[1.1rem] leading-relaxed text-[#cfcfcf] sm:text-[1.3rem] sm:leading-[1.65]">
            {HERO.pitch}
          </p>
          <Link href="/pro-mene" className="btn-ghost mt-8 inline-flex focus-ring">
            {SITE.brandLine}
          </Link>
        </div>

        <div className="section-band">
          <h2>Популярні кейси</h2>
        </div>

        <div className="product-grid product-grid--lead">
          {cases.map((item) => (
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
                  sizes="(max-width:640px) 100vw, 640px"
                  className="object-cover"
                />
                <span className="product-card__shade" aria-hidden />
              </div>
              <p className="product-card__meta">
                {item.year} · {item.niche}
              </p>
              <h3 className="product-card__title">{item.h1}</h3>
              <p className="product-card__price">{item.lead}</p>
            </Link>
          ))}
        </div>

        <div className="feat-row">
          <div className="feat-cell">
            <h3>Один виконавець</h3>
            <p>Від брифу до запуску — без розриву відповідальності.</p>
          </div>
          <div className="feat-cell">
            <h3>Під ключ</h3>
            <p>Структура, код, дані, деплой — робочий продукт на виході.</p>
          </div>
          <div className="feat-cell">
            <h3>Київ / remote</h3>
            <p>Працюю з бізнесом в Україні й на відстані.</p>
          </div>
        </div>

        <div id="faq" className="section-band scroll-mt-24">
          <h2>{FAQ.title}</h2>
        </div>
        <div className="about-faq">
          {FAQ.items.map((item) => (
            <article key={item.q} className="about-card">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>

        <section className="cta-block">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-white/70">
            {SITE.mark}
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.5rem,5vw,2.2rem)] font-bold tracking-tight text-white">
            {CONTACT.title}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[0.95rem] text-white/75">
            {CONTACT.place}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/zayavka"
              className="inline-flex h-11 items-center rounded-full bg-white px-5 text-[14px] font-semibold text-[var(--accent)] focus-ring"
            >
              Заявка
            </Link>
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-full bg-white/15 px-5 text-[14px] font-semibold text-white focus-ring"
            >
              {CONTACT.ctaSecondary}
            </a>
          </div>
        </section>
      </div>
    </SiteChrome>
  );
}
