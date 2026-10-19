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
  Play,
  Pause,
  Volume2,
  VolumeX,
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
  const [selectedCategory, setSelectedCategory] = useState<ReelCategory>("All");
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Active Theater Video
  const [activeReel, setActiveReel] = useState<InstagramReel>(verifiedSheferoyReels[0]);
  const theaterVideoRef = useRef<HTMLVideoElement>(null);
  const [theaterPlaying, setTheaterPlaying] = useState(false);
  const [theaterMuted, setTheaterMuted] = useState(true);
  const [theaterProgress, setTheaterProgress] = useState(0);

  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const loadReels = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reels");
      const data = await res.json();
      if (data.success && Array.isArray(data.reels) && data.reels.length > 0) {
        setReels(data.reels);
        setActiveReel(data.reels[0]);
      } else {
        setReels(verifiedSheferoyReels);
        setActiveReel(verifiedSheferoyReels[0]);
      }
    } catch (err: unknown) {
      console.warn("API load error, falling back to verified reels dataset:", err);
      setReels(verifiedSheferoyReels);
      setActiveReel(verifiedSheferoyReels[0]);
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

  const scrollBy = (offset: number) => {
    if (!scrollTrackRef.current) return;
    scrollTrackRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  const toggleTheaterPlay = () => {
    if (!theaterVideoRef.current) return;
    if (theaterPlaying) {
      theaterVideoRef.current.pause();
      setTheaterPlaying(false);
    } else {
      theaterVideoRef.current
        .play()
        .then(() => setTheaterPlaying(true))
        .catch(() => {});
    }
  };

  const toggleTheaterMute = () => {
    if (!theaterVideoRef.current) return;
    theaterVideoRef.current.muted = !theaterMuted;
    setTheaterMuted(!theaterMuted);
  };

  const selectTheaterReel = (reel: InstagramReel) => {
    setActiveReel(reel);
    setTheaterPlaying(false);
    setTheaterProgress(0);
    if (theaterVideoRef.current) {
      theaterVideoRef.current.currentTime = 0;
      theaterVideoRef.current
        .play()
        .then(() => setTheaterPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <section className="relative overflow-hidden bg-page py-16 sm:py-20 lg:py-24" aria-labelledby="reels-heading">
      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-muted bg-teal-light px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand shadow-subtle">
              <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
              Direct From Our Aquarium
            </div>
            <h2 id="reels-heading" className="mt-4 font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl lg:text-5xl">
              Explore Our <span className="text-brand">Live Video Vault</span>
            </h2>
            <p className="mt-3.5 max-w-2xl text-base text-body sm:text-lg leading-relaxed">
              Watch real ornamental guppy breeding updates, live feeding sessions, fry development,
              and show-grade selections filmed directly at our Kanyakumari fish room.
            </p>
          </Reveal>

          {/* Action CTAs */}
          <Reveal delay={100}>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5 shadow-teal"
                aria-label="Follow Sheferoy Guppy on Instagram"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                Follow @sheferoyguppy
              </Link>

              <button
                type="button"
                onClick={() => setIsAdminOpen(true)}
                className="btn-secondary flex items-center gap-2 text-sm px-4 py-2.5 shadow-subtle"
                title="Manage Instagram Reel URLs"
                aria-label="Open Reel management console"
              >
                <SlidersHorizontal className="h-4 w-4 text-brand" aria-hidden="true" />
                <span>Admin Reels</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Featured Video Theater Section */}
        {activeReel && activeReel.videoUrl && (
          <Reveal delay={120}>
            <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-white shadow-card">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Main Video Viewport (8 cols) */}
                <div className="relative aspect-video w-full bg-charcoal lg:col-span-8 lg:aspect-auto lg:h-[460px]">
                  <video
                    ref={theaterVideoRef}
                    src={activeReel.videoUrl}
                    poster={activeReel.thumbnailUrl || "/images/reels/thumb-aquarium.jpg"}
                    loop
                    playsInline
                    muted={theaterMuted}
                    onTimeUpdate={() => {
                      if (!theaterVideoRef.current) return;
                      const c = theaterVideoRef.current.currentTime;
                      const d = theaterVideoRef.current.duration || 1;
                      setTheaterProgress((c / d) * 100);
                    }}
                    className="h-full w-full object-cover"
                  />

                  {/* Gradient overlays */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30" />

                  {/* Top Bar with Live Tag & Category */}
                  <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/95 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-brand shadow-sm backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-success animate-ping" />
                      Live Playback
                    </span>
                    <span className="rounded-full border border-white/40 bg-white/90 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-charcoal shadow-sm backdrop-blur-md">
                      {activeReel.category}
                    </span>
                  </div>

                  {/* Big Play Button Overlay */}
                  <button
                    type="button"
                    onClick={toggleTheaterPlay}
                    className="absolute inset-0 flex items-center justify-center focus:outline-none"
                    aria-label={theaterPlaying ? "Pause video" : "Play video"}
                  >
                    <span
                      className={`flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-teal transition-all duration-300 ${
                        theaterPlaying ? "opacity-0 scale-75 hover:opacity-90 hover:scale-100" : "opacity-100 scale-100"
                      }`}
                    >
                      {theaterPlaying ? (
                        <Pause className="h-7 w-7 fill-current" />
                      ) : (
                        <Play className="ml-1 h-7 w-7 fill-current" />
                      )}
                    </span>
                  </button>

                  {/* Bottom Controls Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/95 via-charcoal/70 to-transparent">
                    <div className="mb-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                      <div
                        className="h-full bg-gold transition-all duration-100"
                        style={{ width: `${theaterProgress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={toggleTheaterPlay}
                          className="rounded-lg p-1.5 text-white hover:bg-white/10 transition-colors"
                          aria-label={theaterPlaying ? "Pause" : "Play"}
                        >
                          {theaterPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                        <button
                          type="button"
                          onClick={toggleTheaterMute}
                          className="rounded-lg p-1.5 text-white hover:bg-white/10 transition-colors"
                          aria-label={theaterMuted ? "Unmute audio" : "Mute audio"}
                        >
                          {theaterMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </button>
                        <span className="text-xs font-medium text-white/80">
                          {activeReel.varietyName || activeReel.category} Session
                        </span>
                      </div>

                      <Link
                        href={activeReel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-gold-light hover:underline"
                      >
                        Watch on Instagram
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Theater Playlist Sidebar (4 cols) */}
                <div className="flex flex-col border-t border-border bg-secondary/30 p-5 lg:col-span-4 lg:border-l lg:border-t-0">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="font-display text-sm font-bold text-charcoal">
                      Hatchery Video Playlist
                    </h3>
                    <span className="font-sans text-xs font-semibold text-brand">
                      {reels.filter((r) => r.videoUrl).length} Videos Available
                    </span>
                  </div>

                  <div className="mt-3.5 flex flex-col gap-2.5 overflow-y-auto max-h-[360px] pr-1">
                    {reels
                      .filter((r) => r.videoUrl)
                      .map((reel) => {
                        const isCurrent = reel.id === activeReel.id;
                        return (
                          <button
                            key={reel.id}
                            type="button"
                            onClick={() => selectTheaterReel(reel)}
                            className={`flex items-center gap-3 rounded-xl p-2.5 text-left transition-all ${
                              isCurrent
                                ? "border border-brand bg-white shadow-sm ring-1 ring-brand/20"
                                : "border border-border/60 bg-white hover:border-brand/40 hover:bg-white"
                            }`}
                          >
                            <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-secondary">
                              <video
                                src={reel.videoUrl}
                                muted
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/20">
                                <Play className="h-4 w-4 fill-white text-white drop-shadow" />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand">
                                  {reel.category}
                                </span>
                                {reel.featured && (
                                  <span className="font-sans text-[9px] font-bold text-gold-dark bg-gold-light px-1.5 rounded">
                                    ★
                                  </span>
                                )}
                              </div>
                              <p className="mt-0.5 line-clamp-1 font-display text-xs font-bold text-charcoal">
                                {reel.varietyName || reel.caption}
                              </p>
                              <p className="line-clamp-1 font-sans text-[11px] text-muted">
                                {reel.caption}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Category Filter Pills & Navigation Controls */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Reel categories">
            {reelCategories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={active}
                  className={`rounded-full px-4 py-1.5 font-sans text-xs font-semibold transition-all duration-200 ${
                    active
                      ? "bg-brand text-white shadow-teal"
                      : "border border-border bg-white text-body hover:border-brand hover:text-brand shadow-subtle"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => scrollBy(-320)}
              className="rounded-full border border-border bg-white p-2 text-charcoal shadow-subtle transition-colors hover:border-brand hover:text-brand"
              aria-label="Scroll video reels left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(320)}
              className="rounded-full border border-border bg-white p-2 text-charcoal shadow-subtle transition-colors hover:border-brand hover:text-brand"
              aria-label="Scroll video reels right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Reels Row */}
        <div
          ref={scrollTrackRef}
          className="mt-8 flex gap-6 overflow-x-auto pb-4 scrollbar-none"
        >
          {loading ? (
            <div className="flex w-full items-center justify-center py-20 text-brand">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-3 font-sans text-sm font-semibold text-charcoal">
                Loading verified reels…
              </span>
            </div>
          ) : filteredReels.length === 0 ? (
            <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/40 py-16 text-center">
              <AlertCircle className="h-10 w-10 text-muted" />
              <p className="mt-3 font-display text-base font-bold text-charcoal">No videos in this category</p>
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="btn-secondary mt-4 text-xs"
              >
                Show all videos
              </button>
            </div>
          ) : (
            filteredReels.map((reel) => (
              <div key={reel.id} className="w-[280px] shrink-0 sm:w-[320px]">
                <ReelCard reel={reel} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Admin Reels Modal */}
      {isAdminOpen && (
        <ReelsAdminModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          reels={reels}
          onReelsChange={(updated) => setReels(updated)}
          onReelsUpdated={(updated) => setReels(updated)}
        />
      )}
    </section>
  );
}
