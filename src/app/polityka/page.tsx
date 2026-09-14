import type { Metadata } from "next";
import Link from "next/link";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { CONTACTS, SITE } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = buildPageMetadata({
  title: "Політика конфіденційності",
  description: "Як обробляю дані із заявок на ndx.com.ua.",
  path: "/polityka",
});

export default function PrivacyPage() {
  return (
    <SiteChrome active="polityka">
      <PageJsonLd
        type="WebPage"
        name="Політика конфіденційності"
        description="Обробка даних на сайті NDX."
        path="/polityka"
        breadcrumbs={[
          { name: "NDX", path: "/" },
          { name: "Політика", path: "/polityka" },
        ]}
      />

      <article className="mx-auto max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-4xl font-semibold tracking-tight">
          Політика конфіденційності
        </h1>
        <p className="mt-3 text-sm text-[var(--dim)]">
          Оновлено: вересень 2026 · {SITE.domain}
        </p>

        <div className="mt-10 space-y-8 text-[16px] leading-relaxed text-[var(--dim)]">
          <section>
            <h2 className="font-semibold text-[var(--fg)]">Хто відповідає</h2>
            <p className="mt-2">
              Сайт {SITE.domain} (NDX · {SITE.brand}). Питання:{" "}
              <a href={`mailto:${CONTACTS.email}`} className="text-[var(--accent)]">
                {CONTACTS.email}
              </a>
              .
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-[var(--fg)]">Які дані</h2>
            <p className="mt-2">
              З форми заявки: ім’я, контакт, опис задачі, тип, бюджет, строки.
              У логах сервера можуть бути IP і час запиту.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-[var(--fg)]">Навіщо</h2>
            <p className="mt-2">
              Щоб відповісти на запит і оцінити роботу. Дані не продаю й не
              розсилаю рекламу без згоди.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-[var(--fg)]">Зберігання</h2>
            <p className="mt-2">
              Заявки тримаю стільки, скільки потрібно для відповіді по задачі
              (зазвичай кілька місяців), якщо немає іншої домовленості.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-[var(--fg)]">Ваші права</h2>
            <p className="mt-2">
              Можете попросити доступ, виправлення або видалення — напишіть на{" "}
              {CONTACTS.email}.
            </p>
          </section>
        </div>

        <p className="mt-12">
          <Link href="/kontakt" className="text-sm font-semibold text-[var(--accent)] focus-ring">
            ← Контакти
          </Link>
        </p>
      </article>
    </SiteChrome>
  );
}
