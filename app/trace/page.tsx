"use client";

import { useState } from "react";
import { Users } from "lucide-react";
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
import PageHeader from "@/components/PageHeader";

export default function TracePage() {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  return (
    <motion.div
      className="relative min-h-screen bg-black text-white"
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
        className="pointer-events-none fixed inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div
          className="h-full w-full"
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
      <PageHeader
        title="TRACE"
        description="Journey through time and code"
        statusText="TRACED"
        statusInfo={`${timelineEvents.length} MILESTONES`}
        accentColor="orange"
      />

      <main className="relative z-10 p-6">
        {/* Timeline */}
        <motion.div className="mx-auto max-w-4xl" variants={containerVariants}>
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute top-0 bottom-0 left-8 w-px bg-gradient-to-b from-orange-500 via-red-500 to-purple-500"
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
                      className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-500 bg-black"
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
                        <IconComponent className="h-6 w-6 text-orange-400" />
                      </motion.div>
                    </motion.div>

                    {/* Event card */}
                    <motion.div className="flex-1" variants={cardVariants} whileHover="hover">
                      <Card
                        className={`border bg-black/50 transition-all duration-300 ${
                          hoveredEvent === event.id ? "border-orange-500/50" : "border-white/10"
                        }`}
                      >
                        <CardContent className="p-6">
                          {/* Event header */}
                          <div className="mb-4 flex items-start justify-between">
                            <div>
                              <motion.div
                                className="mb-2 flex items-center gap-2"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                              >
                                <span className="font-mono text-sm text-orange-400">
                                  {event.year}
                                </span>
                                <motion.span
                                  className={`rounded px-2 py-1 font-mono text-xs ${
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
                                className="mb-1 text-xl font-bold"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 + 0.4 }}
                              >
                                {event.title}
                              </motion.h3>
                              <motion.p
                                className="font-mono text-sm text-white/60"
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
                            className="mb-4 text-white/70"
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
                                className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs text-white/60"
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
          className="mx-auto mt-16 max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div className="mb-8 flex items-center gap-3" variants={itemVariants}>
            <motion.div
              className="h-8 w-1 bg-gradient-to-b from-purple-400 to-pink-400"
              initial={{ height: 0 }}
              animate={{ height: 32 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            />
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Users className="h-6 w-6 text-purple-400" />
              </motion.div>
              COMMUNITIES
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {communities.map((community, index) => (
              <Card
                key={community}
                className="group transform cursor-pointer border border-white/10 bg-black/50 transition-all duration-300 hover:scale-105 hover:border-purple-500/50"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CardContent className="relative overflow-hidden p-6 text-center">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                  {/* Community icon */}
                  <div className="relative z-10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-300 group-hover:scale-110">
                    <div className="h-6 w-6 rounded-full bg-white opacity-80"></div>
                  </div>

                  {/* Community name */}
                  <h3 className="relative z-10 mb-2 font-mono text-sm text-white/70 transition-colors duration-300 group-hover:text-white">
                    {community}
                  </h3>

                  {/* Status indicator */}
                  <div className="relative z-10 flex items-center justify-center gap-1 font-mono text-xs text-purple-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"></div>
                    ACTIVE
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-purple-400/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="absolute bottom-2 left-2 h-1 w-1 rounded-full bg-pink-400/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
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
            <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Card className="group cursor-pointer border border-dashed border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20 transition-all duration-300 hover:border-purple-500/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-3 text-purple-400 transition-colors group-hover:text-purple-300">
                    <Users className="h-5 w-5" />
                    <span className="font-mono text-sm">JOIN_THE_NETWORK</span>
                  </div>
                  <p className="mt-2 font-mono text-xs text-white/60">
                    Always looking for new communities to contribute to
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mx-auto mt-16 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.div
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
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
                <Card className="border border-white/10 bg-black/50 text-center">
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
