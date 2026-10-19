"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";

// Administrator-controlled announcement (Supabase-backed in production)
const announcement = {
  enabled: true,
  message: "New arrivals — Rare Moscow Blue and Platinum White bloodlines now shipping pan-India",
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
    <div className="relative z-40 border-b border-border bg-secondary text-charcoal">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-10">
        <div className="flex-1 text-center font-sans text-xs font-medium text-body sm:text-xs">
          <span className="inline-flex items-center gap-1.5 font-semibold text-brand mr-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Sheferoy Guppy Update:
          </span>
          {announcement.message}
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="-m-1 p-1 text-muted transition-colors hover:text-charcoal"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
