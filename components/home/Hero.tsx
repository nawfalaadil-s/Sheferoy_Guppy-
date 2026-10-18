import Link from "next/link";
import HeroScene from "@/components/art/HeroScene";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function Hero() {
  return (
    <section
      className="relative grain min-h-[calc(100svh-3.75rem)] overflow-hidden bg-obsidian lg:min-h-[calc(100svh-4.5rem)]"
      aria-labelledby="hero-heading"
    >
      <HeroScene />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-3.75rem)] max-w-site flex-col px-4 pb-8 pt-12 sm:px-6 lg:min-h-[calc(100svh-4.5rem)] lg:px-10 lg:pb-10 lg:pt-16">
        <div className="max-w-xl xl:max-w-2xl">
          <p className="anim-rise eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-gold/70" aria-hidden="true" />
            Premium Ornamental Guppies
          </p>

          <h1 id="hero-heading" className="anim-rise anim-delay-1 display-1 mt-5 text-ivory">
            A Living World of{" "}
            <em className="gold-text not-italic">Extraordinary</em>{" "}
            <span className="font-display italic">Guppies</span>
          </h1>

          <p className="anim-rise anim-delay-2 lede mt-6 max-w-lg text-pretty">
            Explore 65+ guppy varieties bred in Kanyakumari, Tamil Nadu — refined bloodlines,
            radiant finnage, and safe pan-India shipping for every enthusiast.
          </p>

          <div className="anim-rise anim-delay-3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="#collection" className="btn-gold justify-center">
              Explore the Collection
            </Link>
            <WhatsAppButton variant="ghost" className="justify-center">
              Enquire on WhatsApp
            </WhatsAppButton>
          </div>
        </div>

        {/* Reserved space for the specimen on small screens */}
        <div className="h-[240px] sm:h-[300px] lg:hidden" aria-hidden="true" />

        <div className="mt-auto flex items-end justify-between gap-6">
          <Link
            href="#collection"
            className="anim-fade anim-delay-6 group inline-flex flex-col items-start gap-2"
            style={{ animationDelay: "1.2s" }}
            aria-label="Scroll to the collection"
          >
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory/50 transition-colors group-hover:text-gold-light">
              Scroll
            </span>
            <span className="relative block h-9 w-px overflow-hidden bg-ivory/15" aria-hidden="true">
              <span className="anim-cue absolute inset-x-0 top-0 block h-3 bg-gold" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
