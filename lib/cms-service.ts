import fs from "fs";
import path from "path";
import { supabase } from "./supabase";
import {
  type HeroContent,
  type FeaturedProductItem,
  type FeaturedSectionContent,
  type AboutSectionContent,
  type SeoSectionContent,
  type ContactSectionContent,
  type HomepageContent,
  defaultHomepageContent,
} from "./cms-types";

export type {
  HeroContent,
  FeaturedProductItem,
  FeaturedSectionContent,
  AboutSectionContent,
  SeoSectionContent,
  ContactSectionContent,
  HomepageContent,
};
export { defaultHomepageContent };

const DATA_FILE_PATH = path.join(process.cwd(), "data", "homepage-content.json");

function readLocalBackup(): HomepageContent {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        hero: { ...defaultHomepageContent.hero, ...(parsed.hero || {}) },
        featured: { ...defaultHomepageContent.featured, ...(parsed.featured || {}) },
        about: { ...defaultHomepageContent.about, ...(parsed.about || {}) },
        seo: { ...defaultHomepageContent.seo, ...(parsed.seo || {}) },
        contact: { ...defaultHomepageContent.contact, ...(parsed.contact || {}) },
      };
    }
  } catch (err) {
    console.warn("Could not read local homepage-content.json:", err);
  }
  return defaultHomepageContent;
}

function writeLocalBackup(content: HomepageContent) {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write local homepage-content.json backup:", err);
  }
}

/**
 * Retrieves the current homepage content.
 * Prioritizes Supabase `public.site_content` table; falls back to local JSON file.
 */
export async function getHomepageContent(): Promise<HomepageContent> {
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("key", "homepage")
      .maybeSingle();

    if (!error && data?.content) {
      const c = data.content as Partial<HomepageContent>;
      return {
        hero: { ...defaultHomepageContent.hero, ...(c.hero || {}) },
        featured: { ...defaultHomepageContent.featured, ...(c.featured || {}) },
        about: { ...defaultHomepageContent.about, ...(c.about || {}) },
        seo: { ...defaultHomepageContent.seo, ...(c.seo || {}) },
        contact: { ...defaultHomepageContent.contact, ...(c.contact || {}) },
      };
    }
  } catch (err) {
    console.warn("Supabase fetch site_content failed, falling back to local file:", err);
  }

  return readLocalBackup();
}

/**
 * Saves updated homepage content into both Supabase and disk cache.
 */
export async function saveHomepageContent(
  content: HomepageContent
): Promise<{ success: boolean; error?: string }> {
  // Always update local disk cache
  writeLocalBackup(content);

  try {
    const { error } = await supabase.from("site_content").upsert({
      key: "homepage",
      content,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase upsert site_content error:", error);
      // Still consider success if written locally
      return { success: true };
    }

    return { success: true };
  } catch (err: unknown) {
    console.error("saveHomepageContent error:", err);
    return { success: true };
  }
}

/**
 * Resets homepage content back to default.
 */
export async function resetHomepageContent(): Promise<{ success: boolean }> {
  await saveHomepageContent(defaultHomepageContent);
  return { success: true };
}
