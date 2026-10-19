"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { varieties, type Variety } from "@/lib/varieties-data";

const categories = ["All", "Guppies", "Bettas"] as const;
type CategoryFilter = (typeof categories)[number];

export default function FeaturedVarieties() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return varieties;
    return varieties.filter((v) => v.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="collection"
      className="relative scroll-mt-16 bg-white py-12 sm:py-16 lg:py-20 border-b border-border"
      aria-labelledby="collection-heading"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="collection-heading"
              className="font-display text-2xl font-extrabold tracking-tight text-heading sm:text-3xl lg:text-4xl"
            >
              Explore Our Collection
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-body">
              Discover your next favourite fish.
            </p>
          </div>

          <Link
            href="/varieties"
            className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold text-brand hover:text-brand-hover transition-colors"
          >
            View All Varieties
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
                onClick={() => setActiveCategory(category)}
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

        {/* Product Cards Grid: 4 cols desktop, 2-3 cols tablet, 1-2 cols mobile */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
          {filtered.map((item: Variety) => {
            const whatsappMessage = `Hi Sheferoy Guppy, I am interested in ${item.name}. Please share the current availability and price.`;
            const whatsappUrl = `https://wa.me/919489184047?text=${encodeURIComponent(
              whatsappMessage
            )}`;

            return (
              <article
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-all duration-300 hover:border-brand/40 hover:shadow-card-hover"
              >
                {/* Product Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.image}
                    alt={`${item.name} - ${item.category} at Sheferoy Guppy`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
                    <span className="rounded-full bg-white/95 px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-charcoal border border-border/80 shadow-sm backdrop-blur-sm">
                      {item.category}
                    </span>

                    {item.popular && (
                      <span className="rounded-full border border-gold-border bg-gold-light/95 px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-gold-dark shadow-sm backdrop-blur-sm">
                        Popular
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="font-display text-sm sm:text-base font-bold text-heading leading-snug group-hover:text-brand transition-colors">
                      <Link href={`/varieties/${item.slug}`}>
                        {item.name}
                      </Link>
                    </h3>

                    {/* Availability Note */}
                    <p className="mt-1.5 flex items-center gap-1.5 font-sans text-xs font-semibold text-success">
                      <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                      {item.availability}
                    </p>
                  </div>

                  {/* WhatsApp Action */}
                  <div className="mt-4 pt-3 border-t border-border">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full justify-center py-2 text-xs shadow-teal"
                      aria-label={`Enquire about ${item.name} on WhatsApp`}
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      WhatsApp Enquiry
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
