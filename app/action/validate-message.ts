"use server";

import OpenAI from "openai";

interface ValidationResult {
  isValid: boolean;
  isUnderstandable: boolean;
  issues: string[];
  suggestions?: string;
  sentiment?: "positive" | "neutral" | "negative" | "spam";
}

const SYSTEM_PROMPT = `You are a contact form message validator. Analyze the message and determine:
1. If it's a valid, genuine message (not spam/gibberish)
2. If it's understandable and coherent
3. The sentiment (positive, neutral, negative, or spam)
4. Any issues or red flags
5. Suggestions for improvement (if needed)

Respond ONLY with valid JSON in this exact format:
{
  "isValid": boolean,
  "isUnderstandable": boolean,
  "issues": ["list of issues"],
  "suggestions": "optional suggestions",
  "sentiment": "positive|neutral|negative|spam"
}`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function validateMessageWithAI(message: string): Promise<ValidationResult> {
  // Skip AI validation if no API key is configured
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OpenAI API key not configured, skipping AI validation");
    return {
      isValid: true,
      isUnderstandable: true,
      issues: [],
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Analyze this contact form message:\n\n"${message}"`,
        },
      ],
      temperature: 0.3,
      max_tokens: 300,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("No response from OpenAI");
    }

    const result: ValidationResult = JSON.parse(response);
    return result;
  } catch (error) {
    console.error("AI validation error:", error);
    // Fallback to allow the message if AI validation fails
    return {
      isValid: true,
      isUnderstandable: true,
      issues: [],
    };
  }
}
