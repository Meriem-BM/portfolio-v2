import { IDetailBlogPost } from "@/types";
import { site } from "@/lib/seo";

export function ArticleJsonLd({ post, url }: { post: IDetailBlogPost; url: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? post.summary ?? site.description,
    datePublished: new Date(post.date || Date.now()).toISOString(),
    dateModified: new Date((post.updated ?? post.date) || Date.now()).toISOString(),
    author: { "@type": "Person", name: post.author?.name ?? site.author.name },
    url,
    mainEntityOfPage: url,
    keywords: (post.tags ?? []).join(", "),
    image: post.cover ?? `${site.url}/og/${post.slug}`,
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
