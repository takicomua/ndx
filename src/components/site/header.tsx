"use client";

import Link from "next/link";
import {
  Home,
  LayoutGrid,
  Briefcase,
  Send,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NAV, SITE, type NavActive } from "@/lib/constants";
import { cn } from "@/lib/utils";

function isActive(active: NavActive | undefined, href: string) {
  if (!active) return false;
  if (href === "/") return active === "home";
  if (href === "/poslugy") return active === "poslugy";
  if (href === "/keysy") return active === "keysy";
  if (href === "/blog") return active === "blog";
  if (href === "/pro-mene") return active === "pro-mene";
  if (href === "/kontakt") return active === "kontakt";
  if (href === "/zayavka") return active === "zayavka";
  return false;
}

const TABS = [
  { href: "/", label: "Головна", icon: Home, key: "home" as const },
  { href: "/poslugy", label: "Послуги", icon: LayoutGrid, key: "poslugy" as const },
  { href: "/keysy", label: "Роботи", icon: Briefcase, key: "keysy" as const },
  { href: "/zayavka", label: "Заявка", icon: Send, key: "zayavka" as const },
];

export function SiteHeader({ active }: { active?: NavActive }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="header-bar">
          <Link
            href="/"
            className="header-logo focus-ring"
            aria-label={SITE.brandLine}
            onClick={() => setOpen(false)}
          >
            {SITE.mark}
          </Link>

          <nav className="header-nav" aria-label="Навігація">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(isActive(active, item.href) && "is-active")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link
              href="/zayavka"
              className="btn-primary !h-9 !px-3.5 !text-[13px] focus-ring"
              onClick={() => setOpen(false)}
            >
              Заявка
            </Link>
            <button
              type="button"
              className="menu-toggle focus-ring"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Закрити меню" : "Відкрити меню"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="mobile-sheet" id="mobile-nav" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 cursor-pointer border-0 bg-transparent"
            aria-label="Закрити"
            onClick={() => setOpen(false)}
          />
          <nav className="mobile-sheet__panel relative z-[1]" aria-label="Меню">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "mobile-sheet__link focus-ring",
                  isActive(active, item.href) && "is-active",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mobile-sheet__cta">
              <Link
                href="/zayavka"
                className="btn-primary w-full focus-ring"
                onClick={() => setOpen(false)}
              >
                Залишити заявку
              </Link>
            </div>
          </nav>
        </div>
      ) : null}

      <nav className="tabbar" aria-label="Швидка навігація">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const on = active === tab.key;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(on && "is-active")}
              aria-current={on ? "page" : undefined}
            >
              <Icon size={18} strokeWidth={on ? 2.25 : 1.75} />
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
