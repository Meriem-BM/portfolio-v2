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
          backgroundColor: "#0f0f23",
          backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "40px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 30,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          Meriem Barhoumi
        </div>
        <div
          style={{
            fontSize: 36,
            textAlign: "center",
            opacity: 0.9,
            marginBottom: 20,
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          Software Engineer
        </div>
        <div
          style={{
            fontSize: 28,
            textAlign: "center",
            opacity: 0.7,
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          Blockchain SWE
        </div>
        <div
          style={{
            fontSize: 20,
            textAlign: "center",
            opacity: 0.6,
            marginTop: 30,
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          Building the future of decentralized applications
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
