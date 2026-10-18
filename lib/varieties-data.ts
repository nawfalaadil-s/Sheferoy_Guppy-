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
  category: string;
  careLevel: string;
  published: boolean;
  featured: boolean;
  line: string;
  art: GuppyColorway;
}

export const heroColorway: GuppyColorway = {
  bodyFrom: "#7a2415",
  bodyTo: "#e8873c",
  tailFrom: "#c7442a",
  tailTo: "#ffc27a",
  accent: "#f4a259",
  belly: "#ffe3c2",
  glow: "#d97a3a",
  pattern: "sheen",
};

// Sample catalog — replaceable sample content for development.
// Identity of strains must be confirmed by the administrator before publishing.
export const guppyVarieties: GuppyVariety[] = [
  {
    id: 1,
    name: "Moscow Blue",
    slug: "moscow-blue",
    description:
      "Stunning solid blue coloration throughout the entire body and fins. Moscow Blues are known for their intense, deep blue color that doesn't fade. These guppies have excellent finnage and robust body structure, making them highly sought after by collectors.",
    category: "Solid Color",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    line: "Solid Line",
    art: {
      bodyFrom: "#12275e",
      bodyTo: "#3e63c2",
      tailFrom: "#2a4a9e",
      tailTo: "#9db9ef",
      accent: "#6d92e0",
      belly: "#cfe0ff",
      glow: "#2f55b8",
      pattern: "solid",
    },
  },
  {
    id: 2,
    name: "Red Dragon",
    slug: "red-dragon",
    description:
      "Vibrant red body with contrasting dark patterns and flowing tail fins. The Red Dragon variety features intense red coloration with unique scale patterns that create a stunning visual effect. Known for their vigorous health and active behavior.",
    category: "Pattern",
    careLevel: "Beginner",
    published: true,
    featured: true,
    line: "Pattern Line",
    art: {
      bodyFrom: "#5c0a16",
      bodyTo: "#d63a2f",
      tailFrom: "#a31423",
      tailTo: "#ff7a56",
      accent: "#e8553b",
      belly: "#ffc9b4",
      glow: "#b31423",
      pattern: "rosette",
      patternColor: "#3d060f",
    },
  },
  {
    id: 3,
    name: "Platinum White",
    slug: "platinum-white",
    description:
      "Pure white body with metallic sheen and elegant tail formation. Platinum Whites are prized for their clean, pristine appearance and iridescent quality. These guppies create a striking contrast in any aquarium setup.",
    category: "Metallic",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    line: "Metallic Line",
    art: {
      bodyFrom: "#8f8c82",
      bodyTo: "#f2efe6",
      tailFrom: "#cfccc2",
      tailTo: "#ffffff",
      accent: "#e6e3da",
      belly: "#ffffff",
      glow: "#d8d4c8",
      pattern: "sheen",
    },
  },
  {
    id: 4,
    name: "Tuxedo Koi",
    slug: "tuxedo-koi",
    description:
      "Beautiful koi pattern with distinct color separation and premium quality. Features classic tuxedo body pattern combined with koi-like multicolor markings. Excellent breeding stock with consistent pattern inheritance.",
    category: "Pattern",
    careLevel: "Intermediate",
    published: true,
    featured: true,
    line: "Koi Line",
    art: {
      bodyFrom: "#b8451a",
      bodyTo: "#e8823f",
      tailFrom: "#c94f1e",
      tailTo: "#f0a05e",
      accent: "#d96a2b",
      belly: "#ffe6c8",
      glow: "#b4461a",
      pattern: "twotone",
      patternColor: "#15171b",
    },
  },
  {
    id: 5,
    name: "Full Gold",
    slug: "full-gold",
    description:
      "Rich golden coloration covering the entire body with metallic shine. Full Gold guppies are classic favorites featuring warm, lustrous golden tones. Hardy and easy to breed, making them perfect for beginners.",
    category: "Solid Color",
    careLevel: "Beginner",
    published: true,
    featured: false,
    line: "Solid Line",
    art: {
      bodyFrom: "#8f6b23",
      bodyTo: "#e3bd63",
      tailFrom: "#b98f34",
      tailTo: "#f6df9e",
      accent: "#d9b45f",
      belly: "#ffeec2",
      glow: "#c7a45a",
      pattern: "sheen",
    },
  },
  {
    id: 6,
    name: "Leopard",
    slug: "leopard",
    description:
      "Distinctive spotted pattern resembling a leopard's coat with excellent contrast. These guppies feature random spot patterns that make each fish unique. Active and colorful additions to community tanks.",
    category: "Pattern",
    careLevel: "Beginner",
    published: true,
    featured: false,
    line: "Pattern Line",
    art: {
      bodyFrom: "#6d5220",
      bodyTo: "#d9b45f",
      tailFrom: "#b99240",
      tailTo: "#f2dc9a",
      accent: "#c9a24e",
      belly: "#f8ecc9",
      glow: "#a8842f",
      pattern: "spots",
      patternColor: "#241c0e",
    },
  },
  {
    id: 7,
    name: "Green Cobra",
    slug: "green-cobra",
    description:
      "Stunning green body with cobra-like pattern markings and beautiful tail fins. Features intricate rosette patterns characteristic of cobra varieties. One of the most visually striking pattern types.",
    category: "Pattern",
    careLevel: "Intermediate",
    published: true,
    featured: false,
    line: "Cobra Line",
    art: {
      bodyFrom: "#173f28",
      bodyTo: "#5fae62",
      tailFrom: "#2b7a48",
      tailTo: "#93d68d",
      accent: "#6fbf72",
      belly: "#d2f0c8",
      glow: "#2e6b43",
      pattern: "rosette",
      patternColor: "#0f2e1b",
    },
  },
  {
    id: 8,
    name: "Purple Moscow",
    slug: "purple-moscow",
    description:
      "Deep purple coloration with solid coverage and excellent body form. A rare color variant of the Moscow line with consistent, intense purple throughout. Premium breeding stock.",
    category: "Solid Color",
    careLevel: "Advanced",
    published: true,
    featured: false,
    line: "Solid Line",
    art: {
      bodyFrom: "#2c1f52",
      bodyTo: "#7e63c4",
      tailFrom: "#4a3585",
      tailTo: "#b39ce8",
      accent: "#8f74d6",
      belly: "#ded2ff",
      glow: "#4c34a0",
      pattern: "solid",
    },
  },
  {
    id: 9,
    name: "Half Black Yellow",
    slug: "half-black-yellow",
    description:
      "Classic bi-color variety with distinct black rear body and yellow front. One of the most recognizable guppy varieties with sharp color division. Excellent for breeding and showing.",
    category: "Bi-Color",
    careLevel: "Beginner",
    published: true,
    featured: false,
    line: "Bi-Color Line",
    art: {
      bodyFrom: "#c99a24",
      bodyTo: "#f4d977",
      tailFrom: "#d9a72e",
      tailTo: "#f7dc82",
      accent: "#e3ba44",
      belly: "#fff0b8",
      glow: "#b98f2c",
      pattern: "twotone",
      patternColor: "#101114",
    },
  },
  {
    id: 10,
    name: "Ribbon Tail",
    slug: "ribbon-tail",
    description:
      "Unique tail formation with elongated, ribbon-like finnage and graceful swimming. Features distinctive tail shape that sets them apart from standard varieties. Eye-catching movement in the aquarium.",
    category: "Tail Type",
    careLevel: "Intermediate",
    published: true,
    featured: false,
    line: "Tail Line",
    art: {
      bodyFrom: "#7a3d1f",
      bodyTo: "#e09a63",
      tailFrom: "#b25a2e",
      tailTo: "#f6c493",
      accent: "#d98a5a",
      belly: "#ffe4cc",
      glow: "#a8542f",
      pattern: "sheen",
    },
  },
];

export const categories = [
  "All Categories",
  "Solid Color",
  "Pattern",
  "Metallic",
  "Bi-Color",
  "Tail Type",
];

export function getVarietyBySlug(slug: string): GuppyVariety | undefined {
  return guppyVarieties.find((v) => v.slug === slug && v.published);
}

export function getFeaturedVarieties(): GuppyVariety[] {
  const featured = guppyVarieties.filter((v) => v.published && v.featured);
  return featured.length > 0 ? featured : guppyVarieties.filter((v) => v.published).slice(0, 4);
}

export function getRelatedVarieties(slug: string, count = 3): GuppyVariety[] {
  const current = getVarietyBySlug(slug);
  if (!current) return [];
  return guppyVarieties
    .filter((v) => v.published && v.slug !== slug && v.category === current.category)
    .concat(guppyVarieties.filter((v) => v.published && v.slug !== slug && v.category !== current.category))
    .slice(0, count);
}
