"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Code,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IDetailBlogPost } from "@/types";
import { getBlogPost } from "@/lib/blogs/contentManager";
import { ContentRenderer } from "@/components/posts/ContentRenderer";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { site } from "@/lib/seo";

interface Props {
  params: { slug: string };
  initialPost?: IDetailBlogPost | null;
}

export default function ClientPost({ params, initialPost }: Props) {
  const [post, setPost] = useState<IDetailBlogPost | null>(initialPost ?? null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [reactions, setReactions] = useState(initialPost?.reactions ?? 0);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (!initialPost) {
      const foundPost = getBlogPost(params.slug);
      if (foundPost) {
        setPost(foundPost);
        setReactions(foundPost.reactions);
      }
    }
  }, [params.slug, initialPost]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleReaction = () => setReactions((p) => p + 1);
  const handleShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      navigator.share({ title: post?.title, url });
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <h1 className="glitch-text mb-4 text-4xl font-bold text-red-400">404</h1>
          <p className="mb-4 font-mono text-white/60">LOG_NOT_FOUND</p>
          <Link href="/logs">
            <Button
              variant="outline"
              className="border-white/20 text-white/70 hover:border-green-400 hover:text-green-400"
            >
              RETURN_TO_LOGS
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `${site.url}/logs/${post.slug}`;

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 z-50 h-1 w-full bg-black/50">
        <div
          className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Background effects */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-blue-900/30 to-purple-900/30" />
      </div>
      <div className="pointer-events-none fixed inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* JSON-LD for rich results */}
      <ArticleJsonLd post={post} url={canonicalUrl} />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 p-6 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/logs"
              className="group inline-flex items-center font-mono text-sm text-white/70 transition-colors hover:text-green-400"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="relative">
                BACK_TO_LOGS
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-green-400 transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`border-white/20 font-mono transition-all duration-300 ${
                  isBookmarked
                    ? "border-yellow-400/50 bg-yellow-400/10 text-yellow-400"
                    : "text-white/70 hover:border-yellow-400 hover:text-yellow-400"
                }`}
              >
                <Bookmark className="mr-1 h-3 w-3" />
                {isBookmarked ? "SAVED" : "SAVE"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-white/20 font-mono text-white/70 hover:border-blue-400 hover:text-blue-400"
              >
                <Share2 className="mr-1 h-3 w-3" />
                SHARE
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Article */}
      <main className="relative z-10 p-6">
        <article className="mx-auto max-w-4xl">
          <header className="mb-12">
            <div className={`h-2 w-full bg-gradient-to-r ${post.heroGradient} mb-8 rounded-full`} />
            <div className="mb-6 flex items-center gap-4 font-mono text-xs text-white/60">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                {post.readTime}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {reactions}
              </div>
              <div className="flex items-center gap-1">
                <Code className="h-3 w-3" />
                INTERACTIVE
              </div>
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-4xl leading-tight font-black text-transparent md:text-6xl">
              {post.title}
            </h1>
            <div className="mb-8 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-sm text-white/60 transition-colors hover:border-white/30"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="space-y-6">
            {post.content.map((item, index: number) => (
              <ContentRenderer key={index} item={item} index={index} />
            ))}
          </div>

          <footer className="mt-16 border-t border-white/10 pt-8">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={handleReaction}
                  className="border-red-500/50 text-red-400 transition-all duration-300 hover:scale-105 hover:bg-red-500/10"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  React ({reactions})
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="border-blue-500/50 text-blue-400 transition-all duration-300 hover:scale-105 hover:bg-blue-500/10"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
              <div className="font-mono text-xs text-white/40">
                LAST_UPDATED: {new Date(post.date).toLocaleDateString()}
              </div>
            </div>
          </footer>
        </article>

        <div className="mx-auto mt-16 max-w-4xl">
          <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
            <div className="h-6 w-1 bg-gradient-to-b from-green-400 to-blue-400" />
            MORE_LOGS
          </h3>
          <Card className="border border-dashed border-white/20 bg-gradient-to-r from-green-900/20 to-blue-900/20 transition-all duration-300 hover:border-green-500/50">
            <CardContent className="p-8 text-center">
              <Zap className="mx-auto mb-4 h-12 w-12 text-green-400" />
              <p className="mb-4 font-mono text-sm text-white/60">Explore more field notes</p>
              <Link href="/logs">
                <Button
                  variant="outline"
                  className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                >
                  VIEW_ALL_LOGS →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
