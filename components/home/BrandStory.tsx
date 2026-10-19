import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Fish, Sparkles, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const pillars = [
  {
    icon: Fish,
    title: "Pure Genetics First",
    text: "Every bloodline is selectively bred across generations for dorsal finnage symmetry and rich pigmentation.",
  },
  {
    icon: Sparkles,
    title: "Conditioned in Balanced Water",
    text: "Raised and conditioned in natural planted aquariums in Kanyakumari before being offered to hobbyists.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Pan-India Express Delivery",
    text: "Shipped in double-bagged, oxygen-injected insulated boxes with 100% live arrival assurance.",
  },
];

export default function BrandStory() {
  return (
    <section className="relative overflow-hidden bg-page py-16 sm:py-20 lg:py-24" aria-labelledby="story-heading">
      <div className="mx-auto grid max-w-site gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        {/* Story copy */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-muted bg-teal-light px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand shadow-subtle">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              The Hatchery Ethos
            </div>
            <h2 id="story-heading" className="mt-4 font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl lg:text-5xl leading-tight">
              Bred in Kanyakumari.
              <br />
              <span className="text-brand">
                Cherished Across India.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-5 text-base leading-relaxed text-body">
              Sheferoy Guppy is a specialist ornamental guppy breeding farm situated near the southern coast in Kanyakumari, Tamil Nadu. Our collection spans more than 65 verified varieties — from deep velvet Moscow Blue to vibrant Koi and dragon mosaics.
            </p>
            <p className="mt-3.5 text-base leading-relaxed text-body">
              We believe great ornamental fishkeeping begins with healthy husbandry. Each line is carefully pedigreed, fed premium live & prepared nutrition, and kept disease-free in balanced natural environments.
            </p>
          </Reveal>

          <Reveal delay={180} className="mt-9 space-y-5">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="flex gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-light text-brand shadow-subtle border border-border/60">
                  <pillar.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-charcoal">{pillar.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{pillar.text}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={240} className="mt-9">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand hover:text-brand-hover transition-colors"
            >
              Read our full story
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {/* Real Specimen Photography Showcase */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-card">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                <Image
                  src="/images/varieties/moscow-blue.jpg"
                  alt="Moscow Blue Pure Strain"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              </div>

              <div className="absolute left-4 top-4">
                <span className="rounded-full border border-white/60 bg-white/95 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-brand shadow-sm backdrop-blur-md">
                  Moscow Blue · Stud Bloodline
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-border bg-white px-5 py-3.5">
                <p className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-muted">
                  <MapPin className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  Kanyakumari · Tamil Nadu
                </p>
                <div className="flex items-center gap-2">
                  <div className="relative h-6 w-6 overflow-hidden rounded bg-brand p-0.5">
                    <Image src="/logo.png" alt="Sheferoy Guppy" fill className="object-contain" />
                  </div>
                  <span className="font-display text-xs font-bold text-charcoal">Sheferoy Guppy</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <blockquote className="mt-7 border-l-2 border-brand bg-secondary/50 rounded-r-2xl p-4 sm:p-5">
              <p className="font-display text-base sm:text-lg italic text-charcoal leading-relaxed">
                &ldquo;A quality guppy bloodline is never finished — every generation gives us the opportunity to refine fin symmetry and vibrant colors.&rdquo;
              </p>
              <footer className="mt-2.5 font-sans text-xs uppercase tracking-wider text-brand font-bold">
                Sheferoy Guppy — Hatchery Breeding Ethos
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
