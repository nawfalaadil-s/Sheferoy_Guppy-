"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Loader2,
  X,
  ExternalLink,
  Tag,
  Calendar,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import type { OfferRecord } from "@/lib/database-service";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<OfferRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<OfferRecord>>({});
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/offers");
      const data = await res.json();
      if (data.success && Array.isArray(data.offers)) {
        setOffers(data.offers);
      }
    } catch (err) {
      console.error("Failed to load offers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem({
      title: "",
      description: "",
      image: "/images/varieties/24k-gold-guppy.jpg",
      start_date: new Date().toISOString().split("T")[0],
      end_date: "",
      is_active: true,
      is_featured: false,
      sort_order: (offers.length + 1),
    });
    setIsEditing(true);
    setFeedback(null);
  };

  const handleOpenEdit = (o: OfferRecord) => {
    setEditingItem({ ...o });
    setIsEditing(true);
    setFeedback(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.title || !editingItem.description) {
      setFeedback({ type: "error", text: "Title and description are required." });
      return;
    }

    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({ type: "success", text: "Offer saved successfully!" });
        await fetchOffers();
        setTimeout(() => setIsEditing(false), 800);
      } else {
        setFeedback({ type: "error", text: data.error || "Save failed." });
      }
    } catch {
      setFeedback({ type: "error", text: "Connection error while saving." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this offer?")) return;

    try {
      const res = await fetch(`/api/offers?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setOffers((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(data.error || "Delete failed.");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredOffers = offers.filter((o) => {
    return (
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="bg-page min-h-screen pb-20">
      <PageHeader
        eyebrow="Admin Console"
        title={
          <>
            Offers &amp; Announcements{" "}
            <span className="font-display italic text-brand">CMS</span>
          </>
        }
        description="Configure new spawn batch announcements, seasonal trio specials, and breeder discounts."
      />

      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10 -mt-6">
        {/* Navigation & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm mb-6">
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-page px-3.5 py-2 text-xs font-semibold text-heading hover:border-brand hover:text-brand transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Admin Hub</span>
            </Link>

            <button
              onClick={fetchOffers}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-page px-3 py-2 text-xs font-semibold text-heading hover:border-brand hover:text-brand transition-colors"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-brand" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>

          <button
            onClick={handleOpenCreate}
            className="btn-primary py-2 px-4 text-xs shadow-teal inline-flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Offer</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search offers by headline or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-xs sm:text-sm text-heading placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand shadow-sm"
          />
        </div>

        {/* Offers Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-border">
            <Loader2 className="h-8 w-8 text-brand animate-spin" />
            <p className="mt-3 text-xs text-muted">Loading announcements from database...</p>
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-border text-center px-4">
            <p className="font-display text-base font-bold text-heading">No announcements found</p>
            <p className="mt-1 text-xs text-muted">Try adjusting your search criteria or add a new announcement.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-border bg-page text-muted uppercase text-[11px] font-bold tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Announcement Title</th>
                    <th className="px-4 py-3.5">Valid Window</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredOffers.map((o) => (
                    <tr key={o.id} className="hover:bg-page/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700">
                            <Tag className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-display text-sm font-bold text-heading line-clamp-1">{o.title}</span>
                            <span className="text-xs text-body line-clamp-1">{o.description}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs text-muted">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {o.start_date ? o.start_date : "Immediate"} → {o.end_date ? o.end_date : "Ongoing"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            o.is_active !== false
                              ? "bg-success/15 text-success"
                              : "bg-muted/15 text-muted"
                          }`}
                        >
                          {o.is_active !== false ? "Active" : "Archived"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href="/offers"
                            target="_blank"
                            className="rounded-lg p-1.5 text-muted hover:text-brand hover:bg-page transition-colors"
                            title="View public offers page"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleOpenEdit(o)}
                            className="rounded-lg p-1.5 text-body hover:text-brand hover:bg-page transition-colors"
                            title="Edit announcement"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(o.id)}
                            className="rounded-lg p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                            title="Delete announcement"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create / Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
            <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="font-display text-xl font-bold text-heading">
                  {editingItem.id ? "Edit Announcement" : "Create New Announcement"}
                </h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl p-2 text-muted hover:text-heading hover:bg-page"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {feedback && (
                <div
                  className={`mt-4 flex items-center gap-2 p-3 rounded-xl text-xs ${
                    feedback.type === "success"
                      ? "bg-success/15 text-success border border-success/30"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {feedback.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  )}
                  <span>{feedback.text}</span>
                </div>
              )}

              <form onSubmit={handleSave} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                    Announcement Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="e.g. New Spawning: Pure 24K Full Gold Colony"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                    Image URL or Path
                  </label>
                  <input
                    type="text"
                    value={editingItem.image || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    placeholder="/images/varieties/24k-gold-guppy.jpg"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={editingItem.start_date || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, start_date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={editingItem.end_date || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, end_date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                    Announcement Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editingItem.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    placeholder="Details about stock quantity, bloodline vigor, and WhatsApp reservation instructions..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-heading select-none">
                    <input
                      type="checkbox"
                      checked={editingItem.is_active !== false}
                      onChange={(e) => setEditingItem({ ...editingItem, is_active: e.target.checked })}
                      className="h-4 w-4 rounded border-border text-brand focus:ring-brand accent-brand"
                    />
                    <span>Active Announcement</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-heading select-none">
                    <input
                      type="checkbox"
                      checked={editingItem.is_featured || false}
                      onChange={(e) => setEditingItem({ ...editingItem, is_featured: e.target.checked })}
                      className="h-4 w-4 rounded border-border text-brand focus:ring-brand accent-brand"
                    />
                    <span>Highlight as Featured Banner</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2.5 rounded-xl border border-border text-xs font-semibold text-heading hover:bg-page"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary py-2.5 px-6 text-xs shadow-teal"
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Announcement"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
