export type PlantArtType =
  | "pennywort"
  | "vallisneria"
  | "foxtail"
  | "guppy-grass"
  | "water-lettuce"
  | "duckweed";

export interface Plant {
  id: number | string;
  name: string;
  slug: string;
  scientificName?: string;
  scientific_name?: string;
  shortDescription: string;
  short_description?: string;
  description: string;
  art?: PlantArtType;
  image: string;
  careInformation?: {
    lighting: string;
    growth: string;
    difficulty: string;
    placement: string;
  };
  care_lighting?: string;
  care_growth?: string;
  care_difficulty?: string;
  care_placement?: string;
  aquariumUses?: string[];
  aquarium_uses?: string[];
  isFeatured?: boolean;
  is_featured?: boolean;
  published?: boolean;
  is_published?: boolean;
}

export const plants: Plant[] = [
  {
    id: 1,
    name: "Pennywort",
    slug: "pennywort",
    scientificName: "Hydrocotyle leucocephala",
    shortDescription:
      "Fast-growing stem plant with round, coin-shaped leaves that create a lush aquatic carpet.",
    description:
      "Pennywort is a popular aquarium plant known for its rapid growth and attractive round leaves. This versatile plant can be grown as a floating plant or rooted in substrate. Its bright green foliage adds natural beauty to any aquarium setup and provides excellent cover for fish fry. Pennywort is hardy and adaptable, making it suitable for both beginners and experienced aquarists.",
    art: "pennywort",
    image: "/images/plants/pennywort.jpg",
    careInformation: {
      lighting: "Low to High — adapts to various conditions",
      growth: "Fast — regular trimming recommended",
      difficulty: "Easy — suitable for beginners",
      placement: "Background, midground, or floating",
    },
    aquariumUses: ["Natural aquascaping", "Fry protection and hiding spots", "Nutrient absorption", "Oxygenation"],
    isFeatured: true,
    published: true,
  },
  {
    id: 2,
    name: "Vallisneria spiralis",
    slug: "vallisneria-spiralis",
    scientificName: "Vallisneria spiralis",
    shortDescription:
      "Classic background plant with long, ribbon-like leaves that create elegant vertical lines.",
    description:
      "Vallisneria spiralis is a hardy aquarium plant featuring long, tape-like leaves that grow from a rosette base. This plant is excellent for creating natural-looking backgrounds in aquariums. It spreads through runners and can quickly fill empty spaces. Vallisneria is highly tolerant of various water conditions and provides excellent habitat for guppies and other small fish.",
    art: "vallisneria",
    image: "/images/plants/vallisneria.jpg",
    careInformation: {
      lighting: "Low to Moderate — tolerates lower light levels",
      growth: "Moderate to Fast — spreads via runners",
      difficulty: "Easy — very hardy and adaptable",
      placement: "Background",
    },
    aquariumUses: ["Background planting", "Natural filtration", "Shelter for fish", "Low-maintenance aquascaping"],
    isFeatured: true,
    published: true,
  },
  {
    id: 3,
    name: "Foxtail",
    slug: "foxtail",
    scientificName: "Myriophyllum aquaticum",
    shortDescription:
      "Feathery stem plant with delicate, bushy foliage that adds texture to aquarium layouts.",
    description:
      "Foxtail is a beautiful aquatic plant with fine, feather-like leaves arranged along upright stems. The plant creates a soft, bushy appearance that provides excellent visual interest and natural habitat. Foxtail is particularly effective in guppy tanks, offering hiding places for fry while maintaining an attractive aesthetic. This plant benefits from regular pruning to maintain its shape.",
    art: "foxtail",
    image: "/images/plants/foxtail.jpg",
    careInformation: {
      lighting: "Moderate to High — requires adequate lighting",
      growth: "Fast — responds well to nutrient-rich conditions",
      difficulty: "Moderate — needs regular maintenance",
      placement: "Background or midground",
    },
    aquariumUses: ["Dense planting for fry protection", "Adding texture and depth", "Nutrient uptake", "Creating natural biotopes"],
    isFeatured: true,
    published: true,
  },
  {
    id: 4,
    name: "Guppy Grass",
    slug: "guppy-grass",
    scientificName: "Najas guadalupensis",
    shortDescription:
      "Essential plant for guppy breeders, providing excellent cover for fry and natural filtration.",
    description:
      "Guppy Grass is a fast-growing, bushy aquatic plant that is indispensable for guppy breeding. Its dense, fine foliage creates perfect hiding spots for newborn fry, significantly improving survival rates. This plant is extremely hardy and can thrive in a wide range of conditions. Guppy Grass also acts as a natural water filter, absorbing excess nutrients and improving water quality.",
    art: "guppy-grass",
    image: "/images/plants/guppy-grass.jpg",
    careInformation: {
      lighting: "Low to High — very adaptable",
      growth: "Very Fast — may require frequent trimming",
      difficulty: "Very Easy — nearly indestructible",
      placement: "Floating or planted in any position",
    },
    aquariumUses: ["Fry protection in breeding tanks", "Natural water filtration", "Quick greenery establishment", "Nutrient competition with algae"],
    isFeatured: true,
    published: true,
  },
  {
    id: 5,
    name: "Dwarf Water Lettuce",
    slug: "dwarf-water-lettuce",
    scientificName: "Pistia stratiotes (dwarf variety)",
    shortDescription:
      "Compact floating plant with attractive rosette formation that provides surface cover and shade.",
    description:
      "Dwarf Water Lettuce is a smaller variety of the popular floating plant, perfect for smaller aquariums. Its rosettes of pale green leaves float gracefully on the water surface, creating natural shade and reducing algae growth. The dangling roots provide hiding places for fish and fry. This plant is excellent for guppy tanks, as it mimics their natural habitat and helps maintain water quality.",
    art: "water-lettuce",
    image: "/images/plants/water-lettuce.jpg",
    careInformation: {
      lighting: "Moderate to High — requires good lighting to thrive",
      growth: "Fast — reproduces quickly through offshoots",
      difficulty: "Easy — minimal care required",
      placement: "Floating on water surface",
    },
    aquariumUses: ["Surface coverage and shade", "Algae prevention", "Fry shelter in root systems", "Natural water quality improvement"],
    isFeatured: true,
    published: true,
  },
  {
    id: 6,
    name: "Duckweed",
    slug: "duckweed",
    scientificName: "Lemna minor",
    shortDescription:
      "Tiny floating plant that forms a green carpet on the water surface, excellent for nutrient absorption.",
    description:
      "Duckweed is one of the smallest flowering plants, forming a dense green carpet on the aquarium surface. While it grows prolifically, it provides numerous benefits including nutrient absorption, water quality improvement, and natural shade. The tiny plants create a natural environment that guppies enjoy, though growth should be monitored to prevent complete surface coverage that could block light to lower plants.",
    art: "duckweed",
    image: "/images/plants/duckweed.jpg",
    careInformation: {
      lighting: "Low to High — grows in various conditions",
      growth: "Very Fast — doubles population rapidly",
      difficulty: "Very Easy — extremely hardy",
      placement: "Floating on water surface",
    },
    aquariumUses: ["Rapid nutrient absorption", "Natural surface cover", "Food source for some fish", "Algae competition"],
    isFeatured: false,
    published: true,
  },
];

export function getPlantBySlug(slug: string): Plant | undefined {
  return plants.find((p) => p.slug === slug && p.published);
}

export function getFeaturedPlants(): Plant[] {
  return plants.filter((p) => p.published && p.isFeatured);
}

export function getRelatedPlants(slug: string, count = 3): Plant[] {
  return plants.filter((p) => p.published && p.slug !== slug).slice(0, count);
}

export function searchPlants(query: string): Plant[] {
  const q = query.toLowerCase();
  return plants.filter(
    (p) =>
      p.published &&
      (p.name.toLowerCase().includes(q) ||
        p.scientificName?.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q))
  );
}
