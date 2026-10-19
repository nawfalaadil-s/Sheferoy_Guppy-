"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowDown } from "lucide-react";

export default function Hero() {
  const whatsappUrl = `https://wa.me/919489184047?text=${encodeURIComponent(
    "Hi Sheferoy Guppy, I am interested in your ornamental guppies, bettas, and breeding pairs. Please share current availability and pricing."
  )}`;

  return (
    <section
      className="relative overflow-hidden bg-page py-10 sm:py-14 lg:py-16 border-b border-border"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Business-focused hero copy */}
          <div className="lg:col-span-7 xl:col-span-7">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand">
              ORNAMENTAL GUPPIES &amp; BETTAS
            </span>

            <h1
              id="hero-heading"
              className="mt-3 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl lg:text-5xl leading-[1.15]"
            >
              Premium Ornamental Guppies and Bettas for Aquarium Enthusiasts
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-body sm:text-base">
              Welcome to Sheferoy Guppy, your destination for ornamental guppies, colourful bettas, and selected breeding pairs. Explore distinctive fish varieties featuring beautiful colours, patterns, and fin types. Whether you are choosing fish for your home aquarium or looking for breeding pairs, discover our collection and contact us directly for current availability and pricing.
            </p>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="#featured-fish"
                className="btn-primary text-xs sm:text-sm px-5 py-2.5 shadow-teal"
              >
                Explore Featured Fish
                <ArrowDown className="h-3.5 w-3.5 ml-1" />
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

          {/* Right Column: Real Fish Photography */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-card">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <Image
                  src="/images/varieties/veiltail-zebra-green.jpg"
                  alt="Veiltail Zebra Green ornamental guppy at Sheferoy Guppy"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="font-display font-bold text-sm">Veiltail Zebra Green</p>
                  <p className="text-[11px] text-white/80">Ornamental guppy variety</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
