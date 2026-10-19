import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Fish, MapPin, Truck, Users } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "About — Bloodline Breeder in Kanyakumari | Sheferoy Guppy",
  description:
    "Sheferoy Guppy is a premium ornamental guppy bloodline breeder based in Kanyakumari, Tamil Nadu — 65+ varieties, safe pan-India shipping and a community of 1,700+ hobbyists.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Sheferoy Guppy",
    description:
      "A premium ornamental guppy bloodline breeder in Kanyakumari, Tamil Nadu — 65+ varieties, safe pan-India shipping.",
    url: "/about",
  },
};

const pillars = [
  {
    icon: Fish,
    title: "Bloodline first",
    text: "Every line is bred for colour depth, finnage and vigour — culled honestly, generation after generation.",
  },
  {
    icon: Truck,
    title: "Safe pan-India shipping",
    text: "Oxygen-packed, insulated and tracked — followed up until your fish are settled safely in their new tank.",
  },
  {
    icon: Users,
    title: "1,700+ hobbyists",
    text: "Beginners and seasoned breeders across India keep our lines. Their aquariums are our pride.",
  },
  {
    icon: MapPin,
    title: "Kanyakumari, Tamil Nadu",
    text: "The southernmost tip of India — warm, stable water conditions and a coastal climate that breeds vigorous fish.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the Hatchery"
        title={
          <>
            Bred at the Tip of India,{" "}
            <span className="font-display italic text-brand">Raised with Patience</span>
          </>
        }
        description="Sheferoy Guppy is a premium ornamental guppy breeding hatchery in Kanyakumari, Tamil Nadu — dedicated to exceptional colour, healthy genetics and honest guidance."
      />

      {/* Story */}
      <section className="bg-page pb-20 pt-12 lg:pt-16">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-brand">Our Passion for Genetics</p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
                A breeding room run like a gallery, with water chemistry as the curator.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-body">
                <p>
                  Sheferoy Guppy began with a simple obsession — the way a well-bred Moscow Blue holds its
                  depth under morning light. That obsession became a dedicated hatchery operation: over 65 distinct
                  guppy varieties maintained across specialized breeding tanks, each line selected and culled to
                  preserve the traits that make these fish extraordinary.
                </p>
                <p>
                  From solid colours to intricate mosaic patterns, metallic sheens to elaborate fin formations, our
                  collection represents some of the finest specimens available to aquarium enthusiasts in
                  India. Alongside the fish, we cultivate live aquatic plants that do
                  the quiet work — sheltering fry, balancing nitrates, and making every tank a living ecosystem.
                </p>
                <p>
                  Whether you are starting your first planted guppy community or hunting high-grade breeding stock to
                  refine a line of your own, we are here to assist — with healthy specimens and honest husbandry guidance.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/varieties"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-brand-hover shadow-sm transition-all"
                >
                  Explore the collection
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <WhatsAppButton variant="ghost" className="border border-border bg-surface text-heading hover:border-brand hover:text-brand" />
              </div>
            </Reveal>

            <Reveal delay={150} className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                  <Image
                    src="/images/varieties/moscow-blue.jpg"
                    alt="Sheferoy Guppy Broodstock Specimen"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div className="rounded-2xl border border-border bg-brand p-2 shadow-sm">
                    <Image
                      src="/logo.png"
                      alt="Sheferoy Guppy logo"
                      width={44}
                      height={44}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <p className="rounded-full border border-border bg-surface/90 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-heading backdrop-blur-md shadow-sm">
                    Kanyakumari · Tamil Nadu
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-border bg-secondary/50 py-20 lg:py-24" aria-labelledby="pillars-heading">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-brand">Why keepers trust us</p>
            <h2 id="pillars-heading" className="mt-4 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl max-w-2xl">
              Four commitments at the core of our hatchery.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 90}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 sm:p-7 shadow-card hover:shadow-card-hover transition-all duration-300">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/15">
                    <pillar.icon className="h-5 w-5 text-gold" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-heading">{pillar.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-body">{pillar.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote band */}
      <section className="bg-page border-t border-border py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-10">
          <Reveal>
            <p className="font-display text-2xl sm:text-3xl italic leading-snug text-heading">
              &ldquo;A guppy is never just a fish. It&apos;s a promise you make to the next generation of a
              line.&rdquo;
            </p>
            <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-widest text-brand">
              The Sheferoy Guppy Hatchery
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
