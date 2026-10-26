import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedVarieties from "@/components/home/FeaturedVarieties";
import AboutSection from "@/components/home/AboutSection";
import SeoContentSection from "@/components/home/SeoContentSection";
import ContactCTA from "@/components/home/ContactCTA";
import { getHomepageContent } from "@/lib/cms-service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

export default async function HomePage() {
  const content = await getHomepageContent();

  return (
    <>
      <Hero content={content.hero} />
      <FeaturedVarieties content={content.featured} />
      <AboutSection content={content.about} />
      <SeoContentSection content={content.seo} />
      <ContactCTA content={content.contact} />
    </>
  );
}
