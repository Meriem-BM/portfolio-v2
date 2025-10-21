"use client";

import { useState, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Geist } from "next/font/google";
import StatusBar from "@/components/StatusBar";
import ExploreButton from "@/components/ExploreButton";
import ContactButton from "@/components/ContactButton";
import NavBar from "@/components/NavBar";
import { Farcaster, XIcon } from "@/components/custom-icons";
import { socialLinks } from "@/lib/social-links";

const geist = Geist({
  subsets: ["latin"],
});

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(192);

  useEffect(() => {
    const updateCursorSize = () => {
      if (window.innerWidth < 640) {
        setCursorSize(128); // w-64 h-64
      } else if (window.innerWidth < 768) {
        setCursorSize(160); // w-80 h-80
      } else {
        setCursorSize(192); // w-96 h-96
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    updateCursorSize();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", updateCursorSize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateCursorSize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20"></div>
        <div
          className="absolute h-64 w-64 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl transition-all duration-1000 ease-out sm:h-80 sm:w-80 md:h-96 md:w-96"
          style={{
            left: mousePosition.x - cursorSize,
            top: mousePosition.y - cursorSize,
          }}
        ></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-10">
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
      </div>

      {/* Scanlines */}
      <div className="pointer-events-none fixed inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)",
          }}
        ></div>
      </div>

      {/* Navigation */}
      <NavBar />

      {/* Main content */}
      <main className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-6xl text-center">
          {/* Glitchy greeting */}
          <div className="mb-6 sm:mb-8">
            <div className="mb-4 inline-block sm:mb-6">
              <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 sm:px-4">
                <span className="font-mono text-xs text-emerald-400 sm:text-sm">
                  Blockchain SWE
                </span>
              </div>
            </div>
            <h1
              className={`mb-4 animate-pulse bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-black text-transparent uppercase sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${geist.className}`}
            >
              Meriem B.
            </h1>
          </div>

          {/* Dynamic subtitle */}
          <p className="mb-8 px-4 font-mono text-lg leading-relaxed text-white/80 sm:mb-12 sm:text-xl md:text-2xl">
            I build <span className="font-bold text-cyan-400">interfaces</span>,
            <span className="font-bold text-purple-400"> systems</span>, and
            <span className="font-bold text-pink-400"> experiments</span>
          </p>

          {/* Social links as command chips */}
          <div className="mb-8 flex flex-wrap justify-center gap-2 px-4 sm:mb-12 sm:gap-3 md:gap-4">
            <Button
              variant="outline"
              onClick={() => window.open(socialLinks.github.url, "_blank")}
              className="border-orange-200/50 font-mono text-xs text-orange-200 hover:bg-orange-200/10 sm:text-sm"
              size="sm"
            >
              <Github className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="ml-1 sm:ml-2">
                <span className="hidden sm:inline">github://</span>
                {socialLinks.github.username}
              </span>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(socialLinks.linkedin.url, "_blank")}
              className="border-[#0077B5]/50 font-mono text-xs text-[#0077B5] hover:bg-[#0077B5]/10 sm:text-sm"
              size="sm"
            >
              <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="ml-1 sm:ml-2">
                <span className="hidden sm:inline">linkedin://</span>
                {socialLinks.linkedin.username}
              </span>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(socialLinks.twitter.url, "_blank")}
              className="border-gray-500/50 font-mono text-xs text-gray-500 hover:bg-gray-500/10 sm:text-sm"
              size="sm"
            >
              <XIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="ml-1 sm:ml-2">
                <span className="hidden sm:inline">x://</span>
                {socialLinks.twitter.username}
              </span>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(socialLinks.farcaster.url, "_blank")}
              className="border-[#796ab1]/50 font-mono text-xs text-[#796ab1] hover:bg-[#796ab1]/10 sm:text-sm"
              size="sm"
            >
              <Farcaster color="#796ab1" />
              <span className="ml-1 sm:ml-2">
                <span className="hidden sm:inline">farcaster://</span>
                {socialLinks.farcaster.username}
              </span>
            </Button>
          </div>

          {/* CTA */}
          <div className="mt-16 flex flex-col justify-center gap-4 px-4 sm:mt-20 sm:flex-row sm:gap-8 md:mt-24 md:gap-12">
            <ExploreButton />
            <ContactButton />
          </div>
        </div>
      </main>

      {/* Footer status */}
      <footer className="relative z-10 p-6 text-center">
        <StatusBar />
      </footer>
    </div>
  );
}
