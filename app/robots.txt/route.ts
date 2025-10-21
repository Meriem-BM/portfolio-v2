import { NextResponse } from "next/server";
import { site } from "@/lib/seo";

export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml`;

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
