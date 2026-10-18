import fs from "fs";
import path from "path";
import {
  type InstagramReel,
  verifiedSheferoyReels,
  extractInstagramInfo,
} from "./reels-data";

const DATA_DIR = path.join(process.cwd(), "data");
const REELS_FILE = path.join(DATA_DIR, "reels.json");

/**
 * Checks whether the official Instagram Graph API is configured in the environment.
 */
export function isInstagramApiConfigured(): boolean {
  return Boolean(process.env.INSTAGRAM_ACCESS_TOKEN);
}

interface GraphMediaItem {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  permalink?: string;
  thumbnail_url?: string;
  timestamp?: string;
}

/**
 * Server-side loader that fetches from the official Instagram Graph API if configured.
 * Does not expose credentials to the client.
 * Uses Next.js cache revalidation to prevent excessive requests on every page render.
 */
async function fetchFromInstagramGraphApi(): Promise<InstagramReel[] | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;

  try {
    const url = new URL("https://graph.instagram.com/me/media");
    url.searchParams.set("fields", "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp");
    url.searchParams.set("access_token", token);
    url.searchParams.set("limit", "15");

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // 1-hour server cache revalidation
    });

    if (!response.ok) {
      console.warn(`[Instagram Graph API] Error: HTTP ${response.status} ${response.statusText}`);
      return null;
    }

    const data = (await response.json()) as { data?: GraphMediaItem[] };
    if (!data || !Array.isArray(data.data)) {
      return null;
    }

    const graphReels: InstagramReel[] = data.data
      .filter((item: GraphMediaItem) => item.media_type === "VIDEO" || item.permalink?.includes("/reel/"))
      .map((item: GraphMediaItem, index: number) => {
        const info = extractInstagramInfo(item.permalink || "");
        const code = info ? info.code : item.id;
        const type = (info ? info.type : "reel") as "reel" | "post";
        const canonicalUrl = info ? info.canonicalUrl : item.permalink || `https://www.instagram.com/reel/${code}/`;

        return {
          id: code,
          code,
          url: canonicalUrl,
          type,
          caption: item.caption || "Sheferoy Guppy aquarium update",
          category: "Fish Room",
          featured: index < 4,
          order: index + 1,
          date: item.timestamp ? item.timestamp.split("T")[0] : undefined,
          author: "sheferoyguppy",
        };
      });

    return graphReels.length > 0 ? graphReels : null;
  } catch (err) {
    console.warn("[Instagram Graph API] Network or auth error:", err);
    return null;
  }
}

/**
 * Reads the admin-managed list of reels from disk, or seeds it with verified reels.
 */
export function getStoredReels(): InstagramReel[] {
  try {
    if (fs.existsSync(REELS_FILE)) {
      const raw = fs.readFileSync(REELS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.sort((a, b) => (a.order || 0) - (b.order || 0));
      }
    }
  } catch (err) {
    console.warn("[Stored Reels] Could not read from data/reels.json, falling back to verified list:", err);
  }

  return [...verifiedSheferoyReels];
}

/**
 * Persists the updated reels list to data/reels.json on disk.
 */
export function saveStoredReels(reels: InstagramReel[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(REELS_FILE, JSON.stringify(reels, null, 2), "utf-8");
  } catch (err) {
    console.error("[Stored Reels] Failed to write to data/reels.json:", err);
  }
}

/**
 * Main service method:
 * 1. Checks if Graph API is configured and responds successfully.
 * 2. If not, falls back to the administrator-managed list.
 */
export async function getActiveReels(): Promise<{
  reels: InstagramReel[];
  source: "official_api" | "admin_managed";
}> {
  if (isInstagramApiConfigured()) {
    const apiReels = await fetchFromInstagramGraphApi();
    if (apiReels && apiReels.length > 0) {
      return { reels: apiReels, source: "official_api" };
    }
  }

  return { reels: getStoredReels(), source: "admin_managed" };
}
