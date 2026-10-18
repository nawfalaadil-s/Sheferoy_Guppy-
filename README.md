# Sheferoy Guppy - Premium Bloodline Breeder

A modern, production-quality brand promotion website for Sheferoy Guppy, a premium ornamental guppy breeder based in Kanyakumari, Tamil Nadu, India.

## Features

- **Homepage**: Immersive cinematic hero with animated canvas aquarium, featured varieties, brand story, gallery preview, live plants, real Instagram Reels showcase, and calls to action
- **Instagram Reels Showcase**: Real video integration featuring @sheferoyguppy reels, categories, lazy-load facade pattern, mobile scroll snap, and "Watch on Instagram" direct links
- **Dedicated Video & Photo Gallery**: Unified `/gallery` presenting authentic specimen photos and Instagram Reels with category filters and keyboard-navigable accessible lightbox viewer
- **Reel Management Console**: Accessible administrator console (`/admin/reels` & modal) allowing breeders to add, edit, reorder, feature, validate, and manage Reel links with zero downtime
- **About Us**: Brand story, pillars, and location highlights
- **Guppy Varieties**: Searchable and filterable directory with 65+ varieties support
- **Live Aquatic Plants**: Dedicated collection with 6 initial plants, searchable catalog with care information
- **Gallery**: Editorial mosaic grid with accessible keyboard-navigable viewer
- **Blog**: Educational articles on guppy care, breeding, and aquarium maintenance
- **Offers**: Current announcements and new arrivals with featured styling
- **Contact**: Multi-channel contact options with form validation
- **SEO Optimized**: Dynamic sitemap, robots.txt, structured data, and meta tags
- **Responsive Design**: Mobile-first design with premium aquatic theme
- **Accessibility**: WCAG 2.2 AA compliant with keyboard navigation support
- **Reduced Motion**: All animation respects `prefers-reduced-motion`

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design tokens
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Testing**: Playwright (to be configured)

## Design System

### Palette

| Token | Value | Use |
| --- | --- | --- |
| `obsidian` | `#090B0D` | Primary background |
| `abyss` | `#111416` | Raised dark surfaces |
| `ink` | `#171B1F` | Cards on dark |
| `gold` | `#C7A45A` | Primary accent (light `#E6D2A0`, dark `#9A7B36`) |
| `ivory` | `#F7F5EF` | Light section background / primary text on dark |
| `mist` | `#A8AEB0` | Secondary text |
| `moss` | `#5F9E6E` | Botanical collection accent |

### Typography

- **Display**: Cormorant Garamond (editorial serif) — headlines
- **Body**: Inter — UI and body copy
- Both loaded via `next/font/google` in `app/layout.tsx`

### Artwork System

The site ships with an original vector art system — **no photography is bundled yet**:

- `components/art/GuppyArt.tsx` — parameterized SVG guppy illustration driven by per-variety
  `GuppyColorway` tokens in `lib/varieties-data.ts`
- `components/art/PlantArt.tsx` — six botanical illustrations driven by `PlantArtType` in `lib/plants-data.ts`
- `components/art/AquariumCanvas.tsx` — Canvas 2D aquarium backdrop (light shafts, caustics, particles);
  pauses when off-screen and renders a static frame under reduced motion
- `components/art/HeroScene.tsx` — hero composition with pointer parallax

To replace artwork with real photography: add images to `public/`, update gallery data in
`lib/gallery-data.ts`, and swap `GuppyArt`/`PlantArt` usages for `next/image`.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create environment file:

Copy `.env.example` to `.env.local` and configure the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase Configuration (for production)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Business Contact Information
NEXT_PUBLIC_WHATSAPP_NUMBER=+91XXXXXXXXXX
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/sheferoyguppy/
NEXT_PUBLIC_BUSINESS_EMAIL=contact@example.com

# Instagram Integration (Optional: for automated Meta Graph API sync)
# If omitted, the site runs using the verified Sheferoy Guppy catalog + Admin Console at /admin/reels
INSTAGRAM_ACCESS_TOKEN=your_meta_graph_api_access_token
INSTAGRAM_USER_ID=your_instagram_user_id
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Testing

Run Playwright tests:

```bash
npm test
```

### Linting

Check code quality:

