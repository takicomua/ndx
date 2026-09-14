import Link from "next/link";
import { SiteChrome } from "@/components/site/chrome";
import { CONTACT, HERO, SERVICES, SITE } from "@/lib/constants";
import { CASE_PAGES } from "@/lib/content/cases";

export function HomePage() {
  const cases = CASE_PAGES.slice(0, 3);

  return (
    <SiteChrome active="home" flush>
      <section className="border-b border-[var(--line)] bg-[var(--ink)] text-[var(--ink-fg)]">
        <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
          <p className="text-sm text-[var(--ink-dim)]">
            {SITE.mark} · {SITE.geo}
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,9vw,5rem)] font-semibold leading-[1.05] tracking-tight">
            {SITE.brand}
          </h1>
          <p className="mt-6 text-xl text-[var(--ink-fg)] sm:text-2xl">
            {HERO.role}
          </p>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[var(--ink-dim)]">
            {HERO.pitch}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/zayavka" className="btn-primary focus-ring">
              Залишити заявку
            </Link>
            <Link href="/poslugy" className="btn-ghost focus-ring">
              Дивитись послуги
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <section className="py-20 sm:py-24">
          <p className="text-sm font-medium text-[var(--accent)]">
            {SERVICES.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {SERVICES.title}
          </h2>
          <p className="mt-3 text-[17px] leading-relaxed text-[var(--dim)]">
            {SERVICES.lead}
          </p>

          <ul className="list-plain mt-12">
            {SERVICES.items.map((item) => (
              <li key={item.href} className="py-6">
                <Link href={item.href} className="group block focus-ring">
                  <h3 className="font-display text-xl font-semibold tracking-tight group-hover:text-[var(--accent)] sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-[var(--dim)]">
                    {item.text}
                  </p>
                  <span className="mt-3 inline-block text-sm font-semibold text-[var(--accent)]">
                    Детальніше →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/poslugy"
            className="mt-4 inline-block text-sm font-semibold text-[var(--fg)] underline underline-offset-4 focus-ring"
          >
            Усі послуги
          </Link>
        </section>

        <section className="border-t border-[var(--line)] py-20 sm:py-24">
          <p className="text-sm font-medium text-[var(--accent)]">Роботи</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Приклади задач
          </h2>
          <p className="mt-3 text-[17px] leading-relaxed text-[var(--dim)]">
            Як виглядає типова робота: задача, що зробив, що на виході.
          </p>

          <ul className="list-plain mt-12">
            {cases.map((item) => (
              <li key={item.slug} className="py-6">
                <Link href={`/keysy/${item.slug}`} className="group block focus-ring">
                  <p className="text-sm text-[var(--dim)]">{item.type}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold tracking-tight group-hover:text-[var(--accent)] sm:text-2xl">
                    {item.h1}
                  </h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-[var(--dim)]">
                    {item.lead}
                  </p>
                  <span className="mt-3 inline-block text-sm font-semibold text-[var(--accent)]">
                    Читати →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/keysy"
            className="mt-4 inline-block text-sm font-semibold text-[var(--fg)] underline underline-offset-4 focus-ring"
          >
            Усі роботи
          </Link>
        </section>

        <section className="border-t border-[var(--line)] py-20 sm:py-24">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {CONTACT.title}
          </h2>
          <p className="mt-3 text-[17px] text-[var(--dim)]">{CONTACT.place}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/zayavka" className="btn-primary focus-ring">
              Заявка
            </Link>
            <Link href="/kontakt" className="btn-line focus-ring">
              Контакти
            </Link>
          </div>
        </section>
      </div>
    </SiteChrome>
  );
}
