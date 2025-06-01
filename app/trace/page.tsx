"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { timelineEvents, communities } from "@/lib/work/timelineEvents";
import {
  containerVariants,
  itemVariants,
  timelineVariants,
  cardVariants,
  statsVariants,
} from "@/lib/animationVariats";

export default function TracePage() {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  return (
    <motion.div
      className="min-h-screen bg-black text-white relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background effects */}
      <motion.div
        className="fixed inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-red-900/30 to-purple-900/30"></div>
      </motion.div>

      {/* Grid pattern overlay */}
      <motion.div
        className="fixed inset-0 opacity-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
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
      </motion.div>

      {/* Header */}
      <motion.header
        className="relative z-10 p-6 border-b border-white/10 backdrop-blur-sm"
        variants={itemVariants}
      >
        <div className="max-w-4xl mx-auto">
          {/* Navigation breadcrumb */}
          <motion.div
            className="flex items-center justify-between mb-6"
            variants={itemVariants}
          >
            <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
              <Link
                href="/"
                className="inline-flex items-center text-white/70 hover:text-orange-400 transition-colors font-mono text-sm group"
              >
                <motion.div
                  animate={{ x: [-2, 0, -2] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                </motion.div>
                <span className="relative">
                  BACK_TO_ROOT
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            </motion.div>

            {/* Status indicator */}
            <motion.div
              className="flex items-center gap-2 font-mono text-xs"
              variants={itemVariants}
            >
              <div className="flex items-center gap-1 text-green-400">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                TRACED
              </div>
              <span className="text-white/40">|</span>
              <span className="text-white/60">
                {timelineEvents.length} MILESTONES
              </span>
            </motion.div>
          </motion.div>

          {/* Page title and description */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
            variants={itemVariants}
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  className="w-1 h-8 bg-gradient-to-b from-orange-400 to-red-400"
                  initial={{ height: 0 }}
                  animate={{ height: 32 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <motion.h1
                  className="text-4xl md:text-6xl font-black glitch-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  TRACE
                </motion.h1>
              </div>
              <motion.p
                className="text-white/60 font-mono text-lg ml-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Journey through time and code
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <main className="relative z-10 p-6">
        {/* Timeline */}
        <motion.div className="max-w-4xl mx-auto" variants={containerVariants}>
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500 via-red-500 to-purple-500"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100%", opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />

            {/* Timeline events */}
            <motion.div className="space-y-8" variants={containerVariants}>
              {timelineEvents.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <motion.div
                    key={event.id}
                    className="relative flex items-start gap-6"
                    variants={timelineVariants}
                    custom={index}
                    onMouseEnter={() => setHoveredEvent(event.id)}
                    onMouseLeave={() => setHoveredEvent(null)}
                    whileHover="hover"
                  >
                    {/* Timeline dot */}
                    <motion.div
                      className="relative z-10 flex items-center justify-center w-16 h-16 bg-black border-2 border-orange-500 rounded-full"
                      whileHover={{
                        scale: 1.1,
                        borderColor: "#ff6b35",
                        boxShadow: "0 0 20px rgba(255, 107, 53, 0.5)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        animate={{
                          rotate: hoveredEvent === event.id ? 360 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <IconComponent className="w-6 h-6 text-orange-400" />
                      </motion.div>
                    </motion.div>

                    {/* Event card */}
                    <motion.div
                      className="flex-1"
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <Card
                        className={`bg-black/50 border transition-all duration-300 ${
                          hoveredEvent === event.id
                            ? "border-orange-500/50"
                            : "border-white/10"
                        }`}
                      >
                        <CardContent className="p-6">
                          {/* Event header */}
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <motion.div
                                className="flex items-center gap-2 mb-2"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                              >
                                <span className="font-mono text-sm text-orange-400">
                                  {event.year}
                                </span>
                                <motion.span
                                  className={`px-2 py-1 rounded text-xs font-mono ${
                                    event.type === "work"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : event.type === "achievement"
                                      ? "bg-green-500/20 text-green-400"
                                      : "bg-purple-500/20 text-purple-400"
                                  }`}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {event.type.toUpperCase()}
                                </motion.span>
                              </motion.div>
                              <motion.h3
                                className="text-xl font-bold mb-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 + 0.4 }}
                              >
                                {event.title}
                              </motion.h3>
                              <motion.p
                                className="text-white/60 font-mono text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 + 0.5 }}
                              >
                                {event.company}
                              </motion.p>
                            </div>
                          </div>

                          {/* Description */}
                          <motion.p
                            className="text-white/70 mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.6 }}
                          >
                            {event.description}
                          </motion.p>

                          {/* Tech stack */}
                          <motion.div
                            className="flex flex-wrap gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.7 }}
                          >
                            {event.tech.map((tech, techIndex) => (
                              <motion.span
                                key={tech}
                                className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-white/60"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: index * 0.1 + 0.8 + techIndex * 0.1,
                                }}
                                whileHover={{
                                  scale: 1.1,
                                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                                }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Communities section */}
        <motion.div
          className="max-w-4xl mx-auto mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            className="flex items-center gap-3 mb-8"
            variants={itemVariants}
          >
            <motion.div
              className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400"
              initial={{ height: 0 }}
              animate={{ height: 32 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            />
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Users className="w-6 h-6 text-purple-400" />
              </motion.div>
              COMMUNITIES
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community, index) => (
              <Card
                key={community}
                className="bg-black/50 border border-white/10 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 group cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CardContent className="p-6 text-center relative overflow-hidden">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Community icon */}
                  <div className="relative z-10 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-6 h-6 bg-white rounded-full opacity-80"></div>
                  </div>

                  {/* Community name */}
                  <h3 className="relative z-10 font-mono text-sm text-white/70 group-hover:text-white transition-colors duration-300 mb-2">
                    {community}
                  </h3>

                  {/* Status indicator */}
                  <div className="relative z-10 flex items-center justify-center gap-1 text-xs font-mono text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    ACTIVE
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-pink-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add community CTA */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-dashed border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-3 text-purple-400 group-hover:text-purple-300 transition-colors">
                    <Users className="w-5 h-5" />
                    <span className="font-mono text-sm">JOIN_THE_NETWORK</span>
                  </div>
                  <p className="text-white/60 text-xs mt-2 font-mono">
                    Always looking for new communities to contribute to
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="max-w-4xl mx-auto mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {[
              { value: "20+", label: "PROJECTS", color: "text-cyan-400" },
              { value: "4", label: "HACKATHONS", color: "text-green-400" },
              { value: "3", label: "CONFERENCES", color: "text-purple-400" },
              { value: "∞", label: "LEARNING", color: "text-orange-400" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statsVariants}
                whileHover="hover"
                custom={index}
              >
                <Card className="bg-black/50 border border-white/10 text-center">
                  <CardContent className="p-6">
                    <motion.div
                      className={`text-3xl font-bold ${stat.color} mb-2`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 2 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <motion.div
                      className="font-mono text-xs text-white/60"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 + index * 0.1 }}
                    >
                      {stat.label}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
}
