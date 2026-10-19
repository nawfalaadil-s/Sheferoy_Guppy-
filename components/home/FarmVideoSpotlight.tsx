"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight, MessageCircle, X } from "lucide-react";

interface SpotlightVideo {
  id: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  thumbnailUrl: string;
  tag: string;
}

const spotlightVideos: SpotlightVideo[] = [
  {
    id: "farm-clip-06",
    title: "High-Dorsal Blue Veiltail",
    subtitle: "Active male breeding stock with wide delta spread",
    videoUrl: "/videos/gallery/farm-clip-06.mp4",
    thumbnailUrl: "/images/gallery/farm-clip-06.jpg",
    tag: "Breeder Line",
  },
  {
    id: "farm-clip-05",
    title: "Albino Silverado Red Dumbo",
    subtitle: "Active pair showing large white pectorals & scarlet caudal",
    videoUrl: "/videos/gallery/farm-clip-05.mp4",
    thumbnailUrl: "/images/gallery/farm-clip-05.jpg",
    tag: "Breeding Pair",
  },
  {
    id: "farm-clip-29",
    title: "24K Full Gold Metallic",
    subtitle: "High metallic iridescence colony swimming in clean glass",
    videoUrl: "/videos/gallery/farm-clip-29.mp4",
    thumbnailUrl: "/images/gallery/farm-clip-29.jpg",
    tag: "Show Stock",
  },
];

export default function FarmVideoSpotlight() {
  const [playingVideo, setPlayingVideo] = useState<SpotlightVideo | null>(null);

  return (
    <section className="bg-secondary/40 py-12 sm:py-16 border-b border-border">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand">
              Direct From The Hatchery
            </span>
            <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">
              Real Farm Videos
            </h2>
            <p className="mt-1 text-sm text-body">
              Authentic clips of our active breeding colonies and show stock.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold text-brand hover:text-brand-hover transition-colors"
          >
            Explore All 48 Videos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 3-Card Video Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {spotlightVideos.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-all duration-300 hover:border-brand/40 hover:shadow-card-hover"
            >
              {/* Video Thumbnail with Play Button */}
              <button
                type="button"
                onClick={() => setPlayingVideo(item)}
                className="relative aspect-[9/12] w-full overflow-hidden bg-slate-900 text-left focus:outline-none"
                aria-label={`Play video: ${item.title}`}
              >
                <Image
                  src={item.thumbnailUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Tag */}
                <div className="absolute left-3 top-3">
                  <span className="rounded-full bg-surface/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-heading shadow-sm backdrop-blur-sm border border-border/60">
                    {item.tag}
                  </span>
                </div>

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-brand/90 text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-0.5 h-5 w-5 fill-current" />
                  </span>
                </div>

                {/* Bottom title */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-display text-sm font-bold drop-shadow-sm">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-white/80 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
              </button>

              {/* Quick WhatsApp Action */}
              <div className="p-3 bg-white border-t border-border flex items-center justify-between">
                <span className="text-[11px] font-semibold text-brand">
                  Live Farm Stock
                </span>
                <a
                  href={`https://wa.me/919489184047?text=${encodeURIComponent(
                    `Hi Sheferoy Guppy, I watched the video of ${item.title}. Is it available?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:text-brand-hover hover:underline"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Enquire
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      {playingVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-pointer"
            onClick={() => setPlayingVideo(null)}
            aria-label="Close video"
          />

          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-black shadow-2xl">
            <button
              type="button"
              onClick={() => setPlayingVideo(null)}
              className="absolute right-3 top-3 z-20 rounded-full bg-white/80 p-2 text-heading hover:bg-white transition-colors"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="aspect-[9/14] max-h-[70vh] w-full bg-black">
              <video
                src={playingVideo.videoUrl}
                poster={playingVideo.thumbnailUrl}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between bg-white p-4 border-t border-border">
              <div>
                <h4 className="font-display text-sm font-bold text-heading">
                  {playingVideo.title}
                </h4>
                <p className="text-[11px] text-body">{playingVideo.subtitle}</p>
              </div>

              <a
                href={`https://wa.me/919489184047?text=${encodeURIComponent(
                  `Hi Sheferoy Guppy, I watched the video of ${playingVideo.title}. Please share availability and pricing.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs px-4 py-2"
              >
                Enquire
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
