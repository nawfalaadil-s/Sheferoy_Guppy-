import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import BlogClient from "@/components/blog/BlogClient";

export const metadata: Metadata = {
  title: "The Journal — Guppy Care, Breeding & Aquarium Notes",
  description:
    "Educational articles on guppy care, breeding, feeding, water quality and aquarium setup — written for hobbyists by the Sheferoy Guppy studio in Kanyakumari, Tamil Nadu.",
  keywords: ["guppy care", "guppy breeding", "aquarium tips", "fish care", "water quality", "guppy varieties"],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "The Journal | Sheferoy Guppy",
    description: "Educational articles on guppy care, breeding and aquarium keeping.",
    url: "/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Journal"
        title={
          <>
            Notes on Guppies,{" "}
            <span className="font-display italic text-gold-light">Water & Patience</span>
          </>
        }
        description="Practical, honest guidance for ornamental fish keeping — from tank setup to breeding lines. New articles are reviewed by the studio before publishing."
      />
      <BlogClient />
    </>
  );
}
