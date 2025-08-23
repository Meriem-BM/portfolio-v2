import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 60,
          background: "linear-gradient(135deg,#0b0b0b,#111 60%,#0ea5e9)",
          color: "white",
          fontFamily: "Inter, system-ui, Segoe UI",
        }}
      >
        <div style={{ opacity: 0.8, fontSize: 28 }}>YourSite</div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
          Build. Ship. Share.
        </div>
        <div style={{ fontSize: 28, opacity: 0.9 }}>
          Next.js 15 • App Router
        </div>
      </div>
    ),
    size
  );
}
