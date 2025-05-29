"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Twitter, MessageCircle, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
      <nav className="relative z-10 p-6 flex justify-between items-center">
        <div className="font-mono text-sm text-green-400">
          [{currentTime}] SYSTEM_ACTIVE
        </div>
        <div className="flex gap-6">
          <Link
            href="/loops"
            className="text-white/70 hover:text-white transition-colors font-mono text-sm hover:glitch"
          >
            LOOPS
          </Link>
          <Link
            href="/logs"
            className="text-white/70 hover:text-white transition-colors font-mono text-sm hover:glitch"
          >
            LOGS
          </Link>
          <Link
            href="/trace"
            className="text-white/70 hover:text-white transition-colors font-mono text-sm hover:glitch"
          >
            TRACE
          </Link>
          <Link
            href="/ping"
            className="text-white/70 hover:text-white transition-colors font-mono text-sm hover:glitch"
          >
            PING
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-4xl">
          {/* Glitchy greeting */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-4 glitch-text">
              HEY, I'M
            </h1>
            <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              MERIEM
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
              className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-mono"
            >
              <Github className="w-4 h-4 mr-2" />
              github://Meriem-BM
            </Button>
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 font-mono"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              farcaster://meriembarhoumi
            </Button>
            <Button
              variant="outline"
              className="border-pink-500/50 text-pink-400 hover:bg-pink-500/10 font-mono"
            >
              <Zap className="w-4 h-4 mr-2" />
              lens://meriem
            </Button>
            <Button
              variant="outline"
              className="border-green-500/50 text-green-400 hover:bg-green-500/10 font-mono"
            >
              <Twitter className="w-4 h-4 mr-2" />
              twitter://meriembarhoumi
            </Button>
          </div>

          {/* CTA */}
          <Link href="/loops">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white font-mono text-lg px-8 py-4 transition-all duration-300 transform hover:scale-105">
              EXPLORE_WORK
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer status */}
      <footer className="relative z-10 p-6 text-center">
        <div className="font-mono text-xs text-white/40">
          STATUS: ONLINE | LOCATION: EARTH | STACK: NEXT.JS + NESTJS + REACT +
          SOLIDITY + RUST + TYPESCRIPT
        </div>
      </footer>
    </div>
  );
}
