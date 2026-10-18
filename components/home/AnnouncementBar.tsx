"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";

// Administrator-controlled announcement (Supabase-backed in production)
const announcement = {
  enabled: true,
  message: "New arrivals — Rare Moscow Blue and Platinum strains now available",
  startDate: "2026-10-01",
  endDate: "2026-12-31",
};

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!announcement.enabled) return;

    const now = new Date();
    const start = announcement.startDate ? new Date(announcement.startDate) : null;
    const end = announcement.endDate ? new Date(announcement.endDate) : null;

    const isActive = (!start || now >= start) && (!end || now <= end);

    if (isActive && !sessionStorage.getItem("announcement-dismissed")) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("announcement-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="relative z-40 bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-obsidian">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-10">
        <p className="flex-1 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.18em]">
          {announcement.message}
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          className="-m-1.5 p-1.5 transition-opacity hover:opacity-60"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
