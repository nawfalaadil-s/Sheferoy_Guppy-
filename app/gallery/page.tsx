import type { Metadata } from "next";
import Link from "next/link";
import { Instagram } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery — Photos & Instagram Reels | Sheferoy Guppy",
  description:
    "Browse the Sheferoy Guppy visual gallery — ornamental guppies, bettas, and verified Instagram Reels from our Kanyakumari collection.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery — Photos & Reels | Sheferoy Guppy",
    description: "A visual walk through the collection — guppies, bettas, and authentic Instagram Reels.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visual Gallery"
        title={
          <>
            A Visual Walk Through{" "}
            <span className="font-display italic text-brand">
              the Collection
            </span>
          </>
        }
        description="Guppy bloodlines, authentic Instagram Reels, and botanical companions, presented in one place. Filter by category or select any exhibit to open the interactive viewer."
      />
      <GalleryGrid />

      <section className="border-t border-border bg-secondary/50 py-16 lg:py-20">
        <div className="mx-auto flex max-w-site flex-col items-center px-4 text-center sm:px-6 lg:px-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface border border-border text-brand shadow-sm">
            <Instagram className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            See new arrivals first on Instagram
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-body">
            Feeding sessions, fry updates, and new line reveals are shared daily at @sheferoyguppy.
          </p>
          <Link
            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/sheferoyguppy/"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-hover shadow-sm transition-all"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            Follow @sheferoyguppy
          </Link>
        </div>
      </section>
    </>
  );
}
