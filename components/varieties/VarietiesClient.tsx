"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import GuppyArt from "@/components/art/GuppyArt";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { guppyVarieties, categories } from "@/lib/varieties-data";

export default function VarietiesClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredVarieties = useMemo(() => {
    let filtered = guppyVarieties.filter((v) => v.published);

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((v) => v.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
  };

  return (
    <>
      {/* Filter bar */}
      <div className="sticky top-16 z-30 border-b border-gold/10 bg-obsidian/90 backdrop-blur-md lg:top-[72px]">
        <div className="mx-auto max-w-site px-4 py-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-sm">
              <label htmlFor="variety-search" className="sr-only">
                Search varieties
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/40" aria-hidden="true" />
              <input
                type="search"
                id="variety-search"
                className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-10 text-sm text-ivory placeholder:text-ivory/35 transition-colors focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20"
                placeholder="Search by name or trait…"
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

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {categories.map((category) => {
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
                    {category === "All Categories" ? "All" : category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-obsidian pb-24 pt-10">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-ivory/45" role="status">
            {filteredVarieties.length}{" "}
            {filteredVarieties.length === 1 ? "variety" : "varieties"} on display
            {selectedCategory !== "All Categories" ? ` · ${selectedCategory}` : ""}
            {searchQuery ? ` · “${searchQuery}”` : ""}
          </p>

          {filteredVarieties.length === 0 ? (
            <div className="mt-16 rounded-3xl border border-gold/10 bg-abyss px-8 py-20 text-center">
              <p className="font-display text-3xl text-ivory">No specimens match that search.</p>
              <p className="mx-auto mt-3 max-w-sm text-sm text-mist">
                Try a different name or clear the filters to see the full collection.
              </p>
              <button type="button" onClick={clearFilters} className="btn-gold mt-8">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredVarieties.map((variety) => (
                <article
                  key={variety.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-gold/10 bg-gradient-to-b from-ink to-abyss transition-all duration-500 ease-luxe hover:border-gold/30 hover:shadow-[0_30px_60px_-30px_rgba(199,164,90,0.3)]"
                >
                  <div className="relative">
                    <div
                      className="absolute inset-0 bg-[radial-gradient(80%_80%_at_60%_42%,rgba(199,164,90,0.09)_0%,rgba(9,11,13,0)_65%)]"
                      aria-hidden="true"
                    />
                    <GuppyArt
                      colorway={variety.art}
                      className="pointer-events-none absolute left-1/2 top-1/2 h-auto w-[126%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-luxe group-hover:-translate-y-[53%] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" aria-hidden="true" />
                    <div className="relative aspect-[4/3]" aria-hidden="true" />
                  </div>

                  <div className="relative -mt-12 flex flex-1 flex-col p-6">
                    <p className="eyebrow">{variety.line}</p>
                    <h2 className="display-3 mt-2 text-ivory">
                      <Link href={`/varieties/${variety.slug}`} className="transition-colors hover:text-gold-light">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {variety.name}
                      </Link>
                    </h2>
                    <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-mist">
                      {variety.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory/45">
                        {variety.careLevel} care
                      </span>
                      <WhatsAppButton variety={`${variety.name} guppy`} variant="link" className="relative z-10">
                        Enquire
                      </WhatsAppButton>
                    </div>
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
