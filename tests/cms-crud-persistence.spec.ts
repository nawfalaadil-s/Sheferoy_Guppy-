import { test, expect } from "@playwright/test";

test.describe("CMS Real-Data Persistence & Workflows", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill("input#username", "admin");
    await page.fill("input#password", "Sheferoy@2026");
    await page.click("button[type='submit']");
    await page.waitForURL("**/admin", { waitUntil: "networkidle" });
  });

  test("Workflow A: Full CRUD cycle for Guppy Variety", async ({ page, request }) => {
    await page.goto("/admin/varieties");
    await page.waitForLoadState("networkidle");

    const addBtn = page.getByRole("button", { name: /Add New Variety/i });
    await expect(addBtn).toBeVisible();
    await addBtn.click();

    // Verify modal is visible
    await expect(page.getByRole("heading", { name: /Add New Fish Variety/i })).toBeVisible();

    const testId = Date.now();
    const testName = `E2E Automated Guppy ${testId}`;
    const testSlug = `e2e-strain-${testId}`;

    await page.fill("input[placeholder*='Veiltail Zebra Green']", testName);
    // Tab out so slug auto-populates, then fill specific slug
    await page.keyboard.press("Tab");
    const slugInput = page.locator("input[placeholder*='veiltail-zebra-green']");
    await slugInput.fill(testSlug);

    await page.fill("textarea[placeholder*='Comprehensive description']", "E2E test description for automated database verification.");
    await page.getByRole("button", { name: /Save to Database/i }).click();

    // Verify save feedback
    await expect(page.getByText(/Variety saved successfully/i)).toBeVisible();

    // Search and verify in table
    const searchInput = page.getByPlaceholder(/Search strains by name/i);
    await searchInput.fill(testName);
    await expect(page.getByText(testName)).toBeVisible();

    // Direct API verification from database
    const apiRes = await request.get(`/api/varieties`);
    const apiData = await apiRes.json();
    const createdItem = apiData.varieties.find((v: any) => v.name === testName || (v.slug && v.slug.includes(`${testId}`)));
    expect(createdItem).toBeTruthy();
    expect(createdItem.name).toBe(testName);

    // Cleanup: Delete test record
    page.on("dialog", (dialog) => dialog.accept());
    const deleteBtn = page.locator("button[title='Delete variety']").first();
    await deleteBtn.click();
    await page.waitForTimeout(1000);

    // Confirm deletion from API
    const verifyDel = await request.get(`/api/varieties`);
    const verifyData = await verifyDel.json();
    const stillExists = verifyData.varieties.some((v: any) => v.name === testName);
    expect(stillExists).toBe(false);
  });

  test("Workflow B: Blog Article Management & API Persistence", async ({ page, request }) => {
    await page.goto("/admin/blog");
    await page.waitForLoadState("networkidle");

    const addBtn = page.getByRole("button", { name: /Write New Article/i });
    await expect(addBtn).toBeVisible();
    await addBtn.click();

    await expect(page.getByRole("heading", { name: /Write New Article/i })).toBeVisible();

    const testId = Date.now();
    const testTitle = `E2E Care Guide Verification ${testId}`;
    const testSlug = `e2e-guide-${testId}`;

    await page.fill("input[placeholder*='Complete Guide to Guppy Care']", testTitle);
    await page.keyboard.press("Tab");
    const slugInput = page.locator("input[placeholder*='complete-guide-guppy-care']");
    await slugInput.fill(testSlug);

    await page.fill("textarea[placeholder*='Full guide content']", "## Automated E2E Content\n\nTesting database persistence.");
    await page.getByRole("button", { name: /Save Article/i }).click();

    await expect(page.getByText(/Blog post saved successfully/i)).toBeVisible();

    // Verify through API
    const res = await request.get(`/api/blog`);
    const data = await res.json();
    const post = data.posts.find((p: any) => p.title === testTitle || (p.slug && p.slug.includes(`${testId}`)));
    expect(post).toBeTruthy();

    // Cleanup article
    page.on("dialog", (dialog) => dialog.accept());
    const deleteBtn = page.locator("button[title='Delete article']").first();
    await deleteBtn.click();
    await page.waitForTimeout(1000);
  });

  test("Workflow E: Unauthorized direct API mutations are rejected (401)", async ({ request }) => {
    const res = await request.post("/api/varieties", {
      data: { name: "Hacker Strain", slug: "hacker-strain" },
    });
    expect(res.status()).toBe(401);

    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.error).toBe("Unauthorized");
  });

  test("Workflow F: Customer Enquiry Submission & Inbox Review", async ({ page, request }) => {
    const testName = `Customer-${Date.now()}`;
    const submitRes = await request.post("/api/contact", {
      data: {
        name: testName,
        contact: "9876543210",
        subject: "Breeding Stock Enquiry",
        message: "Hello, this is an automated enquiry verifying the CRM inbox workflow.",
      },
    });
    expect(submitRes.status()).toBe(201);
    const submitData = await submitRes.json();
    expect(submitData.success).toBe(true);
    const enquiryId = submitData.enquiryId;

    await page.goto("/admin/enquiries");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toContainText(/Customer Enquiries/i);
    await expect(page.getByText(testName)).toBeVisible();

    if (enquiryId) {
      await request.delete(`/api/enquiries?id=${enquiryId}`);
    }
  });
});
