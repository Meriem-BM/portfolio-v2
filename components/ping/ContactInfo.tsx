"use client";

import React from "react";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Solana, Ethereum, XIcon } from "@/components/custom-icons";
import Farcaster from "@/components/custom-icons/Farcaster";
import { socialLinks, web3Identities, contactInfo } from "@/lib/social-links";

export default function ContactInfo() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Email and Web3 identities */}
      <div>
        <h2 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">DIRECT_CHANNELS</h2>
        <div className="space-y-3 sm:space-y-4">
          <Card className="border border-white/10 bg-black/50 transition-colors">
            <CardContent className="flex items-center gap-4 px-3 py-3 sm:px-4">
              <div className="text-sm break-all text-white sm:text-base">{contactInfo.email}</div>
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-black/50 transition-colors hover:border-blue-500/50">
            <CardContent className="flex items-center justify-between gap-4 p-3 sm:p-4">
              <div className="min-w-0 flex-1">
                <div className="font-mono text-xs text-white/70 sm:text-sm">
                  {web3Identities.ens.label}
                </div>
                <div className="text-sm break-all text-white sm:text-base">
                  {web3Identities.ens.address}
                </div>
              </div>
              <div className="flex-shrink-0">
                <Ethereum color="gray" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-black/50 transition-colors hover:border-purple-500/50">
            <CardContent className="flex items-center justify-between gap-4 p-3 sm:p-4">
              <div className="min-w-0 flex-1">
                <div className="font-mono text-xs text-white/70 sm:text-sm">
                  {web3Identities.sns.label}
                </div>
                <div className="text-sm break-all text-white sm:text-base">
                  {web3Identities.sns.address}
                </div>
              </div>
              <div className="flex-shrink-0">
                <Solana color="gray" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Social links */}
      <div>
        <h3 className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl">SOCIAL_LINKS</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <Button
            variant="outline"
            className="justify-start border-white/20 text-xs hover:border-white/50 sm:text-sm"
            onClick={() => window.open(socialLinks.github.url, "_blank")}
          >
            <Github className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="truncate">{socialLinks.github.username}</span>
          </Button>

          <Button
            variant="outline"
            className="justify-start border-white/20 text-xs hover:border-white/50 sm:text-sm"
            onClick={() => window.open(socialLinks.twitter.url, "_blank")}
          >
            <XIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="truncate">{socialLinks.twitter.username}</span>
          </Button>

          <Button
            variant="outline"
            className="justify-start border-white/20 text-xs hover:border-[#0077B5]/50 sm:text-sm"
            onClick={() => window.open(socialLinks.linkedin.url, "_blank")}
          >
            <Linkedin className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="truncate">{socialLinks.linkedin.username}</span>
          </Button>

          <Button
            variant="outline"
            className="justify-start border-white/20 text-xs hover:border-[#796ab1]/50 sm:text-sm"
            onClick={() => window.open(socialLinks.farcaster.url, "_blank")}
          >
            <Farcaster color="white" />
            <span className="ml-2 truncate">{socialLinks.farcaster.username}</span>
          </Button>
        </div>
      </div>

      {/* Availability status */}
      <div>
        <h3 className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl">AVAILABILITY</h3>
        <Card className="border border-white/10 bg-black/50">
          <CardContent className="p-3 sm:p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
              <span className="font-mono text-xs text-green-400 sm:text-sm">
                {contactInfo.availability.status.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-white/70 sm:text-sm">{contactInfo.availability.message}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
