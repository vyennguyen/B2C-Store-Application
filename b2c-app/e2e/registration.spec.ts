// tests/e2e/registration.spec.ts
import { test, expect } from "@playwright/test";

const REGISTRATION_URL = "http://localhost:3000/user/registration";

test.describe("User Registration", () => {
  test("renders registration form", async ({ page }) => {
    await page.goto(REGISTRATION_URL);
    await expect(page.getByText("Create an Account")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your name")).toBeVisible();
    await expect(page.getByPlaceholder("example@mail.com")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your password")).toBeVisible();
  });

  test("shows error on invalid input", async ({ page }) => {
    await page.goto(REGISTRATION_URL);
    await page.getByPlaceholder("Enter your name").fill("");
    await page.getByPlaceholder("example@mail.com").fill("bademail");
    await page.getByPlaceholder("Enter your password").fill("123");
    await page.getByText("Continue").click();

    // Wait for error response or messages
    await expect(
      page.locator("text=error", { hasText: "Error" })
    ).toBeVisible();
  });

  test("registers successfully with valid credentials", async ({ page }) => {
    await page.goto(REGISTRATION_URL);
    const timestamp = Date.now();
    await page.getByPlaceholder("Enter your name").fill("Test User");
    await page
      .getByPlaceholder("example@mail.com")
      .fill(`user${timestamp}@mail.com`);
    await page.getByPlaceholder("Enter your password").fill("validPassword123");

    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/api/auth/register") && res.status() === 200
      ),
      page.getByText("Continue").click(),
    ]);

    expect(response.ok()).toBeTruthy();
    await expect(page.getByText("Registration successful")).toBeVisible();
  });
});
