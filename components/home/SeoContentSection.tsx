import type { SeoSectionContent } from "@/lib/cms-types";

interface SeoContentSectionProps {
  content?: SeoSectionContent;
}

export default function SeoContentSection({ content }: SeoContentSectionProps) {
  const badge = content?.badge || "Aquarium Knowledge";
  const heading =
    content?.heading || "Explore Guppies, Bettas and Breeding Pairs";
  const subheading =
    content?.subheading ||
    "Learn more about the distinctive characteristics and requirements of each ornamental variety.";

  const fancyGuppiesTitle =
    content?.fancyGuppies?.title || "Fancy Guppies";
  const fancyGuppiesText =
    content?.fancyGuppies?.text ||
    "Fancy guppies are celebrated for their colourful patterns, energetic swimming behaviour, and diversity of finnage. Tail shapes range from wide delta tails and delicate veiltails to oversized dumbo ear pectorals. Their calm nature, peaceful temperament, and iridescent coloration make ornamental guppies one of the most popular choices for planted community tanks.";

  const bettaFishTitle = content?.bettaFish?.title || "Betta Fish";
  const bettaFishText =
    content?.bettaFish?.text ||
    "Ornamental betta fish (Betta splendens) are known for their bold individual personalities, rich pigmentation, and striking fin varieties. Our collection showcases impressive forms such as 180-degree halfmoons, intricate rosetails, and active plakats in vivid solid, dragon scale, and tricolor patterns.";

  const breedingPairsTitle =
    content?.breedingPairs?.title || "Guppy Breeding Pairs";
  const breedingPairsText =
    content?.breedingPairs?.text ||
    "For hobbyists and dedicated breeders aiming to maintain consistent line genetics, selected guppy breeding pairs are an ideal starting point. Customers can enquire directly with us regarding pair availability, verified sex identification, strain traits, and current pricing before placing an order.";

  return (
    <section
      className="relative bg-page py-12 sm:py-16 border-b border-border"
      aria-labelledby="educational-seo-heading"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl text-center sm:text-left">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand">
            {badge}
          </span>
          <h2
            id="educational-seo-heading"
            className="mt-1 font-display text-2xl font-extrabold tracking-tight text-heading sm:text-3xl"
          >
            {heading}
          </h2>
          <p className="mt-2 text-sm text-body sm:text-base">
            {subheading}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Subsection 1: Fancy Guppies */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-card transition-all hover:border-brand/40">
            <h3 className="font-display text-lg font-bold text-heading">
              {fancyGuppiesTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-body">
              {fancyGuppiesText}
            </p>
          </div>

          {/* Subsection 2: Betta Fish */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-card transition-all hover:border-brand/40">
            <h3 className="font-display text-lg font-bold text-heading">
              {bettaFishTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-body">
              {bettaFishText}
            </p>
          </div>

          {/* Subsection 3: Guppy Breeding Pairs */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-card transition-all hover:border-brand/40">
            <h3 className="font-display text-lg font-bold text-heading">
              {breedingPairsTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-body">
              {breedingPairsText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
