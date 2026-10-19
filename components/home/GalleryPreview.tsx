import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { galleryItems } from "@/lib/gallery-data";

function GalleryTile({ id, className = "", delay = 0 }: { id: number; className?: string; delay?: number }) {
  const item = galleryItems.find((g) => g.id === id);
  if (!item) return null;

  const targetHref =
    item.kind === "guppy"
      ? `/varieties/${item.varietySlug}`
      : item.kind === "plant"
      ? `/plants/${item.plantSlug}`
      : "/gallery";

  const photoSrc =
    item.kind === "guppy" || item.kind === "plant"
      ? item.image
      : item.thumbnailUrl || "/images/reels/thumb-aquarium.jpg";

  return (
    <Reveal className={className} delay={delay}>
      <Link
        href={targetHref}
        className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-all duration-300 hover:border-brand/40 hover:shadow-card-hover"
      >
        <div className="relative aspect-[4/3] h-full w-full bg-secondary">
          <Image
            src={photoSrc}
            alt={item.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/15 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-gold-light">
            {item.kind === "guppy" ? "Guppy Strain" : "Aquatic Botanical"}
          </span>
          <p className="mt-1 font-display text-sm font-bold text-white transition-colors group-hover:text-gold-light">
            {item.caption}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

export default function GalleryPreview() {
  return (
    <section className="bg-page py-16 sm:py-20 lg:py-24" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-muted bg-teal-light px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand shadow-subtle">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                Visual Archive
              </div>
              <h2 id="gallery-heading" className="mt-4 font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl lg:text-5xl">
                Inside the <span className="text-brand">Aquarium</span>
              </h2>
              <p className="mt-3 text-base text-body sm:text-lg leading-relaxed">
                Real photography of our bloodline strains and botanical companions raised in natural biotope environments in Kanyakumari.
              </p>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 font-sans text-sm font-bold text-brand hover:text-brand-hover transition-colors"
            >
              Open Complete Gallery
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          <GalleryTile id={1} className="col-span-2 row-span-2" />
          <GalleryTile id={2} delay={50} />
          <GalleryTile id={3} delay={100} />
          <GalleryTile id={4} delay={150} className="lg:col-span-2" />
        </div>
      </div>
    </section>
  );
}
