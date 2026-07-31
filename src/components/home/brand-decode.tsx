"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ROLE = "Розробник";
const ERROR_LINE = "ERROR: insufficient — try again";

type Phase =
  | "type-role"
  | "await-enter"
  | "error"
  | "erase"
  | "type-brand"
  | "ok"
  | "done";

/** Types “Розробник” → Enter → error → erase → DIACHENKO → OK → reveal rest */
export function BrandDecode({
  text,
  className,
  onReady,
}: {
  text: string;
  className?: string;
  onReady?: () => void;
}) {
  const [shown, setShown] = useState("");
  const [phase, setPhase] = useState<Phase>("type-role");
  const [showError, setShowError] = useState(false);
  const [showOk, setShowOk] = useState(false);
  const [okLeaving, setOkLeaving] = useState(false);
  const [enterHit, setEnterHit] = useState(false);
  const [enterArmed, setEnterArmed] = useState(false);

  const readyRef = useRef(false);
  const enterUsed = useRef(false);
  const cancelledRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  const wait = useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      timersRef.current.push(window.setTimeout(resolve, ms));
    });
  }, []);

  const finish = useCallback(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    setShown(text);
    setPhase("done");
    setShowError(false);
    setShowOk(false);
    setEnterArmed(false);
    onReadyRef.current?.();
  }, [text]);

  const runAfterEnter = useCallback(async () => {
    if (enterUsed.current || cancelledRef.current) return;
    enterUsed.current = true;
    setEnterHit(true);
    setEnterArmed(false);

    await wait(160);
    if (cancelledRef.current) return;

    setPhase("error");
    setShowError(true);
    await wait(950);
    if (cancelledRef.current) return;

    setShowError(false);
    setPhase("erase");

    let cur = ROLE;
    while (cur.length > 0) {
      if (cancelledRef.current) return;
      const step = cur.length > 4 ? 2 : 1;
      cur = cur.slice(0, -step);
      setShown(cur);
      await wait(cur.length > 6 ? 26 : 42);
    }
    setShown("");
    if (cancelledRef.current) return;

    await wait(300);
    setPhase("type-brand");
    for (let i = 1; i <= text.length; i++) {
      if (cancelledRef.current) return;
      setShown(text.slice(0, i));
      await wait(82);
    }

    await wait(220);
    if (cancelledRef.current) return;

    // OK status holds, then fades — only then unlock the rest of the hero
    setPhase("ok");
    setShowOk(true);
    setOkLeaving(false);
    await wait(2200);
    if (cancelledRef.current) return;

    setOkLeaving(true);
    await wait(450);
    if (cancelledRef.current) return;

    setShowOk(false);
    await wait(200);
    finish();
  }, [finish, text, wait]);

  useEffect(() => {
    cancelledRef.current = false;
    enterUsed.current = false;
    readyRef.current = false;
    timersRef.current = [];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    const run = async () => {
      setPhase("type-role");
      setShown("");
      setShowError(false);
      setShowOk(false);
      setOkLeaving(false);
      setEnterHit(false);
      setEnterArmed(false);

      for (let i = 1; i <= ROLE.length; i++) {
        if (cancelledRef.current) return;
        setShown(ROLE.slice(0, i));
        await wait(76);
      }
      if (cancelledRef.current) return;

      setPhase("await-enter");
      setEnterArmed(true);

      await wait(1200);
      if (cancelledRef.current || enterUsed.current) return;
      void runAfterEnter();
    };

    const safety = window.setTimeout(() => finish(), 22000);
    timersRef.current.push(safety);
    void run();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") void runAfterEnter();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelledRef.current = true;
      timersRef.current.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("keydown", onKey);
    };
  }, [finish, runAfterEnter, wait]);

  const showCaret =
    phase === "type-role" ||
    phase === "await-enter" ||
    phase === "type-brand" ||
    phase === "erase";

  return (
    <div className={cn("relative", className)}>
      <h1
        className={cn(
          "mt-3 font-display font-semibold leading-[0.9] tracking-tight text-[var(--fg)]",
          phase === "type-brand" || phase === "ok" || phase === "done"
            ? "text-[clamp(3.2rem,12vw,7rem)]"
            : "text-[clamp(2.4rem,9vw,5.5rem)]",
          phase === "error" && "brand-glitch text-[#e8a0a0]",
          phase === "erase" && "text-[#c07070]",
        )}
        aria-label={text}
      >
        <span>{shown || (phase === "done" || phase === "ok" ? text : "\u00A0")}</span>
        {showCaret ? (
          <span className="brand-caret ml-1 inline-block h-[0.85em] w-[0.45em] translate-y-[0.06em] bg-[var(--accent)] align-text-bottom" />
        ) : null}
      </h1>

      {(enterArmed || enterHit) &&
      phase !== "type-brand" &&
      phase !== "ok" &&
      phase !== "done" &&
      phase !== "erase" ? (
        <button
          type="button"
          onClick={() => void runAfterEnter()}
          disabled={!enterArmed}
          className={cn(
            "brand-enter mt-5 inline-flex items-center gap-2 border border-[var(--line)] bg-white/[0.03] px-3 py-2 font-mono text-[11px] tracking-[0.16em] text-[var(--dim)] transition-[color,border-color,transform,opacity,background] focus-ring",
            enterArmed &&
              "brand-enter--pulse cursor-pointer hover:border-[var(--accent)]/50 hover:text-[var(--accent)]",
            enterHit && "brand-enter--hit border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)]",
            !enterArmed && "opacity-70",
          )}
          aria-label="Enter"
        >
          <span>ENTER</span>
          <span aria-hidden>↵</span>
        </button>
      ) : null}

      {showError ? (
        <p className="brand-error mt-3 font-mono text-[12px] tracking-wide text-[#e07a7a] sm:text-[13px]">
          {ERROR_LINE}
        </p>
      ) : null}

      {showOk ? (
        <p
          className={cn(
            "brand-ok mt-4 font-mono text-[12px] tracking-[0.2em] text-[#7dcea0] sm:text-[13px]",
            okLeaving && "brand-ok--out",
          )}
        >
          OK
        </p>
      ) : null}
    </div>
  );
}
