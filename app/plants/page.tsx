import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import PlantsClient, { type UnifiedPlant } from "@/components/plants/PlantsClient";
import { getDbPlants } from "@/lib/database-service";
import { plants } from "@/lib/plants-data";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Live Aquatic Plants — Guppy Grass, Vallisneria & More | Sheferoy Guppy",
  description:
    "Explore live aquatic plants from Sheferoy Guppy, Kanyakumari, Tamil Nadu — Guppy Grass, Vallisneria spiralis, Pennywort, Foxtail, Dwarf Water Lettuce and Duckweed with care guidance.",
  keywords: [
    "live aquatic plants",
    "aquarium plants Tamil Nadu",
    "guppy grass for aquariums",
    "Vallisneria spiralis",
    "floating aquarium plants",
    "Sheferoy Guppy",
    "dwarf water lettuce",
    "pennywort aquarium plant",
  ],
  alternates: { canonical: "/plants" },
  openGraph: {
    title: "Live Aquatic Plants | Sheferoy Guppy",
    description:
      "Guppy Grass, Vallisneria, Pennywort, Foxtail, Dwarf Water Lettuce and Duckweed — live plants for guppy aquariums.",
    url: "/plants",
  },
};

export default async function PlantsPage() {
  let initialPlants: UnifiedPlant[] = plants;
  try {
    const dbPlants = await getDbPlants(true);
    if (dbPlants && dbPlants.length > 0) {
      initialPlants = dbPlants;
    }
  } catch {
    initialPlants = plants;
  }

  return (
    <>
      <PageHeader
        tone="emerald"
        eyebrow="Botanical Collection"
        title={
          <>
            Living Greenery for{" "}
            <span className="font-display italic text-brand">Your Aquascape</span>
          </>
        }
        description="A considered collection of submerged and floating plants — chosen for guppy aquariums, easy care and natural water balance."
      />
      <PlantsClient initialPlants={initialPlants} />
    </>
  );
}
