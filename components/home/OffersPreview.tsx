import Link from "next/link";
import { ArrowRight, CalendarDays, Tag } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { getActiveOffers } from "@/lib/offers-data";

export default function OffersPreview() {
  const offers = getActiveOffers();
  if (offers.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-secondary/50 py-20 lg:py-28 border-t border-border" aria-labelledby="offers-heading">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-heading">
                <Tag className="h-3 w-3 text-gold" />
                Hatchery Batches & Highlights
              </div>
              <h2 id="offers-heading" className="mt-4 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl lg:text-5xl">
                Current Arrivals & <span className="text-brand">Breeder Bundles</span>
              </h2>
              <p className="mt-3 text-sm text-body">
                Selected juvenile trios, starter community kits, and botanical pairs ready for secure pan-India dispatch.
              </p>
            </div>
            <Link
              href="/offers"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand hover:text-brand-hover transition-colors font-sans"
            >
              All Announcements
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 space-y-4">
          {offers.slice(0, 3).map((offer, i) => (
            <Reveal key={offer.id} delay={i * 80}>
              <article className="group grid gap-4 rounded-2xl border border-border bg-surface p-6 shadow-card hover:shadow-card-hover transition-all duration-300 sm:grid-cols-12 sm:items-center lg:p-7">
                <div className="sm:col-span-2">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    offer.isFeatured
                      ? "bg-gold/15 text-heading border border-gold/40"
                      : "bg-secondary text-brand border border-border"
                  }`}>
                    {offer.isFeatured ? "★ Featured" : "Batch Deal"}
                  </span>
                </div>
                <div className="sm:col-span-7">
                  <h3 className="font-display text-xl font-bold text-heading transition-colors group-hover:text-brand">
                    {offer.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-body">
                    {offer.description}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:col-span-3 sm:items-end">
                  {offer.endDate && (
                    <p className="inline-flex items-center gap-1.5 text-xs text-muted">
                      <CalendarDays className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                      Valid until{" "}
                      {new Date(offer.endDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  <Link
                    href="/offers"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand-hover transition-colors"
                  >
                    View Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
