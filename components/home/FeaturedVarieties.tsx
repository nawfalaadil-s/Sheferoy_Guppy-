import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { varieties } from "@/lib/varieties-data";
import type { FeaturedSectionContent } from "@/lib/cms-types";

interface FeaturedVarietiesProps {
  content?: FeaturedSectionContent;
}

const DEFAULT_FEATURED_SLUGS = [
  "veiltail-zebra-green",
  "24k-gold-guppy",
  "moscow-blue",
  "thai-flag-betta",
  "purple-berry-dragon-dumbo-ear",
];

export default function FeaturedVarieties({ content }: FeaturedVarietiesProps) {
  const badge = content?.badge || "Selected Collection";
  const heading = content?.heading || "Featured Ornamental Fish";
  const subheading =
    content?.subheading ||
    "Explore selected guppy and betta varieties from Sheferoy Guppy.";

  // Determine items: either customItems, or resolved productSlugs, or defaults
  let displayItems: {
    slug: string;
    name: string;
    category: "Guppies" | "Bettas";
    image: string;
    availability: string;
  }[] = [];

  if (content?.customItems && content.customItems.length > 0) {
    displayItems = content.customItems;
  } else {
    const slugs = content?.productSlugs || DEFAULT_FEATURED_SLUGS;
    displayItems = slugs.map((slug) => {
      const found = varieties.find((v) => v.slug === slug);
      if (found) {
        const displayName = found.slug === "24k-gold-guppy" ? "24K Gold Guppy" : found.name;
        return {
          slug: found.slug,
          name: displayName,
          category: found.category,
          image: found.image,
          availability: "Enquire for Availability",
        };
      }
      return {
        slug,
        name: slug.replace(/-/g, " "),
        category: "Guppies",
        image: `/images/varieties/${slug}.jpg`,
        availability: "Enquire for Availability",
      };
    });
  }

  return (
    <section
      id="featured-fish"
      className="relative scroll-mt-16 bg-white py-12 sm:py-16 border-b border-border"
      aria-labelledby="featured-heading"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand">
              {badge}
            </span>
            <h2
              id="featured-heading"
              className="mt-1 font-display text-2xl font-extrabold tracking-tight text-heading sm:text-3xl"
            >
              {heading}
            </h2>
            <p className="mt-1.5 text-sm text-body sm:text-base">
              {subheading}
            </p>
          </div>

          <Link
            href="/varieties"
            className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold text-brand hover:text-brand-hover transition-colors"
          >
            View Full Collection
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Featured Products Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-6">
          {displayItems.map((item) => {
            const whatsappMessage = `Hi Sheferoy Guppy, I am interested in ${item.name}. Please share the current availability and price.`;
            const whatsappUrl = `https://wa.me/919489184047?text=${encodeURIComponent(
              whatsappMessage
            )}`;

            return (
              <article
                key={item.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-all duration-300 hover:border-brand/40 hover:shadow-card-hover"
              >
                {/* Product Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.image}
                    alt={`${item.name} ornamental fish at Sheferoy Guppy`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Category Pill */}
                  <div className="absolute top-2.5 left-2.5 pointer-events-none">
                    <span className="rounded-full bg-white/95 px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-charcoal border border-border/80 shadow-sm backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="font-display text-base font-bold text-heading leading-snug group-hover:text-brand transition-colors">
                      <Link href={`/varieties/${item.slug}`}>{item.name}</Link>
                    </h3>

                    {/* Stock status */}
                    <p className="mt-1.5 flex items-center gap-1.5 font-sans text-xs font-semibold text-charcoal/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                      {item.availability}
                    </p>
                  </div>

                  {/* Enquiry Action Button */}
                  <div className="mt-4 pt-3 border-t border-border">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full justify-center py-2 text-xs shadow-teal"
                      aria-label={`Enquire for availability of ${item.name} on WhatsApp`}
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      Enquire for Availability
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Link to Full Catalog */}
        <div className="mt-10 text-center">
          <Link
            href="/varieties"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-page px-6 py-3 font-sans text-xs sm:text-sm font-semibold text-heading hover:border-brand hover:text-brand transition-all shadow-sm"
          >
            <span>Explore all varieties in our full catalogue</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
