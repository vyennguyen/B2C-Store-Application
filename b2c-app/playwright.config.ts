import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e", // your e2e tests folder
  timeout: 30000,
  use: {
    headless: true, // set false if you want to see the browser during testing
    viewport: { width: 1280, height: 720 },
    baseURL: "http://localhost:3000", // your Next.js app URL during tests
    ignoreHTTPSErrors: true,
  },
});
