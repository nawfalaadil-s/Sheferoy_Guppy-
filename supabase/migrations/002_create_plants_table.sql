-- Supabase SQL Migration for Live Plants Collection
-- Run this in your Supabase SQL Editor

-- Create plants table
CREATE TABLE IF NOT EXISTS public.plants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  scientific_name TEXT,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  featured_image TEXT,
  gallery_images TEXT[],
  care_lighting TEXT,
  care_growth TEXT,
  care_difficulty TEXT,
  care_placement TEXT,
  aquarium_uses TEXT[],
  availability_status TEXT DEFAULT 'available',
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS plants_slug_idx ON public.plants(slug);

-- Create index on published plants
CREATE INDEX IF NOT EXISTS plants_published_idx ON public.plants(is_published) WHERE is_published = true;

-- Create index on featured plants
CREATE INDEX IF NOT EXISTS plants_featured_idx ON public.plants(is_featured) WHERE is_featured = true;

-- Enable Row Level Security
ALTER TABLE public.plants ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to published plants only
CREATE POLICY "Public can view published plants"
  ON public.plants
  FOR SELECT
  TO public
  USING (is_published = true);

-- Policy: Authenticated users (admins) can view all plants
CREATE POLICY "Authenticated users can view all plants"
  ON public.plants
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users (admins) can insert plants
CREATE POLICY "Authenticated users can insert plants"
  ON public.plants
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users (admins) can update plants
CREATE POLICY "Authenticated users can update plants"
  ON public.plants
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users (admins) can delete plants
CREATE POLICY "Authenticated users can delete plants"
  ON public.plants
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_plants_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
DROP TRIGGER IF EXISTS plants_updated_at ON public.plants;
CREATE TRIGGER plants_updated_at
  BEFORE UPDATE ON public.plants
  FOR EACH ROW
  EXECUTE FUNCTION update_plants_updated_at();

-- Insert initial 6 plant entries
INSERT INTO public.plants (
  name,
  slug,
  scientific_name,
  short_description,
  description,
  care_lighting,
  care_growth,
  care_difficulty,
  care_placement,
  aquarium_uses,
  is_featured,
  is_published
) VALUES
(
  'Pennywort',
  'pennywort',
  'Hydrocotyle leucocephala',
  'Fast-growing stem plant with round, coin-shaped leaves that create a lush aquatic carpet.',
  'Pennywort is a popular aquarium plant known for its rapid growth and attractive round leaves. This versatile plant can be grown as a floating plant or rooted in substrate. Its bright green foliage adds natural beauty to any aquarium setup and provides excellent cover for fish fry. Pennywort is hardy and adaptable, making it suitable for both beginners and experienced aquarists.',
  'Low to High - Adapts well to various lighting conditions',
  'Fast - Regular trimming recommended',
  'Easy - Suitable for beginners',
  'Background, midground, or floating',
  ARRAY['Natural aquascaping', 'Fry protection and hiding spots', 'Nutrient absorption', 'Oxygenation'],
  true,
  true
),
(
  'Vallisneria spiralis',
  'vallisneria-spiralis',
  'Vallisneria spiralis',
  'Classic background plant with long, ribbon-like leaves that create elegant vertical lines.',
  'Vallisneria spiralis is a hardy aquarium plant featuring long, tape-like leaves that grow from a rosette base. This plant is excellent for creating natural-looking backgrounds in aquariums. It spreads through runners and can quickly fill empty spaces. Vallisneria is highly tolerant of various water conditions and provides excellent habitat for guppies and other small fish.',
  'Low to Moderate - Tolerates lower light levels',
  'Moderate to Fast - Spreads via runners',
  'Easy - Very hardy and adaptable',
  'Background',
  ARRAY['Background planting', 'Natural filtration', 'Shelter for fish', 'Low-maintenance aquascaping'],
  true,
  true
),
(
  'Foxtail',
  'foxtail',
  'Myriophyllum aquaticum',
  'Feathery stem plant with delicate, bushy foliage that adds texture to aquarium layouts.',
  'Foxtail is a beautiful aquatic plant with fine, feather-like leaves arranged along upright stems. The plant creates a soft, bushy appearance that provides excellent visual interest and natural habitat. Foxtail is particularly effective in guppy tanks, offering hiding places for fry while maintaining an attractive aesthetic. This plant benefits from regular pruning to maintain its shape.',
  'Moderate to High - Requires adequate lighting',
  'Fast - Responds well to nutrient-rich conditions',
  'Moderate - Needs regular maintenance',
  'Background or midground',
  ARRAY['Dense planting for fry protection', 'Adding texture and depth', 'Nutrient uptake', 'Creating natural biotopes'],
  true,
  true
),
(
  'Guppy Grass',
  'guppy-grass',
  'Najas guadalupensis',
  'Essential plant for guppy breeders, providing excellent cover for fry and natural filtration.',
  'Guppy Grass is a fast-growing, bushy aquatic plant that is indispensable for guppy breeding. Its dense, fine foliage creates perfect hiding spots for newborn fry, significantly improving survival rates. This plant is extremely hardy and can thrive in a wide range of conditions. Guppy Grass also acts as a natural water filter, absorbing excess nutrients and improving water quality.',
  'Low to High - Very adaptable',
  'Very Fast - May require frequent trimming',
  'Very Easy - Nearly indestructible',
  'Floating or planted in any position',
  ARRAY['Fry protection in breeding tanks', 'Natural water filtration', 'Quick greenery establishment', 'Nutrient competition with algae'],
  true,
  true
),
(
  'Dwarf Water Lettuce',
  'dwarf-water-lettuce',
  'Pistia stratiotes (dwarf variety)',
  'Compact floating plant with attractive rosette formation that provides surface cover and shade.',
  'Dwarf Water Lettuce is a smaller variety of the popular floating plant, perfect for smaller aquariums. Its rosettes of pale green leaves float gracefully on the water surface, creating natural shade and reducing algae growth. The dangling roots provide hiding places for fish and fry. This plant is excellent for guppy tanks, as it mimics their natural habitat and helps maintain water quality.',
  'Moderate to High - Requires good lighting to thrive',
  'Fast - Reproduces quickly through offshoots',
  'Easy - Minimal care required',
  'Floating on water surface',
  ARRAY['Surface coverage and shade', 'Algae prevention', 'Fry shelter in root systems', 'Natural water quality improvement'],
  true,
  true
),
(
  'Duckweed',
  'duckweed',
  'Lemna minor',
  'Tiny floating plant that forms a green carpet on the water surface, excellent for nutrient absorption.',
  'Duckweed is one of the smallest flowering plants, forming a dense green carpet on the aquarium surface. While it grows prolifically, it provides numerous benefits including nutrient absorption, water quality improvement, and natural shade. The tiny plants create a natural environment that guppies enjoy, though growth should be monitored to prevent complete surface coverage that could block light to lower plants.',
  'Low to High - Grows in various conditions',
  'Very Fast - Doubles population rapidly',
  'Very Easy - Extremely hardy',
  'Floating on water surface',
  ARRAY['Rapid nutrient absorption', 'Natural surface cover', 'Food source for some fish', 'Algae competition'],
  false,
  true
);

-- Verify the data
SELECT 
  name,
  slug,
  scientific_name,
  is_featured,
  is_published
FROM public.plants
ORDER BY id;
