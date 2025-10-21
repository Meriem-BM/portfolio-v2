import { useState } from "react";
import { sendEmail } from "@/app/action/email";
import { validateMessageWithAI } from "@/app/action/validate-message";
import { FormData, FormErrors, validateForm, validateField } from "@/lib/form-validation";

interface AIValidation {
  isValid: boolean;
  message?: string;
  suggestions?: string;
}

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    content: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatingAI, setIsValidatingAI] = useState(false);
  const [aiValidation, setAiValidation] = useState<AIValidation | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear AI validation when content changes
    if (name === "content") {
      setAiValidation(null);
    }

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

    // Auto-validate message with AI when user finishes typing
    if (name === "content" && value.length > 20 && !fieldError) {
      handleAIValidation(value);
    }
  };

  const handleAIValidation = async (message: string) => {
    setIsValidatingAI(true);
    setAiValidation(null);

    try {
      const result = await validateMessageWithAI(message);

      if (result.sentiment === "spam") {
        setAiValidation({
          isValid: false,
          message: "This message appears to be spam or invalid.",
          suggestions: result.suggestions,
        });
      } else if (!result.isUnderstandable) {
        setAiValidation({
          isValid: false,
          message: "Your message is unclear. Please provide more details.",
          suggestions: result.suggestions,
        });
      } else if (result.issues.length > 0) {
        setAiValidation({
          isValid: true,
          message: `Suggestions: ${result.issues.join(", ")}`,
          suggestions: result.suggestions,
        });
      } else {
        setAiValidation({
          isValid: true,
          message: "Your message looks great!",
        });
      }
    } catch (error) {
      console.error("AI validation error:", error);
      setAiValidation(null);
    } finally {
      setIsValidatingAI(false);
    }
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

    // Block spam messages
    if (aiValidation && !aiValidation.isValid) {
      setErrors({
        general:
          "Please revise your message. " + (aiValidation.message || "The message appears invalid."),
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Final AI validation before sending
      if (!aiValidation && formData.content.length > 20) {
        const aiResult = await validateMessageWithAI(formData.content);
        if (aiResult.sentiment === "spam" || !aiResult.isValid) {
          setErrors({
            general:
              "Your message appears to be spam or invalid. Please provide a genuine message.",
          });
          setIsSubmitting(false);
          return;
        }
      }

      const result = await sendEmail(formData);
      if (result.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", content: "" });
        setTouched({});
        setAiValidation(null);
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

  return {
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
  };
}
