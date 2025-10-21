"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import useGithub from "@/hooks/useGithub";
import { ProjectCard } from "@/components/loops/ProjectCard";
import { IProject } from "@/types";
import PageHeader from "@/components/PageHeader";
const MAX_PROJECTS = 20;

const languages = ["JavaScript", "TypeScript", "Python", "Solidity", "Rust"];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const filterButtonVariants = {
  initial: { scale: 1, opacity: 0.7 },
  hover: {
    scale: 1.05,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.95 },
  selected: {
    scale: 1.02,
    opacity: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
};

const BackgroundEffects = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -25]);

  return (
    <>
      {/* Animated gradient background */}
      <motion.div className="fixed inset-0 opacity-20" style={{ y: y1 }}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-green-900/30"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(147, 51, 234, 0.3), rgba(30, 64, 175, 0.3), rgba(5, 150, 105, 0.3))",
              "linear-gradient(90deg, rgba(30, 64, 175, 0.3), rgba(5, 150, 105, 0.3), rgba(147, 51, 234, 0.3))",
              "linear-gradient(135deg, rgba(5, 150, 105, 0.3), rgba(147, 51, 234, 0.3), rgba(30, 64, 175, 0.3))",
              "linear-gradient(45deg, rgba(147, 51, 234, 0.3), rgba(30, 64, 175, 0.3), rgba(5, 150, 105, 0.3))",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Animated grid pattern overlay */}
      <motion.div className="pointer-events-none fixed inset-0 opacity-10" style={{ y: y2 }}>
        <motion.div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "20px 20px", "0px 0px"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </>
  );
};

const LoadingView = () => (
  <motion.div
    className="col-span-full mt-32 flex justify-center"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="inline-block rounded-lg border border-dashed border-white/20 p-6">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Zap className="mx-auto mb-4 h-8 w-8 text-white/40" />
      </motion.div>
      <motion.p
        className="font-mono text-sm text-white/60"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Experiments are loading...
      </motion.p>
    </div>
  </motion.div>
);

const ErrorView = () => (
  <motion.div
    className="col-span-full mt-12 text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <p className="font-mono text-sm text-white/60">Error loading projects</p>
  </motion.div>
);

export default function LoopsPage() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const { data: projects, loading, error, loadMore } = useGithub(20);

  useEffect(() => {
    setProjectList(projects || []);
  }, [projects]);

  const handleProjectHover = (projectId: number) => {
    setHoveredProject(projectId);
  };

  const handleProjectLeave = () => {
    setHoveredProject(null);
  };

  const filterProjectsByLanguage = (language: string) => {
    if (language === "") {
      setProjectList(projects || []);
      return;
    }

    const filteredProjects = projects?.filter((project) => project.language === language);
    setProjectList(filteredProjects || []);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <BackgroundEffects />

      {/* Header */}
      <PageHeader
        title="LOOPS"
        description="Projects, experiments, and digital artifacts"
        statusText="ACTIVE"
        statusInfo="4 PROJECTS LOADED"
        accentColor="purple"
        maxWidth="7xl"
      />

      {/* Filter by languages */}
      <AnimatePresence>
        {languages && languages.length > 0 && (
          <motion.div
            className="relative z-10 p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="mx-auto max-w-7xl">
              <motion.div
                className="flex flex-wrap gap-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {languages.map((language, index) => (
                  <motion.button
                    key={language}
                    className="cursor-pointer rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs text-white/60 transition-colors"
                    variants={filterButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    animate={selectedLanguage === language ? "selected" : "initial"}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSelectedLanguage(language);
                      filterProjectsByLanguage(language);
                    }}
                  >
                    {language}
                  </motion.button>
                ))}
                {selectedLanguage && (
                  <motion.button
                    className="cursor-pointer px-2 py-1 font-mono text-xs text-red-500 transition-colors"
                    variants={filterButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => {
                      setSelectedLanguage(null);
                      filterProjectsByLanguage("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects grid */}
      <motion.main
        className="relative z-10 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="wait">
              {loading && projects && projects.length === 0 && <LoadingView key="loading" />}

              {error && <ErrorView key="error" />}

              {!loading &&
                !error &&
                projectList?.map((project, index) => (
                  <motion.article
                    key={project.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.2 },
                    }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{
                      y: -8,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                    layout
                  >
                    <ProjectCard
                      project={project}
                      isHovered={hoveredProject === project.id}
                      onMouseEnter={() => handleProjectHover(project.id)}
                      onMouseLeave={handleProjectLeave}
                    />
                  </motion.article>
                ))}

              {projectList && projectList.length === 0 && (
                <motion.div className="col-span-full mt-12 flex justify-center">
                  <p className="font-mono text-sm text-white/60">No projects found</p>
                </motion.div>
              )}
            </AnimatePresence>

            {projectList && projectList.length % MAX_PROJECTS === 0 && projectList.length > 0 && (
              <motion.div
                className="col-span-full mt-12 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={loadMore}>Load More</Button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}
