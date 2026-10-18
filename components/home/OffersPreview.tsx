import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { getActiveOffers } from "@/lib/offers-data";

export default function OffersPreview() {
  const offers = getActiveOffers();
  if (offers.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-obsidian py-20 lg:py-28" aria-labelledby="offers-heading">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-gold/70" aria-hidden="true" />
                Current Announcements
              </p>
              <h2 id="offers-heading" className="display-2 mt-4 text-ivory">
                New Arrivals & <span className="font-display italic text-gold-light">Open Offers</span>
              </h2>
            </div>
            <Link href="/offers" className="btn-link shrink-0">
              All announcements
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 space-y-4">
          {offers.slice(0, 3).map((offer, i) => (
            <Reveal key={offer.id} delay={i * 100}>
              <article className="group grid gap-4 rounded-2xl border border-gold/10 bg-abyss/80 p-6 transition-all duration-500 ease-luxe hover:border-gold/30 sm:grid-cols-12 sm:items-center lg:p-7">
                <div className="sm:col-span-2">
                  <span className="chip border-gold/40">
                    {offer.isFeatured ? "Featured" : "Announcement"}
                  </span>
                </div>
                <div className="sm:col-span-7">
                  <h3 className="font-display text-2xl text-ivory">{offer.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mist">{offer.description}</p>
                </div>
                <div className="flex flex-col gap-3 sm:col-span-3 sm:items-end">
                  {offer.endDate && (
                    <p className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-light/80">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      Until{" "}
                      {new Date(offer.endDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  <Link
                    href="/offers"
                    className="btn-link"
                    aria-label={`Read more about: ${offer.title}`}
                  >
                    Details
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
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
