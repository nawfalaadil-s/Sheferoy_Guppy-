"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, ShieldCheck, Droplet, PackageCheck } from "lucide-react";

export default function Hero() {
  const whatsappUrl = `https://wa.me/919489184047?text=${encodeURIComponent(
    "Hi Sheferoy Guppy, I am interested in your ornamental guppies, bettas, and breeding pairs."
  )}`;

  return (
    <section
      className="relative overflow-hidden bg-page py-8 sm:py-12 border-b border-border"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Focused, punchy copy */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-charcoal">
                Kanyakumari Breeder Hatchery
              </span>
            </div>

            <h1
              id="hero-heading"
              className="mt-3 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl lg:text-5xl leading-[1.1]"
            >
              Elite Bloodline <br className="hidden sm:inline" />
              <span className="text-brand">Guppies &amp; Bettas.</span>
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-body sm:text-base">
              Pure strains raised in clean freshwater systems. Selected for rich color depth, wide finnage, and genetic vigour.
            </p>

            {/* Quick Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="#collection"
                className="btn-primary text-xs sm:text-sm px-5 py-2.5 shadow-teal"
              >
                Featured Strains
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
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

            {/* Trust Badges Strip */}
            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border/80 pt-4 text-xs font-semibold text-charcoal">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand" />
                <span>Live Arrival Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PackageCheck className="h-4 w-4 text-brand" />
                <span>Pan-India Safe Pack</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Droplet className="h-4 w-4 text-brand" />
                <span>Pure Lineage</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Card */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-card group">
              <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <Image
                  src="/images/varieties/veiltail-zebra-green.jpg"
                  alt="Male Veiltail Zebra Green Guppy at Sheferoy Guppy"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <div>
                    <p className="font-display font-bold text-sm">Veiltail Zebra Green</p>
                    <p className="text-[11px] text-white/80">Pure lineage breeding stock</p>
                  </div>
                  <Link
                    href="/varieties/veiltail-zebra-green"
                    className="rounded-full bg-brand/90 hover:bg-brand px-3 py-1 text-[11px] font-semibold text-white border border-white/20 shadow-sm transition-colors"
                  >
                    View Strain →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
