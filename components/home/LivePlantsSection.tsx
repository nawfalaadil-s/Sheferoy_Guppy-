"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, SunMedium, Gauge } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { getFeaturedPlants } from "@/lib/plants-data";

export default function LivePlantsSection() {
  const featured = getFeaturedPlants().slice(0, 6);

  return (
    <section
      className="relative overflow-hidden bg-secondary/60 py-16 sm:py-20 lg:py-24 border-y border-border"
      aria-labelledby="plants-heading"
    >
      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-success-light px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-success shadow-subtle">
                <Leaf className="h-3.5 w-3.5" />
                Live Aquatic Flora
              </div>
              <h2 id="plants-heading" className="mt-4 font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl lg:text-5xl">
                Natural Botanicals for{" "}
                <span className="text-brand">
                  Thriving Aquariums
                </span>
              </h2>
              <p className="mt-3 text-base text-body sm:text-lg leading-relaxed">
                Pest-free, snail-free aquatic plants carefully propagated to oxygenate tanks, absorb nitrates, and provide vital cover for guppy fry.
              </p>
            </div>

            <Link
              href="/plants"
              className="btn-secondary text-sm px-5 py-2.5 shadow-subtle"
            >
              <Leaf className="h-4 w-4 text-brand" />
              Explore All Plants
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((plant, i) => (
            <Reveal key={plant.id} delay={(i % 3) * 60}>
              <Link
                href={`/plants/${plant.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-all duration-300 hover:border-brand/40 hover:shadow-card-hover"
              >
                {/* Photo window */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
                  <Image
                    src={plant.image || "/images/plants/pennywort.jpg"}
                    alt={plant.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />

                  {/* Placement badge */}
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full border border-white/60 bg-white/95 px-2.5 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-brand shadow-sm backdrop-blur-sm">
                      {plant.careInformation?.placement.split(",")[0] || "Aquarium"}
                    </span>
                  </div>

                  {/* Growth badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-charcoal">
                    <span className="flex items-center gap-1 rounded bg-white/95 px-2 py-0.5 font-sans text-[11px] font-medium shadow-sm border border-border/50">
                      <Gauge className="h-3 w-3 text-brand" />
                      {plant.careInformation?.growth.split("—")[0].trim() || "Moderate"} Growth
                    </span>
                    <span className="flex items-center gap-1 rounded bg-white/95 px-2 py-0.5 font-sans text-[11px] font-medium shadow-sm border border-border/50">
                      <SunMedium className="h-3 w-3 text-gold" />
                      {plant.careInformation?.difficulty || "Easy"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-bold text-charcoal group-hover:text-brand transition-colors">
                    {plant.name}
                  </h3>
                  {plant.scientificName && (
                    <p className="mt-0.5 text-xs italic text-brand font-medium">{plant.scientificName}</p>
                  )}
                  <p className="mt-2.5 line-clamp-2 flex-1 font-sans text-xs leading-relaxed text-body">
                    {plant.shortDescription}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="rounded-full border border-emerald-200 bg-success-light px-2.5 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-success">
                      {plant.careInformation?.difficulty.split("—")[0].trim() || "Live Plant"}
                    </span>
                    <span className="inline-flex items-center gap-1 font-sans text-xs font-bold text-brand group-hover:text-brand-hover">
                      View Botanical Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
