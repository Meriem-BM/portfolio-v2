"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const projects = [
  {
    id: 1,
    title: "DeFi Dashboard",
    description: "Real-time portfolio tracking with Web3 integration",
    tech: ["React", "Next.js", "viem", "wagmi", "Tailwind"],
    status: "LIVE",
    year: "2024",
    type: "FRONTEND + BLOCKCHAIN",
  },
  {
    id: 2,
    title: "Neural Interface",
    description: "AI-powered design system generator",
    tech: ["TypeScript", "OpenAI", "Framer Motion", "Radix"],
    status: "BETA",
    year: "2024",
    type: "EXPERIMENTAL",
  },
  {
    id: 3,
    title: "Quantum Marketplace",
    description: "NFT marketplace with advanced filtering",
    tech: ["Solidity", "ethers.js", "IPFS", "React"],
    status: "ARCHIVED",
    year: "2023",
    type: "BLOCKCHAIN",
  },
  {
    id: 4,
    title: "Morphic UI Kit",
    description: "Component library with fluid animations",
    tech: ["React", "Storybook", "GSAP", "CSS-in-JS"],
    status: "LIVE",
    year: "2024",
    type: "DESIGN SYSTEM",
  },
]

export default function LoopsPage() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background effects */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-green-900/30"></div>
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
        <div className="max-w-7xl mx-auto">
          {/* Navigation breadcrumb */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-white/70 hover:text-cyan-400 transition-colors font-mono text-sm group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="relative">
                BACK_TO_ROOT
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            {/* Status indicator */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <div className="flex items-center gap-1 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                ACTIVE
              </div>
              <span className="text-white/40">|</span>
              <span className="text-white/60">4 PROJECTS LOADED</span>
            </div>
          </div>

          {/* Page title and description */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400"></div>
                <h1 className="text-4xl md:text-6xl font-black glitch-text">LOOPS</h1>
              </div>
              <p className="text-white/60 font-mono text-lg ml-4">Projects, experiments, and digital artifacts</p>
            </div>

            {/* Quick actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white/70 hover:border-cyan-400 hover:text-cyan-400 font-mono"
              >
                FILTER
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white/70 hover:border-purple-400 hover:text-purple-400 font-mono"
              >
                SORT
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Projects grid */}
      <main className="relative z-10 p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-black/50 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <CardContent className="p-6">
                {/* Project header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        project.status === "LIVE"
                          ? "bg-green-400"
                          : project.status === "BETA"
                            ? "bg-yellow-400"
                            : "bg-red-400"
                      } animate-pulse`}
                    ></div>
                    <span className="font-mono text-xs text-white/60">{project.status}</span>
                  </div>
                  <span className="font-mono text-xs text-white/40">{project.year}</span>
                </div>

                {/* Project title */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>

                {/* Project type */}
                <div className="text-xs font-mono text-purple-400 mb-3">{project.type}</div>

                {/* Description */}
                <p className="text-white/70 text-sm mb-4 leading-relaxed">{project.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div
                  className={`flex gap-2 transition-opacity duration-300 ${
                    hoveredProject === project.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Button size="sm" variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  >
                    <Github className="w-3 h-3 mr-1" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add more projects CTA */}
        <div className="text-center mt-12">
          <div className="inline-block p-6 border border-dashed border-white/20 rounded-lg">
            <Zap className="w-8 h-8 mx-auto mb-4 text-white/40" />
            <p className="font-mono text-white/60 text-sm">More experiments loading...</p>
          </div>
        </div>
      </main>
    </div>
  )
}
