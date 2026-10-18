"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { blogPosts, blogCategories } from "@/lib/blog-data";

export default function BlogClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts.filter((p) => p.published);

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
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [searchQuery, selectedCategory]);

  return (
    <>
      {/* Filter bar */}
      <div className="sticky top-16 z-30 border-b border-gold/10 bg-obsidian/90 backdrop-blur-md lg:top-[72px]">
        <div className="mx-auto max-w-site px-4 py-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-sm">
              <label htmlFor="journal-search" className="sr-only">
                Search articles
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/40" aria-hidden="true" />
              <input
                type="search"
                id="journal-search"
                className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-10 text-sm text-ivory placeholder:text-ivory/35 transition-colors focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20"
                placeholder="Search articles…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ivory/40 transition-colors hover:text-ivory"
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
                    className={`rounded-full border px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                      active
                        ? "border-gold bg-gold text-obsidian"
                        : "border-white/10 text-ivory/60 hover:border-gold/40 hover:text-gold-light"
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
      <div className="bg-obsidian pb-24 pt-12">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          {filteredPosts.length === 0 ? (
            <div className="rounded-3xl border border-gold/10 bg-abyss px-8 py-20 text-center">
              <p className="font-display text-3xl text-ivory">Nothing on this shelf yet.</p>
              <p className="mx-auto mt-3 max-w-sm text-sm text-mist">
                Try another topic, or clear the filters to browse the full journal.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                }}
                className="btn-gold mt-8"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredPosts.map((post, i) => (
                <article
                  key={post.id}
                  className="group relative grid gap-6 rounded-2xl border border-gold/10 bg-abyss/70 p-6 transition-all duration-500 ease-luxe hover:border-gold/30 hover:bg-abyss lg:grid-cols-12 lg:items-center lg:p-8"
                >
                  <div className="lg:col-span-1">
                    <span className="font-display text-4xl text-gold/45">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                      {post.category}
                    </p>
                    <h2 className="mt-2 font-display text-3xl leading-snug text-ivory">
                      <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-gold-light">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-mist">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 lg:col-span-4 lg:justify-end">
                    <time
                      dateTime={post.publishedAt}
                      className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory/45"
                    >
                      {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                    <span className="text-ivory/20" aria-hidden="true">
                      ·
                    </span>
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory/45">
                      {post.readTime}
                    </span>
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
