import json

sharp_clips = [
    (6, 'High-Dorsal Blue Veiltail Bloodline', 'Live Farm Video: Male breeding stock displaying wide delta spread and intense color in crystal water.', 'Breeding'),
    (5, 'Albino Silverado Red Dumbo Ear Pair', 'Live Farm Video: Active breeding pair showing large white pectoral flaps and vibrant red caudal.', 'Breeder Pair'),
    (29, 'Pure 24K Full Gold Metallic Colony', 'Live Farm Video: High metallic iridescence colony swimming in clean glass hatchery tank.', 'Show Stock'),
    (7, 'Platinum Black Green Dragon Breeders', 'Live Farm Video: Heavy metallic body with deep emerald dorsal fins under direct tank light.', 'Lineage'),
    (8, 'Red Blue Berry Dragon Active Group', 'Live Farm Video: Healthy active schooling group in the Kanyakumari farm conditioning system.', 'Breeding'),
    (9, 'Moscow Blue Velvet Dark Strain', 'Live Farm Video: Deep indigo navy solid body with full velvety dorsal spread.', 'Show Stock'),
    (16, 'Purple Berry Dragon Dumbo Ear Trio', 'Live Farm Video: Exceptional purple berry color saturation and pure white dumbo fins.', 'Breeder Pair'),
    (18, 'Thai Flag Multi-Color Betta Inspection', 'Live Farm Video: Close-up tank inspection of Siamese fighting fish line with vibrant red-white-blue finnage.', 'Betta'),
    (20, 'Silverodo Green Dragon Delta Tail', 'Live Farm Video: Intense emerald metallic sheen and immaculate fin symmetry.', 'Show Stock'),
    (43, 'AFR Redrose Tail Juvenile Nursery', 'Live Farm Video: Young pure albino full red specimens developing ruffled rosetail edges.', 'Nursery'),
    (36, 'Silverodo Black Dragon Dumbo Ear', 'Live Farm Video: Jet black contrast against bright white dumbo pectoral fins.', 'Breeding'),
    (39, 'Copper Dragon Betta Male Display', 'Live Farm Video: Metallic copper scales reflecting warm studio aquarium illumination.', 'Betta'),
    (11, 'Full White Platinum Breeder Pair', 'Live Farm Video: Pristine snow white pure strain bred for solid clean pigmentation.', 'Breeder Pair'),
    (32, 'Blue Copper Dragon Show Grade Betta', 'Live Farm Video: Broad halfmoon caudal flare showing brilliant metallic blue and copper highlights.', 'Betta'),
    (28, 'Silverodo HB Blue Breeding Line', 'Live Farm Video: Half-black body with electric neon blue dorsal and tail fins.', 'Breeding'),
    (2, 'Veiltail Zebra Green Studio Observation', 'Live Farm Video: High finnage elegance observed in specialized presentation tank.', 'Exhibition'),
    (21, 'Nemo Candy Betta Female Colony', 'Live Farm Video: Marbled candy koi colors across active healthy sorority tank.', 'Betta'),
    (27, 'Violet Veiltail Zebra Active Swimmers', 'Live Farm Video: Rare purple violet caudal fin reflections during midday feeding.', 'Lineage'),
    (35, 'Silverodo Red Dumbo Ear Selected Male', 'Live Farm Video: Exceptional fin size and vibrant crimson tail contrast.', 'Show Stock'),
    (13, 'Albino Full Red Rosetail Breeder Showcase', 'Live Farm Video: Rich scarlet saturation from head to dorsal tip.', 'Breeding'),
    (1, 'Live Feeding & Conditioning Session', 'Live Farm Video: Conditioning breeder stock with high nutrition live feed.', 'Feeding'),
    (37, 'Juvenile Nursery Tank Active Fry', 'Live Farm Video: Early generation fry developing solid line traits in oxygen-rich tanks.', 'Nursery'),
    (44, 'Show Grade Halfmoon Betta Flare Inspection', 'Live Farm Video: 180-degree caudal spread demonstration during quality grading.', 'Betta'),
    (12, 'Selective Breeding Strain Review', 'Live Farm Video: Detailed inspection of dorsal fin shape and caudal border sharpness.', 'Lineage')
]

ts_code = '''import { getEmbedUrl } from "./reels-data";

export type GalleryItem =
  | {
      id: number;
      kind: "guppy";
      alt: string;
      caption: string;
      category: string;
      varietySlug: string;
      image: string;
    }
  | {
      id: number;
      kind: "plant";
      alt: string;
      caption: string;
      category: string;
      plantSlug: string;
      image: string;
    }
  | {
      id: number;
      kind: "reel";
      alt: string;
      caption: string;
      category: string;
      reelCode: string;
      reelUrl: string;
      embedUrl: string;
      reelCategory: string;
      varietyName?: string;
      videoUrl?: string;
      thumbnailUrl?: string;
    };

// Curated media collection with real farm videos, photographs and Instagram Reels
export const galleryItems: GalleryItem[] = [
  // --- REAL ON-LOCATION FARM VIDEOS ---
'''

