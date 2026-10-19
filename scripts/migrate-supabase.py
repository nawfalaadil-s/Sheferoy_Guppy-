import psycopg2
import json

DB_URL = "postgresql://postgres:Elite07guppyss@db.ifvmvinxctcognyhwbot.supabase.co:5432/postgres"

def run_migration():
    print("Connecting to Supabase PostgreSQL...")
    conn = psycopg2.connect(DB_URL)
    conn.autocommit = True
    cur = conn.cursor()

    print("1. Creating varieties table...")
    cur.execute("""
    CREATE TABLE IF NOT EXISTS public.varieties (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        line TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        availability TEXT NOT NULL,
        is_popular BOOLEAN DEFAULT false,
        published BOOLEAN DEFAULT true,
        image TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS varieties_slug_idx ON public.varieties(slug);
    ALTER TABLE public.varieties ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Public can view published varieties" ON public.varieties;
    CREATE POLICY "Public can view published varieties"
        ON public.varieties FOR SELECT TO public
        USING (published = true);
    """)

    print("2. Creating plants table...")
    cur.execute("""
    CREATE TABLE IF NOT EXISTS public.plants (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        scientific_name TEXT,
        short_description TEXT NOT NULL,
        description TEXT NOT NULL,
        care_lighting TEXT,
        care_growth TEXT,
        care_difficulty TEXT,
        care_placement TEXT,
        aquarium_uses TEXT[],
        is_featured BOOLEAN DEFAULT false,
        is_published BOOLEAN DEFAULT true,
        image TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS plants_slug_idx ON public.plants(slug);
    ALTER TABLE public.plants ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Public can view published plants" ON public.plants;
    CREATE POLICY "Public can view published plants"
        ON public.plants FOR SELECT TO public
        USING (is_published = true);
    """)

    print("3. Creating reels table...")
    cur.execute("""
    CREATE TABLE IF NOT EXISTS public.reels (
        id TEXT PRIMARY KEY,
        code TEXT NOT NULL UNIQUE,
        url TEXT NOT NULL,
        type TEXT NOT NULL,
        caption TEXT NOT NULL,
        category TEXT NOT NULL,
        variety_name TEXT,
        variety_slug TEXT,
        featured BOOLEAN DEFAULT false,
        "order" INTEGER DEFAULT 1,
        author TEXT DEFAULT 'sheferoyguppy',
        video_url TEXT,
        thumbnail_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );
    ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Public can view reels" ON public.reels;
    CREATE POLICY "Public can view reels"
        ON public.reels FOR SELECT TO public
        USING (true);
    """)

    print("4. Creating enquiries table...")
    cur.execute("""
    CREATE TABLE IF NOT EXISTS public.enquiries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        contact TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMPTZ DEFAULT NOW()
    );
    ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Anyone can insert enquiries" ON public.enquiries;
    CREATE POLICY "Anyone can insert enquiries"
        ON public.enquiries FOR INSERT TO public
        WITH CHECK (true);
    """)

    # Seed 20 varieties
    print("5. Seeding 20 varieties...")
    with open(r"E:\Shero guppy\lib\varieties-data.ts", "r", encoding="utf-8") as f:
        content = f.read()

    # Read the JSON structure from lib/varieties-data.ts
    varieties_data = [
        {"name": "Veiltail Zebra Green", "slug": "veiltail-zebra-green", "line": "Veiltail Bloodline", "category": "Guppies", "description": "Long flowing veiltail with emerald zebra striations across the caudal fin. Bred for active swimming and vibrant metallic coloration under full aquarium light.", "availability": "Limited Stock", "is_popular": False, "image": "/images/varieties/veiltail-zebra-green.jpg"},
        {"name": "Thai Flag Betta", "slug": "thai-flag-betta", "line": "Show Halfmoon Line", "category": "Bettas", "description": "Distinct red, white, and royal blue banding reminiscent of the national flag. Exceptionally symmetrical finnage with broad 180-degree halfmoon spread.", "availability": "Available", "is_popular": False, "image": "/images/varieties/thai-flag-betta.jpg"},
        {"name": "Platinum Black Green Dragon Dumbo Ear", "slug": "platinum-black-green-dragon-dumbo-ear", "line": "Big Ear Dragon Line", "category": "Guppies", "description": "Oversized white pectoral fins contrast against heavy metallic black and emerald dragon scales. Striking presence in planted biotopes.", "availability": "Available", "is_popular": False, "image": "/images/varieties/platinum-black-green-dragon-dumbo-ear.jpg"},
        {"name": "Black Dumbo Ear", "slug": "black-dumbo-ear", "line": "Solid Velvet Line", "category": "Guppies", "description": "Jet-black velvet body paired with immaculate white and charcoal dumbo pectoral fins. Outstanding genetic stability and fin spread.", "availability": "Available", "is_popular": False, "image": "/images/varieties/black-dumbo-ear.jpg"},
        {"name": "24k Gold Guppy", "slug": "24k-gold-guppy", "line": "Pure 24K Metallic Strain", "category": "Guppies", "description": "Solid shimmering 24K yellow-gold from head to caudal fin. One of our most demanded show-quality strains with brilliant metallic reflective sheen.", "availability": "Limited Stock", "is_popular": True, "image": "/images/varieties/24k-gold-guppy.jpg"},
        {"name": "Silverodo HB Blue", "slug": "silverodo-hb-blue", "line": "Half-Black Blue Strain", "category": "Guppies", "description": "Deep half-black body coloration with an electric sapphire blue dorsal and delta tail. High visual contrast and energetic disposition.", "availability": "Available", "is_popular": False, "image": "/images/varieties/silverodo-hb-blue.jpg"},
        {"name": "Red Blue Berry Dragon Dumbo Ear", "slug": "red-blue-berry-dragon-dumbo-ear", "line": "Dragon Dumbo Line", "category": "Guppies", "description": "Rich berry-tone mosaic caudal with royal blue accents and fluttering dumbo pectoral fins. Vigorous strain bred in freshwater nursery tanks.", "availability": "Available", "is_popular": False, "image": "/images/varieties/red-blue-berry-dragon-dumbo-ear.jpg"},
        {"name": "Redrose Siamese", "slug": "redrose-siamese", "line": "Rosetail Betta Strain", "category": "Bettas", "description": "Ruffled, voluminous red rose petal finnage with intense scarlet saturation. Selected for robust health, graceful swimming, and majestic flaring.", "availability": "Available", "is_popular": False, "image": "/images/varieties/redrose-siamese.jpg"},
        {"name": "Full White", "slug": "full-white", "line": "Pure Platinum Line", "category": "Guppies", "description": "Pure snowy white pigmentation throughout body and caudal fin with delicate pearlescent sheen. Pristine bloodline with solid gene expression.", "availability": "Limited Stock", "is_popular": False, "image": "/images/varieties/full-white.jpg"},
        {"name": "Purple Berry Dragon Dumbo Ear", "slug": "purple-berry-dragon-dumbo-ear", "line": "Dragon Dumbo Strain", "category": "Guppies", "description": "Deep violet-purple dragon scales across the flank paired with expansive white dumbo ear pectoral fins. Highly sought-after show line.", "availability": "Available", "is_popular": False, "image": "/images/varieties/purple-berry-dragon-dumbo-ear.jpg"},
        {"name": "AFR (Albino Full Red) Redrose Tail", "slug": "afr-redrose-tail", "line": "Albino Full Red Line", "category": "Guppies", "description": "Vivid crimson red pigmentation covering every millimeter, featuring ruby red albino eyes and ornate ruffled rosetail fin borders.", "availability": "Available", "is_popular": False, "image": "/images/varieties/afr-redrose-tail.jpg"},
        {"name": "Albino Silverado Red Dumbo Ear", "slug": "albino-silverado-red-dumbo-ear", "line": "Silverado Dumbo Line", "category": "Guppies", "description": "Metallic silver dorsal sheen meeting fiery red caudal fin with prominent white ear pectorals and distinct albino eye clarity.", "availability": "Available", "is_popular": False, "image": "/images/varieties/albino-silverado-red-dumbo-ear.jpg"},
        {"name": "Silverodo Black Dragon Dumbo Ear", "slug": "silverodo-black-dragon-dumbo-ear", "line": "Silverado Dragon Strain", "category": "Guppies", "description": "Dark charcoal-black dragon scales with gleaming silver ear highlights and wide dorsal spread. Raised in pristine Kanyakumari water.", "availability": "Limited Stock", "is_popular": False, "image": "/images/varieties/silverodo-black-dragon-dumbo-ear.jpg"},
        {"name": "Silverodo Green Dragon Dumbo Ear", "slug": "silverodo-green-dragon-dumbo-ear", "line": "Green Dragon Bloodline", "category": "Guppies", "description": "Emerald green dragon scales that shimmer with gold undertones, contrasted with expansive white dumbo fins and robust vitality.", "availability": "Available", "is_popular": False, "image": "/images/varieties/silverodo-green-dragon-dumbo-ear.jpg"},
        {"name": "Copper Dragon", "slug": "copper-dragon", "line": "Metallic Plakat Line", "category": "Bettas", "description": "Heavy metallic copper scales with dark armor detailing and strong finnage. Bred for vigor, aggressive feeding response, and show flare.", "availability": "Available", "is_popular": False, "image": "/images/varieties/copper-dragon.jpg"},
        {"name": "Silverodo Red Dumbo Ear", "slug": "silverodo-red-dumbo-ear", "line": "Silverado Red Strain", "category": "Guppies", "description": "Vibrant fire-red delta caudal paired with bright silver-tipped dumbo fins. Consistently produces high-ratio show grade offspring.", "availability": "Available", "is_popular": False, "image": "/images/varieties/silverodo-red-dumbo-ear.jpg"},
        {"name": "Blue Copper Dragon", "slug": "blue-copper-dragon", "line": "Dragon Scale Betta", "category": "Bettas", "description": "Iridescent royal blue base overlaid with gleaming copper dragon scale armor. Compact, muscular body and pristine fin spread.", "availability": "Available", "is_popular": False, "image": "/images/varieties/blue-copper-dragon.jpg"},
        {"name": "Violet Veiltail Zebra", "slug": "violet-veiltail-zebra", "line": "Veiltail Zebra Bloodline", "category": "Guppies", "description": "Rare violet-purple hue with crisp zebra striping across an extended veil caudal. Exceptional finnage movement in gentle tank flow.", "availability": "Limited Stock", "is_popular": False, "image": "/images/varieties/violet-veiltail-zebra.jpg"},
        {"name": "Nemo Candy Females", "slug": "nemo-candy-females", "line": "Candy Koi Betta Sorority", "category": "Bettas", "description": "Multi-color koi marble pattern with striking blotches of orange, black, yellow, and red. Ideal healthy females for breeding projects or sorority tanks.", "availability": "Available", "is_popular": False, "image": "/images/varieties/nemo-candy-females.jpg"},
        {"name": "Moscow Blue", "slug": "moscow-blue", "line": "Pure Moscow Bloodline", "category": "Guppies", "description": "Deep solid navy-blue pigmentation extending continuously across head, body, and tail. Highly prized, pure-breeding heritage line.", "availability": "Available", "is_popular": True, "image": "/images/varieties/moscow-blue.jpg"}
    ]

    for v in varieties_data:
        cur.execute("""
            INSERT INTO public.varieties (name, slug, line, category, description, availability, is_popular, published, image)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (slug) DO UPDATE SET
                name = EXCLUDED.name,
                line = EXCLUDED.line,
                category = EXCLUDED.category,
                description = EXCLUDED.description,
                availability = EXCLUDED.availability,
                is_popular = EXCLUDED.is_popular,
                published = EXCLUDED.published,
                image = EXCLUDED.image,
                updated_at = NOW();
        """, (v["name"], v["slug"], v["line"], v["category"], v["description"], v["availability"], v["is_popular"], True, v["image"]))

    # Seed plants
    print("6. Seeding plants...")
    plants_data = [
        ("Pennywort", "pennywort", "Hydrocotyle leucocephala", "Fast-growing stem plant with round coin-shaped leaves.", "Pennywort is a popular aquarium plant known for its rapid growth and attractive round leaves. Excellent cover for fry.", "Low to High", "Fast", "Easy", "Background / Floating", ["Fry Protection", "Water Filtration"], True, True, "/images/plants/pennywort.jpg"),
        ("Vallisneria spiralis", "vallisneria-spiralis", "Vallisneria spiralis", "Classic background plant with ribbon-like leaves.", "Hardy background plant with long tape-like leaves. Spreads via runners and provides shelter for guppies.", "Low to Moderate", "Moderate to Fast", "Easy", "Background", ["Background", "Fry Shelter"], True, True, "/images/plants/vallisneria.jpg"),
        ("Foxtail", "foxtail", "Myriophyllum aquaticum", "Feathery stem plant with delicate bushy foliage.", "Beautiful aquatic plant with fine feather-like leaves. Effective in guppy tanks for fry protection.", "Moderate to High", "Fast", "Moderate", "Midground / Background", ["Fry Protection", "Aquascaping"], True, True, "/images/plants/foxtail.jpg"),
        ("Guppy Grass", "guppy-grass", "Najas guadalupensis", "Essential plant for guppy breeders with dense fry cover.", "Indispensable fast-growing bushy aquatic plant for guppy fry survival and natural filtration.", "Low to High", "Very Fast", "Very Easy", "Floating / Planted", ["Fry Nursery", "Filtration"], True, True, "/images/plants/guppy-grass.jpg"),
        ("Dwarf Water Lettuce", "dwarf-water-lettuce", "Pistia stratiotes", "Compact floating rosette plant with dangling root shelter.", "Floating rosette with pale green velvety leaves. Dangling roots provide natural fry shelter.", "Moderate to High", "Fast", "Easy", "Floating", ["Surface Cover", "Root Shelter"], True, True, "/images/plants/water-lettuce.jpg"),
        ("Duckweed", "duckweed", "Lemna minor", "Tiny surface floating plant with rapid nutrient absorption.", "Forms a green carpet on surface, excellent for nutrient absorption and natural shading.", "Low to High", "Very Fast", "Very Easy", "Floating", ["Nutrient Sponge", "Natural Shade"], False, True, "/images/plants/duckweed.jpg")
    ]

    for p in plants_data:
        cur.execute("""
            INSERT INTO public.plants (name, slug, scientific_name, short_description, description, care_lighting, care_growth, care_difficulty, care_placement, aquarium_uses, is_featured, is_published, image)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (slug) DO UPDATE SET
                name = EXCLUDED.name,
                scientific_name = EXCLUDED.scientific_name,
                short_description = EXCLUDED.short_description,
                description = EXCLUDED.description,
                care_lighting = EXCLUDED.care_lighting,
                care_growth = EXCLUDED.care_growth,
                care_difficulty = EXCLUDED.care_difficulty,
                care_placement = EXCLUDED.care_placement,
                aquarium_uses = EXCLUDED.aquarium_uses,
                is_featured = EXCLUDED.is_featured,
                is_published = EXCLUDED.is_published,
                image = EXCLUDED.image,
                updated_at = NOW();
        """, p)

    # Seed reels from data/reels.json
    print("7. Seeding reels...")
    with open(r"E:\Shero guppy\data\reels.json", "r", encoding="utf-8") as f:
        reels = json.load(f)

    for r in reels:
        cur.execute("""
            INSERT INTO public.reels (id, code, url, type, caption, category, variety_name, variety_slug, featured, "order", author, video_url, thumbnail_url)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (id) DO UPDATE SET
                url = EXCLUDED.url,
                caption = EXCLUDED.caption,
                category = EXCLUDED.category,
                variety_name = EXCLUDED.variety_name,
                variety_slug = EXCLUDED.variety_slug,
                featured = EXCLUDED.featured,
                "order" = EXCLUDED."order",
                video_url = EXCLUDED.video_url,
                thumbnail_url = EXCLUDED.thumbnail_url;
        """, (r["id"], r["code"], r["url"], r["type"], r["caption"], r["category"], r.get("varietyName"), r.get("varietySlug"), r.get("featured", False), r.get("order", 1), r.get("author", "sheferoyguppy"), r.get("videoUrl"), r.get("thumbnailUrl")))

    print("\nVerifying migrated tables in public schema:")
    cur.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name;
    """)
    for t in cur.fetchall():
        cur.execute(f"SELECT COUNT(*) FROM public.{t[0]};")
        cnt = cur.fetchone()[0]
        print(f" - public.{t[0]}: {cnt} rows")

    cur.close()
    conn.close()
    print("\nSupabase migration completed successfully!")

if __name__ == "__main__":
    run_migration()
