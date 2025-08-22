import { defineConfig, devices } from "@playwright/test";
import { baseURL } from "./playwright.config.env";

export default defineConfig({
  testDir: "./test",
  retries: process.env.CI ? 2 : 0,
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
