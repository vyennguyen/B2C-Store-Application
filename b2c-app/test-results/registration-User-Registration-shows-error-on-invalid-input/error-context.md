# Test info

- Name: User Registration >> shows error on invalid input
- Location: C:\B2C-Store-Application\b2c-app\e2e\registration.spec.ts:15:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('text=error').filter({ hasText: 'Error' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('text=error').filter({ hasText: 'Error' })

    at C:\B2C-Store-Application\b2c-app\e2e\registration.spec.ts:25:7
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
- heading "Create an Account" [level=2]
- text: Name
- textbox "Name"
- text: Email
- textbox "Email": bademail
- text: Password
- textbox "Password": "123"
- paragraph:
  - text: Already have an account?
  - link "Log in":
    - /url: /user/login
  - text: instead
- button "Continue"
- contentinfo:
  - paragraph: © 2025 KlickyShop. All rights reserved.
- alert
- button "Open Next.js Dev Tools":
  - img
```

# Test source

```ts
   1 | // tests/e2e/registration.spec.ts
   2 | import { test, expect } from "@playwright/test";
   3 |
   4 | const REGISTRATION_URL = "http://localhost:3000/user/registration";
   5 |
   6 | test.describe("User Registration", () => {
   7 |   test("renders registration form", async ({ page }) => {
   8 |     await page.goto(REGISTRATION_URL);
   9 |     await expect(page.getByText("Create an Account")).toBeVisible();
  10 |     await expect(page.getByPlaceholder("Enter your name")).toBeVisible();
  11 |     await expect(page.getByPlaceholder("example@mail.com")).toBeVisible();
  12 |     await expect(page.getByPlaceholder("Enter your password")).toBeVisible();
  13 |   });
  14 |
  15 |   test("shows error on invalid input", async ({ page }) => {
  16 |     await page.goto(REGISTRATION_URL);
  17 |     await page.getByPlaceholder("Enter your name").fill("");
  18 |     await page.getByPlaceholder("example@mail.com").fill("bademail");
  19 |     await page.getByPlaceholder("Enter your password").fill("123");
  20 |     await page.getByText("Continue").click();
  21 |
  22 |     // Wait for error response or messages
  23 |     await expect(
  24 |       page.locator("text=error", { hasText: "Error" })
> 25 |     ).toBeVisible();
     |       ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  26 |   });
  27 |
  28 |   test("registers successfully with valid credentials", async ({ page }) => {
  29 |     await page.goto(REGISTRATION_URL);
  30 |     const timestamp = Date.now();
  31 |     await page.getByPlaceholder("Enter your name").fill("Test User");
  32 |     await page
  33 |       .getByPlaceholder("example@mail.com")
  34 |       .fill(`user${timestamp}@mail.com`);
  35 |     await page.getByPlaceholder("Enter your password").fill("validPassword123");
  36 |
  37 |     const [response] = await Promise.all([
  38 |       page.waitForResponse(
  39 |         (res) =>
  40 |           res.url().includes("/api/auth/register") && res.status() === 200
  41 |       ),
  42 |       page.getByText("Continue").click(),
  43 |     ]);
  44 |
  45 |     expect(response.ok()).toBeTruthy();
  46 |     await expect(page.getByText("Registration successful")).toBeVisible();
  47 |   });
  48 | });
  49 |
```