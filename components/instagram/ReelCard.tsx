"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Instagram,
  ArrowUpRight,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import type { InstagramReel } from "@/lib/reels-data";

interface ReelCardProps {
  reel: InstagramReel;
  onOpenModal?: (reel: InstagramReel) => void;
  className?: string;
  autoPlayOnHover?: boolean;
}

export default function ReelCard({
  reel,
  className = "",
  autoPlayOnHover = true,
}: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const thumbnail = reel.thumbnailUrl || "/images/reels/thumb-aquarium.jpg";
  const hasLocalVideo = Boolean(reel.videoUrl);

  const togglePlay = () => {
    if (!videoRef.current || !hasLocalVideo) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch((e) => console.warn("Video playback blocked", e));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleMouseEnter = () => {
    if (autoPlayOnHover && hasLocalVideo && !hasStarted && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (autoPlayOnHover && hasLocalVideo && !hasStarted && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <article
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-all duration-300 hover:border-brand/40 hover:shadow-card-hover ${className}`}
    >
      {/* Media Window */}
      <div className="relative aspect-[9/15] w-full overflow-hidden bg-secondary">
        {hasLocalVideo ? (
          <>
            <video
              ref={videoRef}
              src={reel.videoUrl}
              poster={thumbnail}
              loop
              playsInline
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onWaiting={() => setIsLoading(true)}
              onCanPlay={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setLoadError(true);
              }}
              onEnded={() => setIsPlaying(false)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Loading spinner */}
            {isLoading && (
              <div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 text-brand"
                role="status"
              >
                <Loader2 className="h-7 w-7 animate-spin" />
                <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Loading Reel…
                </span>
              </div>
            )}

            {/* Error state */}
            {loadError && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white p-4 text-center">
                <AlertCircle className="h-8 w-8 text-error" />
                <p className="mt-2 text-xs text-charcoal">Unable to stream Reel</p>
                <Link
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-3 py-1.5 text-xs"
                >
                  Watch on Instagram
                </Link>
              </div>
            )}

            {/* Video Overlays and Vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30" />

            {/* Top Badges */}
            <div className="absolute left-3 right-3 top-3 z-10 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/95 px-2.5 py-0.5 text-xs font-medium text-brand shadow-sm backdrop-blur-md">
                <Instagram className="h-3 w-3 text-brand" aria-hidden="true" />
                {reel.category}
              </span>

              {reel.featured && (
                <span className="inline-flex items-center gap-1 rounded-full border border-gold-border bg-gold-light/95 px-2.5 py-0.5 text-xs font-medium text-gold-dark shadow-sm backdrop-blur-md">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  Featured
                </span>
              )}
            </div>

            {/* Center Big Play/Pause Trigger */}
            <button
              type="button"
              onClick={togglePlay}
              className="absolute inset-0 z-10 flex items-center justify-center focus:outline-none"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full bg-brand/90 text-white shadow-teal backdrop-blur-md transition-all duration-300 ${
                  isPlaying ? "opacity-0 scale-75 group-hover:opacity-90 group-hover:scale-100" : "opacity-100 scale-100 group-hover:scale-110"
                }`}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 fill-current" />
                ) : (
                  <Play className="ml-0.5 h-6 w-6 fill-current" />
                )}
              </span>
            </button>

            {/* Bottom In-Video Controls & Scrubber */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-3 pt-6 bg-gradient-to-t from-charcoal/95 via-charcoal/70 to-transparent">
              {/* Progress bar */}
              <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full bg-gold transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Control buttons */}
              <div className="flex items-center justify-between text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="rounded p-1 text-white/80 transition-colors hover:text-white"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="rounded p-1 text-white/80 transition-colors hover:text-white"
                    title={isMuted ? "Unmute audio" : "Mute audio"}
                  >
                    {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleRestart}
                    className="rounded p-1 text-white/80 transition-colors hover:text-white"
                    title="Restart from beginning"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="rounded p-1 text-white/80 transition-colors hover:text-white"
                  title="Fullscreen"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Caption */}
              <p className="mt-1.5 line-clamp-2 text-xs font-medium leading-relaxed text-white">
                {reel.caption}
              </p>
            </div>
          </>
        ) : (
          /* High-res Image Fallback for Posts */
          <div className="relative h-full w-full">
            <Image
              src={thumbnail}
              alt={reel.caption}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

            {/* Category tag */}
            <div className="absolute left-3 top-3 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/95 px-2.5 py-0.5 text-xs font-medium text-brand shadow-sm backdrop-blur-md">
                <Instagram className="h-3 w-3 text-brand" aria-hidden="true" />
                {reel.category}
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="line-clamp-2 text-xs font-medium leading-relaxed">
                {reel.caption}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer with Official Instagram Attribution Link */}
      <div className="flex items-center justify-between border-t border-border bg-white px-4 py-3">
        <div className="flex items-center gap-1.5 font-sans text-xs font-medium text-muted">
          <Instagram className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
          <span>@sheferoyguppy</span>
        </div>

        <Link
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-sans text-xs font-bold text-brand transition-colors hover:text-brand-hover"
          aria-label={`Watch ${reel.caption} on Instagram`}
        >
          Watch on Instagram
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
