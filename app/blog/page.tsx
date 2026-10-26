import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import BlogClient, { type UnifiedBlogPost } from "@/components/blog/BlogClient";
import { getDbBlogPosts } from "@/lib/database-service";
import { blogPosts } from "@/lib/blog-data";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "The Journal — Guppy Care, Breeding & Aquarium Notes | Sheferoy Guppy",
  description:
    "Educational articles on guppy care, breeding, feeding, water quality and aquarium setup — written for hobbyists by the Sheferoy Guppy hatchery in Kanyakumari, Tamil Nadu.",
  keywords: ["guppy care", "guppy breeding", "aquarium tips", "fish care", "water quality", "Sheferoy Guppy"],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "The Journal | Sheferoy Guppy",
    description: "Educational articles on guppy care, breeding and aquarium keeping.",
    url: "/blog",
  },
};

export default async function BlogPage() {
  let initialPosts: UnifiedBlogPost[] = blogPosts;
  try {
    const dbPosts = await getDbBlogPosts(true);
    if (dbPosts && dbPosts.length > 0) {
      initialPosts = dbPosts;
    }
  } catch {
    initialPosts = blogPosts;
  }

  return (
    <>
      <PageHeader
        eyebrow="The Journal"
        title={
          <>
            Notes on Guppies,{" "}
            <span className="font-display italic text-brand">Water &amp; Patience</span>
          </>
        }
        description="Practical, honest guidance for ornamental fish keeping — from tank setup to breeding lines. Field knowledge directly from our Kanyakumari breeding rooms."
      />
      <BlogClient initialPosts={initialPosts} />
    </>
  );
}
