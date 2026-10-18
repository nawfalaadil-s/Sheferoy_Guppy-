"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Guppies", href: "/varieties" },
  { name: "Plants", href: "/plants" },
  { name: "Gallery", href: "/gallery" },
  { name: "Journal", href: "/blog" },
  { name: "Offers", href: "/offers" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen, closeMenu]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-luxe ${
        scrolled
          ? "border-b border-gold/15 bg-obsidian/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-site items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-10"
        aria-label="Primary"
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <span className="sr-only">Sheferoy Guppy — home</span>
          <Image
            src="/logo.png"
            alt=""
            width={140}
            height={70}
            className="h-10 w-auto object-contain lg:h-11"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`group relative py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                isActive(item.href) ? "text-gold-light" : "text-ivory/75 hover:text-ivory"
              }`}
            >
              {item.name}
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gradient-to-r from-gold to-transparent transition-transform duration-400 ease-luxe ${
                  isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}?text=${encodeURIComponent(
            "Hi, I'm interested in your guppy varieties"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn hidden border border-gold/60 px-5 py-2.5 text-gold-light transition-all hover:bg-gold hover:text-obsidian lg:inline-flex"
        >
          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
          Enquire
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          className="-mr-2 inline-flex items-center justify-center rounded-md p-2.5 text-ivory transition-colors hover:text-gold lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="lg:hidden">
          <div
            className="fixed inset-0 z-50 bg-obsidian/70 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto border-l border-gold/15 bg-obsidian px-6 pb-10 pt-5">
            <div className="flex items-center justify-between">
              <Image src="/logo.png" alt="Sheferoy Guppy" width={120} height={60} className="h-9 w-auto object-contain" />
              <button
                type="button"
                className="-mr-2 rounded-md p-2.5 text-ivory transition-colors hover:text-gold"
                onClick={closeMenu}
                aria-label="Close menu"
                autoFocus
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-10 flex flex-1 flex-col">
              <ul className="space-y-1">
                {navigation.map((item, i) => (
                  <li key={item.name} className="anim-rise" style={{ animationDelay: `${i * 0.05}s` }}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`flex items-baseline justify-between border-b border-white/5 py-3.5 font-display text-2xl transition-colors ${
                        isActive(item.href) ? "text-gold-light" : "text-ivory hover:text-gold-light"
                      }`}
                    >
                      {item.name}
                      <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-ivory/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <Link
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}?text=${encodeURIComponent(
                    "Hi, I'm interested in your guppy varieties"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full"
                  onClick={closeMenu}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Enquire on WhatsApp
                </Link>
                <p className="mt-4 text-center font-sans text-[10px] uppercase tracking-[0.22em] text-ivory/40">
                  Kanyakumari · Tamil Nadu · India
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
