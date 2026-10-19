-- ====================================================================
-- SHEFEROY GUPPY — SUPABASE DATABASE MIGRATIONS
-- Strains, Aquatic Plants, Real Video Reels, and Customer Enquiries
-- ====================================================================

-- 1. Varieties Table (Ornamental Guppies, Bettas, Breeding Pairs)
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

-- 2. Customer Enquiries Table
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

DROP POLICY IF EXISTS "Anyone can select enquiries" ON public.enquiries;
CREATE POLICY "Anyone can select enquiries"
    ON public.enquiries FOR SELECT TO public
    USING (true);

-- 3. Reels & Videos Table
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
