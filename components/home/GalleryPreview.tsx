import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GuppyArt from "@/components/art/GuppyArt";
import PlantArt from "@/components/art/PlantArt";
import Reveal from "@/components/ui/Reveal";
import { galleryItems } from "@/lib/gallery-data";
import { getVarietyBySlug } from "@/lib/varieties-data";
import { getPlantBySlug } from "@/lib/plants-data";

function GalleryTile({ id, className = "", delay = 0 }: { id: number; className?: string; delay?: number }) {
  const item = galleryItems.find((g) => g.id === id);
  if (!item) return null;

  const variety = item.kind === "guppy" ? getVarietyBySlug(item.varietySlug) : undefined;
  const plant = item.kind === "plant" ? getPlantBySlug(item.plantSlug) : undefined;
  if (!variety && !plant) return null;

  const targetHref =
    item.kind === "guppy"
      ? `/varieties/${item.varietySlug}`
      : item.kind === "plant"
      ? `/plants/${item.plantSlug}`
      : "/gallery";

  return (
    <Reveal className={className} delay={delay}>
      <Link
        href={targetHref}
        className="group relative block h-full overflow-hidden rounded-2xl border border-gold/10 bg-gradient-to-b from-ink to-abyss transition-all duration-500 ease-luxe hover:border-gold/35"
      >
        <div
          className={`absolute inset-0 ${
            item.kind === "guppy"
              ? "bg-[radial-gradient(80%_80%_at_60%_40%,rgba(199,164,90,0.1)_0%,rgba(9,11,13,0)_65%)]"
              : "bg-[radial-gradient(80%_80%_at_60%_40%,rgba(95,158,110,0.14)_0%,rgba(9,11,13,0)_65%)]"
          }`}
          aria-hidden="true"
        />
        {variety && (
          <GuppyArt
            colorway={variety.art}
            className="absolute left-1/2 top-1/2 h-auto w-[132%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-luxe group-hover:scale-[1.04]"
          />
        )}
        {plant && (
          <PlantArt
            type={plant.art}
            className="absolute left-1/2 top-1/2 h-auto w-[72%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-luxe group-hover:scale-[1.05]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent" aria-hidden="true" />
        <div className="relative flex aspect-[4/3] w-full items-end p-5" aria-hidden="true">
          <div className="translate-y-2 opacity-0 transition-all duration-500 ease-luxe group-hover:translate-y-0 group-hover:opacity-100">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-light">
              {item.kind === "guppy" ? "Guppy" : "Live Plant"}
            </p>
            <p className="font-display text-xl text-ivory">{item.caption}</p>
          </div>
        </div>
        <span className="absolute bottom-5 left-5 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-ivory/50 transition-opacity duration-300 group-hover:opacity-0">
          {item.caption}
        </span>
      </Link>
    </Reveal>
  );
}

export default function GalleryPreview() {
  return (
    <section className="bg-obsidian py-20 lg:py-28" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-gold/70" aria-hidden="true" />
                The Gallery
              </p>
              <h2 id="gallery-heading" className="display-2 mt-4 text-ivory">
                Inside the <span className="font-display italic text-gold-light">Aquarium</span>
              </h2>
              <p className="lede mt-4">
                A visual walk through the collection — guppy lines and botanical companions side by side.
              </p>
            </div>
            <Link href="/gallery" className="btn-link shrink-0">
              Open full gallery
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          <GalleryTile id={1} className="col-span-2 row-span-2" />
          <GalleryTile id={2} delay={80} />
          <GalleryTile id={3} delay={140} />
          <GalleryTile id={4} delay={200} className="lg:col-span-2" />
        </div>
      </div>
    </section>
  );
}
