"use client";

import React from "react";

export default function BackgroundEffects() {
  return (
    <>
      {/* Background effects */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/30 to-blue-900/30"></div>
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
    </>
  );
}