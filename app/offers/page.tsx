import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getActiveOffers } from "@/lib/offers-data";
import { getVarietyBySlug } from "@/lib/varieties-data";
import GuppyArt from "@/components/art/GuppyArt";

export const metadata: Metadata = {
  title: "Offers & New Arrivals",
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
        title={
          <>
            Fresh From the Tanks —{" "}
            <span className="font-display italic text-gold-light">While They Last</span>
          </>
        }
        description="Selections change with each spawning season. Everything below is confirmed individually on WhatsApp before anything is promised."
      />

      <section className="bg-obsidian pb-24 pt-12">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          {activeOffers.length === 0 ? (
            <div className="rounded-3xl border border-gold/10 bg-abyss px-8 py-20 text-center">
              <p className="font-display text-3xl text-ivory">No live offers this week.</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist">
                New arrivals are announced first on Instagram and to WhatsApp enquirers — message us to be
                told when the next drop lands.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <WhatsAppButton>Get arrival alerts</WhatsAppButton>
                <Link href="/varieties" className="btn-ghost">
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
                      className={`group relative grid overflow-hidden rounded-3xl border transition-all duration-500 ease-luxe lg:grid-cols-12 ${
                        featured
                          ? "border-gold/30 bg-gradient-to-br from-[#151208] to-abyss hover:border-gold/50"
                          : "border-gold/12 bg-abyss hover:border-gold/30"
                      }`}
                    >
                      {featured && (
                        <span className="absolute left-0 top-0 z-10 rounded-br-2xl bg-gold px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian">
                          Featured arrival
                        </span>
                      )}

                      <div
                        className={`relative min-h-[220px] overflow-hidden lg:col-span-4 ${
                          featured ? "" : "hidden"
                        }`}
                      >
                        {variety && (
                          <>
                            <div
                              className="absolute inset-0 bg-[radial-gradient(80%_80%_at_55%_45%,rgba(199,164,90,0.14)_0%,rgba(9,11,13,0)_68%)]"
                              aria-hidden="true"
                            />
                            <GuppyArt
                              colorway={variety.art}
                              className="absolute left-1/2 top-1/2 h-auto w-[135%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-luxe group-hover:scale-[1.04]"
                            />
                          </>
                        )}
                      </div>

                      <div className={`flex flex-col p-7 lg:p-9 ${featured ? "lg:col-span-8" : "lg:col-span-12"}`}>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                          <span className="chip">
                            {offer.isFeatured ? "Rare strain" : "In focus"}
                          </span>
                          {offer.startDate && (
                            <span className="inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory/45">
                              <CalendarDays className="h-3 w-3" aria-hidden="true" />
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

                        <h2 className="mt-4 font-display text-3xl leading-snug text-ivory sm:text-4xl">
                          {offer.title}
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist">{offer.description}</p>

                        <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                          <WhatsAppButton variety={offer.title}>Enquire on WhatsApp</WhatsAppButton>
                          {variety && (
                            <Link href={`/varieties/${variety.slug}`} className="btn-link">
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

          <p className="mt-12 text-center text-xs leading-relaxed text-ivory/40">
            Offers reflect current availability at the time of publishing. Stock, sizes and pairings are
            always confirmed personally before dispatch.
          </p>
        </div>
      </section>
    </>
  );
}
