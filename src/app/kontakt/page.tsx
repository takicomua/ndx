import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import {
  CONTACT,
  CONTACTS,
  SITE,
  TESTIMONIALS,
} from "@/lib/constants";
import { buildPageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = buildPageMetadata({
  title: "Контакти — NDX · Київ / remote",
  description:
    "Зв’язок з NDX · DIACHENKO: email, Telegram, заявка. Київ · remote · Україна.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <SiteChrome active="kontakt">
      <PageJsonLd
        type="ContactPage"
        name="Контакти NDX"
        description={CONTACT.text}
        path="/kontakt"
        breadcrumbs={[
          { name: "NDX", path: "/" },
          { name: "Контакти", path: "/kontakt" },
        ]}
      />

      <div className="section-band">
        <h1>Контакти</h1>
      </div>

      <div className="contact-grid">
        <a
          href={CONTACTS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="cat-banner contact-grid__primary focus-ring"
        >
          <span className="cat-banner__media" aria-hidden>
            <Image
              src="/images/contact-telegram.png"
              alt=""
              fill
              sizes="(max-width:700px) 100vw, 420px"
              className="object-cover"
              priority
            />
          </span>
          <span className="cat-banner__shade" aria-hidden />
          <span className="cat-banner__label">Telegram · написати</span>
        </a>

        <a
          href={`mailto:${CONTACTS.email}`}
          className="cat-banner contact-grid__secondary focus-ring"
        >
          <span className="cat-banner__media" aria-hidden>
            <Image
              src="/images/contact-email.png"
              alt=""
              fill
              sizes="(max-width:700px) 100vw, 420px"
              className="object-cover"
              priority
            />
          </span>
          <span className="cat-banner__shade" aria-hidden />
          <span className="cat-banner__label">Email · {CONTACTS.email}</span>
        </a>

        <div className="contact-grid__meta">
          <div>
            <strong>{SITE.brandLine}</strong>
            <p>{CONTACT.place}</p>
            <p>Розробка сайтів, магазинів і систем · Київ / remote</p>
          </div>
          <Link href="/zayavka" className="btn-primary focus-ring self-start">
            Залишити заявку
          </Link>
        </div>
      </div>

      <div className="section-band">
        <h2>Відгуки</h2>
      </div>

      <div className="quote-grid">
        {TESTIMONIALS.map((t) => (
          <figure key={t.who} className="quote-card">
            <blockquote className="text-[1rem] leading-relaxed text-[#cfcfcf]">
              «{t.quote}»
            </blockquote>
            <figcaption className="mt-3 text-[13px] font-semibold uppercase tracking-wide">
              {t.who}
              <span className="font-normal normal-case tracking-normal text-[#9a9a9a]">
                {" "}
                · {t.context}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </SiteChrome>
  );
}
