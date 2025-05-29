"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag, Heart, Zap, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const blogPosts = [
  {
    id: 1,
    title: "Building with Viem: A Web3 Developer's Journey",
    excerpt: "Exploring the new paradigms in Web3 development and why viem is changing the game...",
    date: "2024-01-15",
    tags: ["frontend", "blockchain", "learning"],
    reactions: 24,
    readTime: "5 min",
    slug: "building-with-viem",
  },
  {
    id: 2,
    title: "The Art of Experimental UI",
    excerpt: "How to push boundaries in interface design while maintaining usability...",
    date: "2024-01-08",
    tags: ["design", "frontend", "ideas"],
    reactions: 18,
    readTime: "7 min",
    slug: "experimental-ui-art",
  },
  {
    id: 3,
    title: "Hackathon Chronicles: 48 Hours of Chaos",
    excerpt: "Lessons learned from building a DeFi protocol in a weekend...",
    date: "2024-01-01",
    tags: ["hackathon", "blockchain", "learning"],
    reactions: 31,
    readTime: "4 min",
    slug: "hackathon-chronicles",
  },
  {
    id: 4,
    title: "Framer Motion: Beyond Basic Animations",
    excerpt: "Advanced techniques for creating fluid, physics-based interactions...",
    date: "2023-12-20",
    tags: ["frontend", "animation", "tutorial"],
    reactions: 42,
    readTime: "8 min",
    slug: "framer-motion-advanced",
  },
]

const allTags = ["frontend", "blockchain", "learning", "design", "ideas", "hackathon", "animation", "tutorial"]

export default function LogsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)

  const filteredPosts = selectedTag ? blogPosts.filter((post) => post.tags.includes(selectedTag)) : blogPosts

  return (
    <div className="min-h-screen bg-black text-white relative">
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
          {/* Navigation breadcrumb */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-white/70 hover:text-green-400 transition-colors font-mono text-sm group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="relative">
                BACK_TO_ROOT
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            {/* Status indicator */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <div className="flex items-center gap-1 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                SYNCED
              </div>
              <span className="text-white/40">|</span>
              <span className="text-white/60">{filteredPosts.length} ENTRIES</span>
            </div>
          </div>

          {/* Page title and description */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-blue-400"></div>
                <h1 className="text-4xl md:text-6xl font-black glitch-text">LOGS</h1>
              </div>
              <p className="text-white/60 font-mono text-lg ml-4">Field notes from the digital frontier</p>
            </div>

            {/* Search and actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white/70 hover:border-green-400 hover:text-green-400 font-mono"
              >
                SEARCH
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white/70 hover:border-blue-400 hover:text-blue-400 font-mono"
              >
                ARCHIVE
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tag filters */}
      <div className="relative z-10 px-6 mb-8">
        <div className="flex flex-wrap gap-2 max-w-4xl mx-auto">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTag(null)}
            className="font-mono text-xs"
          >
            ALL
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
              className="font-mono text-xs"
            >
              #{tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Blog posts */}
      <main className="relative z-10 p-6">
        <div className="grid gap-6 max-w-4xl mx-auto">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/logs/${post.slug}`}>
              <Card
                className="bg-black/50 border border-white/10 hover:border-green-500/50 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <CardContent className="p-6">
                  {/* Post meta */}
                  <div className="flex items-center gap-4 mb-4 text-xs font-mono text-white/60">
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
                      {post.reactions}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-green-400 transition-colors">{post.title}</h2>

                  {/* Excerpt */}
                  <p className="text-white/70 mb-4 leading-relaxed">{post.excerpt}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-white/60 flex items-center gap-1"
                      >
                        <Tag className="w-2 h-2" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read more */}
                  <div
                    className={`transition-opacity duration-300 ${hoveredPost === post.id ? "opacity-100" : "opacity-0"}`}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                    >
                      READ_MORE →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Interactive reaction demo */}
        <div className="text-center mt-12">
          <div className="inline-block p-6 border border-dashed border-white/20 rounded-lg">
            <Zap className="w-8 h-8 mx-auto mb-4 text-white/40" />
            <p className="font-mono text-white/60 text-sm mb-4">React to posts with visual effects</p>
            <div className="flex gap-2 justify-center">
              <Button size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                💥 MIND_BLOWN
              </Button>
              <Button size="sm" variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                🚀 LAUNCH_IT
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
              >
                ⚡ ENERGY
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
