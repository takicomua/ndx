import type { Metadata } from "next";
import Link from "next/link";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { CONTACT, CONTACTS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Зв’язок з NDX · DIACHENKO: email, Telegram, заявка.",
  alternates: { canonical: `${SITE.url}/kontakt` },
};

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
        <p className="mt-2 text-sm text-[var(--dim)]">{CONTACT.place}</p>

        <ul className="mt-12 space-y-6 text-[17px]">
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
