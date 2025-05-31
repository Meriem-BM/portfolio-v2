"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Mail, MessageCircle, Github, Twitter, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function PingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
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

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          {/* Navigation breadcrumb */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-white/70 hover:text-pink-400 transition-colors font-mono text-sm group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="relative">
                BACK_TO_ROOT
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-pink-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            {/* Status indicator */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <div className="flex items-center gap-1 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                ONLINE
              </div>
              <span className="text-white/40">|</span>
              <span className="text-white/60">RESPONSE TIME: ~24H</span>
            </div>
          </div>

          {/* Page title and description */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-gradient-to-b from-pink-400 to-purple-400"></div>
                <h1 className="text-4xl md:text-6xl font-black glitch-text">PING</h1>
              </div>
              <p className="text-white/60 font-mono text-lg ml-4">Establish connection</p>
            </div>

            {/* Connection status */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white/70 hover:border-pink-400 hover:text-pink-400 font-mono"
              >
                STATUS
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white/70 hover:border-purple-400 hover:text-purple-400 font-mono"
              >
                CHANNELS
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">SEND_MESSAGE</h2>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="font-mono text-sm text-white/70">NAME</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-black/50 border-white/20 focus:border-pink-500 transition-colors"
                    placeholder="Enter your name..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-sm text-white/70">EMAIL</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-black/50 border-white/20 focus:border-pink-500 transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-sm text-white/70">MESSAGE</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-black/50 border-white/20 focus:border-pink-500 transition-colors min-h-[120px]"
                    placeholder="Tell me about your project, idea, or just say hello..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 font-mono"
                >
                  {isSubmitting ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      TRANSMITTING...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      SEND_PING
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <Card className="bg-green-500/10 border border-green-500/50">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <h3 className="text-xl font-bold text-green-400 mb-2">MESSAGE_SENT</h3>
                  <p className="text-white/70 font-mono text-sm">
                    Connection established. I&apos;ll respond within 24 hours.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact info and social */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">DIRECT_CHANNELS</h2>

              <div className="space-y-4">
                <Card className="bg-black/50 border border-white/10 hover:border-blue-500/50 transition-colors">
                  <CardContent className="p-4 flex items-center gap-4">
                    <Mail className="w-6 h-6 text-blue-400" />
                    <div>
                      <div className="font-mono text-sm text-white/70">EMAIL</div>
                      <div className="text-white">meriem@example.com</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/50 border border-white/10 hover:border-purple-500/50 transition-colors">
                  <CardContent className="p-4 flex items-center gap-4">
                    <MessageCircle className="w-6 h-6 text-purple-400" />
                    <div>
                      <div className="font-mono text-sm text-white/70">ENS</div>
                      <div className="text-white">meriem.eth</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">SOCIAL_LINKS</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-white/20 hover:border-purple-500/50 justify-start">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" className="border-white/20 hover:border-blue-500/50 justify-start">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" className="border-white/20 hover:border-green-500/50 justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Farcaster
                </Button>
                <Button variant="outline" className="border-white/20 hover:border-pink-500/50 justify-start">
                  <Zap className="w-4 h-4 mr-2" />
                  Lens
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">AVAILABILITY</h3>
              <Card className="bg-black/50 border border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-mono text-sm text-green-400">ONLINE</span>
                  </div>
                  <p className="text-white/70 text-sm">
                    Available for freelance projects, collaborations, and interesting conversations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
