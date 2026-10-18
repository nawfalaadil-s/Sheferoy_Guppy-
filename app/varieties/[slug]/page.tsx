import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Droplet, ThermometerSun, Waves } from "lucide-react";
import GuppyArt from "@/components/art/GuppyArt";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getVarietyBySlug, getRelatedVarieties, guppyVarieties } from "@/lib/varieties-data";

interface VarietyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return guppyVarieties.filter((v) => v.published).map((variety) => ({ slug: variety.slug }));
}

export async function generateMetadata({ params }: VarietyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const variety = getVarietyBySlug(slug);

  if (!variety) {
    return { title: "Variety Not Found" };
  }

  const title = `${variety.name} Guppy — ${variety.line}`;
  return {
    title,
    description: variety.description,
    alternates: { canonical: `/varieties/${variety.slug}` },
    openGraph: {
      title: `${title} | Sheferoy Guppy`,
      description: variety.description,
      url: `/varieties/${variety.slug}`,
    },
  };
}

const careBasics = {
  waterTemp: "24–28°C",
  ph: "6.8–7.8",
  hardness: "8–12 dGH",
};

export default async function VarietyDetailPage({ params }: VarietyPageProps) {
  const { slug } = await params;
  const variety = getVarietyBySlug(slug);

  if (!variety) {
    notFound();
  }

  const related = getRelatedVarieties(slug, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-white/5 bg-obsidian">
        <div className="mx-auto flex max-w-site items-center gap-3 px-4 py-4 sm:px-6 lg:px-10">
          <Link
            href="/varieties"
            className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/50 transition-colors hover:text-gold-light"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All varieties
          </Link>
          <span className="text-ivory/20" aria-hidden="true">
            /
          </span>
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/80">
            {variety.name}
          </span>
        </div>
      </div>

      <section className="bg-obsidian pb-20 pt-10 lg:pt-14">
        <div className="mx-auto grid max-w-site gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
          {/* Art panel */}
          <Reveal className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-gold/15 bg-gradient-to-b from-ink to-obsidian">
              <div
                className="absolute inset-0 bg-[radial-gradient(80%_75%_at_58%_42%,rgba(199,164,90,0.12)_0%,rgba(9,11,13,0)_68%)]"
                aria-hidden="true"
              />
              <GuppyArt
                colorway={variety.art}
                animated
                className="relative h-auto w-full translate-x-[-1%]"
              />
              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                <span className="chip">{variety.line}</span>
                <span className="chip border-white/20 text-ivory/80">{variety.careLevel} care</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
                <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-ivory/45">
                  Illustrated strain reference
                </p>
                <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-ivory/45">
                  Specimen photography available on request
                </p>
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <p className="eyebrow">{variety.category}</p>
              <h1 className="display-2 mt-3 text-ivory">{variety.name}</h1>
              <p className="mt-5 text-base leading-relaxed text-mist">{variety.description}</p>
            </Reveal>

            <Reveal delay={180} className="mt-8">
              <div className="rounded-2xl border border-gold/15 bg-abyss p-6">
                <h2 className="font-display text-xl text-ivory">Care at a glance</h2>
                <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex items-start gap-3">
                    <ThermometerSun className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                    <div>
                      <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory/50">
                        Temperature
                      </dt>
                      <dd className="mt-1 text-sm text-ivory">{careBasics.waterTemp}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Droplet className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                    <div>
                      <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory/50">
                        pH Level
                      </dt>
                      <dd className="mt-1 text-sm text-ivory">{careBasics.ph}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Waves className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                    <div>
                      <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory/50">
                        Hardness
                      </dt>
                      <dd className="mt-1 text-sm text-ivory">{careBasics.hardness}</dd>
                    </div>
                  </div>
                </dl>
                <p className="mt-5 border-t border-white/5 pt-4 text-xs leading-relaxed text-ivory/45">
                  General guidance for this line. Availability is confirmed personally during enquiry —
                  stock levels are never guaranteed on this page.
                </p>
              </div>
            </Reveal>

            <Reveal delay={240} className="mt-8">
              <WhatsAppButton variety={`${variety.name} guppy`} className="w-full justify-center py-4">
                Enquire about {variety.name}
              </WhatsAppButton>
              <p className="mt-4 text-center font-sans text-[10px] uppercase tracking-[0.22em] text-ivory/40">
                Safe pan-India shipping · Kanyakumari, Tamil Nadu
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-white/5 bg-abyss py-16 lg:py-20" aria-labelledby="related-heading">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
            <div className="flex items-end justify-between gap-6">
              <h2 id="related-heading" className="display-3 text-ivory">
                More from the collection
              </h2>
              <Link href="/varieties" className="btn-link shrink-0">
                View all
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((item, i) => (
                <Reveal key={item.id} delay={i * 100}>
                  <Link
                    href={`/varieties/${item.slug}`}
                    className="group relative block overflow-hidden rounded-2xl border border-gold/10 bg-gradient-to-b from-ink to-obsidian transition-all duration-500 ease-luxe hover:border-gold/30"
                  >
                    <div className="relative">
                      <GuppyArt
                        colorway={item.art}
                        className="absolute left-1/2 top-1/2 h-auto w-[126%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-luxe group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" aria-hidden="true" />
                      <div className="relative aspect-[4/3]" aria-hidden="true" />
                    </div>
                    <div className="p-5 pt-0">
                      <p className="eyebrow">{item.line}</p>
                      <h3 className="mt-1.5 font-display text-2xl text-ivory transition-colors group-hover:text-gold-light">
                        {item.name}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
