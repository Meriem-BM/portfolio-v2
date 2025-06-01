"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  Github,
  Zap,
  Linkedin,
  AlertCircle,
} from "lucide-react";
import { Solana, Ethereum, XIcon } from "@/components/custom-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Farcaster from "@/components/custom-icons/Farcaster";
import { sendEmail } from "@/app/action/email";

// Validation types
interface FormErrors {
  name?: string;
  email?: string;
  content?: string;
  general?: string;
}

interface FormData {
  name: string;
  email: string;
  content: string;
}

// Validation rules
const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (data.name.trim().length > 50) {
    errors.name = "Name must be less than 50 characters";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address";
  } else if (data.email.length > 100) {
    errors.email = "Email must be less than 100 characters";
  }

  // Content validation
  if (!data.content.trim()) {
    errors.content = "Message is required";
  } else if (data.content.trim().length < 10) {
    errors.content = "Message must be at least 10 characters";
  } else if (data.content.trim().length > 1000) {
    errors.content = "Message must be less than 1000 characters";
  }

  return errors;
};

// Field validation for real-time feedback
const validateField = (name: keyof FormData, value: string): string => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      if (value.trim().length > 50)
        return "Name must be less than 50 characters";
      return "";

    case "email":
      if (!value.trim()) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email address";
      if (value.length > 100) return "Email must be less than 100 characters";
      return "";

    case "content":
      if (!value.trim()) return "Message is required";
      if (value.trim().length < 10)
        return "Message must be at least 10 characters";
      if (value.trim().length > 1000)
        return "Message must be less than 1000 characters";
      return "";

    default:
      return "";
  }
};

export default function PingPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    content: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[fieldName]) {
      const fieldError = validateField(fieldName, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
        general: "",
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setTouched((prev) => ({ ...prev, [name]: true }));

    const fieldError = validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, content: true });

    // Validate entire form
    const formErrors = validateForm(formData);
    setErrors(formErrors);

    // Check if there are any errors
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await sendEmail(formData);
      if (result.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", content: "" });
        setTouched({});
      } else {
        setErrors({
          general:
            result.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form has errors
  const hasErrors = Object.values(errors).some((error) => error !== "");
  const isFormValid =
    !hasErrors && formData.name && formData.email && formData.content;

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
                <h1 className="text-4xl md:text-6xl font-black glitch-text">
                  PING
                </h1>
              </div>
              <p className="text-white/60 font-mono text-lg ml-4">
                Establish connection
              </p>
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
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* General error message */}
                {errors.general && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/50 rounded-md">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-red-400 text-sm font-mono">
                      {errors.general}
                    </span>
                  </div>
                )}

                {/* Name field */}
                <div className="space-y-2">
                  <label className="font-mono text-sm text-white/70">
                    NAME *
                  </label>
                  <div className="relative">
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`bg-black/50 transition-colors ${
                        errors.name && touched.name
                          ? "border-red-500 focus:border-red-500"
                          : "border-white/20 focus:border-pink-500"
                      }`}
                      placeholder="Enter your name..."
                      maxLength={50}
                    />
                    {errors.name && touched.name && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 text-red-400" />
                        <span className="text-red-400 text-xs font-mono">
                          {errors.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label className="font-mono text-sm text-white/70">
                    EMAIL *
                  </label>
                  <div className="relative">
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`bg-black/50 transition-colors focus:outline-none ${
                        errors.email && touched.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-white/20 focus:border-pink-500"
                      }`}
                      placeholder="your@email.com"
                      maxLength={100}
                    />
                    {errors.email && touched.email && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 text-red-400" />
                        <span className="text-red-400 text-xs font-mono">
                          {errors.email}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-mono text-sm text-white/70">
                      MESSAGE *
                    </label>
                    <span className="font-mono text-xs text-white/50">
                      {formData.content.length}/1000
                    </span>
                  </div>
                  <div className="relative">
                    <Textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`bg-black/50 transition-colors min-h-[120px] resize-none ${
                        errors.content && touched.content
                          ? "border-red-500 focus:border-red-500"
                          : "border-white/20 focus:border-pink-500"
                      }`}
                      placeholder="Tell me about your project, idea, or just say hello..."
                      maxLength={1000}
                    />
                    {errors.content && touched.content && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 text-red-400" />
                        <span className="text-red-400 text-xs font-mono">
                          {errors.content}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className={`w-full font-mono transition-all ${
                    isFormValid
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-blue-500"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      TRANSMITTING...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      SEND_MESSAGE
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <Card className="bg-green-500/10 border border-green-500/50">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <h3 className="text-xl font-bold text-green-400 mb-2">
                    MESSAGE_SENT
                  </h3>
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
                <Card className="bg-black/50 border border-white/10 transition-colors">
                  <CardContent className="px-4 py-3 flex items-center gap-4">
                    <div className="text-white">barhoumi.meriem1@gmail.com</div>
                  </CardContent>
                </Card>

                <Card className="bg-black/50 border border-white/10 hover:border-blue-500/50 transition-colors">
                  <CardContent className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-mono text-sm text-white/70">ENS</div>
                      <div className="text-white">meriembarhoumi.eth</div>
                    </div>
                    <Ethereum color="gray" />
                  </CardContent>
                </Card>

                <Card className="bg-black/50 border border-white/10 hover:border-purple-500/50 transition-colors">
                  <CardContent className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-mono text-sm text-white/70">SNS</div>
                      <div className="text-white">meriem.sol</div>
                    </div>
                    <Solana color="gray" />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">SOCIAL_LINKS</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="border-white/20 hover:border-white/50 justify-start"
                  onClick={() =>
                    window.open("https://github.com/Meriem-BM", "_blank")
                  }
                >
                  <Github className="w-4 h-4 mr-2" />
                  Meriem-BM
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 hover:border-white/50 justify-start"
                  onClick={() =>
                    window.open("https://x.com/meriembarhoumi", "_blank")
                  }
                >
                  <XIcon className="w-4 h-4 mr-2" />
                  meriembarhoumi
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 hover:border-[#0077B5]/50 justify-start"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/meriem-barhoumi/",
                      "_blank"
                    )
                  }
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  meriem-barhoumi
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 hover:border-[#796ab1]/50 justify-start"
                  onClick={() =>
                    window.open(
                      "https://farcaster.xyz/meriembarhoumi.eth",
                      "_blank"
                    )
                  }
                >
                  <Farcaster color="white" />
                  meriembarhoumi
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">AVAILABILITY</h3>
              <Card className="bg-black/50 border border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-mono text-sm text-green-400">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-white/70 text-sm">
                    Available for collaborations, and interesting conversations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
