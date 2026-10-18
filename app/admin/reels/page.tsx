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
    <div className="min-h-screen bg-obsidian pb-24">
      <PageHeader
        eyebrow="Administrator Console"
        title={
          <>
            Instagram Reel <span className="font-display italic text-gold-light">Management</span>
          </>
        }
        description="Add, edit, reorder, feature, and remove Instagram Reels displayed across the Sheferoy Guppy website."
      />

      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        {/* Navigation & Integration Info */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:text-gold-light"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Homepage
          </Link>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ivory/70">
              <span
                className={`h-2 w-2 rounded-full ${
                  source === "official_api" ? "bg-green-400" : "bg-gold"
                }`}
              />
              Mode: {source === "official_api" ? "Meta Graph API Active" : "Admin-Managed List"}
            </span>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-ivory/60 transition-colors hover:border-gold hover:text-gold"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Defaults
            </button>
          </div>
        </div>

        {/* Integration notice */}
        <div className="mb-10 flex items-start gap-3 rounded-2xl border border-gold/20 bg-abyss/80 p-5 backdrop-blur-sm">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <div className="text-xs leading-relaxed text-ivory/80 space-y-1">
            <p className="font-semibold text-gold-light">
              Official Instagram Integration Notice:
            </p>
            <p>
              This website links exclusively to verified content published by{" "}
              <strong>@sheferoyguppy</strong> (Kanyakumari, Tamil Nadu). If an official Instagram
              Graph API Access Token is provided in the environment (<code>INSTAGRAM_ACCESS_TOKEN</code>
              ), the system automatically syncs with the Meta API. In standard operation, this
              admin-managed list maintains and validates official Reel links.
            </p>
          </div>
        </div>

        {/* Action feedback */}
        {feedback && (
          <div
            className={`mb-6 flex items-center gap-2 rounded-xl border p-4 text-xs ${
              feedback.type === "success"
                ? "border-green-500/30 bg-green-950/40 text-green-300"
                : "border-red-500/30 bg-red-950/40 text-red-300"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Add Reel Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-3xl border border-gold/20 bg-abyss p-6 shadow-xl">
              <div className="mb-5 flex items-center gap-2.5">
                <Plus className="h-5 w-5 text-gold" />
                <h3 className="font-display text-lg text-ivory">Add New Instagram Reel</h3>
              </div>

              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label htmlFor="url" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ivory/80">
                    Instagram Reel URL <span className="text-gold">*</span>
                  </label>
                  <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.instagram.com/reel/DRmaGfQCZES/"
                    className="field text-sm"
                    required
                  />
                  {urlInfo && (
                    <p
                      className={`mt-1.5 flex items-center gap-1.5 text-xs ${
                        urlInfo.valid ? "text-green-400" : "text-red-400"
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
                  <label htmlFor="caption" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ivory/80">
                    Caption / Description <span className="text-gold">*</span>
                  </label>
                  <textarea
                    id="caption"
                    rows={3}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Describe the bloodline, feeding session, or breeding update shown in this video…"
                    className="field text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="category" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ivory/80">
                      Category
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ReelItemCategory)}
                      className="field text-sm text-ivory"
                    >
                      {reelCategories
                        .filter((c) => c !== "All")
                        .map((cat) => (
                          <option key={cat} value={cat} className="bg-abyss text-ivory">
                            {cat}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="variety" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ivory/80">
                      Variety Tag
                    </label>
                    <input
                      type="text"
                      id="variety"
                      value={variety}
                      onChange={(e) => setVariety(e.target.value)}
                      placeholder="e.g. Platinum Koi"
                      className="field text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-4 w-4 rounded border-gold/40 bg-white/10 text-gold focus:ring-gold"
                  />
                  <label htmlFor="featured" className="text-xs text-ivory/80">
                    Feature on Homepage Showcase
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !urlInfo?.valid}
                  className="btn-gold w-full py-3 text-xs uppercase tracking-wider disabled:opacity-40"
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
            <div className="rounded-3xl border border-gold/20 bg-abyss p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal className="h-5 w-5 text-gold" />
                  <h3 className="font-display text-lg text-ivory">Active Reels ({reels.length})</h3>
                </div>
                <span className="text-xs text-mist">Use arrows to adjust order</span>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 text-gold-light">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="mt-3 text-xs uppercase tracking-wider text-ivory/70">
                    Loading collection…
                  </span>
                </div>
              ) : reels.length === 0 ? (
                <div className="py-12 text-center text-mist">
                  No Reels registered. Add your first Reel using the form.
                </div>
              ) : (
                <div className="space-y-3">
                  {reels.map((reel, index) => (
                    <div
                      key={reel.id}
                      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-ink/60 p-4 transition-colors hover:border-gold/30 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 font-mono text-xs font-semibold text-ivory/60">
                          {index + 1}
                        </span>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-gold-light">
                              {reel.code}
                            </span>
                            <span className="rounded bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-ivory/70">
                              {reel.category}
                            </span>
                            {reel.featured && (
                              <span className="inline-flex items-center gap-0.5 rounded border border-gold/40 bg-gold/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-gold-light">
                                <Sparkles className="h-2 w-2" /> Featured
                              </span>
                            )}
                          </div>
                          <p className="line-clamp-2 text-xs text-ivory/85">{reel.caption}</p>
                          <a
                            href={reel.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-mist transition-colors hover:text-gold"
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
                          className="rounded-lg border border-white/10 p-2 text-ivory/60 transition-colors hover:border-gold hover:text-gold disabled:opacity-25"
                          title="Move Up"
                          aria-label="Move Up"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMove(index, 1)}
                          disabled={index === reels.length - 1}
                          className="rounded-lg border border-white/10 p-2 text-ivory/60 transition-colors hover:border-gold hover:text-gold disabled:opacity-25"
                          title="Move Down"
                          aria-label="Move Down"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(reel)}
                          className={`rounded-lg border p-2 transition-colors ${
                            reel.featured
                              ? "border-gold bg-gold/20 text-gold-light"
                              : "border-white/10 text-ivory/40 hover:border-gold hover:text-gold"
                          }`}
                          title={reel.featured ? "Unfeature from homepage" : "Feature on homepage"}
                          aria-label={reel.featured ? "Unfeature" : "Feature"}
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(reel.id)}
                          className="rounded-lg border border-red-500/20 p-2 text-red-400 transition-colors hover:border-red-500 hover:bg-red-500/10"
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