```bash
npm run lint
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── gallery/           # Gallery page
│   ├── offers/            # Offers page
│   ├── plants/            # Live plants pages
│   ├── varieties/         # Guppy varieties pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── robots.ts          # Robots.txt generator
│   └── sitemap.ts         # Sitemap generator
├── components/            # React components
│   ├── art/              # Guppy/plant vector art + aquarium canvas
│   ├── blog/             # Blog components
│   ├── contact/          # Contact components
│   ├── gallery/          # Gallery components
│   ├── home/             # Homepage sections
│   ├── layout/           # Layout components
│   ├── plants/           # Plants components
│   ├── ui/               # Reusable UI components
│   └── varieties/        # Variety components
├── lib/                   # Utilities and data
│   ├── blog-data.ts      # Sample blog data
│   ├── gallery-data.ts   # Gallery item references
│   ├── offers-data.ts    # Sample offers data
│   ├── plants-data.ts    # Sample plants data
│   └── varieties-data.ts # Sample varieties + colorways
├── supabase/              # Database migrations
│   └── migrations/       # SQL migration files
└── public/               # Static assets
    └── logo.png          # Brand logo
```

## Database Setup (Production)

### Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL migrations in `supabase/migrations/` (to be created)
3. Configure Row Level Security policies
4. Update environment variables with your Supabase credentials

### Required Tables

- `guppy_varieties` - Guppy variety information
- `plants` - Live aquatic plants catalog
- `gallery_items` - Gallery photos and videos
- `blog_posts` - Blog articles
- `blog_categories` - Blog categories
- `offers` - Announcements and offers
- `contact_enquiries` - Contact form submissions
- `site_settings` - Configurable site settings

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS
- Digital Ocean

## Content Management

Currently, content is managed through sample data files in the `lib/` directory. To enable admin dashboard functionality:

1. Set up Supabase database
2. Configure authentication
3. Implement admin routes (placeholder structure provided)
4. Connect forms to database operations

## Instagram Video Integration & Administration

The site includes an authorized, high-performance Instagram video integration displaying real Reels and videos published by **@sheferoyguppy** (Kanyakumari, Tamil Nadu):

### Architecture & Modes

1. **Admin-Managed Mode (Active Default)**:
   - Built for zero-downtime operation without requiring complex third-party API keys or OAuth setups.
   - Seeded with verified real Sheferoy Guppy Reels featuring Albino Full Red (AFR), Platinum Koi ribbons, show-grade deltas, live feeding sessions, and fry nursery observations.
   - Admin console at `/admin/reels` and inline modal allow administrators to add, edit, reorder, feature, and remove Reel links.
   - All URLs are validated in real-time (`https://www.instagram.com/reel/[code]/` or `/p/[code]/`) to ensure no broken or fabricated links are stored.
   - Data is persisted via `/api/reels` to `data/reels.json` and synchronized with client-side caching.

2. **Official Meta Graph API Mode (Optional)**:
   - If an `INSTAGRAM_ACCESS_TOKEN` is supplied in `.env.local`, the server-side integration automatically queries the official Graph API endpoint (`https://graph.instagram.com/me/media`).
   - Uses Next.js server cache revalidation (`next: { revalidate: 3600 }`) so that third-party requests are never repeated on every page render.
   - Tokens remain strictly on the server and are never exposed to client code.

### Performance & Facade Pattern

- Third-party Instagram embed scripts and iframes can significantly degrade initial page performance (LCP/TBT).
- The website uses an aquatic **facade pattern**: lightweight, beautifully styled preview cards with captions, category tags, and play buttons are rendered initially.
- The interactive Instagram embed is only loaded lazily when a visitor explicitly interacts to play the Reel or opens it in the lightbox.
- Direct "Watch on Instagram" canonical links are provided for every video.

### Testing the Integration

Run the automated integration test suite:

```bash
node scripts/test-instagram-integration.mjs
```

## SEO Features

- Dynamic meta tags for all pages
- Open Graph and Twitter Card support
- Automatic sitemap generation
- Robots.txt configuration
- Structured data (JSON-LD)
- Semantic HTML
- Breadcrumb navigation
- Canonical URLs

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Color contrast compliance
- Reduced motion support
- Alt text for images

## Performance Optimizations

- Next.js image optimization
- Lazy loading
- Code splitting
- Font optimization
- Minimal client-side JavaScript
- Optimized bundle size

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Copyright © 2026 Sheferoy Guppy. All rights reserved.

## Developer Attribution

Website designed and developed by [Skynova Tech Solutions](https://skynovatech.in/)

## Support

For technical support or questions:
- Contact: Sheferoy Guppy via WhatsApp or Instagram
- Developer: Skynova Tech Solutions
