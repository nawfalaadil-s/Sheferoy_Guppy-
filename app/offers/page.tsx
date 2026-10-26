import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Tag } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getDbOffers } from "@/lib/database-service";
import { getActiveOffers } from "@/lib/offers-data";

export const revalidate = 0;

export interface UnifiedOffer {
  id?: number;
  title: string;
  description: string;
  image?: string;
  start_date?: string | null;
  startDate?: string | null;
  end_date?: string | null;
  endDate?: string | null;
  is_active?: boolean;
  isActive?: boolean;
  is_featured?: boolean;
  isFeatured?: boolean;
}

export const metadata: Metadata = {
  title: "Offers & Spawning Announcements | Sheferoy Guppy",
  description:
    "Current offers and new spawn arrivals at Sheferoy Guppy — rare strains, breeding pairs, and special batches, available while stock lasts.",
  alternates: { canonical: "/offers" },
  openGraph: {
    title: "Offers & Spawning Announcements | Sheferoy Guppy",
    description: "Rare strains, breeding pairs, and special collections — direct from the breeder.",
    url: "/offers",
  },
};

export default async function OffersPage() {
  let activeOffers: UnifiedOffer[] = [];
  try {
    const dbOffers = await getDbOffers(true);
    if (dbOffers && dbOffers.length > 0) {
      activeOffers = dbOffers;
    } else {
      activeOffers = getActiveOffers();
    }
  } catch {
    activeOffers = getActiveOffers();
  }

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
              <p className="font-display text-2xl font-bold text-heading">No live announcements today.</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-body">
                New arrivals are announced directly to WhatsApp enquirers — message us to be
                notified when the next batch drops.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <WhatsAppButton className="bg-brand hover:bg-brand-hover text-white shadow-sm">
                  Get arrival alerts
                </WhatsAppButton>
                <Link
                  href="/varieties"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-xs font-semibold text-heading hover:border-brand hover:text-brand transition-colors"
                >
                  <span>Browse varieties</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeOffers.map((offer, idx) => (
                <Reveal key={offer.id || idx} delay={idx * 60}>
                  <div className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-card transition-all duration-300 hover:border-brand/40 hover:shadow-card-hover">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-[11px] font-bold text-gold-dark">
                          <Tag className="h-3 w-3" />
                          Spawning Special
                        </span>
                        {offer.end_date && (
                          <span className="text-xs text-muted font-mono flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            Until {offer.end_date}
                          </span>
                        )}
                      </div>

                      {offer.image && (
                        <div className="mt-4 relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-page">
                          <Image src={offer.image} alt={offer.title} fill className="object-cover" />
                        </div>
                      )}

                      <h3 className="mt-4 font-display text-xl font-bold text-heading">
                        {offer.title}
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-body">
                        {offer.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                      <WhatsAppButton
                        variety={offer.title}
                        className="btn-primary w-full justify-center py-2.5 text-xs shadow-teal"
                      >
                        Enquire on WhatsApp
                      </WhatsAppButton>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
