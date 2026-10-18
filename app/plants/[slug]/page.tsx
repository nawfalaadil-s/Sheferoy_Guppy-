import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Lightbulb, TrendingUp, Droplet, Anchor, Leaf } from "lucide-react";
import PlantArt from "@/components/art/PlantArt";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getPlantBySlug, getRelatedPlants, plants } from "@/lib/plants-data";

interface PlantPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return plants.filter((p) => p.published).map((plant) => ({ slug: plant.slug }));
}

export async function generateMetadata({ params }: PlantPageProps): Promise<Metadata> {
  const { slug } = await params;
  const plant = getPlantBySlug(slug);

  if (!plant) {
    return { title: "Plant Not Found" };
  }

  return {
    title: `${plant.name} — Live Aquatic Plant`,
    description: plant.shortDescription,
    keywords: [plant.name, plant.scientificName, "aquarium plant", "live aquatic plant"]
      .filter(Boolean) as string[],
    alternates: { canonical: `/plants/${plant.slug}` },
    openGraph: {
      title: `${plant.name} | Sheferoy Guppy`,
      description: plant.shortDescription,
      url: `/plants/${plant.slug}`,
    },
  };
}

export default async function PlantDetailPage({ params }: PlantPageProps) {
  const { slug } = await params;
  const plant = getPlantBySlug(slug);

  if (!plant) {
    notFound();
  }

  const related = getRelatedPlants(slug, 3);

  const careRows = plant.careInformation
    ? [
        { icon: Lightbulb, label: "Lighting", value: plant.careInformation.lighting },
        { icon: TrendingUp, label: "Growth", value: plant.careInformation.growth },
        { icon: Droplet, label: "Difficulty", value: plant.careInformation.difficulty },
        { icon: Anchor, label: "Placement", value: plant.careInformation.placement },
      ]
    : [];

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-white/5 bg-obsidian">
        <div className="mx-auto flex max-w-site items-center gap-3 px-4 py-4 sm:px-6 lg:px-10">
          <Link
            href="/plants"
            className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/50 transition-colors hover:text-moss-light"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All plants
          </Link>
          <span className="text-ivory/20" aria-hidden="true">
            /
          </span>
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/80">
            {plant.name}
          </span>
        </div>
      </div>

      <section className="bg-obsidian pb-20 pt-10 lg:pt-14">
        <div className="mx-auto grid max-w-site gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
          {/* Art panel */}
          <Reveal className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-moss/25 bg-gradient-to-b from-[#0e1a15] to-obsidian">
              <div
                className="absolute inset-0 bg-[radial-gradient(75%_75%_at_50%_45%,rgba(95,158,110,0.18)_0%,rgba(9,11,13,0)_70%)]"
                aria-hidden="true"
              />
              <PlantArt type={plant.art} className="relative left-1/2 h-auto w-[68%] -translate-x-1/2" />
              <div className="absolute left-5 top-5">
                <span className="chip border-moss/40 text-moss-light">
                  <Leaf className="h-3 w-3" aria-hidden="true" />
                  Live plant
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
                <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-ivory/45">
                  Botanical illustration
                </p>
                <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-ivory/45">
                  Photography available on request
                </p>
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <div className="lg:col-span-6 lg:pl-6">
            <Reveal delay={100}>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-editorial text-moss-light">
                Botanical Collection
              </p>
              <h1 className="display-2 mt-3 text-ivory">{plant.name}</h1>
              {plant.scientificName && (
                <p className="mt-2 font-display text-xl italic text-moss-light/75">{plant.scientificName}</p>
              )}
              <p className="mt-5 text-base leading-relaxed text-mist">{plant.description}</p>
            </Reveal>

            {careRows.length > 0 && (
              <Reveal delay={180} className="mt-8">
                <div className="rounded-2xl border border-moss/25 bg-[#0d1613] p-6">
                  <h2 className="font-display text-xl text-ivory">Care requirements</h2>
                  <dl className="mt-5 space-y-4">
                    {careRows.map((row) => (
                      <div key={row.label} className="flex items-start gap-4">
                        <row.icon className="mt-0.5 h-5 w-5 shrink-0 text-moss-light" aria-hidden="true" />
                        <div>
                          <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory/50">
                            {row.label}
                          </dt>
                          <dd className="mt-0.5 text-sm leading-relaxed text-ivory/90">{row.value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            )}

            {plant.aquariumUses && plant.aquariumUses.length > 0 && (
              <Reveal delay={240} className="mt-6">
                <div className="rounded-2xl border border-moss/25 bg-[#0d1613] p-6">
                  <h2 className="font-display text-xl text-ivory">Aquarium uses</h2>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {plant.aquariumUses.map((use) => (
                      <li key={use} className="flex items-start gap-2.5 text-sm leading-relaxed text-ivory/85">
                        <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-moss" aria-hidden="true" />
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            <Reveal delay={300} className="mt-8">
              <WhatsAppButton variety={`${plant.name} plant`} variant="moss" className="w-full justify-center py-4">
                Enquire about {plant.name}
              </WhatsAppButton>
              <p className="mt-4 text-center font-sans text-[10px] uppercase tracking-[0.22em] text-ivory/40">
                Availability confirmed personally during enquiry
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-white/5 bg-abyss py-16 lg:py-20" aria-labelledby="related-plants-heading">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
            <div className="flex items-end justify-between gap-6">
              <h2 id="related-plants-heading" className="display-3 text-ivory">
                More from the botanical collection
              </h2>
              <Link href="/plants" className="btn-link shrink-0">
                View all
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((item, i) => (
                <Reveal key={item.id} delay={i * 100}>
                  <Link
                    href={`/plants/${item.slug}`}
                    className="group relative block overflow-hidden rounded-2xl border border-moss/20 bg-[#0d1613] transition-all duration-500 ease-luxe hover:border-moss-light/40"
                  >
                    <div className="relative">
                      <PlantArt
                        type={item.art}
                        className="relative left-1/2 h-auto w-[58%] -translate-x-1/2 transition-transform duration-700 ease-luxe group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="p-5 pt-0">
                      <h3 className="font-display text-2xl text-ivory transition-colors group-hover:text-moss-light">
                        {item.name}
                      </h3>
                      {item.scientificName && (
                        <p className="mt-0.5 font-display text-sm italic text-moss-light/60">
                          {item.scientificName}
                        </p>
                      )}
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
