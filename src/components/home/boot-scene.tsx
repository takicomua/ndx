"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/constants";

const LINES = [
  { t: "NDX Boot · v1.0", d: 0, cls: "dim" as const },
  { t: "Initializing kernel...", d: 380, cls: "dim" as const },
  { t: "OK  display", d: 680, cls: "ok" as const },
  { t: "OK  network", d: 880, cls: "ok" as const },
  { t: "OK  runtime", d: 1080, cls: "ok" as const },
  { t: "", d: 1280, cls: "" as const },
  { t: `> open ./${SITE.brand.toLowerCase()}`, d: 1480, cls: "cmd" as const },
  { t: "compiling interface...", d: 2400, cls: "dim" as const },
  { t: SITE.tagline, d: 3000, cls: "accent" as const },
  { t: "ready.", d: 3500, cls: "ok" as const },
];

type Phase = "boot" | "desktop" | "term" | "typing" | "zoom" | "done";

export function BootScene({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("boot");
  const [visibleLines, setVisibleLines] = useState(0);
  const [typed, setTyped] = useState("");
  const [cmdDone, setCmdDone] = useState(false);
  const [clock, setClock] = useState("--:--");
  const finished = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setPhase("done");
    onDoneRef.current();
  }, []);

  // One timeline for the whole intro — never cancelled by phase changes
  useEffect(() => {
    setClock(
      new Date().toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    // Skip cinematic intro for crawlers — SEO content must be reachable fast
    const ua = navigator.userAgent || "";
    if (/bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly/i.test(ua)) {
      finish();
      return;
    }

    const timers: number[] = [];
    const wait = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const cmd = LINES.find((l) => l.cls === "cmd")?.t ?? "";
    const cmdStart = LINES.find((l) => l.cls === "cmd")?.d ?? 1480;
    const typingAt = 1750;

    wait(500, () => setPhase("desktop"));
    wait(1300, () => setPhase("term"));
    wait(typingAt, () => setPhase("typing"));

    // Terminal lines (before cmd)
    LINES.forEach((line, i) => {
      if (line.cls === "cmd" || i > 6) return;
      wait(typingAt + line.d, () => {
        setVisibleLines((n) => Math.max(n, i + 1));
      });
    });

    // Type command
    wait(typingAt + cmdStart, () => {
      setVisibleLines(7);
      let i = 0;
      const tick = () => {
        if (finished.current) return;
        i += 1;
        setTyped(cmd.slice(0, i));
        if (i < cmd.length) {
          wait(26, tick);
        } else {
          setCmdDone(true);
          LINES.forEach((line, idx) => {
            if (idx < 7) return;
            wait(Math.max(40, line.d - cmdStart - cmd.length * 26), () => {
              setVisibleLines((n) => Math.max(n, idx + 1));
            });
          });
        }
      };
      tick();
    });

    const zoomAt = typingAt + 4200;
    wait(zoomAt, () => setPhase("zoom"));
    wait(zoomAt + 900, () => finish());
    wait(9000, () => finish());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  if (phase === "done") return null;

  const showTerm = phase === "term" || phase === "typing" || phase === "zoom";

  return (
    <div
      className={`boot-scene boot-scene--${phase}`}
      role="dialog"
      aria-modal="true"
      aria-label="Завантаження"
    >
      <div className="boot-room">
        <div className="boot-desk" aria-hidden />
        <div className="boot-monitor">
          <div className="boot-bezel">
            <div className="boot-screen">
              <div className="boot-wallpaper" />

              <div className="boot-icons" aria-hidden>
                <div className="boot-icon">
                  <span className="boot-icon__folder" />
                  <span>Projects</span>
                </div>
                <div className="boot-icon">
                  <span className="boot-icon__gear" />
                  <span>System</span>
                </div>
              </div>

              {showTerm ? (
                <div className="boot-term">
                  <div className="boot-term__bar">
                    <div className="boot-term__dots">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="boot-term__title">ndx — powershell</span>
                  </div>
                  <div className="boot-term__body">
                    {LINES.slice(0, visibleLines).map((line, i) => {
                      if (line.cls === "cmd") {
                        return (
                          <p key={i} className="boot-line boot-line--cmd">
                            {cmdDone ? line.t : typed}
                            {!cmdDone ? <span className="boot-caret" /> : null}
                          </p>
                        );
                      }
                      return (
                        <p
                          key={i}
                          className={`boot-line${line.cls ? ` boot-line--${line.cls}` : ""}`}
                        >
                          {line.t || "\u00A0"}
                        </p>
                      );
                    })}
                    {cmdDone && visibleLines >= LINES.length ? (
                      <p className="boot-line">
                        <span className="boot-caret" />
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}

              <div className="boot-taskbar" aria-hidden>
                <div className="boot-start" />
                <div className="boot-taskbar__apps">
                  <span className="boot-pill is-on" />
                  <span className="boot-pill" />
                  <span className="boot-pill" />
                </div>
                <div className="boot-clock">{clock}</div>
              </div>

              <div className="boot-scan" aria-hidden />
            </div>
          </div>
          <div className="boot-chin">
            <span className="boot-power" />
          </div>
          <div className="boot-stand" />
          <div className="boot-base" />
        </div>
      </div>

      <button type="button" className="boot-skip focus-ring" onClick={finish}>
        Skip →
      </button>
    </div>
  );
}
