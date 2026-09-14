"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV, SITE, type NavActive } from "@/lib/constants";
import { cn } from "@/lib/utils";

function isActive(active: NavActive | undefined, href: string) {
  if (!active) return false;
  if (href === "/poslugy") return active === "poslugy";
  if (href === "/keysy") return active === "keysy";
  if (href === "/pro-mene") return active === "pro-mene";
  if (href === "/kontakt") return active === "kontakt";
  return false;
}

export function SiteHeader({ active }: { active?: NavActive }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header relative z-30">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-5 sm:max-w-3xl sm:px-8 lg:max-w-5xl">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-[var(--fg)] focus-ring"
          onClick={() => setOpen(false)}
        >
          {SITE.mark}
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Навігація">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm focus-ring",
                isActive(active, item.href)
                  ? "font-semibold text-[var(--fg)]"
                  : "text-[var(--dim)] hover:text-[var(--fg)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/zayavka"
            className="btn-primary h-9 px-3.5 text-sm focus-ring"
          >
            Заявка
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center border border-[var(--line)] bg-[var(--panel)] md:hidden focus-ring"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Меню</span>
            <span aria-hidden className="flex flex-col gap-1">
              <span className={cn("block h-0.5 w-3.5 bg-current", open && "translate-y-[3px] rotate-45")} />
              <span className={cn("block h-0.5 w-3.5 bg-current", open && "opacity-0")} />
              <span className={cn("block h-0.5 w-3.5 bg-current", open && "-translate-y-[3px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-[var(--line)] bg-[var(--panel)] md:hidden"
          aria-label="Мобільна навігація"
        >
          <ul className="mx-auto max-w-3xl px-5 py-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border-b border-[var(--line)] py-3.5 text-base focus-ring"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
