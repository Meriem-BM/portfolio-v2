import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: "20px 20px, 20px 20px, 100% 100%, 100% 100%, 100% 100%",
          color: "white",
          padding: "40px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 30,
            background: "linear-gradient(135deg, #00d4ff 0%, #a855f7 50%, #ec4899 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow: "none",
          }}
        >
          Meriem B.
        </div>
        <div
          style={{
            fontSize: 36,
            textAlign: "center",
            color: "#00d4ff",
            marginBottom: 20,
            fontWeight: "600",
            textShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
          }}
        >
          Software Engineer
        </div>
        <div
          style={{
            fontSize: 28,
            textAlign: "center",
            color: "#a855f7",
            fontWeight: "600",
            textShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
          }}
        >
          Blockchain, Frontend, Full Stack
        </div>
        <div
          style={{
            fontSize: 20,
            textAlign: "center",
            color: "#ec4899",
            marginTop: 30,
            fontWeight: "500",
            textShadow: "0 0 15px rgba(236, 72, 153, 0.5)",
          }}
        >
          Building on the blockchain
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
