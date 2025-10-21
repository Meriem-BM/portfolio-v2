import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/blogs/contentManager";
import { site } from "@/lib/seo";
import ClientPost from "./ClientPost";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Log not found" };

  const url = `${site.url}/logs/${slug}`;
  const description = post.excerpt ?? post.summary ?? site.description;

  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description,
      siteName: site.name,
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author?.name ?? site.author.name],
      tags: post.tags,
      images: [{ url: `${site.url}/og/${post.slug}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [`${site.url}/og/${post.slug}`],
      creator: site.twitter,
    },
    keywords: post.tags,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return notFound();
  return <ClientPost params={{ slug }} initialPost={post} />;
}
