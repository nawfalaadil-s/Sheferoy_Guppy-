import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getActiveOffers } from "@/lib/offers-data";
import { getVarietyBySlug } from "@/lib/varieties-data";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Offers & New Arrivals | Sheferoy Guppy",
  description:
    "Current offers and new arrivals at Sheferoy Guppy — rare strains, breeding pairs and special collections, available while stock lasts. Enquire on WhatsApp.",
  alternates: { canonical: "/offers" },
  openGraph: {
    title: "Offers & New Arrivals | Sheferoy Guppy",
    description: "Rare strains, breeding pairs and special collections — available while stock lasts.",
    url: "/offers",
  },
};

function matchVarietySlug(title: string): string | null {
  const t = title.toLowerCase();
  if (t.includes("moscow blue")) return "moscow-blue";
  if (t.includes("platinum")) return "platinum-white";
  if (t.includes("red dragon")) return "red-dragon";
  if (t.includes("tuxedo") || t.includes("koi")) return "tuxedo-koi";
  return null;
}

export default function OffersPage() {
  const activeOffers = getActiveOffers();

  return (
    <>
      <PageHeader
        eyebrow="Offers & Arrivals"
        tone="gold"
        title={
          <>
            Fresh From the Tanks —{" "}
            <span className="font-display italic text-brand">While They Last</span>
          </>
        }
        description="Selections change with each spawning cycle. Everything below is confirmed individually on WhatsApp before anything is promised."
      />

      <section className="bg-page pb-24 pt-12">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          {activeOffers.length === 0 ? (
            <div className="rounded-3xl border border-border bg-surface px-8 py-20 text-center shadow-card">
              <p className="font-display text-2xl font-bold text-heading">No live offers this week.</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-body">
                New arrivals are announced first on Instagram and to WhatsApp enquirers — message us to be
                notified when the next batch drops.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <WhatsAppButton className="bg-brand hover:bg-brand-hover text-white shadow-sm">Get arrival alerts</WhatsAppButton>
                <Link href="/varieties" className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-xs font-semibold text-heading hover:border-brand hover:text-brand transition-colors">
                  Browse varieties
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {activeOffers.map((offer, i) => {
                const varietySlug = matchVarietySlug(offer.title);
                const variety = varietySlug ? getVarietyBySlug(varietySlug) : undefined;
                const featured = offer.isFeatured;

                return (
                  <Reveal key={offer.id} delay={i * 80}>
                    <article
                      className={`group relative grid overflow-hidden rounded-3xl border border-border bg-surface shadow-card hover:shadow-card-hover transition-all duration-300 lg:grid-cols-12`}
                    >
                      {featured && (
                        <span className="absolute left-0 top-0 z-10 rounded-br-2xl bg-gold px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-heading shadow-sm">
                          ★ Featured Batch
                        </span>
                      )}

                      <div
                        className={`relative min-h-[220px] overflow-hidden bg-secondary lg:col-span-4 ${
                          featured ? "" : "hidden"
                        }`}
                      >
                        {variety && (
                          <div className="relative h-full min-h-[220px] w-full">
                            <Image
                              src={variety.image}
                              alt={variety.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 1024px) 100vw, 33vw"
                            />
                          </div>
                        )}
                      </div>

                      <div className={`flex flex-col p-7 lg:p-9 ${featured ? "lg:col-span-8" : "lg:col-span-12"}`}>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            featured ? "bg-gold/15 text-heading border border-gold/40" : "bg-secondary text-brand border border-border"
                          }`}>
                            {offer.isFeatured ? "Rare Strain" : "Special Batch"}
                          </span>
                          {offer.startDate && (
                            <span className="inline-flex items-center gap-1.5 font-sans text-xs text-muted">
                              <CalendarDays className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                              From{" "}
                              {new Date(offer.startDate).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                              })}
                              {offer.endDate &&
                                ` — ${new Date(offer.endDate).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                })}`}
                            </span>
                          )}
                        </div>

                        <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold leading-snug text-heading">
                          {offer.title}
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body">{offer.description}</p>

                        <div className="mt-auto flex flex-wrap items-center gap-4 pt-7">
                          <WhatsAppButton variety={offer.title} className="bg-brand hover:bg-brand-hover text-white shadow-sm">
                            Enquire on WhatsApp
                          </WhatsAppButton>
                          {variety && (
                            <Link href={`/varieties/${variety.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-hover">
                              View strain details
                              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}

          <p className="mt-12 text-center text-xs leading-relaxed text-muted">
            Offers reflect current availability at the time of publishing. Stock, sizes and pairings are
            always confirmed personally via WhatsApp before dispatch.
          </p>
        </div>
      </section>
    </>
  );
}
