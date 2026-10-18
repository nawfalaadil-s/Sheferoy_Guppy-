"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Instagram, ArrowUpRight, Loader2, AlertCircle, X, Sparkles } from "lucide-react";
import type { InstagramReel } from "@/lib/reels-data";
import { getEmbedUrl } from "@/lib/reels-data";

interface ReelCardProps {
  reel: InstagramReel;
  onOpenModal?: (reel: InstagramReel) => void;
  className?: string;
  autoPlay?: boolean;
}

export default function ReelCard({ reel, className = "" }: ReelCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const embedUrl = getEmbedUrl(reel.code, reel.type);

  const handleStartPlay = () => {
    setIsPlaying(true);
    setIsLoading(true);
    setLoadError(false);
  };

  const handleStopPlay = () => {
    setIsPlaying(false);
    setIsLoading(false);
    setLoadError(false);
  };

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-gold/15 bg-gradient-to-b from-ink via-abyss to-obsidian transition-all duration-500 ease-luxe hover:border-gold/45 hover:shadow-[0_12px_40px_-15px_rgba(199,164,90,0.18)] ${className}`}
    >
      {/* Media Window / Facade Player */}
      <div className="relative aspect-[9/14] w-full overflow-hidden bg-obsidian">
        {isPlaying ? (
          <div className="relative h-full w-full bg-obsidian">
            {/* Close embed button */}
            <button
              type="button"
              onClick={handleStopPlay}
              className="absolute right-2 top-2 z-20 rounded-full bg-obsidian/85 p-1.5 text-ivory/80 backdrop-blur-md transition-colors hover:bg-gold hover:text-obsidian"
              title="Close active video"
              aria-label="Close active video"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            {/* Loading skeleton */}
            {isLoading && (
              <div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-obsidian/90 text-gold-light"
                role="status"
                aria-live="polite"
              >
                <Loader2 className="h-7 w-7 animate-spin" aria-hidden="true" />
                <span className="mt-3 font-sans text-xs uppercase tracking-wider text-ivory/70">
                  Loading Reel…
                </span>
              </div>
            )}

            {/* Error state */}
            {loadError ? (
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <AlertCircle className="h-8 w-8 text-gold" aria-hidden="true" />
                <p className="mt-3 text-sm text-ivory">Unable to load Instagram embed</p>
                <p className="mt-1 text-xs text-mist">
                  Browser privacy or ad blocker settings may restrict third-party frames.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoading(true);
                      setLoadError(false);
                    }}
                    className="btn-ghost py-2 text-xs"
                  >
                    Try Again
                  </button>
                  <Link
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold py-2 text-xs"
                  >
                    Watch on Instagram
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ) : (
              <iframe
                src={embedUrl}
                title={`Instagram Reel: ${reel.caption}`}
                className="h-full w-full border-0"
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setLoadError(true);
                }}
              />
            )}
          </div>
        ) : (
          /* High-performance Facade Placeholder */
          <div className="relative flex h-full w-full flex-col justify-between p-4 sm:p-5">
            {/* Ambient background styling */}
            <div
              className="absolute inset-0 bg-[radial-gradient(85%_70%_at_50%_35%,rgba(199,164,90,0.12)_0%,rgba(9,11,13,0)_75%)]"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent"
              aria-hidden="true"
            />

            {/* Top metadata tags */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-obsidian/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-light backdrop-blur-md">
                <Instagram className="h-3 w-3 text-gold" aria-hidden="true" />
                {reel.type === "reel" ? "Reel" : "Post"}
              </span>

              {reel.featured && (
                <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-light backdrop-blur-md">
                  <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                  Featured
                </span>
              )}
            </div>

            {/* Centered Play Button Facade */}
            <div className="relative z-10 flex flex-col items-center justify-center py-6 text-center">
              <button
                type="button"
                onClick={handleStartPlay}
                className="group/btn relative flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-gold/30 to-obsidian/80 text-gold-light shadow-[0_0_25px_rgba(199,164,90,0.25)] backdrop-blur-md transition-all duration-300 ease-luxe hover:scale-110 hover:border-gold hover:from-gold hover:to-gold-dark hover:text-obsidian hover:shadow-[0_0_35px_rgba(199,164,90,0.55)] focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label={`Play Reel: ${reel.caption}`}
              >
                <Play className="ml-1 h-6 w-6 fill-current transition-transform duration-300 group-hover/btn:scale-105" />
              </button>
              <span className="mt-3 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ivory/70 transition-colors group-hover:text-gold-light">
                Play Reel
              </span>
            </div>

            {/* Bottom preview info */}
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <span className="rounded bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-ivory/80">
                  {reel.category}
                </span>
                {reel.varietyName && (
                  <span className="text-[10px] font-medium text-gold-light/90">
                    {reel.varietyName}
                  </span>
                )}
              </div>
              <p className="line-clamp-2 text-xs leading-relaxed text-ivory/90">
                {reel.caption}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer / Action Links */}
      <div className="flex items-center justify-between border-t border-gold/10 bg-abyss/80 px-4 py-3">
        <div className="flex items-center gap-1.5 text-[11px] text-ivory/50">
          <Instagram className="h-3.5 w-3.5 text-gold/70" aria-hidden="true" />
          <span>@sheferoyguppy</span>
        </div>

        <Link
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-gold transition-colors hover:text-gold-light"
          aria-label={`Watch ${reel.caption} directly on Instagram`}
        >
          Watch on Instagram
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
