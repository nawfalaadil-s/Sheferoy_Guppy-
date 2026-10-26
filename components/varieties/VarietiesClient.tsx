"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, X, MessageCircle } from "lucide-react";
import { guppyVarieties, categories, type Variety } from "@/lib/varieties-data";

export default function VarietiesClient({ initialVarieties }: { initialVarieties?: Variety[] }) {
  const allVarieties = initialVarieties && initialVarieties.length > 0 ? initialVarieties : guppyVarieties;
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    if (urlCategory && (urlCategory === "Guppies" || urlCategory === "Bettas")) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

  const filteredVarieties = useMemo(() => {
    let filtered = allVarieties.filter((v) => v.published !== false);

    if (selectedCategory !== "All") {
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
  }, [searchQuery, selectedCategory, allVarieties]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <>
      {/* Search & Filter Bar */}
      <div className="sticky top-16 z-30 border-b border-border bg-white/95 backdrop-blur-md lg:top-[68px]">
        <div className="mx-auto max-w-site px-4 py-3.5 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-3.5 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full max-w-sm">
              <label htmlFor="variety-search" className="sr-only">
                Search varieties
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type="search"
                id="variety-search"
                className="w-full rounded-xl border border-border bg-page py-2 pl-10 pr-10 text-xs sm:text-sm text-heading placeholder:text-muted transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10 shadow-sm"
                placeholder="Search strain, betta or guppy…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:text-heading"
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
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-150 ${
                      active
                        ? "bg-brand text-white shadow-teal"
                        : "border border-border bg-page text-body hover:border-brand hover:text-brand"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="bg-page pb-24 pt-8">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between text-xs text-muted">
            <p role="status">
              Showing <strong className="text-charcoal font-semibold">{filteredVarieties.length}</strong> {filteredVarieties.length === 1 ? "variety" : "varieties"}
              {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}
              {searchQuery ? ` matching "${searchQuery}"` : ""}
            </p>
          </div>

          {filteredVarieties.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-border bg-white px-8 py-16 text-center shadow-card">
              <p className="font-display text-xl font-bold text-heading">No fish match that search</p>
              <p className="mx-auto mt-2 max-w-sm text-xs sm:text-sm text-body">
                Try searching for “Moscow”, “Betta”, “Dumbo”, or clear filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="btn-secondary mt-5 text-xs"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
              {filteredVarieties.map((variety: Variety) => {
                const whatsappUrl = `https://wa.me/919489184047?text=${encodeURIComponent(
                  `Hi Sheferoy Guppy, I am interested in ${variety.name}. Please share the current availability and price.`
                )}`;

                return (
                  <article
                    key={variety.id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card hover:shadow-card-hover transition-all duration-300"
                  >
                    {/* Photo with badges */}
                    <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
                      <Image
                        src={variety.image}
                        alt={`${variety.name} - ${variety.category} at Sheferoy Guppy`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                      />

                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
                        <span className="rounded-full border border-border/80 bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-charcoal shadow-sm backdrop-blur-sm">
                          {variety.category}
                        </span>
                        {variety.popular && (
                          <span className="rounded-full border border-gold-border bg-gold-light/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-dark shadow-sm backdrop-blur-sm">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <h2 className="font-display text-sm sm:text-base font-bold text-heading group-hover:text-brand transition-colors">
                          <Link href={`/varieties/${variety.slug}`}>
                            {variety.name}
                          </Link>
                        </h2>
                        <p className="mt-1 flex items-center gap-1.5 font-sans text-xs font-semibold text-success">
                          <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                          {variety.availability}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-border">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary w-full justify-center py-2 text-xs shadow-teal"
                          aria-label={`Enquire about ${variety.name} on WhatsApp`}
                        >
                          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          WhatsApp Enquiry
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
