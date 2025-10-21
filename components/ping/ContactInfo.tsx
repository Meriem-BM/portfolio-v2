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
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">DIRECT_CHANNELS</h2>
        <div className="space-y-3 sm:space-y-4">
          <Card className="bg-black/50 border border-white/10 transition-colors">
            <CardContent className="px-3 sm:px-4 py-3 flex items-center gap-4">
              <div className="text-white text-sm sm:text-base break-all">{contactInfo.email}</div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border border-white/10 hover:border-blue-500/50 transition-colors">
            <CardContent className="p-3 sm:p-4 flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="font-mono text-xs sm:text-sm text-white/70">{web3Identities.ens.label}</div>
                <div className="text-white text-sm sm:text-base break-all">{web3Identities.ens.address}</div>
              </div>
              <div className="flex-shrink-0">
                <Ethereum color="gray" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border border-white/10 hover:border-purple-500/50 transition-colors">
            <CardContent className="p-3 sm:p-4 flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="font-mono text-xs sm:text-sm text-white/70">{web3Identities.sns.label}</div>
                <div className="text-white text-sm sm:text-base break-all">{web3Identities.sns.address}</div>
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
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">SOCIAL_LINKS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Button
            variant="outline"
            className="border-white/20 hover:border-white/50 justify-start text-xs sm:text-sm"
            onClick={() =>
              window.open(socialLinks.github.url, "_blank")
            }
          >
            <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span className="truncate">{socialLinks.github.username}</span>
          </Button>
          
          <Button
            variant="outline"
            className="border-white/20 hover:border-white/50 justify-start text-xs sm:text-sm"
            onClick={() =>
              window.open(socialLinks.twitter.url, "_blank")
            }
          >
            <XIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span className="truncate">{socialLinks.twitter.username}</span>
          </Button>
          
          <Button
            variant="outline"
            className="border-white/20 hover:border-[#0077B5]/50 justify-start text-xs sm:text-sm"
            onClick={() =>
              window.open(socialLinks.linkedin.url, "_blank")
            }
          >
            <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span className="truncate">{socialLinks.linkedin.username}</span>
          </Button>
          
          <Button
            variant="outline"
            className="border-white/20 hover:border-[#796ab1]/50 justify-start text-xs sm:text-sm"
            onClick={() =>
              window.open(socialLinks.farcaster.url, "_blank")
            }
          >
            <Farcaster color="white" />
            <span className="truncate ml-2">{socialLinks.farcaster.username}</span>
          </Button>
        </div>
      </div>

      {/* Availability status */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">AVAILABILITY</h3>
        <Card className="bg-black/50 border border-white/10">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-mono text-xs sm:text-sm text-green-400">
                {contactInfo.availability.status.toUpperCase()}
              </span>
            </div>
            <p className="text-white/70 text-xs sm:text-sm">
              {contactInfo.availability.message}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}