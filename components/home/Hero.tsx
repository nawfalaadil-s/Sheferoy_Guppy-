"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown, MessageCircle } from "lucide-react";

export default function Hero() {
  const whatsappUrl = `https://wa.me/919489184047?text=${encodeURIComponent(
    "Hi Sheferoy Guppy, I am interested in your ornamental guppies, bettas, and breeding pairs."
  )}`;

  return (
    <section
      className="relative overflow-hidden bg-page py-8 sm:py-12 lg:py-14 border-b border-border"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Clear, high-impact copy */}
          <div className="lg:col-span-6 xl:col-span-6">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand">
              PREMIUM ORNAMENTAL FISH
            </span>

            <h1
              id="hero-heading"
              className="mt-3 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl lg:text-5xl leading-[1.12]"
            >
              Beautiful Guppies. <br className="hidden sm:inline" />
              <span className="text-brand">Exceptional Colours.</span>
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-body sm:text-base">
              Explore our collection of ornamental guppies, bettas, and breeding pairs.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="#collection"
                className="btn-primary text-xs sm:text-sm px-5 py-2.5 shadow-teal"
              >
                Explore Collection
                <ArrowDown className="h-3.5 w-3.5 ml-0.5" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs sm:text-sm px-5 py-2.5 shadow-subtle hover:border-brand"
              >
                <MessageCircle className="h-4 w-4 text-brand" />
                WhatsApp Enquiry
              </a>
            </div>
          </div>

          {/* Right Column: Real Fish Photography / Aquarium Video */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-card group">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
                <Image
                  src="/images/varieties/veiltail-zebra-green.jpg"
                  alt="Male Veiltail Zebra Green Guppy at Sheferoy Guppy"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <div>
                    <p className="font-display font-bold">Veiltail Zebra Green</p>
                    <p className="text-[11px] text-white/80">Breeding pair available</p>
                  </div>
                  <span className="rounded-full bg-brand/80 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white border border-white/20">
                    Pure Bloodline
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
