"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Sparkles, ShieldCheck, Thermometer, Droplets, MapPin } from "lucide-react";

interface RealFishSpecimen {
  name: string;
  tagline: string;
  image: string;
  line: string;
  tailSpread: string;
  temp: string;
  ph: string;
  description: string;
}

const featuredSpecimens: RealFishSpecimen[] = [
  {
    name: "Moscow Blue",
    tagline: "Solid Stud Line · Deep Royal Cobalt",
    image: "/images/varieties/moscow-blue.jpg",
    line: "Solid Stud Bloodline",
    tailSpread: "65° Broad Delta",
    temp: "24°C - 28°C",
    ph: "7.0 - 7.6",
    description: "Solid cobalt pigmentation across body and caudal delta. Raised in natural planted biotopes.",
  },
  {
    name: "Albino Full Red",
    tagline: "High Dorsal Albino · Vivid Crimson",
    image: "/images/varieties/albino-full-red.jpg",
    line: "Show Grade Line",
    tailSpread: "60° Delta Spread",
    temp: "25°C - 28°C",
    ph: "7.2 - 7.8",
    description: "Clean albino red gene with uniform saturation throughout dorsal and caudal finnage.",
  },
  {
    name: "Platinum White",
    tagline: "High Luster Mirror Delta · Pure White",
    image: "/images/varieties/platinum-white.jpg",
    line: "Pure White Bloodline",
    tailSpread: "65° Broad Delta",
    temp: "24°C - 27°C",
    ph: "7.0 - 7.5",
    description: "Brilliant reflective pearl scales with symmetrical broad veil delta fins.",
  },
  {
    name: "Tuxedo Koi",
    tagline: "Triform Calico · Tri-Color Delta",
    image: "/images/varieties/tuxedo-koi.jpg",
    line: "Collector Special",
    tailSpread: "60° Triangle Spread",
    temp: "24°C - 28°C",
    ph: "7.0 - 7.8",
    description: "Striking black tuxedo body paired with bright koi orange head and calico delta tail.",
  },
];

interface HeroSceneProps {
  onPlayVideo?: () => void;
}

export default function HeroScene({ onPlayVideo }: HeroSceneProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = featuredSpecimens[selectedIndex];

  return (
    <div className="relative w-full">
      {/* Soft Ambient Depth Background */}
      <div
        className="pointer-events-none absolute -inset-3 rounded-3xl bg-secondary/80 blur-xl"
        aria-hidden="true"
      />

      {/* Main Specimen Showcase Card */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-card transition-all duration-300 hover:shadow-card-hover">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-brand">
              Live Breeder Specimen
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-sans text-xs font-medium text-muted">
            <MapPin className="h-3.5 w-3.5 text-brand" />
            <span>Kanyakumari Hatchery</span>
          </div>
        </div>

        {/* Real Fish Image Frame */}
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-secondary">
          <Image
            key={current.name}
            src={current.image}
            alt={`${current.name} Pure Bloodline Fancy Guppy`}
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 45vw"
          />

          {/* Clean Gradient for Legibility */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/15 to-transparent"
            aria-hidden="true"
          />

          {/* Overlaid Badges */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/60 bg-white/95 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-brand shadow-sm backdrop-blur-md">
              <Sparkles className="inline h-3 w-3 mr-1 text-gold" />
              {current.line}
            </span>
            <span className="rounded-full border border-white/40 bg-white/90 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-charcoal shadow-sm backdrop-blur-md">
              {current.tailSpread}
            </span>
          </div>

          {/* Action Trigger Overlay */}
          {onPlayVideo && (
            <button
              type="button"
              onClick={onPlayVideo}
              className="group absolute right-4 top-4 flex items-center gap-2 rounded-full border border-border/80 bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-charcoal shadow-md backdrop-blur-md transition-all hover:border-brand hover:text-brand hover:scale-105 active:scale-95"
              aria-label="Watch video reel of live hatchery fish"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white group-hover:bg-brand-hover transition-colors">
                <Play className="h-2.5 w-2.5 fill-current ml-0.5" />
              </span>
              <span>Watch Reel</span>
            </button>
          )}

          {/* Bottom Photo Title & Strain */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
            <p className="font-sans text-xs font-medium uppercase tracking-wider text-gold-light">
              {current.tagline}
            </p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {current.name}
            </h3>
          </div>
        </div>

        {/* Short Description */}
        <div className="px-5 py-3 border-b border-border bg-white text-xs text-body leading-relaxed">
          {current.description}
        </div>

        {/* Specimen Telemetry Row */}
        <div className="grid grid-cols-3 divide-x divide-border border-b border-border bg-secondary/30 py-3 text-center">
          <div className="px-2">
            <span className="block font-sans text-[10px] font-semibold uppercase tracking-wider text-muted">
              Water Temp
            </span>
            <span className="mt-0.5 flex items-center justify-center gap-1 font-sans text-xs font-bold text-charcoal">
              <Thermometer className="h-3 w-3 text-brand" />
              {current.temp}
            </span>
          </div>

          <div className="px-2">
            <span className="block font-sans text-[10px] font-semibold uppercase tracking-wider text-muted">
              Balanced pH
            </span>
            <span className="mt-0.5 flex items-center justify-center gap-1 font-sans text-xs font-bold text-charcoal">
              <Droplets className="h-3 w-3 text-brand" />
              {current.ph}
            </span>
          </div>

          <div className="px-2">
            <span className="block font-sans text-[10px] font-semibold uppercase tracking-wider text-muted">
              Live Guarantee
            </span>
            <span className="mt-0.5 flex items-center justify-center gap-1 font-sans text-xs font-bold text-success">
              <ShieldCheck className="h-3.5 w-3.5" />
              Pan-India
            </span>
          </div>
        </div>

        {/* Interactive Specimen Selector Tabs */}
        <div className="bg-white p-3.5 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-sans text-xs font-bold uppercase tracking-wider text-charcoal">
              Select Stud Bloodline:
            </p>
            <span className="font-sans text-[11px] text-muted">
              Click to view live specimen
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {featuredSpecimens.map((specimen, idx) => {
              const active = idx === selectedIndex;
              return (
                <button
                  key={specimen.name}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`flex items-center gap-2 rounded-xl p-1.5 transition-all text-left ${
                    active
                      ? "border border-brand bg-teal-light/70 shadow-sm ring-1 ring-brand/20"
                      : "border border-border bg-white hover:border-brand/40 hover:bg-secondary/60"
                  }`}
                  aria-pressed={active}
                >
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-secondary border border-border/50">
                    <Image
                      src={specimen.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-xs font-bold leading-tight ${
                        active ? "text-brand" : "text-charcoal"
                      }`}
                    >
                      {specimen.name}
                    </p>
                    <p className="truncate text-[10px] text-muted">Show Grade</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
