import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import PlantArt from "@/components/art/PlantArt";
import Reveal from "@/components/ui/Reveal";
import { getFeaturedPlants } from "@/lib/plants-data";

export default function LivePlantsSection() {
  const featured = getFeaturedPlants().slice(0, 6);

  return (
    <section
      className="grain relative border-y border-moss/20 bg-gradient-to-b from-[#0b1410] via-[#0c1211] to-obsidian py-20 lg:py-28"
      aria-labelledby="plants-heading"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-editorial text-moss-light">
                <span className="inline-block h-px w-8 bg-moss-light/60" aria-hidden="true" />
                Live Aquatic Plants
              </p>
              <h2 id="plants-heading" className="display-2 mt-4 text-ivory">
                Bring Your Aquarium <span className="font-display italic text-moss-light">to Life</span>
              </h2>
              <p className="lede mt-4">
                From lush greenery to floating plants — a botanical collection that adds natural
                beauty, shelter and balance to your aquarium.
              </p>
            </div>
            <Link
              href="/plants"
              className="btn-moss shrink-0 border-moss-light/40 px-6 py-3 text-[11px]"
            >
              <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
              Explore Live Plants
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((plant, i) => (
            <Reveal key={plant.id} delay={(i % 3) * 100}>
              <Link
                href={`/plants/${plant.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-moss/20 bg-[#0d1613]/80 transition-all duration-500 ease-luxe hover:border-moss-light/40 hover:bg-[#101b17]"
              >
                <div className="relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-[radial-gradient(75%_75%_at_50%_45%,rgba(95,158,110,0.16)_0%,rgba(9,11,13,0)_70%)]"
                    aria-hidden="true"
                  />
                  <PlantArt
                    type={plant.art}
                    className="relative left-1/2 h-auto w-[62%] -translate-x-1/2 transition-transform duration-700 ease-luxe group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-6 pb-6">
                  <h3 className="font-display text-2xl text-ivory transition-colors group-hover:text-moss-light">
                    {plant.name}
                  </h3>
                  {plant.scientificName && (
                    <p className="mt-0.5 font-display text-sm italic text-moss-light/70">
                      {plant.scientificName}
                    </p>
                  )}
                  <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-mist">
                    {plant.shortDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-moss-light/80 transition-colors group-hover:text-moss-light">
                    View plant
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
