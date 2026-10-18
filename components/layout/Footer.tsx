import Link from "next/link";
import Image from "next/image";
import { Instagram, MessageCircle, MapPin } from "lucide-react";

const explore = [
  { name: "About Us", href: "/about" },
  { name: "Guppy Varieties", href: "/varieties" },
  { name: "Live Plants", href: "/plants" },
  { name: "Gallery", href: "/gallery" },
];

const discover = [
  { name: "Instagram Reels", href: "/#reels-heading" },
  { name: "Journal", href: "/blog" },
  { name: "Offers", href: "/offers" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <footer className="relative border-t border-gold/15 bg-obsidian" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-site px-4 pb-10 pt-16 sm:px-6 lg:px-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Image src="/logo.png" alt="Sheferoy Guppy" width={160} height={80} className="h-14 w-auto object-contain" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">
              Premium guppy bloodline breeder based in Kanyakumari, Tamil Nadu, offering 65+ ornamental
              varieties and live aquatic plants. Safe pan-India shipping.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/sheferoyguppy/"}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-ivory transition-all hover:border-gold/50 hover:text-gold-light"
                aria-label="Sheferoy Guppy on Instagram"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </Link>
              {whatsapp && (
                <Link
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-ivory transition-all hover:border-gold/50 hover:text-gold-light"
                  aria-label="Enquire on WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
            <p className="mt-6 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-ivory/45">
              <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              Kanyakumari · Tamil Nadu · India
            </p>
          </div>

          {/* Navigation */}
          <nav className="lg:col-span-3" aria-label="Explore">
            <h3 className="eyebrow">Explore</h3>
            <ul className="mt-5 space-y-3">
              {explore.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-mist transition-colors hover:text-gold-light"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Discover">
            <h3 className="eyebrow">Discover</h3>
            <ul className="mt-5 space-y-3">
              {discover.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-mist transition-colors hover:text-gold-light"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Enquiry */}
          <div className="lg:col-span-2">
            <h3 className="eyebrow">Enquiries</h3>
            <p className="mt-5 text-sm leading-relaxed text-mist">
              The fastest way to reach us is WhatsApp or Instagram direct message.
            </p>
            <Link
              href={whatsapp ? `https://wa.me/${whatsapp}` : "/contact"}
              target={whatsapp ? "_blank" : undefined}
              rel={whatsapp ? "noopener noreferrer" : undefined}
              className="btn-link mt-4"
            >
              Start an enquiry
            </Link>
          </div>
        </div>

        <div className="hairline mt-14" />

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[11px] tracking-wide text-ivory/40">
            © {year} Sheferoy Guppy. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="font-sans text-[11px] tracking-wide text-ivory/40 transition-colors hover:text-gold-light">
              Privacy
            </Link>
            <Link href="/terms" className="font-sans text-[11px] tracking-wide text-ivory/40 transition-colors hover:text-gold-light">
              Terms
            </Link>
            <Link href="/admin/reels" className="font-sans text-[11px] tracking-wide text-gold/60 transition-colors hover:text-gold-light">
              Manage Reels
            </Link>
          </div>
          <p className="font-sans text-[11px] tracking-wide text-ivory/40">
            Designed &amp; Developed by{" "}
            <Link
              href="https://skynovatech.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/80 transition-colors hover:text-gold-light"
            >
              Skynova Tech Solutions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
