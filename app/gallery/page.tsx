import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery — Hatchery Photography & Videos | Sheferoy Guppy",
  description:
    "Browse the Sheferoy Guppy visual gallery — ornamental guppies, bettas, and authentic hatchery videos from our Kanyakumari farm.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery — Hatchery Photography & Videos | Sheferoy Guppy",
    description: "A visual walk through the collection — ornamental guppies, bettas, and authentic hatchery videos.",
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
        description="Authentic guppy bloodlines, hatchery videos, and botanical companions, presented in one place. Filter by category or select any exhibit to open the interactive viewer."
      />
      <GalleryGrid />

      <section className="border-t border-border bg-secondary/50 py-16 lg:py-20">
        <div className="mx-auto flex max-w-site flex-col items-center px-4 text-center sm:px-6 lg:px-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface border border-border text-brand shadow-sm">
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            Looking for a Particular Strain or Video?
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-body">
            Contact our breeding team directly on WhatsApp for live tank videos, current line availability, and breeding pair selections.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="https://wa.me/919489184047?text=Hi%20Sheferoy%20Guppy,%20I%20am%20interested%20in%20current%20fish%20availability"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-hover shadow-sm transition-all"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>WhatsApp: 94891 84047</span>
            </Link>
            <a
              href="tel:7358612156"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-heading hover:border-brand hover:text-brand shadow-sm transition-all"
            >
              <Phone className="h-4 w-4 text-brand" />
              <span>Call: 7358612156</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
