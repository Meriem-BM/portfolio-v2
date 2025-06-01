import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, MessageCircle, Heart, Tag } from "lucide-react";
import { staggerContainer } from "@/lib/animationVariats";
import { IBlogPost } from "@/types";

export default function PostCard({ post }: { post: IBlogPost }) {
  return (
    <Card className="bg-black/50 border border-white/10 hover:border-green-500/50 transition-colors duration-300 cursor-pointer group overflow-hidden">
      <CardContent className="p-6">
        {/* Post meta */}
        <motion.div
          className="flex items-center gap-4 mb-4 text-xs font-mono text-white/60"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1, color: "rgb(34, 197, 94)" }}
          >
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString()}
          </motion.div>
          <motion.div
            className="flex items-center gap-1"
            whileHover={{
              scale: 1.1,
              color: "rgb(59, 130, 246)",
            }}
          >
            <MessageCircle className="w-3 h-3" />
            {post.readTime}
          </motion.div>
          <motion.div
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1, color: "rgb(239, 68, 68)" }}
          >
            <motion.div
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
            >
              <Heart className="w-3 h-3" />
            </motion.div>
            {post.reactions}
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-2xl font-bold mb-3"
          whileHover={{ color: "rgb(34, 197, 94)" }}
        >
          {post.title}
        </motion.h2>

        {/* Excerpt */}
        <motion.p
          className="text-white/70 mb-4 leading-relaxed"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
        >
          {post.excerpt}
        </motion.p>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          variants={staggerContainer}
          animate="animate"
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-white/60 flex items-center gap-1"
            >
              <Tag className="w-2 h-2" />
              {tag}
            </span>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
