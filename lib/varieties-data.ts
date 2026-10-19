export interface GuppyColorway {
  bodyFrom: string;
  bodyTo: string;
  tailFrom: string;
  tailTo: string;
  accent: string;
  belly: string;
  glow: string;
  pattern?: "solid" | "spots" | "twotone" | "rosette" | "sheen";
  patternColor?: string;
}

export interface GuppyVariety {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: "Guppies" | "Bettas";
  careLevel: "Beginner" | "Intermediate" | "Advanced";
  published: boolean;
  featured: boolean;
  popular?: boolean;
  availability: string;
  line: string;
  image: string;
  tailType: string;
  rarity: "Show Grade" | "Stud Bloodline" | "Breeder Trio" | "Collector Special" | "Breeding Pair";
  temp: string;
  ph: string;
  hardness: string;
  art?: GuppyColorway;
}

export const heroColorway: GuppyColorway = {
  bodyFrom: "#0d2b45",
  bodyTo: "#203c56",
  tailFrom: "#1d4e89",
  tailTo: "#00b4d8",
  accent: "#57cc99",
  belly: "#90e0ef",
  glow: "#0077b6",
  pattern: "solid",
};

export const guppyVarieties: GuppyVariety[] = [
  {
    id: 1,
    name: "Veiltail Zebra Green",
    slug: "veiltail-zebra-green",
    description:
      "Stunning male Veiltail Zebra Green with shimmering emerald green scales and intricate dark zebra striping across its extended flowing veiltail. Exceptionally hardy and energetic.",
    category: "Guppies",
    careLevel: "Beginner",
    published: true,
    featured: true,
    popular: false,
    availability: "Breeding pairs available",
    line: "Zebra Green Bloodline",
    image: "/images/varieties/veiltail-zebra-green.jpg",
    tailType: "Flowing Veiltail",
    rarity: "Breeding Pair",
    temp: "24°C - 28°C",
    ph: "7.0 - 7.8",
    hardness: "10 - 15 dGH",
  },
  {
    id: 2,
    name: "Thai Flag Betta",
    slug: "thai-flag-betta",
    description:
      "Prestigious Thai Flag Betta splendens with clean red, white, and royal blue horizontal color banding honoring the national colors of Thailand. Features magnificent fin symmetry and alert temperament.",
    category: "Bettas",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    popular: false,
    availability: "Breeding pairs available",
    line: "National Thai Flag Line",
    image: "/images/varieties/thai-flag-betta.jpg",
    tailType: "Halfmoon Plakat",
    rarity: "Show Grade",
    temp: "25°C - 30°C",
    ph: "6.5 - 7.5",
    hardness: "5 - 12 dGH",
  },
  {
    id: 3,
    name: "Platinum Black Green Dragon Dumbo Ear",
    slug: "platinum-black-green-dragon-dumbo-ear",
    description:
      "Rare fancy strain displaying oversized platinum dumbo ear pectoral fins, shimmering emerald green metallic dragon scales, and deep black midbody contrast.",
    category: "Guppies",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    popular: false,
    availability: "Enquire for Availability",
    line: "Dragon Dumbo Line",
    image: "/images/varieties/platinum-black-green-dragon-dumbo-ear.jpg",
    tailType: "Dumbo Ear Delta",
    rarity: "Collector Special",
    temp: "24°C - 28°C",
    ph: "7.0 - 7.8",
    hardness: "10 - 15 dGH",
  },
  {
    id: 4,
    name: "Black Dumbo Ear",
    slug: "black-dumbo-ear",
    description:
      "Solid velvet jet-black body paired with prominent fan-shaped black dumbo pectoral fins. Striking contrast under planted aquarium lighting.",
    category: "Guppies",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    popular: false,
    availability: "Enquire for Availability",
    line: "Solid Black Dumbo Line",
    image: "/images/varieties/black-dumbo-ear.jpg",
    tailType: "Big Ear Delta",
    rarity: "Show Grade",
    temp: "24°C - 28°C",
    ph: "7.0 - 7.8",
    hardness: "10 - 15 dGH",
  },
  {
    id: 5,
    name: "24k Gold Guppy",
    slug: "24k-gold-guppy",
    description:
      "Solid 24-karat bright metallic yellow-gold body with a broad, radiant golden delta fin. One of our most popular and sought-after bloodlines.",
    category: "Guppies",
    careLevel: "Beginner",
    published: true,
    featured: true,
    popular: true,
    availability: "Enquire for Availability",
    line: "24K Solid Gold Line",
    image: "/images/varieties/24k-gold-guppy.jpg",
    tailType: "Broad Delta",
    rarity: "Show Grade",
    temp: "24°C - 28°C",
    ph: "7.2 - 8.0",
    hardness: "10 - 16 dGH",
  },
  {
    id: 6,
    name: "Silverodo Hb Blue",
    slug: "silverodo-hb-blue",
    description:
      "Silverado Half-Black Blue strain with reflective platinum-silver dorsal/head, dark half-black torso, and rich royal blue delta tail.",
    category: "Guppies",
    careLevel: "Beginner",
    published: true,
    featured: true,
    popular: false,
    availability: "Enquire for Availability",
    line: "Silverado Blue Line",
    image: "/images/varieties/silverodo-hb-blue.jpg",
    tailType: "Super Delta",
    rarity: "Stud Bloodline",
    temp: "24°C - 28°C",
    ph: "7.0 - 7.8",
    hardness: "10 - 15 dGH",
  },
  {
    id: 7,
    name: "Red Blue Berry Dragon Dumbo Ear",
    slug: "red-blue-berry-dragon-dumbo-ear",
    description:
      "Intense berry-red and deep indigo-blue tones merged over thick dragon scales, complemented by huge white-accented dumbo ear pectoral fins.",
    category: "Guppies",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    popular: false,
    availability: "Enquire for Availability",
    line: "Berry Dragon Line",
    image: "/images/varieties/red-blue-berry-dragon-dumbo-ear.jpg",
    tailType: "Dumbo Ear Delta",
    rarity: "Collector Special",
    temp: "24°C - 28°C",
    ph: "7.0 - 7.8",
    hardness: "10 - 15 dGH",
  },
  {
    id: 8,
    name: "Redrose Siamese",
    slug: "redrose-siamese",
    description:
      "Magnificent Betta splendens with velvety deep ruby red coloration and overlapping, ruffled rose-tail fin rays mimicking fresh rose petals.",
    category: "Bettas",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    popular: false,
    availability: "Breeding pairs available",
    line: "Siamese Rosetail Line",
    image: "/images/varieties/redrose-siamese.jpg",
    tailType: "Rosetail Halfmoon",
    rarity: "Breeding Pair",
    temp: "25°C - 30°C",
    ph: "6.5 - 7.5",
    hardness: "5 - 12 dGH",
  },
  {
    id: 9,
    name: "Full White",
    slug: "full-white",
    description:
      "Pristine, solid snow-white fancy guppy with immaculate white finnage and pearlescent platinum body. Clean, elegant, and peaceful.",
    category: "Guppies",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    popular: false,
    availability: "Breeding pair available",
    line: "Pure White Platinum Line",
    image: "/images/varieties/full-white.jpg",
    tailType: "Broad Delta",
    rarity: "Breeding Pair",
    temp: "24°C - 28°C",
    ph: "7.2 - 8.0",
    hardness: "10 - 15 dGH",
  },
  {
    id: 10,
    name: "Purple Berry Dragon Dumbo Ear",
    slug: "purple-berry-dragon-dumbo-ear",
    description:
      "Vibrant violet-purple body with dragon scale luster and oversized dumbo ear pectoral fins fluttering actively during courtship.",
    category: "Guppies",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    popular: false,
    availability: "Available",
    line: "Purple Dragon Line",
    image: "/images/varieties/purple-berry-dragon-dumbo-ear.jpg",
    tailType: "Big Ear Delta",
    rarity: "Show Grade",
    temp: "24°C - 28°C",
    ph: "7.0 - 7.8",
    hardness: "10 - 15 dGH",
  },
  {
    id: 11,
    name: "Afr Redrose Tail",
    slug: "afr-redrose-tail",
    description:
      "Albino Full Red (AFR) with true ruby albino eyes, intense scarlet body saturation, and delicate ruffled rose-tail caudal spread.",
    category: "Guppies",
    careLevel: "Advanced",
    published: true,
    featured: true,
    popular: false,
    availability: "Enquire for Availability",
    line: "Albino Full Red Line",
    image: "/images/varieties/afr-redrose-tail.jpg",
    tailType: "Rosetail Delta",
    rarity: "Stud Bloodline",
    temp: "24°C - 28°C",
    ph: "7.0 - 7.8",
    hardness: "10 - 15 dGH",
  },
  {
    id: 12,
    name: "Albino Silverado Red Dumbo Ear",
    slug: "albino-silverado-red-dumbo-ear",
    description:
      "Striking albino guppy featuring shimmering silver torso, large white dumbo ear pectoral fins, and fiery albino red tail fin.",
    category: "Guppies",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    popular: false,
    availability: "Enquire for Availability",
    line: "Albino Silverado Line",
    image: "/images/varieties/albino-silverado-red-dumbo-ear.jpg",
    tailType: "Dumbo Ear Delta",
    rarity: "Collector Special",
    temp: "24°C - 28°C",
    ph: "7.0 - 7.8",
    hardness: "10 - 15 dGH",
  },
  {
    id: 13,
    name: "Silverodo Black Dragon Dumbo Ear",
    slug: "silverodo-black-dragon-dumbo-ear",
    description:
      "Silverado Black Dragon strain with large dumbo pectoral fins, metallic platinum head cap, and dark dragon-scaled midbody.",
    category: "Guppies",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    popular: false,
    availability: "Enquire for Availability",
    line: "Silverado Dragon Line",
    image: "/images/varieties/silverodo-black-dragon-dumbo-ear.jpg",
    tailType: "Dumbo Ear Delta",
    rarity: "Show Grade",
    temp: "24°C - 28°C",
    ph: "7.0 - 7.8",
    hardness: "10 - 15 dGH",
  },
  {
    id: 14,
    name: "Silverodo Green Dragon Dumbo Ear",
    slug: "silverodo-green-dragon-dumbo-ear",
    description:
      "Emerald green metallic highlights over dark dragon scales, paired with prominent white-fringed dumbo ear pectoral fins.",
    category: "Guppies",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    popular: false,
    availability: "Enquire for Availability",
    line: "Silverado Dragon Line",
    image: "/images/varieties/silverodo-green-dragon-dumbo-ear.jpg",
    tailType: "Dumbo Ear Delta",
    rarity: "Collector Special",
    temp: "24°C - 28°C",
    ph: "7.0 - 7.8",
    hardness: "10 - 15 dGH",
  },
  {
    id: 15,
    name: "Copper Dragon",
    slug: "copper-dragon",
    description:
      "Heavy metallic copper and bronze dragon scale plating with dark contrasting finnage. Powerful build and fierce betta profile.",
    category: "Bettas",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    popular: false,
    availability: "Pair available",
    line: "Copper Dragon Line",
    image: "/images/varieties/copper-dragon.jpg",
    tailType: "Dragon Plakat",
    rarity: "Breeding Pair",
    temp: "25°C - 30°C",
    ph: "6.5 - 7.5",
    hardness: "5 - 12 dGH",
  },
  {
    id: 16,
    name: "Silverodo Red Dumbo Ear",
    slug: "silverodo-red-dumbo-ear",
    description:
      "Bright crimson caudal and dorsal finnage anchored by metallic silver chest plates and extra-large dumbo ear pectoral fins.",
    category: "Guppies",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    popular: false,
    availability: "Enquire for Availability",
    line: "Silverado Red Line",
    image: "/images/varieties/silverodo-red-dumbo-ear.jpg",
    tailType: "Dumbo Ear Delta",
    rarity: "Show Grade",
    temp: "24°C - 28°C",
    ph: "7.0 - 7.8",
    hardness: "10 - 15 dGH",
  },
  {
    id: 17,
    name: "Blue Copper Dragon",
    slug: "blue-copper-dragon",
    description:
      "Iridescent royal blue and shimmering copper dragon scales covering body and fins. Alert, active, and magnificent display flare.",
    category: "Bettas",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    popular: false,
    availability: "Pair available",
    line: "Blue Copper Line",
    image: "/images/varieties/blue-copper-dragon.jpg",
    tailType: "Dragon Halfmoon",
    rarity: "Breeding Pair",
    temp: "25°C - 30°C",
    ph: "6.5 - 7.5",
    hardness: "5 - 12 dGH",
  },
  {
    id: 18,
    name: "Violet Veiltail Zebra",
    slug: "violet-veiltail-zebra",
    description:
      "Rare violet and lilac veiltail with distinct zebra striped caudal rays. Graceful long trailing tail with intense iridescent sheen.",
    category: "Guppies",
    careLevel: "Beginner",
    published: true,
    featured: true,
    popular: false,
    availability: "Available",
    line: "Violet Zebra Line",
    image: "/images/varieties/violet-veiltail-zebra.jpg",
    tailType: "Flowing Veiltail",
    rarity: "Show Grade",
    temp: "24°C - 28°C",
    ph: "7.0 - 7.8",
    hardness: "10 - 15 dGH",
  },
  {
    id: 19,
    name: "Nemo Candy Females",
    slug: "nemo-candy-females",
    description:
      "Healthy, conditioned female Betta splendens with bright koi nemo candy calico marbling in orange, yellow, crimson, and black. Ready for breeding tanks.",
    category: "Bettas",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    popular: false,
    availability: "Females available",
    line: "Nemo Candy Calico Line",
    image: "/images/varieties/nemo-candy-females.jpg",
    tailType: "Plakat Female",
    rarity: "Breeding Pair",
    temp: "25°C - 30°C",
    ph: "6.5 - 7.5",
    hardness: "5 - 12 dGH",
  },
  {
    id: 20,
    name: "Moscow Blue",
    slug: "moscow-blue",
    description:
      "Stunning solid royal blue coloration extending across the entire body and flowing delta caudal fin. Moscow Blues are renowned for their intense, deep indigo-cobalt luster that never fades.",
    category: "Guppies",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    popular: true,
    availability: "Enquire for Availability",
    line: "Solid Stud Line",
    image: "/images/varieties/moscow-blue.jpg",
    tailType: "Broad Delta",
    rarity: "Show Grade",
    temp: "24°C - 28°C",
    ph: "7.0 - 7.8",
    hardness: "10 - 15 dGH",
  },
];

export const categories = ["All", "Guppies", "Bettas"] as const;
export type ProductCategory = (typeof categories)[number];

export function getVarietyBySlug(slug: string): GuppyVariety | undefined {
  return guppyVarieties.find((v) => v.slug === slug && v.published);
}

export function getFeaturedVarieties(): GuppyVariety[] {
  const featured = guppyVarieties.filter((v) => v.published && v.featured);
  return featured.length > 0 ? featured : guppyVarieties.filter((v) => v.published);
}

export function getRelatedVarieties(slug: string, count = 4): GuppyVariety[] {
  const current = getVarietyBySlug(slug);
  if (!current) return [];
  return guppyVarieties
    .filter((v) => v.published && v.slug !== slug && v.category === current.category)
    .concat(guppyVarieties.filter((v) => v.published && v.slug !== slug && v.category !== current.category))
    .slice(0, count);
}

export type Variety = GuppyVariety;
export const varieties = guppyVarieties;
