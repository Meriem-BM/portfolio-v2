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
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-4xl font-bold mb-4 text-red-400 glitch-text">404</h1>
          <p className="text-white/60 mb-4 font-mono">LOG_NOT_FOUND</p>
          <Link href="/logs">
            <Button variant="outline" className="border-white/20 text-white/70 hover:border-green-400 hover:text-green-400">
              RETURN_TO_LOGS
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `${site.url}/logs/${post.slug}`;

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Background effects */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-blue-900/30 to-purple-900/30" />
      </div>
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
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
      <header className="relative z-10 p-6 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/logs"
              className="inline-flex items-center text-white/70 hover:text-green-400 transition-colors font-mono text-sm group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="relative">
                BACK_TO_LOGS
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-400 group-hover:w-full transition-all duration-300" />
              </span>
            </Link>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`border-white/20 font-mono transition-all duration-300 ${
                  isBookmarked
                    ? "text-yellow-400 border-yellow-400/50 bg-yellow-400/10"
                    : "text-white/70 hover:border-yellow-400 hover:text-yellow-400"
                }`}
              >
                <Bookmark className="w-3 h-3 mr-1" />
                {isBookmarked ? "SAVED" : "SAVE"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-white/20 text-white/70 hover:border-blue-400 hover:text-blue-400 font-mono"
              >
                <Share2 className="w-3 h-3 mr-1" />
                SHARE
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Article */}
      <main className="relative z-10 p-6">
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <div className={`h-2 w-full bg-gradient-to-r ${post.heroGradient} mb-8 rounded-full`} />
            <div className="flex items-center gap-4 mb-6 text-xs font-mono text-white/60">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                {post.readTime}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {reactions}
              </div>
              <div className="flex items-center gap-1">
                <Code className="w-3 h-3" />
                INTERACTIVE
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-white/60 flex items-center gap-1 hover:border-white/30 transition-colors">
                  <Tag className="w-3 h-3" />
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

          <footer className="mt-16 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={handleReaction}
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10 transition-all duration-300 hover:scale-105"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  React ({reactions})
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 transition-all duration-300 hover:scale-105"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
              <div className="text-xs font-mono text-white/40">
                LAST_UPDATED: {new Date(post.date).toLocaleDateString()}
              </div>
            </div>
          </footer>
        </article>

        <div className="max-w-4xl mx-auto mt-16">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-blue-400" />
            MORE_LOGS
          </h3>
          <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-dashed border-white/20 hover:border-green-500/50 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <p className="font-mono text-white/60 text-sm mb-4">Explore more field notes</p>
              <Link href="/logs">
                <Button variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/10">
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
