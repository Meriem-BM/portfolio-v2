"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description: string;
  statusText: string;
  statusInfo?: string;
  accentColor?: "pink" | "green" | "orange" | "blue" | "purple";
  showBackButton?: boolean;
  maxWidth?: "7xl" | "6xl" | "5xl" | "4xl";
}

const colorVariants = {
  pink: {
    hover: "hover:text-pink-400",
    accent: "bg-pink-400",
    gradient: "from-pink-400 to-purple-400",
    underline: "bg-pink-400",
  },
  green: {
    hover: "hover:text-green-400",
    accent: "bg-green-400",
    gradient: "from-green-400 to-blue-400",
    underline: "bg-green-400",
  },
  orange: {
    hover: "hover:text-orange-400",
    accent: "bg-orange-400",
    gradient: "from-orange-400 to-red-400",
    underline: "bg-orange-400",
  },
  blue: {
    hover: "hover:text-blue-400",
    accent: "bg-blue-400",
    gradient: "from-blue-400 to-purple-400",
    underline: "bg-blue-400",
  },
  purple: {
    hover: "hover:text-purple-400",
    accent: "bg-purple-400",
    gradient: "from-purple-400 to-pink-400",
    underline: "bg-purple-400",
  },
};

export default function PageHeader({
  title,
  description,
  statusText,
  statusInfo,
  accentColor = "pink",
  showBackButton = true,
  maxWidth = "4xl",
}: PageHeaderProps) {
  const colors = colorVariants[accentColor];

  return (
    <header className="relative z-10 p-4 sm:p-6 border-b border-white/10 backdrop-blur-sm">
      <div
        className={cn(
          "max-w-4xl mx-auto",
          maxWidth === "7xl" && "max-w-7xl",
          maxWidth === "6xl" && "max-w-6xl",
          maxWidth === "5xl" && "max-w-5xl"
        )}
      >
        {/* Navigation breadcrumb */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          {showBackButton && (
            <Link
              href="/"
              className={cn(
                "inline-flex items-center text-white/70",
                colors.hover,
                "transition-colors font-mono text-xs sm:text-sm group"
              )}
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="relative">
                <span className="hidden sm:inline">BACK_TO_ROOT</span>
                <span className="sm:hidden">BACK</span>
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-px",
                    colors.underline,
                    "group-hover:w-full transition-all duration-300"
                  )}
                ></span>
              </span>
            </Link>
          )}

          {/* Status indicator */}
          <div className="flex items-center gap-1 sm:gap-2 font-mono text-xs">
            <div
              className={cn(
                "flex items-center gap-1",
                accentColor === "pink"
                  ? "text-pink-400"
                  : accentColor === "green"
                  ? "text-green-400"
                  : accentColor === "orange"
                  ? "text-orange-400"
                  : accentColor === "blue"
                  ? "text-blue-400"
                  : "text-purple-400"
              )}
            >
              <div
                className={cn(
                  "w-2 h-2",
                  colors.accent,
                  "rounded-full animate-pulse"
                )}
              ></div>
              <span className="hidden xs:inline">{statusText}</span>
            </div>
            {statusInfo && (
              <>
                <span className="text-white/40 hidden sm:inline">|</span>
                <span className="text-white/60 hidden md:inline">
                  {statusInfo}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Page title and description */}
        <div className="flex flex-col">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div
                className={cn(
                  "w-1 h-6 sm:h-8 bg-gradient-to-b",
                  colors.gradient
                )}
              ></div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black glitch-text">
                {title}
              </h1>
            </div>
            <p className="text-white/60 font-mono text-sm sm:text-base lg:text-lg ml-3 sm:ml-4">
              {description}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
