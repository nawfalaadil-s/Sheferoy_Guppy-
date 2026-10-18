import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GuppyArt from "@/components/art/GuppyArt";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getFeaturedVarieties } from "@/lib/varieties-data";

export default function FeaturedVarieties() {
  const featured = getFeaturedVarieties().slice(0, 4);
  const [a, b, c, d] = featured;

  const card = (variety: (typeof featured)[number], className = "", delay = 0) => (
    <Reveal className={className} delay={delay}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/10 bg-gradient-to-b from-ink to-abyss transition-all duration-500 ease-luxe hover:border-gold/30 hover:shadow-[0_30px_60px_-30px_rgba(199,164,90,0.25)]">
        <div className="relative flex-1 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(85%_85%_at_60%_40%,rgba(199,164,90,0.09)_0%,rgba(9,11,13,0)_65%)]" aria-hidden="true" />
          <GuppyArt
            colorway={variety.art}
            className="pointer-events-none absolute left-1/2 top-1/2 h-auto w-[128%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-luxe group-hover:-translate-y-[52%] group-hover:scale-[1.045]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-transparent"
            aria-hidden="true"
          />
          <div className="relative aspect-[4/3] w-full" aria-hidden="true" />
        </div>

        <div className="relative -mt-16 p-6 lg:p-7">
          <p className="eyebrow">{variety.line}</p>
          <h3 className="display-3 mt-2 text-ivory">
            <Link
              href={`/varieties/${variety.slug}`}
              className="transition-colors hover:text-gold-light"
            >
              <span className="absolute inset-0" aria-hidden="true" />
              {variety.name}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-mist">{variety.description}</p>

          <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory/45">
              {variety.careLevel} care
            </span>
            <WhatsAppButton
              variety={`${variety.name} guppy`}
              variant="link"
              className="relative z-10"
            >
              Enquire
            </WhatsAppButton>
          </div>
        </div>
      </article>
    </Reveal>
  );

  return (
    <section id="collection" className="scroll-mt-24 bg-obsidian py-20 lg:py-28" aria-labelledby="collection-heading">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-gold/70" aria-hidden="true" />
                Featured Collection
              </p>
              <h2 id="collection-heading" className="display-2 mt-4 text-ivory">
                Signature <span className="font-display italic text-gold-light">Bloodlines</span>
              </h2>
              <p className="lede mt-4">
                A curated look at the lines we are proud to raise — each refined for color depth,
                finnage and vigour.
              </p>
            </div>
            <Link href="/varieties" className="btn-link shrink-0">
              Browse all 65+ varieties
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {a && card(a, "lg:col-span-7", 0)}
          {b && card(b, "lg:col-span-5", 120)}
          {c && card(c, "lg:col-span-5", 0)}
          {d && card(d, "lg:col-span-7", 120)}
        </div>
      </div>
    </section>
  );
}
