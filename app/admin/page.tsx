"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileEdit,
  Fish,
  Leaf,
  Image as ImageIcon,
  BookOpen,
  Tag,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  LogOut,
  Loader2,
  RefreshCw,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import type { DashboardStats } from "@/lib/database-service";

export default function AdminHubPage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [loadingStats, setLoadingStats] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    varietiesCount: 20,
    plantsCount: 6,
    galleryCount: 15,
    blogCount: 3,
    offersCount: 3,
    pendingEnquiriesCount: 0,
  });

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.warn("Could not load stats:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    } finally {
      setLoggingOut(false);
    }
  };

  const modules = [
    {
      title: "Guppy & Betta Varieties",
      category: "Catalog Management",
      description: "Manage 20+ ornamental guppy and betta strains, genetics descriptions, photography, stock availability, and popular highlights.",
      href: "/admin/varieties",
      count: stats.varietiesCount,
      countLabel: "Active Strains",
      icon: Fish,
      btnColor: "bg-brand text-white",
    },
    {
      title: "Live Aquatic Plants",
      category: "Botanical Catalog",
      description: "Manage aquarium plant species, care requirements (light, growth, placement), descriptions, and fry shelter benefits.",
      href: "/admin/plants",
      count: stats.plantsCount,
      countLabel: "Species",
      icon: Leaf,
      btnColor: "bg-emerald-700 text-white",
    },
    {
      title: "Gallery & Media Library",
      category: "Media Management",
      description: "Upload and curate high-resolution fish photography, farm hatchery video clips, captions, and exhibit categories.",
      href: "/admin/gallery",
      count: stats.galleryCount,
      countLabel: "Media Exhibits",
      icon: ImageIcon,
      btnColor: "bg-cyan-800 text-white",
    },
    {
      title: "Blog & Knowledge Articles",
      category: "Content & SEO",
      description: "Publish educational guides on guppy care, water chemistry, fry nutrition, line breeding, and aquarium setups.",
      href: "/admin/blog",
      count: stats.blogCount,
      countLabel: "Published Articles",
      icon: BookOpen,
      btnColor: "bg-indigo-800 text-white",
    },
    {
      title: "Spawning Offers & Bundles",
      category: "Announcements",
      description: "Configure seasonal breeding pair specials, new spawn batch announcements, and limited-run collector trios.",
      href: "/admin/offers",
      count: stats.offersCount,
      countLabel: "Offers Configured",
      icon: Tag,
      btnColor: "bg-amber-700 text-white",
    },
    {
      title: "Customer Enquiries",
      category: "Customer CRM",
      description: "Review incoming contact inquiries, filter by status, and respond with 1-click WhatsApp or email.",
      href: "/admin/enquiries",
      count: stats.pendingEnquiriesCount,
      countLabel: "Pending Messages",
      icon: MessageSquare,
      btnColor: "bg-brand text-white",
      highlight: stats.pendingEnquiriesCount > 0,
    },
    {
      title: "Homepage CMS & Settings",
      category: "Site Content",
      description: "Edit hero titles, pick 5 featured fish cards, customize About & SEO text, and update farm contact details with live preview.",
      href: "/admin/content",
      count: 1,
      countLabel: "Active Profile",
      icon: FileEdit,
      btnColor: "bg-brand text-white",
    },
  ];

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
        description="Comprehensive Content Management System — control catalog, photography, articles, announcements, and customer enquiries."
      />

      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10 -mt-6">
        {/* Top Control Bar */}
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
                Supabase Connected · Real-Time Persistence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchStats}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-page px-3 py-2 text-xs font-semibold text-heading hover:border-brand hover:text-brand transition-colors"
              title="Refresh database statistics"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loadingStats ? "animate-spin text-brand" : ""}`} />
              <span>Refresh Stats</span>
            </button>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-page px-3.5 py-2 text-xs font-semibold text-heading hover:border-brand hover:text-brand transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-page px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors disabled:opacity-50"
              title="Sign out of Admin Console"
            >
              {loggingOut ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <LogOut className="h-3.5 w-3.5" />}
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Live System Stats Summary */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 mb-8">
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Varieties</span>
            <p className="mt-1 font-display text-2xl font-bold text-heading">{stats.varietiesCount}</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Plants</span>
            <p className="mt-1 font-display text-2xl font-bold text-heading">{stats.plantsCount}</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Gallery</span>
            <p className="mt-1 font-display text-2xl font-bold text-heading">{stats.galleryCount}</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Blog Posts</span>
            <p className="mt-1 font-display text-2xl font-bold text-heading">{stats.blogCount}</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Offers</span>
            <p className="mt-1 font-display text-2xl font-bold text-heading">{stats.offersCount}</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand">Pending Enquiries</span>
            <p className="mt-1 font-display text-2xl font-bold text-brand">{stats.pendingEnquiriesCount}</p>
          </div>
        </div>

        {/* CMS Modules Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-card transition-all duration-300 hover:border-brand/40 hover:shadow-card-hover"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-page px-2.5 py-1 text-[11px] font-bold text-heading border border-border">
                      {mod.count} {mod.countLabel}
                    </span>
                  </div>

                  <span className="mt-4 inline-block font-sans text-[11px] font-bold uppercase tracking-wider text-brand">
                    {mod.category}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold text-heading">
                    {mod.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-body">
                    {mod.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <Link
                    href={mod.href}
                    className="btn-primary w-full justify-center py-2.5 text-xs shadow-teal"
                  >
                    <span>Manage {mod.title}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
