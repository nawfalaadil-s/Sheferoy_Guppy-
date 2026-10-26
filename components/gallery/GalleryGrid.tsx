"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Play,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { galleryItems as defaultGalleryItems, galleryCategories, type GalleryItem } from "@/lib/gallery-data";

interface GalleryGridProps {
  initialItems?: GalleryItem[];
}

export default function GalleryGrid({ initialItems }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allItems = initialItems && initialItems.length > 0 ? initialItems : defaultGalleryItems;

  const filteredItems = useMemo(
    () =>
      selectedCategory === "All"
        ? allItems
        : allItems.filter((item) => item.category === selectedCategory),
    [selectedCategory, allItems]
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
      {/* Filters Sticky Bar */}
      <div className="sticky top-16 z-30 border-b border-border bg-page/95 backdrop-blur-md lg:top-[72px]">
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
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    active
                      ? "border-brand bg-brand text-white font-bold shadow-sm"
                      : "border-border text-body hover:border-brand/40 hover:text-brand bg-surface"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <p className="text-xs uppercase tracking-widest text-muted" role="status">
            {filteredItems.length} {filteredItems.length === 1 ? "exhibit" : "exhibits"}
          </p>
        </div>
      </div>

      {/* Media Grid */}
      <div className="bg-page pb-24 pt-10">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {filteredItems.map((item, index) => {
              const isVideo = item.kind === "video";
              const photoSrc =
                item.kind === "guppy" || item.kind === "plant"
                  ? item.image
                  : item.thumbnailUrl || "/images/gallery/farm-clip-06.jpg";

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-card hover:shadow-card-hover transition-all duration-300 focus:outline-none"
                    aria-label={`Open ${item.alt} in viewer`}
                  >
                    <Image
                      src={photoSrc}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Video Icon / Play Button */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-brand/85 text-white shadow-md backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                          <Play className="ml-0.5 h-5 w-5 fill-current" />
                        </span>
                      </div>
                    )}

                    {/* Top Tag */}
                    <div className="absolute left-3 top-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-heading backdrop-blur-md shadow-sm">
                        {isVideo ? (
                          <>
                            <Play className="h-3 w-3 fill-current text-brand" />
                            Farm Video
                          </>
                        ) : item.kind === "plant" ? (
                          <>
                            <Leaf className="h-3 w-3 text-success" />
                            Flora
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3 w-3 text-gold" />
                            Strain
                          </>
                        )}
                      </span>
                    </div>

                    {/* Caption Bar */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="line-clamp-2 text-xs font-semibold text-white drop-shadow-sm">
                        {item.caption}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Bottom Attribution Notice */}
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-muted">
              High-definition photographs and video clips filmed on location at Sheferoy Guppy Hatchery, Kanyakumari.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand hover:text-brand-hover transition-colors font-sans"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Contact Breeder for Live Stock Availability →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox Modal with Native Video and Photo View */}
      {currentItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewer — ${currentItem.caption}`}
        >
          {/* Backdrop click to close */}
          <button
            type="button"
            className="absolute inset-0 cursor-zoom-out"
            onClick={closeLightbox}
            aria-label="Close viewer"
          />

          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-20 rounded-full bg-surface/90 p-2.5 text-heading border border-border shadow-md hover:bg-surface hover:text-brand transition-colors"
            aria-label="Close viewer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev/Next buttons */}
          <button
            type="button"
            onClick={() => step(-1)}
            className="absolute left-3 z-20 rounded-full bg-surface/90 p-2.5 text-heading border border-border shadow-md hover:bg-surface hover:text-brand transition-colors sm:left-6"
            aria-label="Previous exhibit"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="absolute right-3 z-20 rounded-full bg-surface/90 p-2.5 text-heading border border-border shadow-md hover:bg-surface hover:text-brand transition-colors sm:right-6"
            aria-label="Next exhibit"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Lightbox Content Container */}
          <div className="relative z-10 mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl">
            {currentItem.kind === "video" ? (
              /* Native Local Video Player */
              <div>
                <div className="aspect-[9/14] max-h-[65vh] w-full bg-black">
                  <video
                    src={currentItem.videoUrl}
                    poster={currentItem.thumbnailUrl}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between bg-surface border-t border-border">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                      <Play className="h-3.5 w-3.5 fill-current" />
                      Sheferoy Farm Video • {currentItem.videoCategory}
                    </span>
                    <h3 className="mt-1 font-display text-base font-bold text-heading">
                      {currentItem.caption}
                    </h3>
                  </div>

                  <WhatsAppButton
                    variety={currentItem.caption}
                    className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-white hover:bg-brand-hover shadow-sm transition-all"
                  >
                    Enquire on WhatsApp
                  </WhatsAppButton>
                </div>
              </div>
            ) : (
              /* Real Photography Lightbox */
              <div>
                <div className="relative aspect-[4/3] max-h-[65vh] w-full bg-secondary">
                  <Image
                    src={currentItem.image}
                    alt={currentItem.alt}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between bg-surface border-t border-border">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                      {currentItem.kind === "guppy" ? "Ornamental Guppy Bloodline" : "Live Aquatic Plant"}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold text-heading">
                      {currentItem.caption}
                    </h3>
                  </div>

                  <WhatsAppButton
                    variety={currentItem.caption}
                    className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-white hover:bg-brand-hover shadow-sm transition-all"
                  >
                    Enquire on WhatsApp
                  </WhatsAppButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
