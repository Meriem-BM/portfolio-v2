import { Send } from "lucide-react";
import Link from "next/link";

const ContactButton = () => {
  return (
    <Link href="/contact" className="group relative font-mono text-sm mx-2">
      {/* Main button container */}
      <div
        className="relative px-4 py-2 bg-black
                    before:absolute before:inset-0 before:bg-purple-500/20 before:backdrop-blur-sm
                    after:absolute after:inset-0 after:bg-gradient-to-r after:from-purple-500/0 
                    after:via-purple-500/50 after:to-purple-500/0 after:opacity-0
                    hover:after:opacity-100 after:transition-opacity after:duration-500
                    hover:before:bg-purple-500/30 before:transition-colors before:duration-500"
      >
        {/* Content */}
        <div className="relative flex items-center gap-1.5 text-purple-500 group-hover:text-purple-400 transition-colors duration-500">
          <span className="tracking-[0.2em] uppercase text-shadow-neon-purple">
            Reach_Out
          </span>
          <Send
            size={14}
            className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Glow effect */}
      <div
        className="absolute -inset-1.5 bg-purple-500/20 blur-lg opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500 -z-10"
      ></div>
    </Link>
  );
};

export default ContactButton;
