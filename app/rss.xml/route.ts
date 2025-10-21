import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/blogs/contentManager";
import { site } from "@/lib/seo";

export async function GET() {
  const posts = getAllBlogPosts();

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
                  <rss version="2.0">
                  <channel>
                    <title>${site.name}</title>
                    <link>${site.url}</link>
                    <description>${site.description}</description>
                    <language>en</language>
                    ${posts
                      .map(
                        (post) => `
                    <item>
                      <title>${post.title}</title>
                      <link>${site.url}/logs/${post.slug}</link>
                      <description>${post.excerpt}</description>
                      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
                      <guid>${site.url}/logs/${post.slug}</guid>
                    </item>
                    `
                      )
                      .join("")}
                  </channel>
                  </rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
