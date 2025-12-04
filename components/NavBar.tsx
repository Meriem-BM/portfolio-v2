import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
  const [currentTime, setCurrentTime] = useState("");

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

  return (
    <nav className="relative z-10 flex flex-col items-center justify-between gap-6 p-6 sm:flex-row sm:gap-0">
      <div className="font-mono text-sm text-green-400">[{currentTime}] SYSTEM_ACTIVE</div>
      <div className="flex gap-6">
        <Link
          href="/loops"
          className="hover:glitch font-mono text-sm text-white/70 transition-colors hover:text-white"
        >
          LOOPS
        </Link>
        <Link
          href="/logs"
          className="hover:glitch font-mono text-sm text-white/70 transition-colors hover:text-white"
        >
          LOGS
        </Link>
        <Link
          href="/trace"
          className="hover:glitch font-mono text-sm text-white/70 transition-colors hover:text-white"
        >
          TRACE
        </Link>
        <Link
          href="/ping"
          className="hover:glitch font-mono text-sm text-white/70 transition-colors hover:text-white"
        >
          PING
        </Link>
      </div>
    </nav>
  );
}
