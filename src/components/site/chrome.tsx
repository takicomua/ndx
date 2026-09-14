import Link from "next/link";
import type { ReactNode } from "react";
import { BriefLink } from "@/components/site/brief-link";
import { SITE } from "@/lib/constants";

const INNER_NAV = [
  { href: "/poslugy", label: "Scope" },
  { href: "/keysy", label: "Keys" },
  { href: "/brief", label: "Brief" },
  { href: "/#faq", label: "FAQ" },
] as const;

export function SiteChrome({
  children,
  active,
}: {
  children: ReactNode;
  active?: "poslugy" | "keysy" | "brief";
}) {
  const year = new Date().getFullYear();

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-black text-[var(--fg)]">
      <div
        className="pointer-events-none fixed inset-0 -z-10 site-atmosphere"
        aria-hidden
      />
      <header className="relative z-20 border-b border-[var(--line)]/80">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[0.2em] text-[var(--dim)] transition-colors hover:text-[var(--accent)] focus-ring"
          >
            <span className="text-[var(--accent)]">{SITE.signature}</span>
            <span className="mx-2 hidden text-[var(--fg)]/20 sm:inline">·</span>
            <span className="hidden sm:inline">{SITE.tagline}</span>
          </Link>
          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Навігація"
          >
            {INNER_NAV.map((item) => {
              const isActive =
                (active === "poslugy" && item.href === "/poslugy") ||
                (active === "keysy" && item.href === "/keysy") ||
                (active === "brief" && item.href === "/brief");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive
                      ? "font-mono text-[10px] tracking-[0.16em] text-[var(--accent)] focus-ring"
                      : "font-mono text-[10px] tracking-[0.16em] text-[var(--dim)] transition-colors hover:text-[var(--accent)] focus-ring"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <BriefLink className="font-mono text-[10px] tracking-[0.16em] text-[var(--fg)] transition-colors hover:text-[var(--accent)] focus-ring">
            BRIEF →
          </BriefLink>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        {children}
      </main>

      <footer className="mt-10 border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-7 font-mono text-[10px] tracking-[0.12em] text-[var(--dim)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>
            © {year} {SITE.brand}
          </span>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Підвал">
            <Link href="/poslugy" className="hover:text-[var(--accent)] focus-ring">
              Послуги
            </Link>
            <Link href="/keysy" className="hover:text-[var(--accent)] focus-ring">
              Кейси
            </Link>
            <Link href="/brief" className="hover:text-[var(--accent)] focus-ring">
              Brief
            </Link>
          </nav>
          <span className="text-[var(--accent)]/70">{SITE.mark}</span>
        </div>
      </footer>
    </div>
  );
}
