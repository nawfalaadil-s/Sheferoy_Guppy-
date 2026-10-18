"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import PlantArt from "@/components/art/PlantArt";
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
      <div className="border-b border-moss/15 bg-obsidian">
        <div className="mx-auto max-w-site px-4 py-5 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <label htmlFor="plant-search" className="sr-only">
                Search plants
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/40" aria-hidden="true" />
              <input
                type="search"
                id="plant-search"
                className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-10 text-sm text-ivory placeholder:text-ivory/35 transition-colors focus:border-moss-light/60 focus:outline-none focus:ring-2 focus:ring-moss/25"
                placeholder="Search plants…"
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
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-ivory/45" role="status">
              {filteredPlants.length} {filteredPlants.length === 1 ? "plant" : "plants"} in the botanical collection
            </p>
          </div>
        </div>
      </div>

      <div className="bg-obsidian pb-24 pt-12">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          {filteredPlants.length === 0 ? (
            <div className="rounded-3xl border border-moss/20 bg-[#0d1613] px-8 py-20 text-center">
              <p className="font-display text-3xl text-ivory">No plants match that search.</p>
              <p className="mx-auto mt-3 max-w-sm text-sm text-mist">
                Try another name, or clear the search to see the whole collection.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="btn-moss mt-8"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPlants.map((plant) => (
                <article
                  key={plant.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-moss/20 bg-[#0d1613]/80 transition-all duration-500 ease-luxe hover:border-moss-light/45 hover:bg-[#101b17] hover:shadow-[0_30px_60px_-30px_rgba(95,158,110,0.35)]"
                >
                  <div className="relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-[radial-gradient(75%_75%_at_50%_45%,rgba(95,158,110,0.16)_0%,rgba(9,11,13,0)_70%)]"
                      aria-hidden="true"
                    />
                    <PlantArt
                      type={plant.art}
                      className="relative left-1/2 h-auto w-[60%] -translate-x-1/2 transition-transform duration-700 ease-luxe group-hover:scale-[1.05]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-6 pb-6">
                    <h2 className="font-display text-2xl text-ivory">
                      <Link href={`/plants/${plant.slug}`} className="transition-colors hover:text-moss-light">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {plant.name}
                      </Link>
                    </h2>
                    {plant.scientificName && (
                      <p className="mt-0.5 font-display text-sm italic text-moss-light/70">{plant.scientificName}</p>
                    )}
                    <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-mist">
                      {plant.shortDescription}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-moss-light/75">
                        {plant.careInformation?.difficulty.split("—")[0].trim() ?? "Live plant"}
                      </span>
                      <WhatsAppButton variety={plant.name} variant="link" className="relative z-10 text-moss-light hover:text-moss-light/80">
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
