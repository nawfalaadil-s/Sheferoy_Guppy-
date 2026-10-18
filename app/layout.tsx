import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/home/AnnouncementBar";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090B0D",
};

export const metadata: Metadata = {
  title: {
    default: "Sheferoy Guppy — Premium Bloodline Breeder | Kanyakumari, Tamil Nadu",
    template: "%s | Sheferoy Guppy",
  },
  description:
    "Discover 65+ premium guppy varieties from Sheferoy Guppy, a trusted bloodline breeder based in Kanyakumari, Tamil Nadu. Safe pan-India shipping. Trusted by 1,700+ hobbyists.",
  keywords: [
    "Sheferoy Guppy",
    "guppy breeder",
    "Kanyakumari",
    "Tamil Nadu",
    "ornamental guppy fish",
    "guppy varieties",
    "live aquatic plants",
    "aquarium fish",
  ],
  authors: [{ name: "Sheferoy Guppy" }],
  creator: "Skynova Tech Solutions",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Sheferoy Guppy",
    title: "Sheferoy Guppy — Premium Bloodline Breeder",
    description:
      "Discover 65+ premium guppy varieties from Sheferoy Guppy, a trusted bloodline breeder based in Kanyakumari, Tamil Nadu.",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Sheferoy Guppy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheferoy Guppy — Premium Bloodline Breeder",
    description:
      "Discover 65+ premium guppy varieties from Sheferoy Guppy, a trusted bloodline breeder based in Kanyakumari, Tamil Nadu.",
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
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-obsidian"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
