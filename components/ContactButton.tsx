import { Send } from "lucide-react";
import Link from "next/link";

const ContactButton = () => {
  return (
    <Link href="/ping" className="group relative mx-2 font-mono text-sm">
      {/* Main button container */}
      <div className="relative bg-black px-4 py-2 before:absolute before:inset-0 before:bg-purple-500/20 before:backdrop-blur-sm before:transition-colors before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-r after:from-purple-500/0 after:via-purple-500/50 after:to-purple-500/0 after:opacity-0 after:transition-opacity after:duration-500 hover:before:bg-purple-500/30 hover:after:opacity-100">
        {/* Content */}
        <div className="relative flex items-center justify-center gap-1.5 text-purple-500 transition-colors duration-500 group-hover:text-purple-400">
          <span className="text-shadow-neon-purple tracking-[0.2em] uppercase">Reach_Out</span>
          <Send
            size={14}
            className="transform transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-1.5 -z-10 bg-purple-500/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"></div>
    </Link>
  );
};

export default ContactButton;
