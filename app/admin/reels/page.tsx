"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RotateCcw,
  Loader2,
  SlidersHorizontal,
  Info,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import {
  type InstagramReel,
  type ReelItemCategory,
  reelCategories,
  extractInstagramInfo,
  verifiedSheferoyReels,
} from "@/lib/reels-data";

export default function AdminReelsPage() {
  const [reels, setReels] = useState<InstagramReel[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<string>("admin_managed");

  // Form states
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState<ReelItemCategory>("Fish Room");
  const [variety, setVariety] = useState("");
  const [featured, setFeatured] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );
  const [urlInfo, setUrlInfo] = useState<{ valid: boolean; message: string; code?: string } | null>(
    null
  );

  const fetchReels = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reels");
      const data = await res.json();
      if (data.success && Array.isArray(data.reels)) {
        setReels(data.reels);
        setSource(data.source || "admin_managed");
      } else {
        setReels(verifiedSheferoyReels);
      }
    } catch (err: unknown) {
      console.warn("Could not fetch from /api/reels, using local fallback:", err);
      setReels(verifiedSheferoyReels);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  useEffect(() => {
    if (!url.trim()) {
      setUrlInfo(null);
      return;
    }
    const extracted = extractInstagramInfo(url);
    if (extracted) {
      setUrlInfo({
        valid: true,
        message: `Recognized Instagram ${extracted.type.toUpperCase()} (Code: ${extracted.code})`,
        code: extracted.code,
      });
    } else {
      setUrlInfo({
        valid: false,
        message: "Must be a valid Instagram link: https://www.instagram.com/reel/CODE/ or /p/CODE/",
      });
    }
  }, [url]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInfo?.valid) {
      setFeedback({ type: "error", text: "Please enter a valid Instagram Reel or Post URL." });
      return;
    }
    if (caption.trim().length < 3) {
      setFeedback({ type: "error", text: "Caption must be at least 3 characters." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/reels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          caption: caption.trim(),
          category,
          varietyName: variety.trim() || undefined,
          featured,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to add reel");

      setReels(data.reels);
      setFeedback({ type: "success", text: "Reel added successfully!" });
      setUrl("");
      setCaption("");
      setVariety("");
      setFeatured(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to add reel";
      setFeedback({ type: "error", text: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this Reel from the website?")) return;

    try {
      const res = await fetch(`/api/reels?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setReels(data.reels);
      setFeedback({ type: "success", text: "Reel removed." });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete reel";
      setFeedback({ type: "error", text: msg });
    }
  };

  const handleToggleFeatured = async (reel: InstagramReel) => {
    try {
      const res = await fetch("/api/reels", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reel.id, featured: !reel.featured }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setReels(data.reels);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update reel";
      setFeedback({ type: "error", text: msg });
    }
  };

  const handleMove = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= reels.length) return;

    const copy = [...reels];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;

    try {
      const res = await fetch("/api/reels", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: copy.map((r) => r.id) }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setReels(data.reels);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to move reel";
      setFeedback({ type: "error", text: msg });
    }
  };

  const handleReset = async () => {
    if (!confirm("Reset all Reels back to the verified Sheferoy Guppy catalog?")) return;

    try {
      const res = await fetch("/api/reels", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setReels(data.reels);
      setFeedback({ type: "success", text: "Reset to default Sheferoy Guppy reels." });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to reset reels";
      setFeedback({ type: "error", text: msg });
    }
  };

  return (
    <div className="min-h-screen bg-page pb-24">
      <PageHeader
        eyebrow="Administrator Console"
        tone="gold"
        title={
          <>
            Instagram Reel <span className="font-display italic text-brand">Management</span>
          </>
        }
        description="Add, edit, reorder, feature, and remove Instagram Reels displayed across the Sheferoy Guppy website."
      />

      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        {/* Navigation & Integration Info */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand transition-colors hover:text-brand-hover font-sans"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Homepage
          </Link>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-body shadow-sm">
              <span
                className={`h-2 w-2 rounded-full ${
                  source === "official_api" ? "bg-success" : "bg-gold"
                }`}
              />
              Mode: {source === "official_api" ? "Meta Graph API Active" : "Admin-Managed List"}
            </span>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs text-body transition-colors hover:border-brand hover:text-brand shadow-sm"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Defaults
            </button>
          </div>
        </div>

        {/* Integration notice */}
        <div className="mb-10 flex items-start gap-3 rounded-2xl border border-border bg-secondary/70 p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <div className="text-xs leading-relaxed text-body space-y-1">
            <p className="font-semibold text-heading">
              Official Instagram Integration Notice:
            </p>
            <p>
              This website links exclusively to verified content published by{" "}
              <strong className="text-heading">@sheferoyguppy</strong> (Kanyakumari, Tamil Nadu). If an official Instagram
              Graph API Access Token is provided in the environment (<code>INSTAGRAM_ACCESS_TOKEN</code>
              ), the system automatically syncs with the Meta API. In standard operation, this
              admin-managed list maintains and validates official Reel links.
            </p>
          </div>
        </div>

        {/* Action feedback */}
        {feedback && (
          <div
            className={`mb-6 flex items-center gap-2 rounded-xl border p-4 text-xs font-medium ${
              feedback.type === "success"
                ? "border-success/30 bg-success/10 text-success"
                : "border-error/30 bg-error/10 text-error"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 text-error" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Add Reel Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-3xl border border-border bg-surface p-6 sm:p-7 shadow-card">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-brand">
                  <Plus className="h-4 w-4" />
                </span>
                <h3 className="font-display text-lg font-bold text-heading">Add New Instagram Reel</h3>
              </div>

              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label htmlFor="url" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-heading">
                    Instagram Reel URL <span className="text-gold">*</span>
                  </label>
                  <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.instagram.com/reel/DRmaGfQCZES/"
                    className="w-full rounded-xl border border-border bg-page px-3.5 py-2.5 text-sm text-heading placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10 shadow-sm"
                    required
                  />
                  {urlInfo && (
                    <p
                      className={`mt-1.5 flex items-center gap-1.5 text-xs font-medium ${
                        urlInfo.valid ? "text-success" : "text-error"
                      }`}
                    >
                      {urlInfo.valid ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      )}
                      {urlInfo.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="caption" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-heading">
                    Caption / Description <span className="text-gold">*</span>
                  </label>
                  <textarea
                    id="caption"
                    rows={3}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Describe the bloodline, feeding session, or breeding update shown in this video…"
                    className="w-full rounded-xl border border-border bg-page px-3.5 py-2.5 text-sm text-heading placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10 shadow-sm resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="category" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-heading">
                      Category
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ReelItemCategory)}
                      className="w-full rounded-xl border border-border bg-page px-3 py-2.5 text-sm text-heading focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10 shadow-sm"
                    >
                      {reelCategories
                        .filter((c) => c !== "All")
                        .map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="variety" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-heading">
                      Variety Tag
                    </label>
                    <input
                      type="text"
                      id="variety"
                      value={variety}
                      onChange={(e) => setVariety(e.target.value)}
                      placeholder="e.g. Platinum Koi"
                      className="w-full rounded-xl border border-border bg-page px-3.5 py-2.5 text-sm text-heading placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10 shadow-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-brand focus:ring-brand"
                  />
                  <label htmlFor="featured" className="text-xs text-body font-medium">
                    Feature on Homepage Showcase
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !urlInfo?.valid}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-brand-hover shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving to Catalog…
                    </>
                  ) : (
                    "Add Reel to Website"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Current Reels List */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-surface p-6 sm:p-7 shadow-card">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-brand">
                    <SlidersHorizontal className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-heading">Active Reels ({reels.length})</h3>
                </div>
                <span className="text-xs text-muted">Use arrows to adjust order</span>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 text-brand">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="mt-3 text-xs uppercase tracking-wider text-muted font-medium">
                    Loading collection…
                  </span>
                </div>
              ) : reels.length === 0 ? (
                <div className="py-12 text-center text-body">
                  No Reels registered. Add your first Reel using the form.
                </div>
              ) : (
                <div className="space-y-3">
                  {reels.map((reel, index) => (
                    <div
                      key={reel.id}
                      className="flex flex-col gap-3 rounded-2xl border border-border bg-page p-4 transition-colors hover:border-brand/40 sm:flex-row sm:items-center sm:justify-between shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary font-mono text-xs font-bold text-brand">
                          {index + 1}
                        </span>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-brand">
                              {reel.code}
                            </span>
                            <span className="rounded bg-secondary border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-heading">
                              {reel.category}
                            </span>
                            {reel.featured && (
                              <span className="inline-flex items-center gap-0.5 rounded border border-gold/40 bg-gold/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-heading">
                                <Sparkles className="h-2 w-2 text-gold" /> Featured
                              </span>
                            )}
                          </div>
                          <p className="line-clamp-2 text-xs text-heading font-medium">{reel.caption}</p>
                          <a
                            href={reel.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-muted transition-colors hover:text-brand"
                          >
                            {reel.url}
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => handleMove(index, -1)}
                          disabled={index === 0}
                          className="rounded-lg border border-border bg-surface p-2 text-body transition-colors hover:border-brand hover:text-brand disabled:opacity-25 shadow-sm"
                          title="Move Up"
                          aria-label="Move Up"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMove(index, 1)}
                          disabled={index === reels.length - 1}
                          className="rounded-lg border border-border bg-surface p-2 text-body transition-colors hover:border-brand hover:text-brand disabled:opacity-25 shadow-sm"
                          title="Move Down"
                          aria-label="Move Down"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(reel)}
                          className={`rounded-lg border p-2 transition-colors shadow-sm ${
                            reel.featured
                              ? "border-gold/50 bg-gold/20 text-heading font-bold"
                              : "border-border bg-surface text-muted hover:border-brand hover:text-brand"
                          }`}
                          title={reel.featured ? "Unfeature from homepage" : "Feature on homepage"}
                          aria-label={reel.featured ? "Unfeature" : "Feature"}
                        >
                          <Sparkles className="h-3.5 w-3.5 text-gold" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(reel.id)}
                          className="rounded-lg border border-error/30 bg-surface p-2 text-error transition-colors hover:border-error hover:bg-error/10 shadow-sm"
                          title="Delete Reel"
                          aria-label="Delete Reel"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
