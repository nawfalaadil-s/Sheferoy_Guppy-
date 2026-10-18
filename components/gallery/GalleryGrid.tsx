"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Play,
  Instagram,
  ArrowUpRight,
} from "lucide-react";
import GuppyArt from "@/components/art/GuppyArt";
import PlantArt from "@/components/art/PlantArt";
import { galleryItems, galleryCategories, type GalleryItem } from "@/lib/gallery-data";
import { getVarietyBySlug } from "@/lib/varieties-data";
import { getPlantBySlug } from "@/lib/plants-data";

function ItemArt({ item, className = "" }: { item: GalleryItem; className?: string }) {
  if (item.kind === "guppy") {
    const variety = getVarietyBySlug(item.varietySlug);
    return variety ? <GuppyArt colorway={variety.art} className={className} /> : null;
  }
  if (item.kind === "plant") {
    const plant = getPlantBySlug(item.plantSlug);
    return plant ? <PlantArt type={plant.art} className={className} /> : null;
  }
  // Reel Art / Video Poster Facade
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-gold/30 to-obsidian text-gold-light shadow-[0_0_20px_rgba(199,164,90,0.3)] transition-transform duration-500 group-hover:scale-110">
        <Play className="ml-0.5 h-6 w-6 fill-current" />
      </div>
      <span className="mt-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light">
        Instagram Reel
      </span>
      {item.varietyName && (
        <span className="mt-1 text-xs text-ivory/70">{item.varietyName}</span>
      )}
    </div>
  );
}

