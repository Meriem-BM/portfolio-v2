"use client";

import React from "react";
import { AlertCircle, Send, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useContactForm } from "@/hooks/useContactForm";

export default function ContactForm() {
  const {
    formData,
    errors,
    touched,
    isSubmitting,
    isValidatingAI,
    aiValidation,
    submitted,
    isFormValid,
    handleInputChange,
    handleBlur,
    handleSubmit,
  } = useContactForm();

  if (submitted) {
    return (
      <Card className="border border-green-500/50 bg-green-500/10">
        <CardContent className="p-4 text-center sm:p-6">
          <Zap className="mx-auto mb-3 h-10 w-10 text-green-400 sm:mb-4 sm:h-12 sm:w-12" />
          <h3 className="mb-2 text-lg font-bold text-green-400 sm:text-xl">MESSAGE_SENT</h3>
          <p className="font-mono text-xs text-white/70 sm:text-sm">
            Connection established. I&apos;ll respond within 24 hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
      {/* General error message */}
      {errors.general && (
        <div className="flex items-center gap-2 rounded-md border border-red-500/50 bg-red-500/10 p-3">
          <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-400" />
          <span className="font-mono text-xs text-red-400 sm:text-sm">{errors.general}</span>
        </div>
      )}

      {/* Name field */}
      <div className="space-y-2">
        <label className="font-mono text-xs text-white/70 sm:text-sm">NAME *</label>
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
            <div className="mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 text-red-400" />
              <span className="font-mono text-xs break-words text-red-400">{errors.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <label className="font-mono text-xs text-white/70 sm:text-sm">EMAIL *</label>
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
            <div className="mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 text-red-400" />
              <span className="font-mono text-xs break-words text-red-400">{errors.email}</span>
            </div>
          )}
        </div>
      </div>

      {/* Message field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-mono text-xs text-white/70 sm:text-sm">MESSAGE *</label>
          <div className="flex items-center gap-2">
            {isValidatingAI && (
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 animate-pulse text-purple-400" />
                <span className="font-mono text-xs text-purple-400">AI checking...</span>
              </div>
            )}
            <span className="font-mono text-xs text-white/50">{formData.content.length}/1000</span>
          </div>
        </div>
        <div className="relative">
          <Textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`min-h-[120px] resize-none bg-black/50 transition-colors ${
              errors.content && touched.content
                ? "border-red-500 focus:border-red-500"
                : aiValidation && !aiValidation.isValid
                  ? "border-yellow-500 focus:border-yellow-500"
                  : aiValidation && aiValidation.isValid
                    ? "border-green-500 focus:border-green-500"
                    : "border-white/20 focus:border-pink-500"
            }`}
            placeholder="Tell me about your project, idea, or just say hello..."
            maxLength={1000}
          />
          {errors.content && touched.content && (
            <div className="mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 text-red-400" />
              <span className="font-mono text-xs break-words text-red-400">{errors.content}</span>
            </div>
          )}
          {!errors.content && aiValidation && (
            <div
              className={`mt-2 flex items-start gap-2 rounded-md border p-2 ${
                aiValidation.isValid
                  ? "border-green-500/50 bg-green-500/10"
                  : "border-yellow-500/50 bg-yellow-500/10"
              }`}
            >
              <Sparkles
                className={`mt-0.5 h-3 w-3 flex-shrink-0 ${
                  aiValidation.isValid ? "text-green-400" : "text-yellow-400"
                }`}
              />
              <div className="flex-1">
                <span
                  className={`font-mono text-xs ${
                    aiValidation.isValid ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {aiValidation.message}
                </span>
                {aiValidation.suggestions && (
                  <p className="mt-1 font-mono text-xs text-white/60">{aiValidation.suggestions}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {isValidatingAI && (
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3 animate-pulse text-purple-400" />
          <span className="font-mono text-xs text-purple-400">AI checking...</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={
          isSubmitting ||
          !isFormValid ||
          isValidatingAI ||
          (aiValidation ? !aiValidation.isValid : false)
        }
        className={`w-full font-mono transition-all ${
          isFormValid && !isValidatingAI && (!aiValidation || aiValidation.isValid)
            ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-blue-500"
            : "cursor-not-allowed bg-gray-600"
        }`}
      >
        {isSubmitting ? (
          <>
            <Zap className="mr-2 h-4 w-4 animate-spin" />
            TRANSMITTING...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            SEND_MESSAGE
          </>
        )}
      </Button>
    </form>
  );
}
