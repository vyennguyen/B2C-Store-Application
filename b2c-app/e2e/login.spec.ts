import { test, expect } from "@playwright/test";

// Change this to match your actual route
const LOGIN_URL = "http://localhost:3000/user/login";

const validUser = {
  email: "adminaccount@gmail.com",
  password: "b2cadmin",
};

const invalidUser = {
  email: "invalid@user.com",
  password: "wrongpassword",
};

test.describe("Login Form", () => {
  test("should render the login form", async ({ page }) => {
    await page.goto(LOGIN_URL);
    await expect(
      page.getByRole("heading", { name: "Welcome Back" })
    ).toBeVisible();
    await expect(page.getByPlaceholder("example@mail.com")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Log in" })).toBeVisible();
  });

  test("should show error message on invalid login", async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.getByPlaceholder("example@mail.com").fill(invalidUser.email);
    await page
      .getByPlaceholder("Enter your password")
      .fill(invalidUser.password);
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page.getByText(/invalid|error/i)).toBeVisible();
  });

  test("should log in successfully and redirect", async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.getByPlaceholder("example@mail.com").fill(validUser.email);
    await page.getByPlaceholder("Enter your password").fill(validUser.password);
    await page.getByRole("button", { name: "Log in" }).click();

    // Wait for redirect
    await page.waitForURL("**/(admin|)$"); // matches "/" or "/admin"
    await expect(page).not.toHaveURL(LOGIN_URL);
  });
});
