export interface HeroContent {
  badge: string;
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  image: string;
  imageTitle: string;
  imageSubtitle: string;
}

export interface FeaturedProductItem {
  slug: string;
  name: string;
  category: "Guppies" | "Bettas";
  image: string;
  availability: string;
}

export interface FeaturedSectionContent {
  badge: string;
  heading: string;
  subheading: string;
  productSlugs: string[];
  customItems: FeaturedProductItem[];
}

export interface AboutSectionContent {
  heading: string;
  paragraph1: string;
  paragraph2: string;
}

export interface SeoSectionContent {
  badge: string;
  heading: string;
  subheading: string;
  fancyGuppies: { title: string; text: string };
  bettaFish: { title: string; text: string };
  breedingPairs: { title: string; text: string };
}

export interface ContactSectionContent {
  badge: string;
  heading: string;
  text: string;
  phone: string;
  whatsapp: string;
  email: string;
}

export interface HomepageContent {
  hero: HeroContent;
  featured: FeaturedSectionContent;
  about: AboutSectionContent;
  seo: SeoSectionContent;
  contact: ContactSectionContent;
}

export const defaultHomepageContent: HomepageContent = {
  hero: {
    badge: "ORNAMENTAL GUPPIES & BETTAS",
    title: "Premium Ornamental Guppies and Bettas for Aquarium Enthusiasts",
    description:
      "Welcome to Sheferoy Guppy, your destination for ornamental guppies, colourful bettas, and selected breeding pairs. Explore distinctive fish varieties featuring beautiful colours, patterns, and fin types. Whether you are choosing fish for your home aquarium or looking for breeding pairs, discover our collection and contact us directly for current availability and pricing.",
    primaryBtnText: "Explore Featured Fish",
    primaryBtnLink: "#featured-fish",
    secondaryBtnText: "WhatsApp Enquiry",
    image: "/images/varieties/veiltail-zebra-green.jpg",
    imageTitle: "Veiltail Zebra Green",
    imageSubtitle: "Ornamental guppy variety",
  },
  featured: {
    badge: "Selected Collection",
    heading: "Featured Ornamental Fish",
    subheading: "Explore selected guppy and betta varieties from Sheferoy Guppy.",
    productSlugs: [
      "veiltail-zebra-green",
      "24k-gold-guppy",
      "moscow-blue",
      "thai-flag-betta",
      "purple-berry-dragon-dumbo-ear",
    ],
    customItems: [
      {
        slug: "veiltail-zebra-green",
        name: "Veiltail Zebra Green",
        category: "Guppies",
        image: "/images/varieties/veiltail-zebra-green.jpg",
        availability: "Enquire for Availability",
      },
      {
        slug: "24k-gold-guppy",
        name: "24K Gold Guppy",
        category: "Guppies",
        image: "/images/varieties/24k-gold-guppy.jpg",
        availability: "Enquire for Availability",
      },
      {
        slug: "moscow-blue",
        name: "Moscow Blue",
        category: "Guppies",
        image: "/images/varieties/moscow-blue.jpg",
        availability: "Enquire for Availability",
      },
      {
        slug: "thai-flag-betta",
        name: "Thai Flag Betta",
        category: "Bettas",
        image: "/images/varieties/thai-flag-betta.jpg",
        availability: "Enquire for Availability",
      },
      {
        slug: "purple-berry-dragon-dumbo-ear",
        name: "Purple Berry Dragon Dumbo Ear",
        category: "Guppies",
        image: "/images/varieties/purple-berry-dragon-dumbo-ear.jpg",
        availability: "Enquire for Availability",
      },
    ],
  },
  about: {
    heading: "About Sheferoy Guppy",
    paragraph1:
      "Sheferoy Guppy specialises in ornamental aquarium fish, including fancy guppies, colourful bettas, and selected breeding pairs. Our collection includes varieties with distinctive colours, patterns, and fin shapes for aquarium enthusiasts and fish breeders.",
    paragraph2:
      "Contact us to learn about current fish availability, pricing, breeding pair options, and the varieties that best suit your interests.",
  },
  seo: {
    badge: "Aquarium Knowledge",
    heading: "Explore Guppies, Bettas and Breeding Pairs",
    subheading:
      "Learn more about the distinctive characteristics and requirements of each ornamental variety.",
    fancyGuppies: {
      title: "Fancy Guppies",
      text: "Fancy guppies are celebrated for their colourful patterns, energetic swimming behaviour, and diversity of finnage. Tail shapes range from wide delta tails and delicate veiltails to oversized dumbo ear pectorals. Their calm nature, peaceful temperament, and iridescent coloration make ornamental guppies one of the most popular choices for planted community tanks.",
    },
    bettaFish: {
      title: "Betta Fish",
      text: "Ornamental betta fish (Betta splendens) are known for their bold individual personalities, rich pigmentation, and striking fin varieties. Our collection showcases impressive forms such as 180-degree halfmoons, intricate rosetails, and active plakats in vivid solid, dragon scale, and tricolor patterns.",
    },
    breedingPairs: {
      title: "Guppy Breeding Pairs",
      text: "For hobbyists and dedicated breeders aiming to maintain consistent line genetics, selected guppy breeding pairs are an ideal starting point. Customers can enquire directly with us regarding pair availability, verified sex identification, strain traits, and current pricing before placing an order.",
    },
  },
  contact: {
    badge: "Fast Response · Direct From Breeder",
    heading: "Looking for a Particular Strain?",
    text: "WhatsApp us for current tank videos, pricing, and live stock availability.",
    phone: "7358612156",
    whatsapp: "94891 84047",
    email: "eliteguppyss@gmail.com",
  },
};
