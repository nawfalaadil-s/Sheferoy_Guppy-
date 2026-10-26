// Sample offers data
// In production, this would come from Supabase database

export interface Offer {
  id: number;
  title: string;
  description: string;
  image?: string;
  startDate?: string | null;
  start_date?: string | null;
  endDate?: string | null;
  end_date?: string | null;
  isActive?: boolean;
  is_active?: boolean;
  isFeatured?: boolean;
  is_featured?: boolean;
}

export const offers: Offer[] = [
  {
    id: 1,
    title: "New Arrival: Rare Moscow Blue Strain",
    description: "We're excited to announce the arrival of premium Moscow Blue guppies with exceptional solid coloration. This rare strain features intense, deep blue throughout the entire body and fins. Limited quantity available - these premium breeding stock fish are perfect for serious collectors and breeders.",
    image: "/placeholder-offer-1.jpg",
    startDate: "2026-10-01",
    endDate: "2026-10-30",
    isActive: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Platinum White Guppies Available",
    description: "Beautiful platinum white variety with stunning metallic sheen now in stock. These guppies create a striking visual impact in any aquarium setup with their pure white coloration and elegant tail formation. Excellent breeding stock with consistent color inheritance.",
    image: "/placeholder-offer-2.jpg",
    startDate: "2026-10-10",
    endDate: "2026-11-15",
    isActive: true,
    isFeatured: false,
  },
  {
    id: 3,
    title: "Red Dragon Breeding Pairs",
    description: "Premium Red Dragon breeding pairs available for serious hobbyists. These carefully selected pairs feature vibrant red coloration with excellent body structure and finnage. Perfect for establishing your own breeding line or upgrading your current stock.",
    image: "/placeholder-offer-3.jpg",
    startDate: "2026-10-05",
    endDate: "2026-11-30",
    isActive: true,
    isFeatured: false,
  },
  {
    id: 4,
    title: "Special: Tuxedo Koi Collection",
    description: "Limited time availability of our premium Tuxedo Koi collection. These guppies feature the classic tuxedo body pattern combined with beautiful koi-like multicolor markings. Each fish is individually selected for superior pattern definition and color vibrancy.",
    image: "/placeholder-offer-4.jpg",
    startDate: "2026-09-20",
    endDate: "2026-10-15",
    isActive: false,
    isFeatured: false,
  },
];

export function getActiveOffers(): Offer[] {
  const now = new Date();
  return offers.filter((offer) => {
    if (!offer.isActive) return false;
    
    const startDate = offer.startDate ? new Date(offer.startDate) : null;
    const endDate = offer.endDate ? new Date(offer.endDate) : null;
    
    const isValid =
      (!startDate || now >= startDate) &&
      (!endDate || now <= endDate);
    
    return isValid;
  });
}

export function getFeaturedOffers(): Offer[] {
  return getActiveOffers().filter((offer) => offer.isFeatured);
}

export function isOfferActive(offer: Offer): boolean {
  if (!offer.isActive) return false;
  
  const now = new Date();
  const startDate = offer.startDate ? new Date(offer.startDate) : null;
  const endDate = offer.endDate ? new Date(offer.endDate) : null;
  
  return (!startDate || now >= startDate) && (!endDate || now <= endDate);
}
