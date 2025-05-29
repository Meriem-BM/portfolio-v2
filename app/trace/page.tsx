"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Award, Users, Code } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const timelineEvents = [
  {
    id: 1,
    year: "2024",
    title: "Senior Frontend Engineer",
    company: "Web3 Startup",
    type: "work",
    description: "Leading frontend architecture for DeFi protocols",
    tech: ["React", "Next.js", "viem", "wagmi"],
    icon: Code,
  },
  {
    id: 2,
    year: "2024",
    title: "ETHGlobal Hackathon Winner",
    company: "ETHGlobal",
    type: "achievement",
    description: "Built a cross-chain NFT marketplace in 48 hours",
    tech: ["Solidity", "Polygon", "IPFS"],
    icon: Award,
  },
  {
    id: 3,
    year: "2023",
    title: "Frontend Developer",
    company: "Tech Agency",
    type: "work",
    description: "Crafted digital experiences for Fortune 500 clients",
    tech: ["React", "TypeScript", "GSAP"],
    icon: Code,
  },
  {
    id: 4,
    year: "2023",
    title: "DevCon VI Speaker",
    company: "Ethereum Foundation",
    type: "community",
    description: "Presented on 'The Future of Web3 UX'",
    tech: ["Public Speaking", "Web3", "UX"],
    icon: Users,
  },
  {
    id: 5,
    year: "2022",
    title: "Freelance Developer",
    company: "Independent",
    type: "work",
    description: "Built custom solutions for startups and agencies",
    tech: ["React", "Node.js", "MongoDB"],
    icon: Code,
  },
]

const communities = ["Developer DAO", "Buildspace", "ETHGlobal", "Farcaster", "Lens Protocol"]

export default function TracePage() {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background effects */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-red-900/30 to-purple-900/30"></div>
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
              className="inline-flex items-center text-white/70 hover:text-orange-400 transition-colors font-mono text-sm group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="relative">
                BACK_TO_ROOT
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            {/* Status indicator */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <div className="flex items-center gap-1 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                TRACED
              </div>
              <span className="text-white/40">|</span>
              <span className="text-white/60">{timelineEvents.length} MILESTONES</span>
            </div>
          </div>

          {/* Page title and description */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-gradient-to-b from-orange-400 to-red-400"></div>
                <h1 className="text-4xl md:text-6xl font-black glitch-text">TRACE</h1>
              </div>
              <p className="text-white/60 font-mono text-lg ml-4">Journey through time and code</p>
            </div>

            {/* Timeline controls */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white/70 hover:border-orange-400 hover:text-orange-400 font-mono"
              >
                TIMELINE
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white/70 hover:border-red-400 hover:text-red-400 font-mono"
              >
                RESUME
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 p-6">
        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500 via-red-500 to-purple-500"></div>

            {/* Timeline events */}
            <div className="space-y-8">
              {timelineEvents.map((event, index) => {
                const IconComponent = event.icon
                return (
                  <div
                    key={event.id}
                    className="relative flex items-start gap-6"
                    onMouseEnter={() => setHoveredEvent(event.id)}
                    onMouseLeave={() => setHoveredEvent(null)}
                  >
                    {/* Timeline dot */}
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-black border-2 border-orange-500 rounded-full">
                      <IconComponent className="w-6 h-6 text-orange-400" />
                    </div>

                    {/* Event card */}
                    <Card
                      className={`flex-1 bg-black/50 border transition-all duration-300 ${
                        hoveredEvent === event.id ? "border-orange-500/50 transform scale-105" : "border-white/10"
                      }`}
                    >
                      <CardContent className="p-6">
                        {/* Event header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-mono text-sm text-orange-400">{event.year}</span>
                              <span
                                className={`px-2 py-1 rounded text-xs font-mono ${
                                  event.type === "work"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : event.type === "achievement"
                                      ? "bg-green-500/20 text-green-400"
                                      : "bg-purple-500/20 text-purple-400"
                                }`}
                              >
                                {event.type.toUpperCase()}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                            <p className="text-white/60 font-mono text-sm">{event.company}</p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-white/70 mb-4">{event.description}</p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2">
                          {event.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-white/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Communities section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400"></div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Users className="w-6 h-6 text-purple-400" />
              COMMUNITIES
            </h2>
          </div>

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
          <div className="mt-8 text-center">
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
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="bg-black/50 border border-white/10 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
                <div className="font-mono text-xs text-white/60">PROJECTS</div>
              </CardContent>
            </Card>
            <Card className="bg-black/50 border border-white/10 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">15</div>
                <div className="font-mono text-xs text-white/60">HACKATHONS</div>
              </CardContent>
            </Card>
            <Card className="bg-black/50 border border-white/10 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">5</div>
                <div className="font-mono text-xs text-white/60">CONFERENCES</div>
              </CardContent>
            </Card>
            <Card className="bg-black/50 border border-white/10 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-400 mb-2">∞</div>
                <div className="font-mono text-xs text-white/60">LEARNING</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
