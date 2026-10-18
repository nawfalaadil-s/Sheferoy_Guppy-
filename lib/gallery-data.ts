import { getEmbedUrl } from "./reels-data";

export type GalleryItem =
  | {
      id: number;
      kind: "guppy";
      alt: string;
      caption: string;
      category: string;
      varietySlug: string;
    }
  | {
      id: number;
      kind: "plant";
      alt: string;
      caption: string;
      category: string;
      plantSlug: string;
    }
  | {
      id: number;
      kind: "reel";
      alt: string;
      caption: string;
      category: string;
      reelCode: string;
      reelUrl: string;
      embedUrl: string;
      reelCategory: string;
      varietyName?: string;
    };

// Curated collection combining photos, illustrations, and real Instagram Reels from Sheferoy Guppy
export const galleryItems: GalleryItem[] = [
  // Real Instagram Reels from @sheferoyguppy
  {
    id: 101,
    kind: "reel",
    alt: "Platinum Koi Ribbon & AFR Bloodline Instagram Reel",
    caption: "Platinum Koi Ribbon & AFR Bloodlines",
    category: "Reels",
    reelCode: "DRmaGfQCZES",
    reelUrl: "https://www.instagram.com/reel/DRmaGfQCZES/",
    embedUrl: getEmbedUrl("DRmaGfQCZES", "reel"),
    reelCategory: "Breeding",
    varietyName: "Platinum Koi & AFR",
  },
  {
    id: 102,
    kind: "reel",
    alt: "Show Grade Fancy Guppy Selection Reel",
    caption: "Show Grade Fancy Guppy Dorsal & Delta Selection",
    category: "Reels",
    reelCode: "DdBicRkBR5y",
    reelUrl: "https://www.instagram.com/reel/DdBicRkBR5y/",
    embedUrl: getEmbedUrl("DdBicRkBR5y", "reel"),
    reelCategory: "Strains",
    varietyName: "Show Grade Delta",
  },
  {
    id: 103,
    kind: "reel",
    alt: "Morning Live Feeding Session Reel",
    caption: "Morning Live Feeding Session — Breeder Tanks",
    category: "Reels",
    reelCode: "DXYnJVbD0Xc",
    reelUrl: "https://www.instagram.com/reel/DXYnJVbD0Xc/",
    embedUrl: getEmbedUrl("DXYnJVbD0Xc", "reel"),
    reelCategory: "Feeding",
    varietyName: "Breeder Strains",
  },
  {
    id: 104,
    kind: "reel",
    alt: "Fry Nursery & Selective Breeding Tank Reel",
    caption: "Fry Nursery & Selective Breeding Observations",
    category: "Reels",
    reelCode: "DTQQZpFDNRG",
    reelUrl: "https://www.instagram.com/reel/DTQQZpFDNRG/",
    embedUrl: getEmbedUrl("DTQQZpFDNRG", "reel"),
    reelCategory: "Nursery",
    varietyName: "Juvenile Guppies",
  },
  {
    id: 105,
    kind: "reel",
    alt: "AFR White Ears Line Inspection Reel",
    caption: "AFR White Ears Pectoral Fin Inspection",
    category: "Reels",
    reelCode: "DavN9X0idIu",
    reelUrl: "https://www.instagram.com/p/DavN9X0idIu/",
    embedUrl: getEmbedUrl("DavN9X0idIu", "post"),
    reelCategory: "Strains",
    varietyName: "AFR White Ears",
  },
  {
    id: 106,
    kind: "reel",
    alt: "Ivory Green Strain Lineage Showcase",
    caption: "Ivory Green Strain Metallic Lineage",
    category: "Reels",
    reelCode: "DRKGlHlkgSZ",
    reelUrl: "https://www.instagram.com/p/DRKGlHlkgSZ/",
    embedUrl: getEmbedUrl("DRKGlHlkgSZ", "post"),
    reelCategory: "Strains",
    varietyName: "Ivory Green",
  },

  // Guppy & Plant visual items
  { id: 1, kind: "guppy", alt: "Moscow Blue guppy illustration", caption: "Moscow Blue — solid line", category: "Guppies", varietySlug: "moscow-blue" },
  { id: 2, kind: "plant", alt: "Vallisneria spiralis illustration", caption: "Vallisneria spiralis", category: "Plants", plantSlug: "vallisneria-spiralis" },
  { id: 3, kind: "guppy", alt: "Red Dragon guppy illustration", caption: "Red Dragon — pattern line", category: "Guppies", varietySlug: "red-dragon" },
  { id: 4, kind: "plant", alt: "Dwarf Water Lettuce illustration", caption: "Dwarf Water Lettuce", category: "Plants", plantSlug: "dwarf-water-lettuce" },
  { id: 5, kind: "guppy", alt: "Platinum White guppy illustration", caption: "Platinum White — metallic line", category: "Guppies", varietySlug: "platinum-white" },
  { id: 6, kind: "plant", alt: "Guppy Grass illustration", caption: "Guppy Grass — breeding essential", category: "Plants", plantSlug: "guppy-grass" },
  { id: 7, kind: "guppy", alt: "Tuxedo Koi guppy illustration", caption: "Tuxedo Koi — pattern line", category: "Guppies", varietySlug: "tuxedo-koi" },
  { id: 8, kind: "plant", alt: "Pennywort illustration", caption: "Pennywort — fast growing", category: "Plants", plantSlug: "pennywort" },
  { id: 9, kind: "guppy", alt: "Full Gold guppy illustration", caption: "Full Gold — solid line", category: "Guppies", varietySlug: "full-gold" },
  { id: 10, kind: "plant", alt: "Foxtail illustration", caption: "Foxtail — feathery texture", category: "Plants", plantSlug: "foxtail" },
  { id: 11, kind: "guppy", alt: "Purple Moscow guppy illustration", caption: "Purple Moscow — solid line", category: "Guppies", varietySlug: "purple-moscow" },
  { id: 12, kind: "plant", alt: "Duckweed illustration", caption: "Duckweed — surface carpet", category: "Plants", plantSlug: "duckweed" },
];

export const galleryCategories = ["All", "Reels", "Guppies", "Plants"];
