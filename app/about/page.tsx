import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Fish, MapPin, Truck, Users } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import GuppyArt from "@/components/art/GuppyArt";
import PlantArt from "@/components/art/PlantArt";
import { heroColorway } from "@/lib/varieties-data";

export const metadata: Metadata = {
  title: "About — Bloodline Breeder in Kanyakumari",
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
    text: "Oxygen-packed, insulated and tracked — followed up until your fish are settled in their new tank.",
  },
  {
    icon: Users,
    title: "1,700+ hobbyists",
    text: "Beginners and seasoned breeders across India keep our lines. Their tanks are our portfolio.",
  },
  {
    icon: MapPin,
    title: "Kanyakumari, Tamil Nadu",
    text: "The southernmost tip of India — warm, stable water conditions and a coastline that keeps us humble.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the Studio"
        title={
          <>
            Bred at the Tip of India,{" "}
            <span className="font-display italic text-gold-light">Raised with Patience</span>
          </>
        }
        description="Sheferoy Guppy is a premium ornamental guppy breeding studio in Kanyakumari, Tamil Nadu — dedicated to exceptional colour, healthy genetics and honest guidance."
      />

      {/* Story */}
      <section className="bg-obsidian pb-20 pt-12 lg:pt-16">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow">Our Passion for Guppies</p>
              <h2 className="display-3 mt-4 text-ivory">
                A breeding room run like a gallery, with water chemistry as the curator.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-mist">
                <p>
                  Sheferoy Guppy began with a simple obsession — the way a well-bred Moscow Blue holds its
                  colour under morning light. That obsession became a breeding operation: over 65 distinct
                  guppy varieties maintained across dedicated tanks, each line selected and culled to
                  preserve the traits that make these fish extraordinary.
                </p>
                <p>
                  From solid colours to intricate patterns, metallic sheens to elaborate fin formations, our
                  collection represents some of the finest specimens available to aquarium enthusiasts in
                  India. Alongside the fish, we keep a botanical collection of live aquatic plants that do
                  the quiet work — sheltering fry, softening water, and making every tank feel like a place
                  rather than a container.
                </p>
                <p>
                  Whether you&apos;re starting your first ten-gallon guppy tank or hunting breeding stock to
                  build a line of your own, we&apos;re here to help — with fish, plants and advice that
                  respects your time and your budget.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/varieties" className="btn-gold">
                  Explore the collection
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <WhatsAppButton variant="ghost" />
              </div>
            </Reveal>

            <Reveal delay={150} className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-gold/15 bg-gradient-to-b from-ink to-obsidian">
                <div
                  className="absolute inset-0 bg-[radial-gradient(80%_75%_at_58%_42%,rgba(199,164,90,0.12)_0%,rgba(9,11,13,0)_68%)]"
                  aria-hidden="true"
                />
                <GuppyArt colorway={heroColorway} animated className="relative w-full" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div className="glass rounded-2xl px-4 py-3">
                    <Image
                      src="/logo.png"
                      alt="Sheferoy Guppy logo"
                      width={44}
                      height={44}
                      className="h-11 w-11 object-contain"
                    />
                  </div>
                  <p className="glass rounded-full px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory/80">
                    Kanyakumari · Tamil Nadu
                  </p>
                </div>
                <PlantArt
                  type="vallisneria"
                  className="pointer-events-none absolute bottom-0 left-0 w-32 opacity-60"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-white/5 bg-abyss py-20 lg:py-24" aria-labelledby="pillars-heading">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow">Why keepers stay</p>
            <h2 id="pillars-heading" className="display-3 mt-4 max-w-2xl text-ivory">
              Four promises we won&apos;t trade away.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 90}>
                <div className="card-deep h-full">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-gold/10">
                    <pillar.icon className="h-5 w-5 text-gold" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl text-ivory">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{pillar.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote band */}
      <section className="bg-ivory py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-10">
          <Reveal>
            <p className="font-display text-3xl italic leading-snug text-ink sm:text-4xl">
              &ldquo;A guppy is never just a fish. It&apos;s a promise you make to the next generation of a
              line.&rdquo;
            </p>
            <p className="mt-6 font-sans text-[11px] font-semibold uppercase tracking-editorial text-ink/50">
              The Sheferoy Guppy studio
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
