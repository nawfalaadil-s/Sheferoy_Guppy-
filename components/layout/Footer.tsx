import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MessageCircle } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Guppies", href: "/varieties?category=Guppies" },
  { name: "Bettas", href: "/varieties?category=Bettas" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white py-10 sm:py-12" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 pb-8 border-b border-border">
          {/* Brand & Category Info */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-border bg-white p-0.5 shadow-subtle">
                <Image
                  src="/logo.png"
                  alt="Sheferoy Guppy"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base font-bold tracking-tight text-heading">
                  Sheferoy Guppy
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  Ornamental Guppies, Bettas & Breeding Pairs
                </span>
              </div>
            </Link>

            <p className="mt-3 text-xs sm:text-sm text-body max-w-sm leading-relaxed">
              Premium ornamental guppies, bettas, and breeding pairs carefully conditioned for beauty, vigor, and true-breeding genetics.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="lg:col-span-3" aria-label="Quick Links">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-heading">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2">
              {quickLinks.slice(0, 5).map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-sm text-body hover:text-brand transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-heading">
              Contact Details
            </h3>
            <ul className="mt-3 space-y-2.5 text-xs sm:text-sm text-body">
              <li>
                <a
                  href="tel:7358612156"
                  className="inline-flex items-center gap-2 hover:text-brand transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-brand shrink-0" aria-hidden="true" />
                  <span>Contact: <strong className="text-charcoal font-semibold">7358612156</strong></span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919489184047?text=Hi%20Sheferoy%20Guppy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-brand transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-success shrink-0" aria-hidden="true" />
                  <span>WhatsApp: <strong className="text-charcoal font-semibold">94891 84047</strong></span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:eliteguppyss@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-brand transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-brand shrink-0" aria-hidden="true" />
                  <span>Email: <strong className="text-charcoal font-semibold">eliteguppyss@gmail.com</strong></span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-muted">
          <p>© {year} Sheferoy Guppy. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand transition-colors">
              Terms of Service
            </Link>
            <Link href="/admin" className="hover:text-brand transition-colors font-medium">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
