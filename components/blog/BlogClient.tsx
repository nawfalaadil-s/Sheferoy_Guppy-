"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { blogPosts, blogCategories } from "@/lib/blog-data";

export interface UnifiedBlogPost {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  author?: string;
  publishedAt?: string;
  published_at?: string;
  published?: boolean;
  is_published?: boolean;
  readTime?: string;
  read_time?: string;
}

export default function BlogClient({ initialPosts }: { initialPosts?: UnifiedBlogPost[] }) {
  const allPosts = initialPosts && initialPosts.length > 0 ? initialPosts : blogPosts;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredPosts = useMemo(() => {
    let filtered = allPosts.filter((p) => p.published !== false && p.is_published !== false);

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.published_at || b.publishedAt || 0).getTime() -
        new Date(a.published_at || a.publishedAt || 0).getTime()
    );
  }, [searchQuery, selectedCategory, allPosts]);

  return (
    <>
      {/* Filter bar */}
      <div className="sticky top-16 z-30 border-b border-border bg-page/95 backdrop-blur-md lg:top-[72px]">
        <div className="mx-auto max-w-site px-4 py-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-sm">
              <label htmlFor="journal-search" className="sr-only">
                Search articles
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type="search"
                id="journal-search"
                className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-10 text-sm text-heading placeholder:text-muted transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10 shadow-sm"
                placeholder="Search articles…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted transition-colors hover:text-heading"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
              {blogCategories.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                      active
                        ? "border-brand bg-brand text-white shadow-sm font-bold"
                        : "border-border text-body hover:border-brand/40 hover:text-brand bg-surface"
                    }`}
                  >
                    {category === "All Categories" ? "All Topics" : category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="bg-page pb-24 pt-10">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          {filteredPosts.length === 0 ? (
            <div className="rounded-3xl border border-border bg-surface px-8 py-20 text-center shadow-card">
              <p className="font-display text-2xl font-bold text-heading">Nothing on this shelf yet.</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-body">
                Try another topic, or clear the filters to browse the full journal.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                }}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-brand-hover shadow-sm transition-all"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post, i) => (
                <article
                  key={post.id}
                  className="group relative grid gap-6 rounded-2xl border border-border bg-surface p-6 shadow-card hover:shadow-card-hover transition-all duration-300 lg:grid-cols-12 lg:items-center lg:p-8"
                >
                  <div className="lg:col-span-1">
                    <span className="font-mono text-3xl font-bold text-brand/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="lg:col-span-7">
                    <span className="rounded-full bg-secondary px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-brand border border-border">
                      {post.category}
                    </span>
                    <h2 className="mt-3 font-display text-xl sm:text-2xl font-bold leading-snug text-heading group-hover:text-brand transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0" aria-hidden="true" />
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-body">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 lg:col-span-4 lg:justify-end text-xs text-muted">
                    <time dateTime={post.published_at || post.publishedAt || ""}>
                      {new Date(post.published_at || post.publishedAt || Date.now()).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                    <span>·</span>
                    <span>{post.read_time || post.readTime || "5 min read"}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
