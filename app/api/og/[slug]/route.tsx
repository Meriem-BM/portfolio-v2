import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/blogs/contentManager";
import { site } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const post = getBlogPost(params.slug);
  const title = post?.title ?? site.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "linear-gradient(135deg,#111 0%,#222 60%,#0ea5e9 100%)",
          color: "white",
          fontFamily: "Inter, system-ui, Segoe UI",
        }}
      >
        <div style={{ opacity: 0.8, fontSize: 28 }}>{site.name}</div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
          {title}
        </div>
        <div style={{ fontSize: 24, opacity: 0.9 }}>
          {post?.tags?.join(" • ") ?? ""}
        </div>
      </div>
    ),
    { ...size }
  );
}