for idx, title, caption, cat in sharp_clips:
    clip_num = f"{idx:02d}"
    ts_code += f'''  {{
    id: 2{clip_num},
    kind: "reel",
    alt: "{title} — Sheferoy Guppy Farm Video",
    caption: "{title}",
    category: "Farm Videos",
    reelCode: "farm-clip-{clip_num}",
    reelUrl: "https://www.instagram.com/sheferoyguppy/",
    embedUrl: "",
    reelCategory: "{cat}",
    varietyName: "{title}",
    videoUrl: "/videos/gallery/farm-clip-{clip_num}.mp4",
    thumbnailUrl: "/images/gallery/farm-clip-{clip_num}.jpg",
  }},
'''

ts_code += '''
  // --- OFFICIAL INSTAGRAM REELS ---
  {
    id: 101,
    kind: "reel",
    alt: "Platinum Koi Ribbon & AFR Bloodline Aquarium Video",
    caption: "Platinum Koi Ribbon & AFR Bloodlines Active Swimming",
    category: "Reels",
    reelCode: "DRmaGfQCZES",
    reelUrl: "https://www.instagram.com/reel/DRmaGfQCZES/",
    embedUrl: getEmbedUrl("DRmaGfQCZES", "reel"),
    reelCategory: "Breeding",
    varietyName: "Platinum Koi & AFR",
    videoUrl: "/videos/gallery/farm-clip-06.mp4",
    thumbnailUrl: "/images/gallery/farm-clip-06.jpg",
  },
  {
    id: 102,
    kind: "reel",
    alt: "Show Grade Fancy Guppy Selection Video",
    caption: "Show Grade Fancy Guppy Dorsal & Delta Spread Selection",
    category: "Reels",
    reelCode: "DdBicRkBR5y",
    reelUrl: "https://www.instagram.com/reel/DdBicRkBR5y/",
    embedUrl: getEmbedUrl("DdBicRkBR5y", "reel"),
    reelCategory: "Strains",
    varietyName: "Show Grade Delta",
    videoUrl: "/videos/gallery/farm-clip-05.mp4",
    thumbnailUrl: "/images/gallery/farm-clip-05.jpg",
  },
  {
    id: 103,
    kind: "reel",
    alt: "Morning Live Feeding Session Video",
    caption: "Morning Live Feeding Session — Breeder Tanks Conditioning",
    category: "Reels",
    reelCode: "DXYnJVbD0Xc",
    reelUrl: "https://www.instagram.com/reel/DXYnJVbD0Xc/",
    embedUrl: getEmbedUrl("DXYnJVbD0Xc", "reel"),
    reelCategory: "Feeding",
    varietyName: "Breeder Strains",
    videoUrl: "/videos/gallery/farm-clip-01.mp4",
    thumbnailUrl: "/images/gallery/farm-clip-01.jpg",
  },
  {
    id: 104,
    kind: "reel",
    alt: "Fry Nursery & Selective Breeding Tank Video",
    caption: "Fry Nursery & Selective Breeding Tank Observations",
    category: "Reels",
    reelCode: "DTQQZpFDNRG",
    reelUrl: "https://www.instagram.com/reel/DTQQZpFDNRG/",
    embedUrl: getEmbedUrl("DTQQZpFDNRG", "reel"),
    reelCategory: "Nursery",
    varietyName: "Juvenile Guppies",
    videoUrl: "/videos/gallery/farm-clip-37.mp4",
    thumbnailUrl: "/images/gallery/farm-clip-37.jpg",
  },
  {
    id: 105,
    kind: "reel",
    alt: "AFR White Ears Line Inspection Reel",
    caption: "AFR White Ears Pectoral Fin Inspection",
    category: "Reels",
    reelCode: "DavN9X0idIu",
    reelUrl: "https://www.instagram.com/p/DavN9X0idIu/",
    embedUrl: getEmbedUrl("DavN9X0idIu", "post"),
    reelCategory: "Strains",
    varietyName: "AFR White Ears",
    videoUrl: "/videos/gallery/farm-clip-43.mp4",
    thumbnailUrl: "/images/gallery/farm-clip-43.jpg",
  },
  {
    id: 106,
    kind: "reel",
    alt: "Ivory Green Strain Lineage Showcase",
    caption: "Ivory Green Strain Metallic Lineage",
    category: "Reels",
    reelCode: "DRKGlHlkgSZ",
    reelUrl: "https://www.instagram.com/p/DRKGlHlkgSZ/",
    embedUrl: getEmbedUrl("DRKGlHlkgSZ", "post"),
    reelCategory: "Strains",
    varietyName: "Ivory Green",
    videoUrl: "/videos/gallery/farm-clip-20.mp4",
    thumbnailUrl: "/images/gallery/farm-clip-20.jpg",
  },

  // --- REAL GUPPY STRAIN PHOTOGRAPHY ---
  {
    id: 1,
    kind: "guppy",
    alt: "Moscow Blue pure solid breeder strain",
    caption: "Moscow Blue — Velvet deep navy iridescence",
    category: "Guppies",
    varietySlug: "moscow-blue",
    image: "/images/varieties/moscow-blue.jpg",
  },
  {
    id: 2,
    kind: "plant",
    alt: "Vallisneria spiralis background plant",
    caption: "Vallisneria spiralis — Lush vertical ribbons",
    category: "Plants",
    plantSlug: "vallisneria-spiralis",
    image: "/images/plants/vallisneria.jpg",
  },
  {
    id: 3,
    kind: "guppy",
    alt: "Veiltail Zebra Green pure line",
    caption: "Veiltail Zebra Green — Emerald zebra caudal striations",
    category: "Guppies",
    varietySlug: "veiltail-zebra-green",
    image: "/images/varieties/veiltail-zebra-green.jpg",
  },
  {
    id: 4,
    kind: "plant",
    alt: "Dwarf Water Lettuce floating plant",
    caption: "Dwarf Water Lettuce — Natural root shelter",
    category: "Plants",
    plantSlug: "dwarf-water-lettuce",
    image: "/images/plants/water-lettuce.jpg",
  },
  {
    id: 5,
    kind: "guppy",
    alt: "24k Gold Guppy solid metallic strain",
    caption: "24k Gold Guppy — 24K shimmering reflective body",
    category: "Guppies",
    varietySlug: "24k-gold-guppy",
    image: "/images/varieties/24k-gold-guppy.jpg",
  },
  {
    id: 6,
    kind: "plant",
    alt: "Guppy Grass dense fry cover plant",
    caption: "Guppy Grass — Essential fry protection",
    category: "Plants",
    plantSlug: "guppy-grass",
    image: "/images/plants/guppy-grass.jpg",
  },
  {
    id: 7,
    kind: "guppy",
    alt: "Thai Flag Betta show quality",
    caption: "Thai Flag Betta — Tricolor patriotic halfmoon spread",
    category: "Guppies",
    varietySlug: "thai-flag-betta",
    image: "/images/varieties/thai-flag-betta.jpg",
  },
  {
    id: 8,
    kind: "plant",
    alt: "Pennywort round-leaf stem plant",
    caption: "Pennywort — Fast growing coin-leaf foliage",
    category: "Plants",
    plantSlug: "pennywort",
    image: "/images/plants/pennywort.jpg",
  },
  {
    id: 9,
    kind: "guppy",
    alt: "Platinum Black Green Dragon Dumbo Ear",
    caption: "Platinum Black Green Dragon — Broad white dumbo ears",
    category: "Guppies",
    varietySlug: "platinum-black-green-dragon-dumbo-ear",
    image: "/images/varieties/platinum-black-green-dragon-dumbo-ear.jpg",
  },
  {
    id: 10,
    kind: "plant",
    alt: "Foxtail feathery aquatic stem plant",
    caption: "Foxtail — Soft feathery biotope texture",
    category: "Plants",
    plantSlug: "foxtail",
    image: "/images/plants/foxtail.jpg",
  },
  {
    id: 11,
    kind: "guppy",
    alt: "Black Dumbo Ear solid velvet strain",
    caption: "Black Dumbo Ear — Jet black midnight fins",
    category: "Guppies",
    varietySlug: "black-dumbo-ear",
    image: "/images/varieties/black-dumbo-ear.jpg",
  },
  {
    id: 12,
    kind: "plant",
    alt: "Duckweed floating micro plant",
    caption: "Duckweed — Surface nutrient sponge",
    category: "Plants",
    plantSlug: "duckweed",
    image: "/images/plants/duckweed.jpg",
  },
  {
    id: 13,
    kind: "guppy",
    alt: "Silverodo HB Blue breeding line",
    caption: "Silverodo HB Blue — High contrast half-black neon blue",
    category: "Guppies",
    varietySlug: "silverodo-hb-blue",
    image: "/images/varieties/silverodo-hb-blue.jpg",
  },
  {
    id: 14,
    kind: "guppy",
    alt: "Red Blue Berry Dragon Dumbo Ear",
    caption: "Red Blue Berry Dragon — Dual metallic iridescence",
    category: "Guppies",
    varietySlug: "red-blue-berry-dragon-dumbo-ear",
    image: "/images/varieties/red-blue-berry-dragon-dumbo-ear.jpg",
  },
  {
    id: 15,
    kind: "guppy",
    alt: "Full White pure platinum strain",
    caption: "Full White — Pristine snow white pigmentation",
    category: "Guppies",
    varietySlug: "full-white",
    image: "/images/varieties/full-white.jpg",
  },
  {
    id: 16,
    kind: "guppy",
    alt: "Albino Silverado Red Dumbo Ear",
    caption: "Albino Silverado Red Dumbo Ear — Ruby eyes & scarlet caudal",
    category: "Guppies",
    varietySlug: "albino-silverado-red-dumbo-ear",
    image: "/images/varieties/albino-silverado-red-dumbo-ear.jpg",
  },
];

export const galleryCategories = ["All", "Farm Videos", "Reels", "Guppies", "Plants"];
'''

with open(r"E:\Shero guppy\lib\gallery-data.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Updated lib/gallery-data.ts successfully!")
