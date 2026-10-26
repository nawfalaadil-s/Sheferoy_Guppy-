import { test, expect } from "@playwright/test";

test.describe("Admin Security & Authentication", () => {
  test("Unauthenticated user is redirected to /admin/login", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/.*\/admin\/login.*/);
    await expect(page.locator("h1")).toContainText(/Admin Sign In/i);
  });

  test("Reject invalid credentials", async ({ page }) => {
    await page.goto("/admin/login");

    await page.fill("input#username", "admin");
    await page.fill("input#password", "WrongPassword123");
    await page.click("button[type='submit']");

    // Expect error message
    const errorAlert = page.locator("text=Invalid username or password");
    await expect(errorAlert).toBeVisible();
    await expect(page).toHaveURL(/.*\/admin\/login.*/);
  });

  test("Successful login with valid credentials", async ({ page }) => {
    await page.goto("/admin/login");

    await page.fill("input#username", "admin");
    await page.fill("input#password", "Sheferoy@2026");
    await page.click("button[type='submit']");

    // Should redirect to /admin dashboard
    await expect(page).toHaveURL(/.*\/admin/);
    await expect(page.locator("h1, h2, h3").first()).toBeVisible();
    await expect(page.getByText(/Control Panel/i)).toBeVisible();
  });

  test("Log Out button ends session and redirects back to login", async ({ page }) => {
    // 1. Login first
    await page.goto("/admin/login");
    await page.fill("input#username", "admin");
    await page.fill("input#password", "Sheferoy@2026");
    await page.click("button[type='submit']");
    await expect(page).toHaveURL(/.*\/admin/);

    // 2. Click Log Out
    const logoutBtn = page.getByRole("button", { name: /Log Out/i });
    await expect(logoutBtn).toBeVisible();
    await logoutBtn.click();

    // 3. Confirm redirected to login
    await expect(page).toHaveURL(/.*\/admin\/login/);

    // 4. Confirm trying to revisit /admin redirects again
    await page.goto("/admin");
    await expect(page).toHaveURL(/.*\/admin\/login.*/);
  });
});
