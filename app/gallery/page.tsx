import type { Metadata } from "next";
import Link from "next/link";
import { Instagram } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery — Photos & Instagram Reels",
  description:
    "Browse the Sheferoy Guppy visual gallery — guppy bloodlines, verified Instagram Reels, and live aquatic plants from our Kanyakumari collection. Official media published directly from the breeding room.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery — Photos & Reels | Sheferoy Guppy",
    description: "A visual walk through the collection — guppy lines, real Instagram Reels, and botanical companions.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={
          <>
            A Visual Walk Through{" "}
            <span className="font-display italic text-gold-light">the Collection</span>
          </>
        }
        description="Guppy bloodlines, authentic Instagram Reels, and botanical companions, presented in one place. Filter by category or select any piece to open the interactive viewer."
      />
      <GalleryGrid />

      <section className="border-t border-white/5 bg-abyss py-16 lg:py-20">
        <div className="mx-auto flex max-w-site flex-col items-center px-4 text-center sm:px-6 lg:px-10">
          <Instagram className="h-8 w-8 text-gold" aria-hidden="true" />
          <h2 className="display-3 mt-5 text-ivory">See new arrivals first on Instagram</h2>
          <p className="lede mx-auto mt-3 max-w-md">
            Feeding sessions, fry updates and new line reveals are shared daily at @sheferoyguppy.
          </p>
          <Link
            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/sheferoyguppy/"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-8"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            Follow @sheferoyguppy
          </Link>
        </div>
      </section>
    </>
  );
}
