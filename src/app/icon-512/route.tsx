import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
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
          fontSize: 140,
          fontWeight: 700,
          letterSpacing: "0.06em",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        NDX
      </div>
    ),
    { width: 512, height: 512 },
  );
}
