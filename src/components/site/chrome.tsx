import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import type { NavActive } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteChrome({
  children,
  active,
  flush = false,
}: {
  children: ReactNode;
  active?: NavActive;
  /** Full-bleed main (home hero). Inner pages keep constrained width. */
  flush?: boolean;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden bg-[var(--bg)] text-[var(--fg)]">
      <div
        className="pointer-events-none fixed inset-0 -z-10 site-atmosphere"
        aria-hidden
      />
      <SiteHeader active={active} />
      <main
        className={cn(
          "relative z-10 w-full flex-1",
          !flush && "mx-auto max-w-6xl px-5 sm:px-8",
        )}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
