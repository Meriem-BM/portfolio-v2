"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Zap, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import useGithub from "@/hooks/useGithub";
import { ProjectCard } from "@/components/loops/ProjectCard";
import { IProject } from "@/types";
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

const titleVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
      delay: 0.1,
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
      <motion.div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{ y: y2 }}
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

const PageTitle = () => (
  <motion.div
    className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
    variants={titleVariants}
    initial="hidden"
    animate="visible"
  >
    <div>
      <div className="flex items-center gap-3 mb-2">
        <motion.div
          className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400"
          initial={{ height: 0 }}
          animate={{ height: 32 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        />
        <motion.h1
          className="text-4xl md:text-6xl font-black glitch-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          LOOPS
        </motion.h1>
      </div>
      <motion.p
        className="text-white/60 font-mono text-lg ml-4"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Projects, experiments, and digital artifacts
      </motion.p>
    </div>
  </motion.div>
);

const LoadingView = () => (
  <motion.div
    className="col-span-full flex justify-center mt-32"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="inline-block p-6 border border-dashed border-white/20 rounded-lg">
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
        <Zap className="w-8 h-8 mx-auto mb-4 text-white/40" />
      </motion.div>
      <motion.p
        className="font-mono text-white/60 text-sm"
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
    className="col-span-full text-center mt-12"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <p className="font-mono text-white/60 text-sm">Error loading projects</p>
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

    const filteredProjects = projects?.filter(
      (project) => project.language === language
    );
    setProjectList(filteredProjects || []);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <BackgroundEffects />

      {/* Header */}
      <motion.header
        className="relative z-10 p-6 border-b border-white/10 backdrop-blur-sm"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto">
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
                ACTIVE
              </div>
              <span className="text-white/40">|</span>
              <span className="text-white/60">4 PROJECTS LOADED</span>
            </div>
          </div>

          <PageTitle />
        </div>
      </motion.header>

      {/* Filter by languages */}
      <AnimatePresence>
        {languages && languages.length > 0 && (
          <motion.div
            className="relative z-10 p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="flex gap-2 flex-wrap"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {languages.map((language, index) => (
                  <motion.button
                    key={language}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-white/60 transition-colors cursor-pointer"
                    variants={filterButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    animate={
                      selectedLanguage === language ? "selected" : "initial"
                    }
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
                    className="px-2 py-1 text-xs font-mono transition-colors cursor-pointer text-red-500"
                    variants={filterButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => {
                      setSelectedLanguage(null);
                      filterProjectsByLanguage("");
                    }}
                  >
                    <X className="w-4 h-4" />
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
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="wait">
              {loading && projects && projects.length === 0 && (
                <LoadingView key="loading" />
              )}

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
                <motion.div className="col-span-full flex justify-center mt-12">
                  <p className="font-mono text-white/60 text-sm">
                    No projects found
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {projectList &&
              projectList.length % MAX_PROJECTS === 0 &&
              projectList.length > 0 && (
                <motion.div
                  className="col-span-full flex justify-center mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
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
