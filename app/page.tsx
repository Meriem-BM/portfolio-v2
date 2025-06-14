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

const geist = Geist({
  subsets: ["latin"],
});

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 animate-pulse"></div>
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
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

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)",
          }}
        ></div>
      </div>

      {/* Navigation */}
      <NavBar />

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-6xl">
          {/* Glitchy greeting */}
          <div className="mb-8">
            <div className="mb-6 inline-block">
              <div className="px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="text-emerald-400 font-mono text-sm">
                  Blockchain SWE
                </span>
              </div>
            </div>
            <h1
              className={`text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 uppercase to-pink-400 bg-clip-text text-transparent animate-pulse ${geist.className}`}
            >
              Meriem B.
            </h1>
          </div>

          {/* Dynamic subtitle */}
          <p className="text-xl md:text-2xl font-mono mb-12 text-white/80 leading-relaxed">
            I build <span className="text-cyan-400 font-bold">interfaces</span>,
            <span className="text-purple-400 font-bold"> systems</span>, and
            <span className="text-pink-400 font-bold"> experiments</span>
          </p>

          {/* Social links as command chips */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant="outline"
              onClick={() =>
                window.open("https://github.com/Meriem-BM", "_blank")
              }
              className="border-orange-200/50 text-orange-200 hover:bg-orange-200/10 font-mono"
            >
              <Github className="w-4 h-4 mr-2" />
              github://Meriem-BM
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/meriem-barhoumi/",
                  "_blank"
                )
              }
              className="border-[#0077B5]/50 text-[#0077B5] hover:bg-[#0077B5]/10 font-mono"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              linkedin://meriem-barhoumi
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open("https://x.com/meriembarhoumi", "_blank")
              }
              className="border-gray-500/50 text-gray-500 hover:bg-gray-500/10 font-mono"
            >
              <XIcon className="w-4 h-4 mr-2" />
              x://meriembarhoumi
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  "https://farcaster.xyz/meriembarhoumi.eth",
                  "_blank"
                )
              }
              className="border-[#796ab1]/50 text-[#796ab1] hover:bg-[#796ab1]/10 font-mono"
            >
              <Farcaster color="#796ab1" />
              farcaster://meriembarhoumi
            </Button>
          </div>

          {/* CTA */}
          <div className="flex justify-center gap-12 mt-24">
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
