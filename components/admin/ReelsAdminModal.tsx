"use client";

import { useState, useEffect } from "react";
import {
  X,
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
} from "lucide-react";
import {
  type InstagramReel,
  type ReelItemCategory,
  reelCategories,
  extractInstagramInfo,
} from "@/lib/reels-data";

interface ReelsAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  reels: InstagramReel[];
  onReelsChange: (newReels: InstagramReel[]) => void;
}

export default function ReelsAdminModal({
  isOpen,
  onClose,
  reels,
  onReelsChange,
}: ReelsAdminModalProps) {
  const [activeTab, setActiveTab] = useState<"manage" | "add">("manage");

  // Add form fields
  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newCategory, setNewCategory] = useState<ReelItemCategory>("Fish Room");
  const [newVariety, setNewVariety] = useState("");
  const [newFeatured, setNewFeatured] = useState(false);

  // State messages
  const [urlValidation, setUrlValidation] = useState<{
    valid: boolean;
    message: string;
    code?: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  // Validate URL as user types
  useEffect(() => {
    if (!newUrl.trim()) {
      setUrlValidation(null);
      return;
    }

    const info = extractInstagramInfo(newUrl);
    if (info) {
      setUrlValidation({
        valid: true,
        message: `Valid Instagram ${info.type.toUpperCase()} (code: ${info.code})`,
        code: info.code,
      });
    } else {
      setUrlValidation({
        valid: false,
        message: "Must be a valid Instagram Reel or Post link (e.g. https://www.instagram.com/reel/CODE/)",
      });
    }
  }, [newUrl]);

  // Keyboard accessibility
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlValidation?.valid) {
      setActionMessage({ type: "error", text: "Please provide a valid Instagram Reel link." });
      return;
    }
    if (newCaption.trim().length < 3) {
      setActionMessage({ type: "error", text: "Caption must be at least 3 characters." });
      return;
    }

    setIsSubmitting(true);
    setActionMessage(null);

    try {
      const payload = {
        url: newUrl.trim(),
        caption: newCaption.trim(),
        category: newCategory,
        varietyName: newVariety.trim() || undefined,
        featured: newFeatured,
      };

      const res = await fetch("/api/reels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to add reel");
      }

      onReelsChange(data.reels);
      setActionMessage({ type: "success", text: "Reel added successfully!" });
      setNewUrl("");
      setNewCaption("");
      setNewVariety("");
      setNewFeatured(false);
      setActiveTab("manage");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to add reel";
      setActionMessage({ type: "error", text: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this Reel from the website?")) return;

    try {
      const res = await fetch(`/api/reels?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete reel");
      }

      onReelsChange(data.reels);
      setActionMessage({ type: "success", text: "Reel removed from website." });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete reel";
      setActionMessage({ type: "error", text: msg });
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

      onReelsChange(data.reels);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update reel";
      setActionMessage({ type: "error", text: msg });
    }
  };

  const handleMoveOrder = async (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= reels.length) return;

    const copy = [...reels];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    const orderedIds = copy.map((r) => r.id);

    try {
      const res = await fetch("/api/reels", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      onReelsChange(data.reels);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to reorder reels";
      setActionMessage({ type: "error", text: msg });
    }
  };

  const handleResetDefaults = async () => {
    if (
      !confirm(
        "Reset to verified Sheferoy Guppy defaults? Any custom added Reel links will be reverted."
      )
    )
      return;

    try {
      const res = await fetch("/api/reels", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      onReelsChange(data.reels);
      setActionMessage({ type: "success", text: "Reels reset to verified Sheferoy Guppy catalog." });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to reset reels";
      setActionMessage({ type: "error", text: msg });
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-obsidian/95 p-3 sm:p-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-title"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-gold/25 bg-abyss shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gold/15 bg-ink/70 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold-light">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <h2 id="admin-title" className="font-display text-xl text-ivory">
                Reel Management Console
              </h2>
              <p className="text-xs text-mist">
                Manage Instagram Reels displayed on Sheferoy Guppy homepage & gallery
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 p-2 text-ivory/60 transition-colors hover:border-gold hover:text-gold-light"
            aria-label="Close admin modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-obsidian/50 px-6 py-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("manage")}
              className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === "manage"
                  ? "bg-gold text-obsidian"
                  : "border border-white/10 text-ivory/70 hover:border-gold/40"
              }`}
            >
              Current Reels ({reels.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("add")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === "add"
                  ? "bg-gold text-obsidian"
                  : "border border-white/10 text-ivory/70 hover:border-gold/40"
              }`}
            >
              <Plus className="h-3.5 w-3.5" />
              Add Reel
            </button>
          </div>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-gold/80 transition-colors hover:text-gold-light"
            title="Restore official verified Sheferoy Reels"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Defaults
          </button>
        </div>

        {/* Status Alerts */}
        {actionMessage && (
          <div
            className={`mx-6 mt-4 flex items-center gap-2 rounded-xl border p-3 text-xs ${
              actionMessage.type === "success"
                ? "border-green-500/30 bg-green-950/40 text-green-300"
                : "border-red-500/30 bg-red-950/40 text-red-300"
            }`}
          >
            {actionMessage.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            )}
            <span>{actionMessage.text}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "manage" ? (
            /* Manage Reels Tab */
            <div className="space-y-3">
              {reels.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-mist">No Reels in the collection.</p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("add")}
                    className="btn-gold mt-4 py-2 text-xs"
                  >
                    Add your first Reel
                  </button>
                </div>
              ) : (
                reels.map((reel, index) => (
                  <div
                    key={reel.id}
                    className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-ink/50 p-4 transition-colors hover:border-gold/30 sm:flex-row sm:items-center sm:justify-between"
                  >
                    {/* Reel info */}
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
                        <p className="line-clamp-1 text-xs text-ivory/80">{reel.caption}</p>
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

                    {/* Controls */}
                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                      {/* Reorder Buttons */}
                      <button
                        type="button"
                        onClick={() => handleMoveOrder(index, -1)}
                        disabled={index === 0}
                        className="rounded-lg border border-white/10 p-1.5 text-ivory/60 transition-colors hover:border-gold hover:text-gold disabled:opacity-25"
                        title="Move Up"
                        aria-label="Move Up"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveOrder(index, 1)}
                        disabled={index === reels.length - 1}
                        className="rounded-lg border border-white/10 p-1.5 text-ivory/60 transition-colors hover:border-gold hover:text-gold disabled:opacity-25"
                        title="Move Down"
                        aria-label="Move Down"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>

                      {/* Featured Toggle */}
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(reel)}
                        className={`rounded-lg border p-1.5 transition-colors ${
                          reel.featured
                            ? "border-gold bg-gold/20 text-gold-light"
                            : "border-white/10 text-ivory/40 hover:border-gold hover:text-gold"
                        }`}
                        title={reel.featured ? "Unfeature from homepage" : "Feature on homepage"}
                        aria-label={reel.featured ? "Unfeature" : "Feature"}
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDelete(reel.id)}
                        className="rounded-lg border border-red-500/20 p-1.5 text-red-400 transition-colors hover:border-red-500 hover:bg-red-500/10"
                        title="Remove Reel"
                        aria-label="Remove Reel"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Add Reel Tab */
            <form onSubmit={handleAddReel} className="mx-auto max-w-xl space-y-5">
              <div>
                <label
                  htmlFor="reel-url"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ivory/80"
                >
                  Instagram Reel or Post URL <span className="text-gold">*</span>
                </label>
                <input
                  type="url"
                  id="reel-url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://www.instagram.com/reel/DRmaGfQCZES/"
                  className="field text-sm"
                  required
                />
                {urlValidation && (
                  <p
                    className={`mt-1.5 text-xs flex items-center gap-1.5 ${
                      urlValidation.valid ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {urlValidation.valid ? (
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    )}
                    {urlValidation.message}
                  </p>
                )}
                <p className="mt-1 text-[11px] text-mist">
                  Supported formats: <code>https://www.instagram.com/reel/[CODE]/</code> or <code>/p/[CODE]/</code>
                </p>
              </div>

              <div>
                <label
                  htmlFor="reel-caption"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ivory/80"
                >
                  Caption / Description <span className="text-gold">*</span>
                </label>
                <textarea
                  id="reel-caption"
                  rows={3}
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Describe the bloodline, feeding session, or breeding update shown in this video…"
                  className="field text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="reel-category"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ivory/80"
                  >
                    Category
                  </label>
                  <select
                    id="reel-category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ReelItemCategory)}
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
                  <label
                    htmlFor="reel-variety"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ivory/80"
                  >
                    Associated Variety (Optional)
                  </label>
                  <input
                    type="text"
                    id="reel-variety"
                    value={newVariety}
                    onChange={(e) => setNewVariety(e.target.value)}
                    placeholder="e.g. Platinum Koi Ribbon"
                    className="field text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="reel-featured"
                  checked={newFeatured}
                  onChange={(e) => setNewFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-gold/40 bg-white/10 text-gold focus:ring-gold"
                />
                <label htmlFor="reel-featured" className="text-xs text-ivory/90">
                  Feature this Reel on the Homepage showcase
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("manage")}
                  className="btn-ghost py-2.5 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !urlValidation?.valid}
                  className="btn-gold py-2.5 text-xs disabled:opacity-40"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Validating & Saving…
                    </>
                  ) : (
                    "Save Reel to Collection"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
