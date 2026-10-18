export const reelItemCategories = [
  "Breeding",
  "Strains",
  "Feeding",
  "Nursery",
  "Fish Room",
] as const;

export type ReelItemCategory = (typeof reelItemCategories)[number];

export interface InstagramReel {
  id: string; // unique identifier, e.g. "DRmaGfQCZES"
  code: string; // Instagram shortcode
  url: string; // canonical URL e.g. "https://www.instagram.com/reel/DRmaGfQCZES/"
  type: "reel" | "post";
  caption: string;
  category: ReelItemCategory;
  varietyName?: string;
  varietySlug?: string;
  featured: boolean;
  order: number;
  date?: string;
  author: string; // "sheferoyguppy"
}

export interface InstagramUrlInfo {
  code: string;
  type: "reel" | "post";
  canonicalUrl: string;
  embedUrl: string;
}

/**
 * Validates and extracts the shortcode and canonical URLs from an Instagram link.
 * Supports:
 * - https://www.instagram.com/reel/CODE/
 * - https://www.instagram.com/p/CODE/
 * - https://www.instagram.com/sheferoyguppy/reel/CODE/
 * - instagram.com/reel/CODE
 */
export function extractInstagramInfo(input: string): InstagramUrlInfo | null {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();

  const match = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:[a-zA-Z0-9_.]+\/)?(reel|p)\/([A-Za-z0-9_-]+)/i
  );

  if (!match) return null;

  const rawType = match[1].toLowerCase();
  const code = match[2];
  const type: "reel" | "post" = rawType === "reel" ? "reel" : "post";
  const pathSegment = rawType === "reel" ? "reel" : "p";
  const canonicalUrl = `https://www.instagram.com/${pathSegment}/${code}/`;
  const embedUrl = `https://www.instagram.com/${pathSegment}/${code}/embed/`;

  return { code, type, canonicalUrl, embedUrl };
}

export function isValidInstagramUrl(url: string): boolean {
  return extractInstagramInfo(url) !== null;
}

export function getEmbedUrl(code: string, type: "reel" | "post" = "reel"): string {
  const pathSegment = type === "reel" ? "reel" : "p";
  return `https://www.instagram.com/${pathSegment}/${code}/embed/`;
}

export const reelCategories = [
  "All",
  "Breeding",
  "Strains",
  "Feeding",
  "Nursery",
  "Fish Room",
] as const;

export type ReelCategory = (typeof reelCategories)[number];

/**
 * Real, verified Instagram Reels and posts published by @sheferoyguppy (Kanyakumari, Tamil Nadu).
 * These serve as the verified baseline dataset for the Sheferoy Guppy catalog.
 */
export const verifiedSheferoyReels: InstagramReel[] = [
  {
    id: "DRmaGfQCZES",
    code: "DRmaGfQCZES",
    url: "https://www.instagram.com/reel/DRmaGfQCZES/",
    type: "reel",
    caption: "Platinum Koi Ribbon & Albino Full Red (AFR) Bloodline update — vibrant finnage and active swimming in breeding tanks.",
    category: "Breeding",
    varietyName: "Platinum Koi & AFR",
    varietySlug: "platinum-white",
    featured: true,
    order: 1,
    date: "2026-03-12",
    author: "sheferoyguppy",
  },
  {
    id: "DdBicRkBR5y",
    code: "DdBicRkBR5y",
    url: "https://www.instagram.com/reel/DdBicRkBR5y/",
    type: "reel",
    caption: "Show Grade Fancy Guppy Selection — inspecting dorsal symmetry, body depth, and caudal delta spread.",
    category: "Strains",
    varietyName: "Show Grade Delta",
    varietySlug: "moscow-blue",
    featured: true,
    order: 2,
    date: "2026-02-28",
    author: "sheferoyguppy",
  },
  {
    id: "DXYnJVbD0Xc",
    code: "DXYnJVbD0Xc",
    url: "https://www.instagram.com/reel/DXYnJVbD0Xc/",
    type: "reel",
    caption: "Morning Live Feeding Session — high protein feed conditioning breeder trios in our Kanyakumari farm.",
    category: "Feeding",
    varietyName: "Breeder Strains",
    varietySlug: "red-dragon",
    featured: true,
    order: 3,
    date: "2026-02-14",
    author: "sheferoyguppy",
  },
  {
    id: "DTQQZpFDNRG",
    code: "DTQQZpFDNRG",
    url: "https://www.instagram.com/reel/DTQQZpFDNRG/",
    type: "reel",
    caption: "Fry Nursery & Selective Breeding Tank Observation — juvenile growth rates in balanced planted aquatic environments.",
    category: "Nursery",
    varietyName: "Juvenile Bloodlines",
    varietySlug: "tuxedo-koi",
    featured: true,
    order: 4,
    date: "2026-01-22",
    author: "sheferoyguppy",
  },
  {
    id: "DavN9X0idIu",
    code: "DavN9X0idIu",
    url: "https://www.instagram.com/p/DavN9X0idIu/",
    type: "post",
    caption: "AFR White Ears Line Inspection — pristine white pectoral fins with intense crimson body saturation.",
    category: "Strains",
    varietyName: "AFR White Ears",
    varietySlug: "full-gold",
    featured: false,
    order: 5,
    date: "2026-01-10",
    author: "sheferoyguppy",
  },
  {
    id: "DRKGlHlkgSZ",
    code: "DRKGlHlkgSZ",
    url: "https://www.instagram.com/p/DRKGlHlkgSZ/",
    type: "post",
    caption: "Ivory Green Strain Lineage — metallic emerald shine with clean pedigree lines.",
    category: "Strains",
    varietyName: "Ivory Green",
    varietySlug: "purple-moscow",
    featured: false,
    order: 6,
    date: "2025-12-18",
    author: "sheferoyguppy",
  },
  {
    id: "DeMsku5JYmq",
    code: "DeMsku5JYmq",
    url: "https://www.instagram.com/p/DeMsku5JYmq/",
    type: "post",
    caption: "Breeder Grade Trio Selection — conditioned and packaged for safe pan-India courier shipping.",
    category: "Fish Room",
    varietyName: "Breeder Trios",
    varietySlug: "moscow-blue",
    featured: false,
    order: 7,
    date: "2025-11-30",
    author: "sheferoyguppy",
  },
];