export default function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(
    () =>
      selectedCategory === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === selectedCategory),
    [selectedCategory]
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setLightboxIndex((current) => {
        if (current === null || filteredItems.length === 0) return current;
        return (current + dir + filteredItems.length) % filteredItems.length;
      });
    },
    [filteredItems.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, step]);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <>
      {/* Filters */}
      <div className="sticky top-16 z-30 border-b border-gold/10 bg-obsidian/90 backdrop-blur-md lg:top-[72px]">
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
            {galleryCategories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                    active
                      ? "border-gold bg-gold text-obsidian font-bold"
                      : "border-white/10 text-ivory/60 hover:border-gold/40 hover:text-gold-light"
                  }`}
                >
                  {category === "Reels" ? "Instagram Reels & Video" : category}
                </button>
              );
            })}
          </div>
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-ivory/45" role="status">
            {filteredItems.length} {filteredItems.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-obsidian pb-24 pt-10">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {filteredItems.map((item, index) => {
              const isReel = item.kind === "reel";
              const large = index % 5 === 0 && !isReel;
              return (
                <li key={item.id} className={large ? "col-span-2 row-span-2" : ""}>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="group relative block h-full w-full overflow-hidden rounded-2xl border border-gold/10 bg-gradient-to-b from-ink to-abyss text-left transition-all duration-500 ease-luxe hover:border-gold/35 hover:shadow-[0_8px_30px_rgba(199,164,90,0.15)]"
                    aria-label={`Open ${item.alt} in the viewer`}
                  >
                    <div
                      className={`absolute inset-0 ${
                        item.kind === "guppy"
                          ? "bg-[radial-gradient(80%_80%_at_58%_42%,rgba(199,164,90,0.1)_0%,rgba(9,11,13,0)_65%)]"
                          : item.kind === "plant"
                          ? "bg-[radial-gradient(80%_80%_at_58%_42%,rgba(95,158,110,0.16)_0%,rgba(9,11,13,0)_65%)]"
                          : "bg-[radial-gradient(80%_80%_at_50%_40%,rgba(199,164,90,0.18)_0%,rgba(9,11,13,0)_75%)]"
                      }`}
                      aria-hidden="true"
                    />

                    {isReel ? (
                      <div className="relative aspect-[9/13] w-full">
                        <ItemArt item={item} />
                      </div>
                    ) : (
                      <>
                        <ItemArt
                          item={item}
                          className={`absolute left-1/2 top-1/2 h-auto -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-luxe group-hover:scale-[1.05] ${
                            item.kind === "guppy" ? "w-[128%]" : "w-[62%]"
                          }`}
                        />
                        <div
                          className={`relative w-full bg-gradient-to-t from-obsidian/95 via-transparent to-transparent ${
                            large ? "aspect-square" : "aspect-[4/3]"
                          }`}
                          aria-hidden="true"
                        />
                      </>
                    )}

                    {/* Badge & caption bar */}
                    <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="line-clamp-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory/85">
                        {item.caption}
                      </span>
                      {item.kind === "plant" && (
                        <Leaf className="h-3.5 w-3.5 shrink-0 text-moss-light/70" aria-hidden="true" />
                      )}
                      {item.kind === "reel" && (
                        <span className="inline-flex items-center gap-1 text-gold-light">
                          <Instagram className="h-3 w-3" aria-hidden="true" />
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-center sm:flex-row sm:text-left">
            <p className="text-xs leading-relaxed text-ivory/50">
              Live updates and official footage are published directly to{" "}
              <Link
                href="https://www.instagram.com/sheferoyguppy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light"
              >
                @sheferoyguppy
              </Link>
              . Real specimen photography and video embeds are cleared for display by the studio.
            </p>

            <Link
              href="/admin/reels"
              className="font-sans text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-light"
            >
              Reel Management Console →
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox / Video Viewer */}
      {currentItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-obsidian/95 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewer — ${currentItem.caption}`}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-zoom-out"
            onClick={closeLightbox}
            aria-label="Close viewer"
          />

          <button
            type="button"
            onClick={closeLightbox}
            className="glass absolute right-4 top-4 z-20 rounded-full p-2.5 text-ivory transition-colors hover:text-gold-light"
            aria-label="Close viewer"
            autoFocus
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => step(-1)}
            className="glass absolute left-3 z-20 rounded-full p-2.5 text-ivory transition-colors hover:text-gold-light sm:left-6"
            aria-label="Previous piece"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="glass absolute right-3 z-20 rounded-full p-2.5 text-ivory transition-colors hover:text-gold-light sm:right-6"
            aria-label="Next piece"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <figure className="relative z-[5] mx-auto w-full max-w-xl">
            {currentItem.kind === "reel" ? (
              /* Instagram Embed Lightbox Player */
              <div className="overflow-hidden rounded-3xl border border-gold/25 bg-abyss shadow-2xl">
                <div className="aspect-[9/13] max-h-[68vh] w-full bg-obsidian">
                  <iframe
                    src={currentItem.embedUrl}
                    title={currentItem.caption}
                    className="h-full w-full border-0"
                    allow="encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-light">
                      <Instagram className="h-3 w-3" />
                      Instagram Reel • {currentItem.reelCategory}
                    </span>
                    <h3 className="mt-1 font-display text-lg text-ivory">
                      {currentItem.caption}
                    </h3>
                  </div>

                  <Link
                    href={currentItem.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold shrink-0 py-2.5 text-xs"
                  >
                    Watch on Instagram
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              /* Guppy / Plant Vector Illustration */
              <>
                <div className="relative overflow-hidden rounded-3xl border border-gold/15 bg-gradient-to-b from-ink to-obsidian">
                  <div
                    className={`absolute inset-0 ${
                      currentItem.kind === "guppy"
                        ? "bg-[radial-gradient(80%_80%_at_58%_42%,rgba(199,164,90,0.12)_0%,rgba(9,11,13,0)_65%)]"
                        : "bg-[radial-gradient(80%_80%_at_58%_42%,rgba(95,158,110,0.18)_0%,rgba(9,11,13,0)_65%)]"
                    }`}
                    aria-hidden="true"
                  />
                  <ItemArt
                    item={currentItem}
                    className={
                      currentItem.kind === "guppy"
                        ? "relative w-full"
                        : "relative left-1/2 w-[58%] -translate-x-1/2"
                    }
                  />
                </div>
                <figcaption className="mt-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-light">
                      {currentItem.kind === "guppy" ? "Guppy Bloodline" : "Live Aquatic Plant"}
                    </p>
                    <p className="mt-1 font-display text-xl text-ivory">{currentItem.caption}</p>
                  </div>
                  <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-ivory/50">
                    {lightboxIndex + 1} / {filteredItems.length}
                  </p>
                </figcaption>
              </>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
