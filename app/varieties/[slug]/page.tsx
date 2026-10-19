import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Droplet, ThermometerSun, Waves, ShieldCheck, MessageCircle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
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
      <div className="border-b border-border bg-page">
        <div className="mx-auto flex max-w-site items-center gap-3 px-4 py-4 sm:px-6 lg:px-10">
          <Link
            href="/varieties"
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All varieties
          </Link>
          <span className="text-border" aria-hidden="true">
            /
          </span>
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-heading">
            {variety.name}
          </span>
        </div>
      </div>

      <section className="bg-page pb-20 pt-10 lg:pt-14">
        <div className="mx-auto grid max-w-site gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
          {/* Real Specimen Photography panel */}
          <Reveal className="lg:col-span-7">
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                <Image
                  src={variety.image}
                  alt={`${variety.name} Pure Strain Guppy`}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-border/80 bg-surface/90 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-heading backdrop-blur-md shadow-sm">
                  {variety.line}
                </span>
                <span className="rounded-full border border-border/80 bg-surface/90 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-body backdrop-blur-md shadow-sm">
                  {variety.careLevel} care
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-secondary/70 px-5 py-4">
                <p className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider text-brand font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                  Authentic Breeder Specimen Photography
                </p>
                <p className="font-sans text-xs uppercase tracking-wider text-muted">
                  Raised at Kanyakumari Hatchery
                </p>
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <p className="inline-block rounded-full border border-brand/20 bg-secondary/80 px-3.5 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-brand">
                {variety.category}
              </p>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
                {variety.name}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 font-sans text-xs font-semibold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                {variety.availability}
              </p>
              <p className="mt-4 text-base leading-relaxed text-body">{variety.description}</p>
            </Reveal>

            <Reveal delay={180} className="mt-8">
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <h2 className="font-display text-xl font-bold text-heading">Care at a glance</h2>
                <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex items-start gap-3">
                    <ThermometerSun className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                    <div>
                      <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                        Temperature
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-heading">{careBasics.waterTemp}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Droplet className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                        pH Level
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-heading">{careBasics.ph}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Waves className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                    <div>
                      <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                        Hardness
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-heading">{careBasics.hardness}</dd>
                    </div>
                  </div>
                </dl>
                <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted">
                  General guidance for this line. Availability is confirmed personally during enquiry —
                  stock levels are verified live from current breeding tanks.
                </p>
              </div>
            </Reveal>

            <Reveal delay={240} className="mt-8">
              <a
                href={`https://wa.me/919489184047?text=${encodeURIComponent(
                  `Hi Sheferoy Guppy, I am interested in ${variety.name}. Please share the current availability and price.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center py-3 text-xs sm:text-sm shadow-teal"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp Enquiry — {variety.name}
              </a>
              <p className="mt-3 text-center font-sans text-xs text-muted">
                Direct Breeder Replies · Kanyakumari, Tamil Nadu
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/40 py-16 lg:py-20" aria-labelledby="related-heading">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
            <div className="flex items-end justify-between gap-6">
              <h2 id="related-heading" className="font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                More from the collection
              </h2>
              <Link href="/varieties" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand hover:text-brand-hover">
                View all
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((item, i) => (
                <Reveal key={item.id} delay={i * 100}>
                  <Link
                    href={`/varieties/${item.slug}`}
                    className="group relative block overflow-hidden rounded-2xl border border-border bg-surface shadow-card hover:shadow-card-hover transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                      <Image
                        src={item.image}
                        alt={`${item.name} Guppy`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand">{item.line}</p>
                      <h3 className="mt-1 font-display text-lg font-bold text-heading transition-colors group-hover:text-brand">
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
