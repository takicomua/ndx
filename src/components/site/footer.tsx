import Link from "next/link";
import { CONTACTS, NAV, SERVICES, SITE } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-rail flex flex-col gap-10 py-12 md:flex-row md:justify-between">
        <div>
          <p className="font-display text-2xl font-bold tracking-[0.16em]">
            {SITE.mark}
          </p>
          <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-[var(--ink-dim)]">
            {SITE.brandLine} · {SITE.tagline}
          </p>
          <p className="mt-2 text-[13px] text-[var(--ink-dim)]">{SITE.geo}</p>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ink-dim)]">
              Розділи
            </p>
            <ul className="mt-4 space-y-2 text-[14px]">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="focus-ring">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ink-dim)]">
              Контакт
            </p>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li>
                <a href={`mailto:${CONTACTS.email}`} className="focus-ring">
                  {CONTACTS.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACTS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring"
                >
                  Telegram
                </a>
              </li>
              <li>
                <Link href="/polityka" className="focus-ring">
                  Політика
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="site-rail grid grid-cols-2 gap-4 pb-8 md:grid-cols-4">
        {SERVICES.items.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="text-[13px] text-[var(--ink-dim)] focus-ring"
          >
            {s.title}
          </Link>
        ))}
      </div>
      <div className="border-t border-[var(--ink-line)]">
        <div className="site-rail flex justify-between py-4 text-[12px] text-[var(--ink-dim)]">
          <span>
            © {year} {SITE.brandLine}
          </span>
          <span>{SITE.domain}</span>
        </div>
      </div>
    </footer>
  );
}
