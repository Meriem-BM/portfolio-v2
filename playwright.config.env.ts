import "dotenv/config";

export const getBaseUrl = (): string => {
  // Client-side: always use current location
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // Server-side: use environment variables or fallback
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.SITE) {
    return process.env.SITE;
  }

  // Fallback for build time and local development
  return "http://localhost:3000";
};

export const baseURL = getBaseUrl();
