"use client";

import React, { useState } from "react";
import { AlertCircle, Send, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { sendEmail } from "@/app/action/email";
import { FormData, FormErrors, validateForm, validateField } from "@/lib/form-validation";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    content: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          general: result.message || "Failed to send message. Please try again.",
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
  const isFormValid = !hasErrors && formData.name && formData.email && formData.content;

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
          <span className="font-mono text-xs text-white/50">{formData.content.length}/1000</span>
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
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !isFormValid}
        className={`w-full font-mono transition-all ${
          isFormValid
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
