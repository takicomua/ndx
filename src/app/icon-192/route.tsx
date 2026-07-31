import { ImageResponse } from "next/og";

export const runtime = "edge";

function mark(size: number) {
  const fontSize = Math.round(size * 0.28);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#e8e6e1",
          fontSize,
          fontWeight: 700,
          letterSpacing: "0.06em",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        NDX
      </div>
    ),
    { width: size, height: size },
  );
}

export async function GET() {
  return mark(192);
}
