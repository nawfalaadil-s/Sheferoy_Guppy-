import os
import psycopg2
import json

DB_URL = os.environ.get(
    "DATABASE_URL",
    os.environ.get("POSTGRES_URL", "")
)

def setup_database():
    print("Connecting to Supabase PostgreSQL...")
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    # 1. Create gallery_items table
    print("Creating public.gallery_items table...")
    cur.execute('''
        CREATE TABLE IF NOT EXISTS public.gallery_items (
            id SERIAL PRIMARY KEY,
            kind TEXT NOT NULL,
            alt TEXT NOT NULL,
            caption TEXT NOT NULL,
            category TEXT NOT NULL,
            image TEXT,
            video_url TEXT,
            thumbnail_url TEXT,
            variety_slug TEXT,
            plant_slug TEXT,
            video_category TEXT,
            is_published BOOLEAN DEFAULT true,
            sort_order INTEGER DEFAULT 0,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    ''')

    # 2. Create blog_posts table
    print("Creating public.blog_posts table...")
    cur.execute('''
        CREATE TABLE IF NOT EXISTS public.blog_posts (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            excerpt TEXT NOT NULL,
            content TEXT NOT NULL,
            category TEXT NOT NULL,
            author TEXT DEFAULT 'Sheferoy Guppy',
            image TEXT,
            published_at TIMESTAMPTZ DEFAULT NOW(),
            is_published BOOLEAN DEFAULT true,
            read_time TEXT DEFAULT '5 min read',
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    ''')

    # 3. Create offers table
    print("Creating public.offers table...")
    cur.execute('''
        CREATE TABLE IF NOT EXISTS public.offers (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            image TEXT,
            start_date DATE,
            end_date DATE,
            is_active BOOLEAN DEFAULT true,
            is_featured BOOLEAN DEFAULT false,
            sort_order INTEGER DEFAULT 0,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    ''')

    # 4. Configure RLS Policies for all CMS tables
    tables = ['varieties', 'plants', 'gallery_items', 'blog_posts', 'offers', 'site_content', 'enquiries']
    for table in tables:
        print(f"Configuring RLS for {table}...")
        cur.execute(f"ALTER TABLE public.{table} ENABLE ROW LEVEL SECURITY;")
        cur.execute(f"DROP POLICY IF EXISTS allow_all_{table} ON public.{table};")
        cur.execute(f"CREATE POLICY allow_all_{table} ON public.{table} FOR ALL USING (true) WITH CHECK (true);")

    conn.commit()

    # 5. Seed blog_posts if empty
    cur.execute("SELECT COUNT(*) FROM public.blog_posts;")
    if cur.fetchone()[0] == 0:
        print("Seeding initial blog posts...")
        posts = [
            (
                "Complete Guide to Guppy Care for Beginners",
                "complete-guide-guppy-care-beginners",
                "Learn the essential basics of caring for guppies, including water parameters, feeding schedules, and tank setup requirements for healthy, vibrant fish.",
                """# Complete Guide to Guppy Care for Beginners

Guppies are one of the most popular freshwater aquarium fish, celebrated for their peaceful temperament, stunning finnage, and hardy nature.

## Tank Requirements
- **Minimum tank size**: 40 liters (10 gallons) for a small group
- **Tank shape**: Longer tanks are better than tall tanks
- **Filtration**: Gentle sponge filter or bio-wheel filter that won't create turbulent currents
- **Heating**: A reliable heater calibrated to 24-28°C (75-82°F)

## Water Parameters
- **pH**: 6.8 - 7.8
- **Hardness**: 8 - 12 dGH
- **Ammonia & Nitrite**: 0 ppm
- **Nitrate**: Below 20 ppm

## Feeding
Feed small portions 2 times daily. High-quality micro-pellets, live baby brine shrimp, and spirulina flakes will maximize fin luster and overall vigor.""",
                "Guppy Care",
                "Sheferoy Guppy",
                "/images/varieties/veiltail-zebra-green.jpg",
                True,
                "5 min read"
            ),
            (
                "Understanding Guppy Breeding Basics & Selective Line Care",
                "understanding-guppy-breeding-basics",
                "Explore the principles of selective line breeding, virgin female isolation, and raising healthy fry with superior finnage.",
                """# Understanding Guppy Breeding Basics & Selective Line Care

Selective line breeding requires patience, disciplined observation, and consistent tank maintenance.

## Selecting Breeding Pairs
Choose pairs that exhibit true-to-type genetics:
- Symmetrical caudal spread (delta, veil, or rosetail)
- Strong dorsal carrying angle
- Deep, uniform body pigmentation

## Fry Care & Early Nutrition
Newly born fry benefit from infusoria and freshly hatched baby brine shrimp within the first 48 hours for rapid frame development.""",
                "Guppy Breeding",
                "Sheferoy Guppy",
                "/images/varieties/24k-gold-guppy.jpg",
                True,
                "6 min read"
            ),
            (
                "Top 10 Popular Guppy Varieties for Planted Aquariums",
                "top-10-popular-guppy-varieties",
                "Discover the most captivating guppy strains for botanical planted aquariums, from Moscow Blue to 24K Gold and Veiltail Zebra Green.",
                """# Top 10 Popular Guppy Varieties for Planted Aquariums

In a lush planted aquarium with dark substrate, iridescent guppies create breathtaking contrast.

### 1. Moscow Blue
Deep velvet blue body with iridescent metallic scales that glow under planted LED spectrums.

### 2. 24K Gold
Shimmering metallic yellow and gold caudal with pure color coverage.

### 3. Veiltail Zebra Green
Delicate emerald green patterns with expansive streaming finnage.""",
                "Guppy Varieties",
                "Sheferoy Guppy",
                "/images/varieties/moscow-blue.jpg",
                True,
                "4 min read"
            )
        ]
        for p in posts:
            cur.execute('''
                INSERT INTO public.blog_posts (title, slug, excerpt, content, category, author, image, is_published, read_time)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
            ''', p)
        conn.commit()
        print("Blog posts seeded.")

    # 6. Seed offers if empty
    cur.execute("SELECT COUNT(*) FROM public.offers;")
    if cur.fetchone()[0] == 0:
        print("Seeding initial offers...")
        offers_data = [
            (
                "New Spawning Arrival: Pure 24K Full Gold Colony",
                "Selected young adult pairs from our pure 24K Full Gold line. Exceptional metallic luster, thick peduncle, and calm community temperament. Direct breeder verification.",
                "/images/varieties/24k-gold-guppy.jpg",
                "2026-10-01",
                "2026-11-30",
                True,
                True,
                1
            ),
            (
                "Breeder Trio Package: Moscow Blue Line",
                "One verified male and two virgin females from our pure Moscow Blue bloodline. Ideal for establishing a clean genetic foundation in your home fish room.",
                "/images/varieties/moscow-blue.jpg",
                "2026-10-10",
                "2026-12-15",
                True,
                True,
                2
            ),
            (
                "Veiltail Zebra Green Selected Pairs",
                "Long streaming veiltail delta spread with intricate emerald patterning. Healthy, conditioned on live artemia, ready for display or selective breeding.",
                "/images/varieties/veiltail-zebra-green.jpg",
                "2026-10-15",
                "2026-12-31",
                True,
                False,
                3
            )
        ]
        for o in offers_data:
            cur.execute('''
                INSERT INTO public.offers (title, description, image, start_date, end_date, is_active, is_featured, sort_order)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
            ''', o)
        conn.commit()
        print("Offers seeded.")

    # 7. Seed gallery_items if empty
    cur.execute("SELECT COUNT(*) FROM public.gallery_items;")
    if cur.fetchone()[0] == 0:
        print("Seeding initial gallery items...")
        gallery_data = [
            # Videos
            ("video", "High-Dorsal Blue Veiltail Bloodline — Sheferoy Guppy Farm Video", "High-Dorsal Blue Veiltail Bloodline", "Farm Videos", None, "/videos/gallery/farm-clip-06.mp4", "/images/gallery/farm-clip-06.jpg", None, None, "Breeding", True, 1),
            ("video", "Albino Silverado Red Dumbo Ear Pair — Sheferoy Guppy Farm Video", "Albino Silverado Red Dumbo Ear Pair", "Farm Videos", None, "/videos/gallery/farm-clip-05.mp4", "/images/gallery/farm-clip-05.jpg", None, None, "Breeder Pair", True, 2),
            ("video", "Pure 24K Full Gold Metallic Colony — Sheferoy Guppy Farm Video", "Pure 24K Full Gold Metallic Colony", "Farm Videos", None, "/videos/gallery/farm-clip-29.mp4", "/images/gallery/farm-clip-29.jpg", None, None, "Colony", True, 3),
            ("video", "Show Grade Delta Spread Selection Video", "Show Grade Delta Spread Selection", "Farm Videos", None, "/videos/gallery/farm-clip-01.mp4", "/images/gallery/farm-clip-01.jpg", None, None, "Selection", True, 4),
            ("video", "Fry Nursery & Selective Breeding Tank Video", "Fry Nursery Tank Observations", "Farm Videos", None, "/videos/gallery/farm-clip-37.mp4", "/images/gallery/farm-clip-37.jpg", None, None, "Nursery", True, 5),
            ("video", "AFR White Ears Pectoral Fin Inspection", "AFR White Ears Pectoral Fin Inspection", "Farm Videos", None, "/videos/gallery/farm-clip-43.mp4", "/images/gallery/farm-clip-43.jpg", None, None, "Breeding", True, 6),
            
            # Photos
            ("guppy", "Moscow Blue pure solid breeder strain", "Moscow Blue — Velvet deep navy iridescence", "Guppies", "/images/varieties/moscow-blue.jpg", None, None, "moscow-blue", None, None, True, 7),
            ("guppy", "Veiltail Zebra Green flowing dorsal strain", "Veiltail Zebra Green — Emerald striations", "Guppies", "/images/varieties/veiltail-zebra-green.jpg", None, None, "veiltail-zebra-green", None, None, True, 8),
            ("guppy", "24K Gold full body metallic sheen", "24K Gold Guppy — Brilliant metallic luster", "Guppies", "/images/varieties/24k-gold-guppy.jpg", None, None, "24k-gold-guppy", None, None, True, 9),
            ("guppy", "Thai Flag Betta vibrant tricolor caudal", "Thai Flag Betta — Patriot tricolor show form", "Guppies", "/images/varieties/thai-flag-betta.jpg", None, None, "thai-flag-betta", None, None, True, 10),
            ("guppy", "Purple Berry Dragon Dumbo Ear strain", "Purple Berry Dragon Dumbo Ear — Violet caudal", "Guppies", "/images/varieties/purple-berry-dragon-dumbo-ear.jpg", None, None, "purple-berry-dragon-dumbo-ear", None, None, True, 11),
            ("guppy", "Albino Full Red Rosetail guppy pair", "Albino Full Red Rosetail — Deep crimson spread", "Guppies", "/images/varieties/albino-full-red-rosetail.jpg", None, None, "albino-full-red-rosetail", None, None, True, 12),
            ("plant", "Vallisneria spiralis background plant", "Vallisneria spiralis — Lush vertical ribbons", "Plants", "/images/plants/vallisneria.jpg", None, None, None, "vallisneria-spiralis", None, True, 13),
            ("plant", "Hydrocotyle leucocephala Brazilian Pennywort", "Brazilian Pennywort — Vivid umbrella foliage", "Plants", "/images/plants/pennywort.jpg", None, None, None, "pennywort", None, True, 14),
            ("plant", "Ceratophyllum demersum Foxtail Hornwort", "Foxtail Hornwort — Dense feathery refuge", "Plants", "/images/plants/foxtail.jpg", None, None, None, "foxtail", None, True, 15)
        ]
        for g in gallery_data:
            cur.execute('''
                INSERT INTO public.gallery_items (kind, alt, caption, category, image, video_url, thumbnail_url, variety_slug, plant_slug, video_category, is_published, sort_order)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            ''', g)
        conn.commit()
        print("Gallery items seeded.")

    # Verify counts
    print("\n--- FINAL TABLE AUDIT ---")
    for t in tables:
        cur.execute(f"SELECT COUNT(*) FROM public.{t};")
        print(f"  {t}: {cur.fetchone()[0]} rows")

    conn.close()
    print("Database schema migration and seed successfully completed!")

if __name__ == "__main__":
    setup_database()
