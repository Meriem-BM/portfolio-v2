"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts, blogTags } from "@/lib/blogs/blogPost";
import {
  pageVariants,
  slideInVariants,
  pulseVariants,
  tagVariants,
  cardVariants,
  staggerContainer,
  floatVariants,
} from "@/lib/animationVariats";
import PostCard from "@/components/posts/PostCard";

export default function LogsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [reactionClicked, setReactionClicked] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? blogPosts.filter((post) => post.tags.includes(selectedTag))
    : blogPosts;

  const handleReactionClick = (reaction: string) => {
    setReactionClicked(reaction);
    setTimeout(() => setReactionClicked(null), 1000);
  };

  return (
    <motion.div
      className="min-h-screen bg-black text-white relative overflow-hidden"
      initial="initial"
      animate="animate"
      variants={pageVariants}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="fixed inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-blue-900/30 to-purple-900/30"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      </motion.div>

      <motion.div
        className="fixed inset-0 opacity-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "20px 20px"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Header */}
      <motion.header
        className="relative z-10 p-6 border-b border-white/10 backdrop-blur-sm"
        variants={slideInVariants}
      >
        <div className="max-w-4xl mx-auto">
          {/* Navigation breadcrumb */}
          <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center text-white/70 hover:text-green-400 transition-colors font-mono text-sm group"
            >
              <motion.div
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
              </motion.div>
              <motion.span className="relative" whileHover={{ scale: 1.05 }}>
                BACK_TO_ROOT
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-green-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            </Link>

            {/* Status indicator */}
            <motion.div
              className="flex items-center gap-2 font-mono text-xs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex items-center gap-1 text-green-400">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  variants={pulseVariants}
                  animate="animate"
                />
                SYNCED
              </div>
              <span className="text-white/40">|</span>
              <motion.span
                className="text-white/60"
                key={filteredPosts.length}
                initial={{ scale: 1.2, color: "rgb(34, 197, 94)" }}
                animate={{ scale: 1, color: "rgba(255, 255, 255, 0.6)" }}
                transition={{ duration: 0.3 }}
              >
                {filteredPosts.length} ENTRIES
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Page title and description */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  className="w-1 h-8 bg-gradient-to-b from-green-400 to-blue-400"
                  initial={{ height: 0 }}
                  animate={{ height: 32 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                />
                <motion.h1
                  className="text-4xl md:text-6xl font-black"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  whileHover={{
                    textShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
                    transition: { duration: 0.2 },
                  }}
                >
                  LOGS
                </motion.h1>
              </div>
              <motion.p
                className="text-white/60 font-mono text-lg ml-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Field notes from the digital frontier
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Tag filters */}
      <motion.div
        className="relative z-10 px-6 mb-8 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-wrap gap-2 max-w-4xl mx-auto"
          variants={staggerContainer}
          animate="animate"
        >
          <motion.div
            variants={tagVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
              className="font-mono text-xs border-white/30"
            >
              ALL
            </Button>
          </motion.div>
          {blogTags.map((tag) => (
            <motion.div
              key={tag}
              variants={tagVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className="font-mono text-xs border-white/30"
              >
                #{tag}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Blog posts */}
      <motion.main
        className="relative z-10 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div
          className="grid gap-6 max-w-4xl mx-auto"
          variants={staggerContainer}
          animate="animate"
        >
          <AnimatePresence mode="wait">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                layout
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/logs/${post.slug}`}>
                  <PostCard post={post} />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Interactive reaction demo */}
        <motion.div
          className="text-center mt-12"
          variants={floatVariants}
          animate="animate"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-block p-6 border border-dashed border-white/20 rounded-lg relative overflow-hidden">
            <AnimatePresence>
              {reactionClicked && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                />
              )}
            </AnimatePresence>

            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="w-8 h-8 mx-auto mb-4 text-white/40" />
            </motion.div>
            <motion.p
              className="font-mono text-white/60 text-sm mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              React to posts with visual effects
            </motion.p>
            <motion.div
              className="flex gap-2 justify-center"
              variants={staggerContainer}
              animate="animate"
            >
              <motion.div
                variants={tagVariants}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  onClick={() => handleReactionClick("mind_blown")}
                >
                  💥 MIND_BLOWN
                </Button>
              </motion.div>
              <motion.div
                variants={tagVariants}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                  onClick={() => handleReactionClick("launch_it")}
                >
                  🚀 LAUNCH_IT
                </Button>
              </motion.div>
              <motion.div
                variants={tagVariants}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  onClick={() => handleReactionClick("energy")}
                >
                  ⚡ ENERGY
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
