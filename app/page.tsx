import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedVarieties from "@/components/home/FeaturedVarieties";
import AboutSection from "@/components/home/AboutSection";
import SeoContentSection from "@/components/home/SeoContentSection";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "Sheferoy Guppy | Ornamental Guppies & Bettas",
  description:
    "Explore ornamental guppies, colourful bettas, and selected breeding pairs at Sheferoy Guppy. Contact us for current fish availability and pricing.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sheferoy Guppy | Ornamental Guppies & Bettas",
    description:
      "Explore ornamental guppies, colourful bettas, and selected breeding pairs at Sheferoy Guppy. Contact us for current fish availability and pricing.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedVarieties />
      <AboutSection />
      <SeoContentSection />
      <ContactCTA />
    </>
  );
}
