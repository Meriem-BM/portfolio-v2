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
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IDetailBlogPost, ILogContent, ILogItem } from "@/types";

const blogPosts: Record<string, IDetailBlogPost> = {
  "building-with-viem": {
    id: 1,
    title: "Building with Viem: A Web3 Developer's Journey",
    excerpt:
      "Exploring the new paradigms in Web3 development and why viem is changing the game...",
    date: "2024-01-15",
    tags: ["frontend", "blockchain", "learning"],
    reactions: 24,
    readTime: "5 min",
    heroGradient: "from-blue-500 via-purple-500 to-cyan-500",
    content: [
      {
        type: "hero",
        content:
          "Web3 development has evolved rapidly, and with it, the tools we use to build decentralized applications. Today, I want to share my experience with viem, a TypeScript interface for Ethereum that's changing how we interact with the blockchain.",
      },
      {
        type: "heading",
        content: "Why Viem?",
      },
      {
        type: "text",
        content:
          "Coming from ethers.js, I was initially skeptical about switching to a new library. However, viem's approach to type safety and developer experience quickly won me over.",
      },
      {
        type: "code",
        language: "typescript",
        content: `import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Viem provides excellent TypeScript support out of the box. No more guessing what parameters a function expects.",
      },
      {
        type: "list",
        items: [
          "Type Safety - Full TypeScript support",
          "Tree Shaking - Smaller bundle sizes",
          "Modern API - Intuitive design patterns",
        ],
      },
      {
        type: "code",
        language: "typescript",
        content: `import { formatUnits } from 'viem'

async function getTokenBalance(address: string, tokenAddress: string) {
  const balance = await client.readContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address]
  })
  
  return formatUnits(balance, 18)
}`,
      },
      {
        type: "callout",
        variant: "success",
        content:
          "The migration wasn't without challenges, but the improved developer experience made it worthwhile.",
      },
    ],
  },
  "experimental-ui-art": {
    id: 2,
    title: "The Art of Experimental UI",
    excerpt:
      "How to push boundaries in interface design while maintaining usability...",
    date: "2024-01-08",
    tags: ["design", "frontend", "ideas"],
    reactions: 18,
    readTime: "7 min",
    heroGradient: "from-pink-500 via-purple-500 to-indigo-500",
    content: [
      {
        type: "hero",
        content:
          "In the world of interface design, there's a constant tension between innovation and usability. How do we push boundaries while ensuring our users can still accomplish their goals?",
      },
      {
        type: "heading",
        content: "Breaking Conventions",
      },
      {
        type: "text",
        content:
          "Traditional UI patterns exist for good reasons, but they can also limit our creative expression. The key is knowing when and how to break them effectively.",
      },
      {
        type: "interactive",
        content:
          "Hover over this text to see experimental interactions in action!",
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "Remember: Innovation should enhance, not hinder, the user experience.",
      },
    ],
  },
  "hackathon-chronicles": {
    id: 3,
    title: "Hackathon Chronicles: 48 Hours of Chaos",
    excerpt: "Lessons learned from building a DeFi protocol in a weekend...",
    date: "2024-01-01",
    tags: ["hackathon", "blockchain", "learning"],
    reactions: 31,
    readTime: "4 min",
    heroGradient: "from-green-500 via-teal-500 to-blue-500",
    content: [
      {
        type: "hero",
        content:
          "Hackathons are intense. 48 hours to go from idea to working prototype, with minimal sleep and maximum caffeine. Here's what I learned from my latest adventure.",
      },
      {
        type: "timeline",
        items: [
          {
            time: "Hours 0-6",
            title: "Planning and Setup",
            description: "Defined MVP, set up environment, created wireframes",
          },
          {
            time: "Hours 6-24",
            title: "Core Development",
            description:
              "Smart contracts, frontend scaffolding, API integration",
          },
          {
            time: "Hours 24-42",
            title: "Integration Hell",
            description: "Connecting pieces, cross-chain bridges, bug fixes",
          },
          {
            time: "Hours 42-48",
            title: "Polish and Presentation",
            description: "UI improvements, demo prep, pitch deck",
          },
        ],
      },
      {
        type: "callout",
        variant: "success",
        content:
          "We didn't win, but we built something amazing and learned a ton. Sometimes that's more valuable than any prize.",
      },
    ],
  },
};

// Content rendering components
const ContentRenderer = ({
  item,
  index,
}: {
  item: ILogContent;
  index: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const baseClasses = `transition-all duration-500 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
  }`;

  switch (item.type) {
    case "hero":
      return (
        <div className={`${baseClasses} mb-8`}>
          <div className="relative p-8 rounded-lg bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-green-900/20 border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-green-500/5 rounded-lg"></div>
            <p className="relative text-xl leading-relaxed text-white/90 font-light">
              {item.content}
            </p>
          </div>
        </div>
      );

    case "heading":
      return (
        <h2
          className={`${baseClasses} text-3xl font-bold mb-6 flex items-center gap-3`}
        >
          <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400"></div>
          {item.content}
        </h2>
      );

    case "text":
      return (
        <p
          className={`${baseClasses} text-white/80 leading-relaxed mb-6 text-lg`}
        >
          {item.content}
        </p>
      );

    case "code":
      return (
        <div className={`${baseClasses} mb-8`}>
          <Card className="bg-black/80 border border-green-500/30 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="font-mono text-sm text-green-400">
                  {item.language}
                </span>
              </div>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
              </div>
            </div>
            <CardContent className="p-0">
              <pre className="p-6 overflow-x-auto">
                <code className="text-green-300 font-mono text-sm leading-relaxed">
                  {item.content}
                </code>
              </pre>
            </CardContent>
          </Card>
        </div>
      );

    case "callout":
      const variants = {
        info: {
          bg: "bg-blue-500/10",
          border: "border-blue-500/30",
          text: "text-blue-300",
          icon: "💡",
        },
        success: {
          bg: "bg-green-500/10",
          border: "border-green-500/30",
          text: "text-green-300",
          icon: "✅",
        },
        warning: {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/30",
          text: "text-yellow-300",
          icon: "⚠️",
        },
      };
      const variant =
        variants[item.variant as keyof typeof variants] || variants.info;

      return (
        <div className={`${baseClasses} mb-6`}>
          <Card className={`${variant.bg} border ${variant.border}`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{variant.icon}</span>
                <p className={`${variant.text} leading-relaxed`}>
                  {item.content}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );

    case "list":
      return (
        <div className={`${baseClasses} mb-6`}>
          <ul className="space-y-3">
            {item.items?.map(
              (
                listItem:
                  | string
                  | { time: string; title: string; description: string },
                i: number
              ) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                  {typeof listItem === "string" ? listItem : listItem.title}
                </li>
              )
            )}
          </ul>
        </div>
      );

    case "interactive":
      return (
        <div className={`${baseClasses} mb-6`}>
          <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 hover:border-pink-500/50 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6">
              <p className="text-white/80 group-hover:text-white transition-colors group-hover:scale-105 transform duration-300">
                {item.content}
              </p>
            </CardContent>
          </Card>
        </div>
      );

    case "timeline":
      return (
        <div className={`${baseClasses} mb-8`}>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-green-500 via-blue-500 to-purple-500"></div>
            <div className="space-y-6">
              {item?.items?.map((timelineItem: ILogItem, i: number) => (
                <div key={i} className="relative flex items-start gap-6">
                  <div className="relative z-10 w-8 h-8 bg-black border-2 border-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <Card className="flex-1 bg-black/50 border border-white/10 hover:border-green-500/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="font-mono text-sm text-green-400 mb-1">
                        {timelineItem.time}
                      </div>
                      <h4 className="font-bold mb-2">{timelineItem.title}</h4>
                      <p className="text-white/70 text-sm">
                        {timelineItem.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<IDetailBlogPost | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [reactions, setReactions] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const foundPost = blogPosts[params.slug as keyof typeof blogPosts];
    if (foundPost) {
      setPost(foundPost);
      setReactions(foundPost.reactions);
    }
  }, [params.slug]);

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

  const handleReaction = () => {
    setReactions((prev) => prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-4xl font-bold mb-4 text-red-400 glitch-text">
            404
          </h1>
          <p className="text-white/60 mb-4 font-mono">LOG_NOT_FOUND</p>
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

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Background effects */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-blue-900/30 to-purple-900/30"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
        linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

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
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            {/* Actions */}
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
          {/* Article header */}
          <header className="mb-12">
            {/* Hero gradient */}
            <div
              className={`h-2 w-full bg-gradient-to-r ${post.heroGradient} mb-8 rounded-full`}
            ></div>

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

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-white/60 flex items-center gap-1 hover:border-white/30 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article content */}
          <div className="space-y-6">
            {post.content.map((item: ILogContent, index: number) => (
              <ContentRenderer key={index} item={item} index={index} />
            ))}
          </div>

          {/* Article footer */}
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

        {/* Related posts suggestion */}
        <div className="max-w-4xl mx-auto mt-16">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-blue-400"></div>
            MORE_LOGS
          </h3>
          <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-dashed border-white/20 hover:border-green-500/50 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <p className="font-mono text-white/60 text-sm mb-4">
                Explore more field notes
              </p>
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
