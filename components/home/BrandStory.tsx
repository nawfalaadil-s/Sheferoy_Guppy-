import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Fish, Sparkles, ShieldCheck } from "lucide-react";
import GuppyArt from "@/components/art/GuppyArt";
import Reveal from "@/components/ui/Reveal";
import { guppyVarieties } from "@/lib/varieties-data";

const pillars = [
  {
    icon: Fish,
    title: "Bloodline First",
    text: "Every line is selected for colour depth, finnage and vigour before it earns a place in the collection.",
  },
  {
    icon: Sparkles,
    title: "Raised With Care",
    text: "Fish are raised and conditioned in our Kanyakumari facility before they are offered to hobbyists.",
  },
  {
    icon: ShieldCheck,
    title: "Shipped Responsibly",
    text: "Purpose-designed packing and trusted courier partners for safe pan-India delivery.",
  },
];

export default function BrandStory() {
  const blue = guppyVarieties[0]?.art;

  return (
    <section className="grain bg-ivory py-20 text-obsidian lg:py-28" aria-labelledby="story-heading">
      <div className="mx-auto grid max-w-site gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        {/* Editorial copy */}
        <div className="lg:col-span-6 xl:col-span-5">
          <Reveal>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-editorial text-gold-dark">
              The Breeder
            </p>
            <h2 id="story-heading" className="display-2 mt-4 text-obsidian">
              Bred in Kanyakumari.
              <br />
              <span className="font-display italic text-gold-dark">Kept by hobbyists nationwide.</span>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 text-base leading-relaxed text-obsidian/70">
              Sheferoy Guppy is a premium ornamental guppy breeder based at the southern tip of India.
              Our collection spans more than 65 distinct varieties — from solid lines like Moscow Blue
              to intricate cobra and koi patterns.
            </p>
            <p className="mt-4 text-base leading-relaxed text-obsidian/70">
              We believe a great guppy is equal parts genetics and husbandry. Each line is maintained
              across generations, culled with care, and conditioned before it travels to a new home.
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-10 space-y-7">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="flex gap-5">
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-dark/30">
                  <pillar.icon className="h-5 w-5 text-gold-dark" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-xl text-obsidian">{pillar.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-obsidian/65">{pillar.text}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={280} className="mt-10">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-dark transition-colors hover:text-obsidian"
            >
              Our full story
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {/* Art panel */}
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-3xl bg-obsidian">
              <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_65%_35%,rgba(47,85,184,0.32)_0%,rgba(9,11,13,0)_70%)]" aria-hidden="true" />
              {blue && (
                <GuppyArt
                  colorway={blue}
                  animated
                  className="relative h-auto w-full translate-x-[-2%]"
                />
              )}
              <div className="absolute left-5 top-5">
                <span className="chip">Moscow Blue · Solid Line</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
                <p className="flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory/60">
                  <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  Kanyakumari · Tamil Nadu
                </p>
                <Image
                  src="/logo.png"
                  alt=""
                  width={72}
                  height={36}
                  className="h-7 w-auto object-contain opacity-70"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <blockquote className="mt-8 border-l-2 border-gold pl-6">
              <p className="font-display text-2xl italic leading-snug text-obsidian/85">
                &ldquo;A guppy is never finished — every generation is a chance to raise the line a
                little higher.&rdquo;
              </p>
              <footer className="mt-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-obsidian/50">
                Sheferoy Guppy — Breeding ethos
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
