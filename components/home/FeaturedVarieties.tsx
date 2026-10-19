"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { varieties, type Variety } from "@/lib/varieties-data";

const categories = ["All", "Guppies", "Bettas"] as const;
type CategoryFilter = (typeof categories)[number];

const INITIAL_DISPLAY_COUNT = 8;

export default function FeaturedVarieties() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    let list = varieties;
    if (activeCategory !== "All") {
      list = varieties.filter((v) => v.category === activeCategory);
    }
    return list;
  }, [activeCategory]);

  const displayed = useMemo(() => {
    if (showAll || filtered.length <= INITIAL_DISPLAY_COUNT) {
      return filtered;
    }
    return filtered.slice(0, INITIAL_DISPLAY_COUNT);
  }, [filtered, showAll]);

  return (
    <section
      id="collection"
      className="relative scroll-mt-16 bg-white py-10 sm:py-14 border-b border-border"
      aria-labelledby="collection-heading"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand">
              Pure Bloodlines
            </span>
            <h2
              id="collection-heading"
              className="mt-1 font-display text-2xl font-extrabold tracking-tight text-heading sm:text-3xl"
            >
              Featured Collection
            </h2>
            <p className="mt-1 text-sm text-body">
              Hand-picked breeding pairs and show-grade strains.
            </p>
          </div>

          <Link
            href="/varieties"
            className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold text-brand hover:text-brand-hover transition-colors"
          >
            Complete 20-Strain Catalogue
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Category Filters */}
        <div
          className="mt-6 flex flex-wrap gap-2 border-b border-border pb-4"
          role="group"
          aria-label="Fish categories"
        >
          {categories.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setShowAll(false);
                }}
                aria-pressed={active}
                className={`rounded-full px-4 py-1.5 font-sans text-xs font-semibold transition-all duration-150 ${
                  active
                    ? "bg-brand text-white shadow-teal"
                    : "border border-border bg-page text-body hover:border-brand hover:text-brand"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Compact Product Cards Grid: 4 cols on desktop, 2 cols on mobile */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {displayed.map((item: Variety) => {
            const whatsappMessage = `Hi Sheferoy Guppy, I am interested in ${item.name}. Please share the current availability and price.`;
            const whatsappUrl = `https://wa.me/919489184047?text=${encodeURIComponent(
              whatsappMessage
            )}`;

            return (
              <article
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-white shadow-card transition-all duration-300 hover:border-brand/40 hover:shadow-card-hover"
              >
                {/* Product Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.image}
                    alt={`${item.name} - ${item.category} at Sheferoy Guppy`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1 pointer-events-none">
                    <span className="rounded-full bg-white/95 px-2 py-0.5 font-sans text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-charcoal border border-border/80 shadow-sm backdrop-blur-sm">
                      {item.category}
                    </span>

                    {item.popular && (
                      <span className="rounded-full border border-gold-border bg-gold-light/95 px-2 py-0.5 font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gold-dark shadow-sm backdrop-blur-sm">
                        Popular
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
                  <div>
                    <h3 className="font-display text-xs sm:text-sm font-bold text-heading leading-snug group-hover:text-brand transition-colors line-clamp-1">
                      <Link href={`/varieties/${item.slug}`}>{item.name}</Link>
                    </h3>

                    {/* Availability Note */}
                    <p className="mt-1 flex items-center gap-1 font-sans text-[11px] font-semibold text-success">
                      <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                      {item.availability}
                    </p>
                  </div>

                  {/* WhatsApp Action */}
                  <div className="mt-3 pt-2.5 border-t border-border">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full justify-center py-1.5 text-[11px] sm:text-xs shadow-teal"
                      aria-label={`Enquire about ${item.name} on WhatsApp`}
                    >
                      <MessageCircle className="h-3 w-3" aria-hidden="true" />
                      Enquire
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View More / Show All Controls */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {filtered.length > INITIAL_DISPLAY_COUNT && (
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary text-xs px-5 py-2 hover:border-brand"
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5 mr-1" />
                  Show Top 8 Only
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5 mr-1" />
                  View All {filtered.length} Strains
                </>
              )}
            </button>
          )}

          <Link
            href="/varieties"
            className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-brand hover:text-brand-hover hover:underline"
          >
            Explore Complete Catalogue With Strain Specs
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
