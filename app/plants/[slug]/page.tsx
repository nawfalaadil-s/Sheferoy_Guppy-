import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Lightbulb, TrendingUp, Droplet, Anchor, Leaf } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getPlantBySlug, getRelatedPlants, plants, type Plant } from "@/lib/plants-data";
import { getDbPlantBySlug } from "@/lib/database-service";

export const dynamicParams = true;
export const revalidate = 0;

interface PlantPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return plants.filter((p) => p.published).map((plant) => ({ slug: plant.slug }));
}

export async function generateMetadata({ params }: PlantPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbItem = await getDbPlantBySlug(slug);
  const plant = dbItem || getPlantBySlug(slug);

  if (!plant) {
    return { title: "Plant Not Found" };
  }

  const desc = "short_description" in plant ? plant.short_description : (plant as Plant).shortDescription;
  const sci = "scientific_name" in plant ? plant.scientific_name : (plant as Plant).scientificName;

  return {
    title: `${plant.name} — Live Aquatic Plant | Sheferoy Guppy`,
    description: desc || "",
    keywords: [plant.name, sci, "aquarium plant", "live aquatic plant", "Sheferoy Guppy"]
      .filter(Boolean) as string[],
    alternates: { canonical: `/plants/${plant.slug}` },
    openGraph: {
      title: `${plant.name} | Sheferoy Guppy`,
      description: desc || "",
      url: `/plants/${plant.slug}`,
    },
  };
}

export default async function PlantDetailPage({ params }: PlantPageProps) {
  const { slug } = await params;
  const dbItem = await getDbPlantBySlug(slug);
  const localItem = getPlantBySlug(slug);

  if (!dbItem && !localItem) {
    notFound();
  }

  const plant: Plant = {
    id: dbItem?.id || localItem?.id || slug,
    name: dbItem?.name || localItem?.name || slug,
    slug: dbItem?.slug || localItem?.slug || slug,
    scientificName: dbItem?.scientific_name || localItem?.scientificName || "",
    shortDescription: dbItem?.short_description || localItem?.shortDescription || "",
    description: dbItem?.description || localItem?.description || "",
    image: dbItem?.image || localItem?.image || "/images/plants/pennywort.jpg",
    published: dbItem ? (dbItem.is_published !== false) : (localItem?.published ?? true),
    careInformation: {
      lighting: dbItem?.care_lighting || localItem?.careInformation?.lighting || "Moderate",
      growth: dbItem?.care_growth || localItem?.careInformation?.growth || "Moderate",
      difficulty: dbItem?.care_difficulty || localItem?.careInformation?.difficulty || "Easy",
      placement: dbItem?.care_placement || localItem?.careInformation?.placement || "Midground",
    },
    aquariumUses: dbItem?.aquarium_uses || localItem?.aquariumUses || ["Community tanks", "Nitrate absorption"],
  };

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
      <div className="border-b border-border bg-page">
        <div className="mx-auto flex max-w-site items-center gap-3 px-4 py-4 sm:px-6 lg:px-10">
          <Link
            href="/plants"
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All plants
          </Link>
          <span className="text-border" aria-hidden="true">
            /
          </span>
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-heading">
            {plant.name}
          </span>
        </div>
      </div>

      <section className="bg-page pb-20 pt-10 lg:pt-14">
        <div className="mx-auto grid max-w-site gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
          {/* Specimen Photography panel */}
          <Reveal className="lg:col-span-6">
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                <Image
                  src={plant.image}
                  alt={plant.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
              <div className="absolute left-5 top-5">
                <span className="rounded-full border border-border/80 bg-surface/90 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-brand backdrop-blur-md shadow-sm">
                  <Leaf className="inline h-3.5 w-3.5 mr-1 text-success" aria-hidden="true" />
                  Live Aquatic Botanical
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-border bg-secondary/70 px-5 py-4">
                <p className="font-sans text-xs uppercase tracking-wider text-brand font-semibold">
                  Authentic Botanical Photography
                </p>
                <p className="font-sans text-xs uppercase tracking-wider text-muted">
                  Conditioned in Balanced Water
                </p>
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <div className="lg:col-span-6 lg:pl-6">
            <Reveal delay={100}>
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-brand">
                Botanical Collection
              </p>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">{plant.name}</h1>
              {plant.scientificName && (
                <p className="mt-2 font-display text-lg italic text-brand/80">{plant.scientificName}</p>
              )}
              <p className="mt-4 text-base leading-relaxed text-body">{plant.description}</p>
            </Reveal>

            {careRows.length > 0 && (
              <Reveal delay={180} className="mt-8">
                <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                  <h2 className="font-display text-xl font-bold text-heading">Care requirements</h2>
                  <dl className="mt-5 space-y-4">
                    {careRows.map((row) => (
                      <div key={row.label} className="flex items-start gap-4">
                        <row.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                        <div>
                          <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                            {row.label}
                          </dt>
                          <dd className="mt-0.5 text-sm leading-relaxed text-heading font-medium">{row.value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            )}

            {plant.aquariumUses && plant.aquariumUses.length > 0 && (
              <Reveal delay={240} className="mt-6">
                <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                  <h2 className="font-display text-xl font-bold text-heading">Aquarium uses</h2>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {plant.aquariumUses.map((use) => (
                      <li key={use} className="flex items-start gap-2.5 text-sm leading-relaxed text-body">
                        <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            <Reveal delay={300} className="mt-8">
              <WhatsAppButton variety={`${plant.name} plant`} className="w-full justify-center py-4 bg-brand hover:bg-brand-hover text-white shadow-md">
                Enquire about {plant.name}
              </WhatsAppButton>
              <p className="mt-4 text-center font-sans text-[10px] uppercase tracking-[0.22em] text-muted">
                Availability confirmed personally during enquiry
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/40 py-16 lg:py-20" aria-labelledby="related-plants-heading">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
            <div className="flex items-end justify-between gap-6">
              <h2 id="related-plants-heading" className="font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                More from the botanical collection
              </h2>
              <Link href="/plants" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand hover:text-brand-hover">
                View all
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((item, i) => (
                <Reveal key={item.id} delay={i * 100}>
                  <Link
                    href={`/plants/${item.slug}`}
                    className="group relative block overflow-hidden rounded-2xl border border-border bg-surface shadow-card hover:shadow-card-hover transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold text-heading transition-colors group-hover:text-brand">
                        {item.name}
                      </h3>
                      {item.scientificName && (
                        <p className="mt-0.5 text-xs italic text-brand/70">
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
