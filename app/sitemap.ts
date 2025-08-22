import type { MetadataRoute } from "next";
import { site } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/blogs/contentManager";
import type { IBlogPost } from "@/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts();
  const urls: MetadataRoute.Sitemap = [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...posts.map((p: IBlogPost) => ({
      url: `${site.url}/logs/${p.slug}`,
      lastModified: new Date(p.updated || p.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
  return urls;
}
