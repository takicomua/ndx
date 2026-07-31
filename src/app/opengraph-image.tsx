import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const runtime = "edge";
export const alt = `${SITE.mark} · ${SITE.brand} — інженер повного циклу`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#e8e6e1",
          padding: "64px 72px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.55,
          }}
        >
          <span>{SITE.domain}</span>
          <span>{SITE.tagline}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.35em",
              textTransform: "lowercase",
              opacity: 0.7,
            }}
          >
            {SITE.signature}
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
            }}
          >
            {SITE.brand}
          </div>
          <div style={{ fontSize: 34, opacity: 0.85, maxWidth: 900 }}>
            Інженер повного циклу — сайти, магазини, системи
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 700,
            letterSpacing: "-0.06em",
            opacity: 0.12,
            lineHeight: 1,
          }}
        >
          {SITE.mark}
        </div>
      </div>
    ),
    { ...size },
  );
}
