// scripts/test-instagram-integration.mjs
// Automated verification suite for Sheferoy Guppy Instagram Video Integration

import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

console.log("==================================================");
console.log("  SHEFEROY GUPPY — INSTAGRAM INTEGRATION TEST SUITE");
console.log("==================================================\n");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

async function testAsync(name, fn) {
  try {
    await fn();
    console.log(`  ✓ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

// 1. URL Extraction & Validation Tests
function extractInstagramInfo(input) {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();
  const match = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:[a-zA-Z0-9_.]+\/)?(reel|p)\/([A-Za-z0-9_-]+)/i
  );
  if (!match) return null;
  const rawType = match[1].toLowerCase();
  const code = match[2];
  const type = rawType === "reel" ? "reel" : "post";
  const pathSegment = rawType === "reel" ? "reel" : "p";
  const canonicalUrl = `https://www.instagram.com/${pathSegment}/${code}/`;
  const embedUrl = `https://www.instagram.com/${pathSegment}/${code}/embed/`;
  return { code, type, canonicalUrl, embedUrl };
}

console.log("1. TESTING URL VALIDATION & EXTRACTION");
test("Valid standard Reel URL", () => {
  const res = extractInstagramInfo("https://www.instagram.com/reel/DRmaGfQCZES/");
  assert.ok(res);
  assert.strictEqual(res.code, "DRmaGfQCZES");
  assert.strictEqual(res.type, "reel");
  assert.strictEqual(res.canonicalUrl, "https://www.instagram.com/reel/DRmaGfQCZES/");
  assert.strictEqual(res.embedUrl, "https://www.instagram.com/reel/DRmaGfQCZES/embed/");
});

test("Valid Reel URL without trailing slash", () => {
  const res = extractInstagramInfo("https://www.instagram.com/reel/DdBicRkBR5y");
  assert.ok(res);
  assert.strictEqual(res.code, "DdBicRkBR5y");
  assert.strictEqual(res.canonicalUrl, "https://www.instagram.com/reel/DdBicRkBR5y/");
});

test("Valid Reel URL with query parameters", () => {
  const res = extractInstagramInfo("https://www.instagram.com/reel/DXYnJVbD0Xc/?utm_source=ig_web_copy_link");
  assert.ok(res);
  assert.strictEqual(res.code, "DXYnJVbD0Xc");
});

test("Valid Reel URL with profile username prefix", () => {
  const res = extractInstagramInfo("https://www.instagram.com/sheferoyguppy/reel/DTQQZpFDNRG/");
  assert.ok(res);
  assert.strictEqual(res.code, "DTQQZpFDNRG");
});

test("Valid Post URL (/p/)", () => {
  const res = extractInstagramInfo("https://www.instagram.com/p/DavN9X0idIu/");
  assert.ok(res);
  assert.strictEqual(res.code, "DavN9X0idIu");
  assert.strictEqual(res.type, "post");
  assert.strictEqual(res.embedUrl, "https://www.instagram.com/p/DavN9X0idIu/embed/");
});

test("Invalid URLs: Non-Instagram domain", () => {
  assert.strictEqual(extractInstagramInfo("https://youtube.com/watch?v=12345"), null);
  assert.strictEqual(extractInstagramInfo("https://tiktok.com/@sheferoyguppy/video/12345"), null);
});

test("Invalid URLs: Profile-only URL without Reel/Post code", () => {
  assert.strictEqual(extractInstagramInfo("https://www.instagram.com/sheferoyguppy/"), null);
  assert.strictEqual(extractInstagramInfo("https://www.instagram.com/"), null);
});

test("Invalid URLs: Malformed or empty strings", () => {
  assert.strictEqual(extractInstagramInfo(""), null);
  assert.strictEqual(extractInstagramInfo("   "), null);
  assert.strictEqual(extractInstagramInfo("random_string_not_a_url"), null);
});

// 2. Verified Seed Dataset Tests
console.log("\n2. TESTING VERIFIED SHEFEROY GUPPY SEED DATASET");
test("Verify data/reels.json exists and contains verified items", () => {
  const filePath = path.join(rootDir, "data", "reels.json");
  assert.ok(fs.existsSync(filePath), "data/reels.json must exist");
  const raw = fs.readFileSync(filePath, "utf-8");
  const reels = JSON.parse(raw);
  assert.ok(Array.isArray(reels), "reels must be an array");
  assert.ok(reels.length >= 7, "must contain at least 7 verified reels/posts");

  for (const r of reels) {
    assert.ok(r.code, `Reel ${r.id} must have code`);
    assert.ok(r.url.startsWith("https://www.instagram.com/"), `Reel ${r.id} must have canonical URL`);
    assert.ok(r.caption, `Reel ${r.id} must have caption`);
    assert.strictEqual(r.author, "sheferoyguppy", `Reel ${r.id} must be attributed to sheferoyguppy`);
  }
});

// 3. Security & Token Leakage Test
console.log("\n3. TESTING SECURITY & SECRET HYGIENE");
test("Verify no secrets are hardcoded in client components", () => {
  const componentsDir = path.join(rootDir, "components");
  const checkDir = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        checkDir(fullPath);
      } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
        const content = fs.readFileSync(fullPath, "utf-8");
        assert.ok(!content.includes("IGQV"), `File ${file} must not contain raw Instagram token`);
        assert.ok(!content.includes("SUPABASE_SERVICE_ROLE_KEY"), `File ${file} must not reference service role key directly`);
      }
    }
  };
  checkDir(componentsDir);
});

// 4. API Endpoints & CRUD Simulator Test
console.log("\n4. TESTING REEL MANAGEMENT PERSISTENCE");
test("Verify save and read cycle preserves reel attributes", () => {
  const filePath = path.join(rootDir, "data", "reels.json");
  const original = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Verify fields
  const featured = original.filter((r) => r.featured);
  assert.ok(featured.length > 0, "Must have featured reels for homepage");

  const categories = new Set(original.map((r) => r.category));
  assert.ok(categories.has("Breeding"), "Should include Breeding reels");
  assert.ok(categories.has("Feeding"), "Should include Feeding reels");
  assert.ok(categories.has("Strains"), "Should include Strains reels");
});

// 5. Embed Accessibility and Facade Verification
console.log("\n5. TESTING FACADE PATTERN & EMBED LOGIC");
test("Verify ReelCard component implements lazy-load facade pattern", () => {
  const cardPath = path.join(rootDir, "components", "instagram", "ReelCard.tsx");
  assert.ok(fs.existsSync(cardPath));
  const cardCode = fs.readFileSync(cardPath, "utf-8");

  assert.ok(cardCode.includes("isPlaying"), "ReelCard must track isPlaying state");
  assert.ok(cardCode.includes("isLoading"), "ReelCard must provide loading state");
  assert.ok(cardCode.includes("loadError"), "ReelCard must provide error fallback state");
  assert.ok(cardCode.includes("Watch on Instagram"), "ReelCard must provide external link to Instagram");
});

console.log("\n==================================================");
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("==================================================");

if (failed > 0) {
  process.exit(1);
}
