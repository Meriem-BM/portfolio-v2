"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import useGithub from "@/hooks/useGithub";
import { ProjectCard } from "@/components/loops/ProjectCard";

const MAX_PROJECTS = 20;

const BackgroundEffects = () => (
  <>
    {/* Gradient background */}
    <div className="fixed inset-0 opacity-20">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-green-900/30" />
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
      />
    </div>
  </>
);

const PageTitle = () => (
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400" />
        <h1 className="text-4xl md:text-6xl font-black glitch-text">LOOPS</h1>
      </div>
      <p className="text-white/60 font-mono text-lg ml-4">
        Projects, experiments, and digital artifacts
      </p>
    </div>

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
);

const LoadingView = () => (
  <div className="col-span-full flex justify-center mt-32">
    <div className="inline-block p-6 border border-dashed border-white/20 rounded-lg">
      <Zap className="w-8 h-8 mx-auto mb-4 text-white/40" />
      <p className="font-mono text-white/60 text-sm">
        Experiments are loading...
      </p>
    </div>
  </div>
);

const ErrorView = () => (
  <div className="col-span-full text-center mt-12">
    <p className="font-mono text-white/60 text-sm">Error loading projects</p>
  </div>
);

export default function LoopsPage() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const { data: projects, loading, error, loadMore } = useGithub(20);

  const handleProjectHover = (projectId: number) => {
    setHoveredProject(projectId);
  };

  const handleProjectLeave = () => {
    setHoveredProject(null);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <BackgroundEffects />

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <PageTitle />
        </div>
      </header>

      {/* Projects grid */}
      <main className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading && projects && projects.length === 0 && <LoadingView />}

            {error && <ErrorView />}

            {!loading &&
              !error &&
              projects?.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isHovered={hoveredProject === project.id}
                  onMouseEnter={() => handleProjectHover(project.id)}
                  onMouseLeave={handleProjectLeave}
                />
              ))}

            {projects && projects.length % MAX_PROJECTS === 0 && (
              <div className="col-span-full flex justify-center mt-12">
                <Button onClick={loadMore}>Load More</Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
