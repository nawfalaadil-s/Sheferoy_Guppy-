import { Suspense } from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import VarietiesClient from "@/components/varieties/VarietiesClient";
import { getDbVarieties } from "@/lib/database-service";
import { guppyVarieties, type Variety } from "@/lib/varieties-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Ornamental Guppies & Bettas — Pure Bloodlines | Sheferoy Guppy",
  description:
    "Explore premium ornamental guppies, bettas, and breeding pairs from Sheferoy Guppy, Kanyakumari, Tamil Nadu.",
  keywords: ["guppy varieties", "ornamental guppies", "bettas India", "Sheferoy Guppy", "guppy breeder Tamil Nadu", "aquarium fish India"],
  alternates: { canonical: "/varieties" },
  openGraph: {
    title: "Guppy Varieties & Bettas | Sheferoy Guppy",
    description:
      "Explore premium ornamental guppies, bettas, and breeding pairs from Sheferoy Guppy.",
    url: "/varieties",
  },
};

export default async function VarietiesPage() {
  let initialVarieties: Variety[] = guppyVarieties;
  try {
    const dbVarieties = await getDbVarieties(true);
    if (dbVarieties && dbVarieties.length > 0) {
      initialVarieties = dbVarieties as unknown as Variety[];
    }
  } catch {
    initialVarieties = guppyVarieties;
  }

  return (
    <>
      <PageHeader
        eyebrow="The Collection"
        title={
          <>
            Ornamental Strains.{" "}
            <span className="font-display italic text-brand">Exceptional Purity.</span>
          </>
        }
        description="Every line in the collection is raised in Kanyakumari and selected for colour depth, finnage and vigour. Explore the catalogue, then enquire about the lines that speak to you."
      />
      <Suspense
        fallback={
          <div className="container-custom py-16 text-center text-body">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand border-r-transparent align-[-0.125em]" />
            <p className="mt-4 text-sm font-medium">Loading collection...</p>
          </div>
        }
      >
        <VarietiesClient initialVarieties={initialVarieties} />
      </Suspense>
    </>
  );
}
