import type { Metadata } from "next";
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
    "Зв’язок з NDX · DIACHENKO: email, Telegram, заявка. Київ · remote · Україна. Google Business — у процесі / за посиланням у профілі.",
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

      <section className="mx-auto max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-4xl font-semibold tracking-tight">
          Контакти
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--dim)]">
          {CONTACT.title}
        </p>

        <div className="mt-8 border-y border-[var(--line)] py-6 text-[16px] leading-relaxed">
          <p className="font-semibold text-[var(--fg)]">
            {SITE.mark} · {SITE.brand}
          </p>
          <p className="mt-2 text-[var(--dim)]">{CONTACT.place}</p>
          <p className="mt-1 text-[var(--dim)]">
            Розробка сайтів, магазинів і систем · обслуговуємо Україну (Київ /
            remote)
          </p>
        </div>

        <ul className="mt-10 space-y-6 text-[17px]">
          <li>
            <p className="text-sm text-[var(--dim)]">Email</p>
            <a
              href={`mailto:${CONTACTS.email}`}
              className="font-medium text-[var(--fg)] hover:text-[var(--accent)] focus-ring"
            >
              {CONTACTS.email}
            </a>
          </li>
          <li>
            <p className="text-sm text-[var(--dim)]">Telegram</p>
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--fg)] hover:text-[var(--accent)] focus-ring"
            >
              Написати в Telegram →
            </a>
          </li>
          <li>
            <p className="text-sm text-[var(--dim)]">GitHub</p>
            <a
              href={CONTACTS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--fg)] hover:text-[var(--accent)] focus-ring"
            >
              Профіль на GitHub →
            </a>
          </li>
        </ul>

        <h2 className="mt-16 font-display text-2xl font-semibold">Відгуки</h2>
        <p className="mt-3 text-sm text-[var(--dim)]">
          Узагальнені формулювання (без публічних брендів). Більше відгуків —
          у Google Business Profile після підключення картки.
        </p>
        <ul className="mt-8 space-y-8">
          {TESTIMONIALS.map((t) => (
            <li key={t.who}>
              <blockquote className="text-[16px] leading-relaxed text-[var(--dim)]">
                «{t.quote}»
              </blockquote>
              <p className="mt-2 text-sm font-semibold text-[var(--fg)]">
                {t.who}
                <span className="font-normal text-[var(--dim)]">
                  {" "}
                  · {t.context}
                </span>
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Link href="/zayavka" className="btn-primary focus-ring">
            Залишити заявку
          </Link>
        </div>

        <p className="mt-10 text-sm text-[var(--dim)]">
          Як обробляю дані — у{" "}
          <Link href="/polityka" className="text-[var(--accent)] focus-ring">
            політиці
          </Link>
          .
        </p>
      </section>
    </SiteChrome>
  );
}
