"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import {
  Instagram,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Loader2,
  AlertCircle,
  RefreshCw,
  Video,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ReelCard from "@/components/instagram/ReelCard";
import ReelsAdminModal from "@/components/admin/ReelsAdminModal";
import {
  type InstagramReel,
  reelCategories,
  type ReelCategory,
  verifiedSheferoyReels,
} from "@/lib/reels-data";

const instagramUrl =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/sheferoyguppy/";

export default function InstagramShowcase() {
  const [reels, setReels] = useState<InstagramReel[]>(verifiedSheferoyReels);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ReelCategory>("All");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const loadReels = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/reels");
      const data = await res.json();
      if (data.success && Array.isArray(data.reels)) {
        setReels(data.reels);
      } else {
        setReels(verifiedSheferoyReels);
      }
    } catch (err: unknown) {
      console.warn("API load error, falling back to verified reels dataset:", err);
      setReels(verifiedSheferoyReels);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReels();
  }, []);

  const filteredReels = useMemo(() => {
    if (selectedCategory === "All") return reels;
    return reels.filter((r) => r.category === selectedCategory);
  }, [reels, selectedCategory]);

  const handleScroll = () => {
    if (!scrollTrackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollTrackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
    } else {
      setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)));
    }
  };

  const scrollBy = (offset: number) => {
    if (!scrollTrackRef.current) return;
    scrollTrackRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="bg-abyss py-20 lg:py-28" aria-labelledby="reels-heading">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-gold/70" aria-hidden="true" />
              From Our Aquarium
            </p>
            <h2 id="reels-heading" className="display-2 mt-4 text-ivory">
              Explore Our <span className="font-display italic text-gold-light">Latest Reels</span>
            </h2>
            <p className="lede mt-4 max-w-2xl">
              Authentic breeding updates, live feeding sessions, fry development, and show-grade guppy
              selection filmed directly at our Kanyakumari fish room.
            </p>
          </Reveal>

          {/* Action CTAs & Admin trigger */}
          <Reveal delay={100}>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                aria-label="Follow Sheferoy Guppy on Instagram"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                Follow @sheferoyguppy
              </Link>

              <button
                type="button"
                onClick={() => setIsAdminOpen(true)}
                className="btn-ghost"
                title="Manage Instagram Reel URLs"
                aria-label="Open Reel management console"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Manage</span> Reels
              </button>
            </div>
          </Reveal>
        </div>

        {/* Category Filter Pills & Mobile Controls */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter reels by category">
            {reelCategories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                    active
                      ? "border-gold bg-gold text-obsidian"
                      : "border-white/10 text-ivory/60 hover:border-gold/40 hover:text-gold-light"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Carousel Arrows (Mobile/Tablet scroll buttons) */}
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-320)}
              className="rounded-full border border-white/10 p-2 text-ivory/60 transition-colors hover:border-gold hover:text-gold-light"
              aria-label="Previous reels"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(320)}
              className="rounded-full border border-white/10 p-2 text-ivory/60 transition-colors hover:border-gold hover:text-gold-light"
              aria-label="Next reels"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-8">
          {loading ? (
            /* Loading State */
            <div
              className="flex flex-col items-center justify-center py-24 text-gold-light"
              role="status"
              aria-live="polite"
            >
              <Loader2 className="h-9 w-9 animate-spin" aria-hidden="true" />
              <p className="mt-4 font-sans text-xs uppercase tracking-widest text-ivory/60">
                Loading Sheferoy Reels…
              </p>
            </div>
          ) : error ? (
            /* Error State */
            <div className="my-8 rounded-3xl border border-red-500/20 bg-red-950/20 p-8 text-center">
              <AlertCircle className="mx-auto h-8 w-8 text-red-400" aria-hidden="true" />
              <h3 className="mt-3 font-display text-lg text-ivory">Unable to load Reels</h3>
              <p className="mx-auto mt-1 max-w-md text-xs text-mist">{error}</p>
              <div className="mt-5 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={loadReels}
                  className="btn-ghost py-2 text-xs"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Retry
                </button>
                <Link
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold py-2 text-xs"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  View on Instagram
                </Link>
              </div>
            </div>
          ) : filteredReels.length === 0 ? (
            /* Empty State */
            <div className="my-8 rounded-3xl border border-gold/15 bg-ink/40 p-12 text-center">
              <Video className="mx-auto h-10 w-10 text-gold/60" aria-hidden="true" />
              <h3 className="mt-3 font-display text-lg text-ivory">No Reels in this category</h3>
              <p className="mt-1 text-xs text-mist">
                Check back soon or explore other categories to view breeding and feeding sessions.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="btn-gold mt-5 py-2 text-xs"
              >
                Show All Reels
              </button>
            </div>
          ) : (
            /* Reels Track (Responsive Grid on Desktop + Smooth Horizontally Scrollable on Mobile) */
            <div>
              <div
                ref={scrollTrackRef}
                onScroll={handleScroll}
                className="flex gap-5 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0"
              >
                {filteredReels.map((reel) => (
                  <div
                    key={reel.id}
                    className="w-[280px] shrink-0 snap-center sm:w-auto"
                  >
                    <ReelCard reel={reel} />
                  </div>
                ))}
              </div>

              {/* Mobile Scroll Indicator Track */}
              <div className="mt-4 flex items-center justify-between sm:hidden">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-gold transition-all duration-150"
                    style={{ width: `${Math.max(15, scrollProgress)}%` }}
                  />
                </div>
                <span className="ml-3 font-sans text-[10px] uppercase tracking-wider text-ivory/40">
                  Swipe for more
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Attribution & Verification Notice */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-ivory/50">
            Real ornamental guppy and live plant videos published by{" "}
            <Link
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold transition-colors hover:text-gold-light"
            >
              @sheferoyguppy
            </Link>{" "}
            • Kanyakumari, Tamil Nadu
          </p>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:text-gold-light"
          >
            Explore Complete Video Gallery
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Admin Management Modal */}
      <ReelsAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        reels={reels}
        onReelsChange={(updated) => setReels(updated)}
      />
    </section>
  );
}
