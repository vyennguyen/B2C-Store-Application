# Test info

- Name: Login Form >> should show error message on invalid login
- Location: C:\B2C-Store-Application\b2c-app\e2e\login.spec.ts:27:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Log in' }) resolved to 2 elements:
    1) <button class="text-(--background) bg-white font-semibold rounded-lg p-2 text-sm hover:bg-(--foreground) cursor-pointer">Log In</button> aka getByRole('button', { name: 'Log In', exact: true })
    2) <button type="submit" name="Log in" class="relative px-6 py-2 rounded-full overflow-hidden text-(--background) bg-(--foreground) cursor-pointer group">…</button> aka getByRole('button', { name: 'Log in', exact: true })

Call log:
  - waiting for getByRole('button', { name: 'Log in' })

    at C:\B2C-Store-Application\b2c-app\e2e\login.spec.ts:33:56
```

# Page snapshot

```yaml
- link "Logo":
  - /url: /
  - text: Klicky Shop
- navigation "Middle Menu":
  - link "Shop":
    - /url: /products
  - link "Philosophy":
    - /url: /philosophy
  - link "About Us":
    - /url: /about
  - link "Contact":
    - /url: /contact
- navigation "Right Menu":
  - textbox "Search"
  - button "Search"
  - button "Open Cart": Cart
  - button "Log In"
- heading "Welcome Back" [level=2]
- heading "Log into Klicky" [level=3]
- text: Email
- textbox "Email": invalid@user.com
- text: Password
- textbox "Password": wrongpassword
- paragraph:
  - text: Don't have an account?
  - link "Create one":
    - /url: /user/registration
- paragraph:
  - link "Forgot your password?":
    - /url: /user/reset-password
- button "Log in"
- contentinfo:
  - paragraph: © 2025 KlickyShop. All rights reserved.
- alert
- button "Open Next.js Dev Tools":
  - img
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | // Change this to match your actual route
   4 | const LOGIN_URL = "http://localhost:3000/user/login";
   5 |
   6 | const validUser = {
   7 |   email: "adminaccount@gmail.com",
   8 |   password: "b2cadmin",
   9 | };
  10 |
  11 | const invalidUser = {
  12 |   email: "invalid@user.com",
  13 |   password: "wrongpassword",
  14 | };
  15 |
  16 | test.describe("Login Form", () => {
  17 |   test("should render the login form", async ({ page }) => {
  18 |     await page.goto(LOGIN_URL);
  19 |     await expect(
  20 |       page.getByRole("heading", { name: "Welcome Back" })
  21 |     ).toBeVisible();
  22 |     await expect(page.getByPlaceholder("example@mail.com")).toBeVisible();
  23 |     await expect(page.getByPlaceholder("Enter your password")).toBeVisible();
  24 |     await expect(page.getByRole("button", { name: "Log in" })).toBeVisible();
  25 |   });
  26 |
  27 |   test("should show error message on invalid login", async ({ page }) => {
  28 |     await page.goto(LOGIN_URL);
  29 |     await page.getByPlaceholder("example@mail.com").fill(invalidUser.email);
  30 |     await page
  31 |       .getByPlaceholder("Enter your password")
  32 |       .fill(invalidUser.password);
> 33 |     await page.getByRole("button", { name: "Log in" }).click();
     |                                                        ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Log in' }) resolved to 2 elements:
  34 |
  35 |     await expect(page.getByText(/invalid|error/i)).toBeVisible();
  36 |   });
  37 |
  38 |   test("should log in successfully and redirect", async ({ page }) => {
  39 |     await page.goto(LOGIN_URL);
  40 |     await page.getByPlaceholder("example@mail.com").fill(validUser.email);
  41 |     await page.getByPlaceholder("Enter your password").fill(validUser.password);
  42 |     await page.getByRole("button", { name: "Log in" }).click();
  43 |
  44 |     // Wait for redirect
  45 |     await page.waitForURL("**/(admin|)$"); // matches "/" or "/admin"
  46 |     await expect(page).not.toHaveURL(LOGIN_URL);
  47 |   });
  48 | });
  49 |
```