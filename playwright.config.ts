import { defineConfig, devices } from "@playwright/test";
import 'dotenv/config';

export default defineConfig({
  testDir: "./test",
  retries: process.env.CI ? 2 : 0,
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: process.env.SITE || "http://localhost:3000" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
