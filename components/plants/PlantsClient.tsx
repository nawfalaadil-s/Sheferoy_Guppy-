"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { plants } from "@/lib/plants-data";

export default function PlantsClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlants = useMemo(() => {
    let filtered = plants.filter((p) => p.published);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.scientificName?.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [searchQuery]);

  return (
    <>
      {/* Search & Counter Bar */}
      <div className="border-b border-border bg-page">
        <div className="mx-auto max-w-site px-4 py-5 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <label htmlFor="plant-search" className="sr-only">
                Search plants
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type="search"
                id="plant-search"
                className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-10 text-sm text-heading placeholder:text-muted transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10 shadow-sm"
                placeholder="Search plants…"
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
            <p className="font-sans text-xs uppercase tracking-wider text-muted" role="status">
              {filteredPlants.length} {filteredPlants.length === 1 ? "plant" : "plants"} in the botanical collection
            </p>
          </div>
        </div>
      </div>

      <div className="bg-page pb-24 pt-10">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          {filteredPlants.length === 0 ? (
            <div className="rounded-3xl border border-border bg-surface px-8 py-20 text-center shadow-card">
              <p className="font-display text-2xl font-bold text-heading">No plants match that search.</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-body">
                Try another name, or clear the search to see the whole collection.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-brand-hover shadow-sm transition-all"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPlants.map((plant) => (
                <article
                  key={plant.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                    <Image
                      src={plant.image}
                      alt={plant.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-display text-xl font-bold text-heading group-hover:text-brand transition-colors">
                      <Link href={`/plants/${plant.slug}`}>
                        {plant.name}
                      </Link>
                    </h2>
                    {plant.scientificName && (
                      <p className="mt-1 text-xs italic text-brand/80">{plant.scientificName}</p>
                    )}
                    <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-body">
                      {plant.shortDescription}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <span className="rounded-full border border-border bg-secondary px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-brand">
                        {plant.careInformation?.difficulty.split("—")[0].trim() ?? "Live plant"}
                      </span>
                      <WhatsAppButton variety={plant.name} variant="link" className="text-xs font-semibold uppercase tracking-wider text-brand hover:text-brand-hover hover:underline">
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
