import Hero from "@/components/home/Hero";
import StatsStrip from "@/components/home/StatsStrip";
import FeaturedVarieties from "@/components/home/FeaturedVarieties";
import BrandStory from "@/components/home/BrandStory";
import GalleryPreview from "@/components/home/GalleryPreview";
import LivePlantsSection from "@/components/home/LivePlantsSection";
import InstagramShowcase from "@/components/home/InstagramShowcase";
import BlogPreview from "@/components/home/BlogPreview";
import OffersPreview from "@/components/home/OffersPreview";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeaturedVarieties />
      <BrandStory />
      <GalleryPreview />
      <LivePlantsSection />
      <InstagramShowcase />
      <BlogPreview />
      <OffersPreview />
      <ContactCTA />
    </>
  );
}
