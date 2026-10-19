"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Guppies", href: "/varieties?category=Guppies" },
  { name: "Bettas", href: "/varieties?category=Bettas" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("?")[0]);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 border-b border-border ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-site items-center justify-between px-4 sm:px-6 lg:h-[68px] lg:px-10"
        aria-label="Primary"
      >
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-border bg-white shadow-subtle p-0.5 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Sheferoy Guppy"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base font-bold tracking-tight text-charcoal sm:text-lg leading-tight transition-colors group-hover:text-brand">
              Sheferoy Guppy
            </span>
            <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted leading-tight">
              Ornamental Guppies & Bettas
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-150 ${
                  active ? "text-brand font-bold" : "text-body hover:text-brand"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={`https://wa.me/919489184047?text=${encodeURIComponent(
              "Hi Sheferoy Guppy, I am interested in your ornamental guppies and bettas."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary py-2 px-5 text-xs shadow-teal"
            aria-label="Contact Sheferoy Guppy on WhatsApp"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            WhatsApp
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-white p-2 text-charcoal shadow-subtle transition-colors hover:border-brand hover:text-brand md:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation Menu" className="md:hidden">
          <div
            className="fixed inset-0 z-50 bg-charcoal/30 backdrop-blur-sm transition-opacity"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col overflow-y-auto border-l border-border bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-border p-0.5">
                  <Image src="/logo.png" alt="Sheferoy Guppy" fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-sm font-bold text-charcoal">Sheferoy Guppy</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted">Ornamental Fish</span>
                </div>
              </div>
              <button
                type="button"
                className="rounded-xl border border-border bg-white p-2 text-body hover:text-charcoal shadow-subtle"
                onClick={closeMenu}
                aria-label="Close menu"
                autoFocus
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 flex flex-1 flex-col justify-between">
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                          active
                            ? "bg-brand text-white shadow-teal"
                            : "text-charcoal hover:bg-secondary hover:text-brand"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 border-t border-border pt-6 space-y-3">
                <Link
                  href={`https://wa.me/919489184047?text=${encodeURIComponent(
                    "Hi Sheferoy Guppy, I am interested in your ornamental guppies and bettas."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center py-2.5 text-xs"
                  onClick={closeMenu}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </Link>
                <a
                  href="tel:7358612156"
                  className="btn-secondary w-full justify-center py-2.5 text-xs"
                  onClick={closeMenu}
                >
                  Call: 7358612156
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
