"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

/** Quiet word-by-word materialize — blur clears as each word lands */
export function PitchReveal({
  text,
  active,
  instant = false,
  className,
}: {
  text: string;
  active: boolean;
  /** Skip word cascade (crawlers / skipIntro) */
  instant?: boolean;
  className?: string;
}) {
  const words = useMemo(() => text.split(" "), [text]);
  const [visible, setVisible] = useState(instant ? words.length : 0);
  const [ready, setReady] = useState(instant);

  useEffect(() => {
    if (!active) return;

    if (instant) {
      setVisible(words.length);
      setReady(true);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(words.length);
      setReady(true);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    // short pause after brand, then cascade
    timers.push(
      window.setTimeout(() => {
        let i = 0;
        const step = () => {
          if (cancelled) return;
          i += 1;
          setVisible(i);
          if (i < words.length) {
            timers.push(window.setTimeout(step, 42 + (words[i - 1]?.length ?? 4) * 3));
          } else {
            setReady(true);
          }
        };
        step();
      }, 280),
    );

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [active, instant, words]);

  // Reserve space before unlock — text stays in DOM for crawlers
  if (!active && visible === 0) {
    return (
      <p
        className={cn(
          "mt-5 min-h-[4.5rem] max-w-xl text-[15px] leading-relaxed text-[var(--dim)] sm:text-base",
          className,
        )}
      >
        {text}
      </p>
    );
  }

  return (
    <p
      className={cn(
        "mt-5 max-w-xl text-[15px] leading-relaxed sm:text-base",
        className,
      )}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={cn(
            "pitch-word inline-block mr-[0.3em]",
            i < visible ? "is-in" : "is-out",
          )}
          style={{ transitionDelay: `${Math.min(i, 12) * 8}ms` }}
        >
          {word}
        </span>
      ))}
      <span
        className={cn(
          "mt-4 block h-px max-w-[8rem] origin-left bg-[var(--accent)]/50 transition-transform duration-700",
          ready ? "scale-x-100" : "scale-x-0",
        )}
        aria-hidden
      />
    </p>
  );
}
