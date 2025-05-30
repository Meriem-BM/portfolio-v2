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
  );
}
