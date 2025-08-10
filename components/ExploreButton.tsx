import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ExploreButton = () => {
  return (
    <Link href="/loops" className="group relative font-mono text-sm mx-2">
      <div
        className="relative px-4 py-2 bg-black
                    before:absolute before:inset-0 before:bg-cyan-500/20 before:backdrop-blur-sm
                    after:absolute after:inset-0 after:bg-gradient-to-r after:from-cyan-500/0 
                    after:via-cyan-500/50 after:to-cyan-500/0 after:opacity-0
                    hover:after:opacity-100 after:transition-opacity after:duration-500
                    hover:before:bg-cyan-500/30 before:transition-colors before:duration-500"
      >
        {/* Content */}
        <div className="relative flex items-center justify-center gap-1.5 text-cyan-500 group-hover:text-cyan-400 transition-colors duration-500">
          <span className="tracking-[0.2em] uppercase text-shadow-neon">
            Explore_Work
          </span>
          <ArrowRight
            size={14}
            className="transform group-hover:translate-x-1 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Glow effect */}
      <div
        className="absolute -inset-1.5 bg-cyan-500/20 blur-lg opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500 -z-10"
      ></div>
    </Link>
  );
};

export default ExploreButton;
