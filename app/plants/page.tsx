import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import PlantsClient from "@/components/plants/PlantsClient";

export const metadata: Metadata = {
  title: "Live Aquatic Plants — Guppy Grass, Vallisneria & More",
  description:
    "Explore live aquatic plants from Sheferoy Guppy, Kanyakumari, Tamil Nadu — Guppy Grass, Vallisneria spiralis, Pennywort, Foxtail, Dwarf Water Lettuce and Duckweed with care guidance.",
  keywords: [
    "live aquatic plants",
    "aquarium plants Tamil Nadu",
    "guppy grass for aquariums",
    "Vallisneria spiralis",
    "floating aquarium plants",
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

export default function PlantsPage() {
  return (
    <>
      <PageHeader
        tone="moss"
        eyebrow="Botanical Collection"
        title={
          <>
            Living Greenery for{" "}
            <span className="font-display italic text-moss-light">Your Aquascape</span>
          </>
        }
        description="A considered collection of submerged and floating plants — chosen for guppy aquariums, easy care and natural water balance."
      />
      <PlantsClient />
    </>
  );
}
