import { NextResponse } from "next/server";
import { site } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/blogs/contentManager";

const escapeXml = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export async function GET() {
  const posts = getAllBlogPosts();
  const items = posts
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map(
      (p) => `
        <item>
        <title>${escapeXml(p.title)}</title>
        <link>${site.url}/logs/${p.slug}</link>
        <guid>${site.url}/logs/${p.slug}</guid>
        <pubDate>${new Date(p.date).toUTCString()}</pubDate>
        <description><![CDATA[${p.excerpt ?? p.summary ?? ""}]]></description>
        </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
        <rss version="2.0">
        <channel>
        <title>${escapeXml(site.name)}</title>
        <link>${site.url}</link>
        <description>${escapeXml(site.description)}</description>
        ${items}
        </channel>
        </rss>`;

  return new NextResponse(rss, {
    headers: { "Content-Type": "application/xml" },
  });
}
