import React, { useEffect, useState } from "react";

const StatusBar: React.FC = () => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setIsTyping((prev) => !prev);
    }, 800);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="text-xs text-gray-500 font-mono mt-16 mb-4 tracking-wider">
      <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
        <span className="inline-flex items-center">
          STATUS:
          <span className="ml-1 text-green-400">ONLINE</span>
          <span
            className={`ml-1 h-1.5 w-1.5 rounded-full bg-green-400 ${
              isTyping ? "opacity-100" : "opacity-40"
            }`}
          ></span>
        </span>
        <span className="hidden sm:inline">|</span>
        <span>
          LOCATION: <span className="text-blue-400">EARTH</span>
        </span>
        <span className="hidden sm:inline">|</span>
        <span className="flex flex-wrap items-center justify-center">
          <span className="mr-1">STACK:</span>
          <span className="text-gray-200">NEXT.JS</span>
          <span className="mx-1">+</span>
          <span className="text-red-400">NESTJS</span>
          <span className="mx-1">+</span>
          <span className="text-blue-400">REACT</span>
          <span className="mx-1">+</span>
          <span className="text-green-400">SOLIDITY</span>
          <span className="mx-1">+</span>
          <span className="text-orange-400">RUST</span>
          <span className="mx-1">+</span>
          <span className="text-blue-300">TYPESCRIPT</span>
        </span>
      </div>
    </div>
  );
};

export default StatusBar;
