import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Common = {
  children: ReactNode;
  className?: string;
  tone?: "solid" | "ghost" | "line";
};

const tones = {
  solid:
    "bg-[var(--accent)] text-[var(--accent-fg)] hover:brightness-110",
  ghost: "text-[var(--fg)] hover:text-[var(--accent)]",
  line: "border border-[var(--fg)]/25 text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
};

function classes(tone: Common["tone"] = "solid", className?: string) {
  return cn(
    "inline-flex h-12 items-center justify-center gap-2 px-6 text-sm font-medium tracking-tight transition-[filter,color,border-color] duration-200 focus-ring",
    tones[tone],
    className,
  );
}

export function Button({
  children,
  className,
  tone = "solid",
  ...props
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(tone, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className,
  tone = "solid",
  ...props
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={classes(tone, className)} {...props}>
      {children}
    </a>
  );
}
