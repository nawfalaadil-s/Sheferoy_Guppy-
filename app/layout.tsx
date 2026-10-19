import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAF7",
};

export const metadata: Metadata = {
  title: {
    default: "Sheferoy Guppy — Premium Ornamental Guppies & Bettas",
    template: "%s | Sheferoy Guppy",
  },
  description:
    "Explore our collection of ornamental guppies, bettas, and breeding pairs from Sheferoy Guppy in Kanyakumari, Tamil Nadu.",
  keywords: [
    "Sheferoy Guppy",
    "ornamental guppies",
    "bettas India",
    "breeding pairs",
    "fancy guppies Tamil Nadu",
    "guppy breeder Kanyakumari",
  ],
  authors: [{ name: "Sheferoy Guppy" }],
  creator: "Sheferoy Guppy",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Sheferoy Guppy",
    title: "Sheferoy Guppy — Premium Ornamental Guppies & Bettas",
    description:
      "Explore our collection of ornamental guppies, bettas, and breeding pairs from Sheferoy Guppy.",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Sheferoy Guppy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheferoy Guppy — Premium Ornamental Guppies & Bettas",
    description:
      "Explore our collection of ornamental guppies, bettas, and breeding pairs from Sheferoy Guppy.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-page text-body font-sans antialiased selection:bg-brand-light selection:text-brand">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-brand focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-teal"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
