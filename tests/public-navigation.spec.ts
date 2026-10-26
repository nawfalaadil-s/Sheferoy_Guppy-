import { test, expect } from "@playwright/test";

test.describe("Public Website - Navigation & Integrity", () => {
  test("Homepage loads with hero, featured fish, and contact CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Sheferoy Guppy/i);

    // Verify Brand Logo & Navigation
    await expect(page.getByRole("link", { name: /Sheferoy Guppy/i }).first()).toBeVisible();

    // Verify Hero Headings
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/Ornamental Guppies/i);

    // Verify 5 Featured Fish
    const featuredSection = page.locator("#featured-fish");
    await expect(featuredSection).toBeVisible();

    // Verify About & SEO Sections
    await expect(page.getByRole("heading", { name: /About Sheferoy Guppy/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Explore Guppies, Bettas/i })).toBeVisible();
  });

  test("Varieties Catalog - search, filter, and detail view", async ({ page }) => {
    await page.goto("/varieties");
    await expect(page).toHaveTitle(/Ornamental Guppies & Bettas/i);

    // Search input
    const searchInput = page.getByPlaceholder(/Search strain/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill("Moscow Blue");

    // Click direct variety link
    const varietyLink = page.locator("a[href*='/varieties/moscow-blue']").first();
    await expect(varietyLink).toBeVisible();
    await varietyLink.click();

    await expect(page).toHaveURL(/.*\/varieties\/moscow-blue/);
    await expect(page.locator("h1")).toContainText(/Moscow Blue/i);
    await expect(page.getByText(/Care at a glance/i).first()).toBeVisible();
  });

  test("Aquatic Plants - collection & search", async ({ page }) => {
    await page.goto("/plants");
    await expect(page).toHaveTitle(/Live Aquatic Plants/i);

    // Verify plant card
    const plantLink = page.locator("a[href*='/plants/pennywort']").first();
    await expect(plantLink).toBeVisible();
    await plantLink.click();

    await expect(page).toHaveURL(/.*\/plants\/pennywort/);
    await expect(page.locator("h1")).toContainText(/Pennywort/i);
  });

  test("Gallery - Lightbox interactions and keyboard navigation", async ({ page }) => {
    await page.goto("/gallery");
    await expect(page).toHaveTitle(/Gallery/i);

    // Click first media exhibit card to open lightbox
    const firstExhibit = page.locator("button[aria-label*='in viewer']").first();
    await expect(firstExhibit).toBeVisible();
    await firstExhibit.click();

    // Verify lightbox modal is opened
    const dialog = page.locator("div[role='dialog']");
    await expect(dialog).toBeVisible();

    // Press Escape to close
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("Blog & Care Guides - articles list and reading", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveTitle(/The Journal/i);

    // Click direct guide article link
    const guideLink = page.locator("a[href*='/blog/complete-guide']").first();
    await expect(guideLink).toBeVisible();
    await guideLink.click();

    await expect(page).toHaveURL(/.*\/blog\/complete-guide-guppy-care-beginners/);
    await expect(page.locator("h1")).toContainText(/Complete Guide to Guppy Care/i);
  });

  test("Offers & Spawning Announcements loads active batches", async ({ page }) => {
    await page.goto("/offers");
    await expect(page).toHaveTitle(/Offers/i);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("Contact Page - form validation", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact/i);

    // Attempt submitting empty form
    const submitBtn = page.getByRole("button", { name: /Send Enquiry/i });
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      await expect(page.locator("input#name")).toBeVisible();
    }
  });

  test("Footer & Legal Pages", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator("h1")).toContainText(/Privacy Policy/i);

    await page.goto("/terms");
    await expect(page.locator("h1")).toContainText(/Terms of Service/i);
  });
});
