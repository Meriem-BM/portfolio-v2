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
    <header className="relative z-10 border-b border-white/10 p-4 backdrop-blur-sm sm:p-6">
      <div
        className={cn(
          "mx-auto max-w-4xl",
          maxWidth === "7xl" && "max-w-7xl",
          maxWidth === "6xl" && "max-w-6xl",
          maxWidth === "5xl" && "max-w-5xl"
        )}
      >
        {/* Navigation breadcrumb */}
        <div className="mb-4 flex items-center justify-between sm:mb-6">
          {showBackButton && (
            <Link
              href="/"
              className={cn(
                "inline-flex items-center text-white/70",
                colors.hover,
                "group font-mono text-xs transition-colors sm:text-sm"
              )}
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="relative">
                <span className="hidden sm:inline">BACK_TO_ROOT</span>
                <span className="sm:hidden">BACK</span>
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-0",
                    colors.underline,
                    "transition-all duration-300 group-hover:w-full"
                  )}
                ></span>
              </span>
            </Link>
          )}

          {/* Status indicator */}
          <div className="flex items-center gap-1 font-mono text-xs sm:gap-2">
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
              <div className={cn("h-2 w-2", colors.accent, "animate-pulse rounded-full")}></div>
              <span className="xs:inline hidden">{statusText}</span>
            </div>
            {statusInfo && (
              <>
                <span className="hidden text-white/40 sm:inline">|</span>
                <span className="hidden text-white/60 md:inline">{statusInfo}</span>
              </>
            )}
          </div>
        </div>

        {/* Page title and description */}
        <div className="flex flex-col">
          <div>
            <div className="mb-2 flex items-center gap-2 sm:gap-3">
              <div className={cn("h-6 w-1 bg-gradient-to-b sm:h-8", colors.gradient)}></div>
              <h1 className="glitch-text text-3xl font-black sm:text-4xl md:text-5xl lg:text-6xl">
                {title}
              </h1>
            </div>
            <p className="ml-3 font-mono text-sm text-white/60 sm:ml-4 sm:text-base lg:text-lg">
              {description}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
