import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import VarietiesClient from "@/components/varieties/VarietiesClient";

export const metadata: Metadata = {
  title: "Guppy Varieties — 65+ Ornamental Bloodlines",
  description:
    "Explore 65+ premium guppy varieties from Sheferoy Guppy, Kanyakumari, Tamil Nadu. Browse solid colors, patterns, metallic strains, and unique tail lines with safe pan-India shipping.",
  keywords: ["guppy varieties", "ornamental guppies", "guppy strains", "guppy breeder Tamil Nadu", "aquarium fish India"],
  alternates: { canonical: "/varieties" },
  openGraph: {
    title: "Guppy Varieties | Sheferoy Guppy",
    description:
      "Explore 65+ premium guppy varieties from Sheferoy Guppy — solid colors, patterns, metallic strains and tail lines.",
    url: "/varieties",
  },
};

export default function VarietiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Collection"
        title={
          <>
            Sixty-Five Varieties.{" "}
            <span className="font-display italic text-gold-light">One Standard.</span>
          </>
        }
        description="Every line in the collection is raised in Kanyakumari and selected for colour depth, finnage and vigour. Explore the catalogue, then enquire about the lines that speak to you."
      />
      <VarietiesClient />
    </>
  );
}
