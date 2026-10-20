"use client";

import Link from "next/link";
import {
  FileEdit,
  Video,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

export default function AdminHubPage() {
  return (
    <div className="bg-page min-h-screen pb-20">
      <PageHeader
        eyebrow="Admin Console"
        title={
          <>
            Sheferoy Guppy{" "}
            <span className="font-display italic text-brand">Management</span>
          </>
        }
        description="Manage homepage content, fish photography, Instagram Reels, and customer enquiries."
      />

      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10 -mt-6">
        {/* Navigation Quick Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm mb-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-heading">
                Sheferoy Guppy Control Panel
              </p>
              <p className="text-xs text-body flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                Supabase Connected · Live CMS Active
              </p>
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-page px-4 py-2 text-xs font-semibold text-heading hover:border-brand hover:text-brand transition-colors"
          >
            <span>View Live Website</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 3 Core Admin Modules Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Module 1: Homepage CMS */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-card transition-all duration-300 hover:border-brand/40 hover:shadow-card-hover">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-teal">
                <FileEdit className="h-6 w-6" />
              </div>
              <span className="mt-4 inline-block font-sans text-[11px] font-bold uppercase tracking-wider text-brand">
                Content &amp; Images
              </span>
              <h3 className="mt-1 font-display text-xl font-bold text-heading">
                Homepage CMS
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-body">
                Change the index page hero headline, descriptions, upload or pick new fish photography, select the 5 featured fish, and update About &amp; SEO text.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <Link
                href="/admin/content"
                className="btn-primary w-full justify-center py-2.5 text-xs shadow-teal"
              >
                <span>Open Homepage CMS</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Module 2: Instagram Reels & Videos */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-card transition-all duration-300 hover:border-brand/40 hover:shadow-card-hover">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/20">
                <Video className="h-6 w-6" />
              </div>
              <span className="mt-4 inline-block font-sans text-[11px] font-bold uppercase tracking-wider text-brand">
                Media Integration
              </span>
              <h3 className="mt-1 font-display text-xl font-bold text-heading">
                Reels &amp; Video Manager
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-body">
                Add, reorder, and curate Instagram Reels and farm hatchery videos. Controls the lazy-loaded video cards and embeds across the site.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <Link
                href="/admin/reels"
                className="btn-secondary w-full justify-center py-2.5 text-xs hover:border-brand"
              >
                <span>Manage Reels &amp; Videos</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Module 3: Customer Enquiries */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-card transition-all duration-300 hover:border-brand/40 hover:shadow-card-hover">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold border border-gold/30">
                <MessageSquare className="h-6 w-6" />
              </div>
              <span className="mt-4 inline-block font-sans text-[11px] font-bold uppercase tracking-wider text-charcoal">
                Customer Messages
              </span>
              <h3 className="mt-1 font-display text-xl font-bold text-heading">
                Enquiries Inbox
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-body">
                Review inquiries sent from the website contact form, stored securely in the Supabase PostgreSQL database with contact details and strain requests.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <Link
                href="/admin/enquiries"
                className="btn-secondary w-full justify-center py-2.5 text-xs hover:border-brand"
              >
                <span>View Enquiries</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
