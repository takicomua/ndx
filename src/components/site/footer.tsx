import Link from "next/link";
import { CONTACTS, NAV, SERVICES, SITE } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">{SITE.mark}</p>
          <p className="mt-2 text-sm text-[var(--ink-dim)]">{SITE.tagline}</p>
          <p className="mt-4 text-sm text-[var(--ink-dim)]">{SITE.geo}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Розділи</p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="focus-ring">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/zayavka" className="focus-ring">
                Заявка
              </Link>
            </li>
            <li>
              <Link href="/polityka" className="focus-ring">
                Політика
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Послуги</p>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.items.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="focus-ring">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm">
            <a href={`mailto:${CONTACTS.email}`} className="focus-ring">
              {CONTACTS.email}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--ink-line)]">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-5 text-sm text-[var(--ink-dim)] sm:flex-row sm:justify-between sm:px-8">
          <span>
            © {year} {SITE.brand}
          </span>
          <Link href="/polityka" className="focus-ring">
            Політика конфіденційності
          </Link>
        </div>
      </div>
    </footer>
  );
}
