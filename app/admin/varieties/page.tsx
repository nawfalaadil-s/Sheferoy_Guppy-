"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  Sparkles,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import type { VarietyRecord } from "@/lib/database-service";

export default function AdminVarietiesPage() {
  const [varieties, setVarieties] = useState<VarietyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<VarietyRecord>>({});
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchVarieties = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/varieties");
      const data = await res.json();
      if (data.success && Array.isArray(data.varieties)) {
        setVarieties(data.varieties);
      }
    } catch (err) {
      console.error("Failed to load varieties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVarieties();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem({
      name: "",
      slug: "",
      category: "Guppies",
      line: "",
      description: "",
      availability: "Enquire for Availability",
      image: "/images/varieties/veiltail-zebra-green.jpg",
      is_popular: false,
      published: true,
    });
    setIsEditing(true);
    setFeedback(null);
  };

  const handleOpenEdit = (v: VarietyRecord) => {
    setEditingItem({ ...v });
    setIsEditing(true);
    setFeedback(null);
  };

  const handleSlugify = () => {
    if (editingItem.name && !editingItem.slug) {
      const s = editingItem.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setEditingItem((prev) => ({ ...prev, slug: s }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.name || !editingItem.slug) {
      setFeedback({ type: "error", text: "Name and slug are required." });
      return;
    }

    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/varieties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({ type: "success", text: "Variety saved successfully to database!" });
        await fetchVarieties();
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
    if (!window.confirm("Are you sure you want to delete this variety?")) return;

    try {
      const res = await fetch(`/api/varieties?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setVarieties((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(data.error || "Delete failed.");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredVarieties = varieties.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.slug.toLowerCase().includes(search.toLowerCase()) ||
      (v.line && v.line.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = categoryFilter === "All" || v.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-page min-h-screen pb-20">
      <PageHeader
        eyebrow="Admin Console"
        title={
          <>
            Ornamental Fish{" "}
            <span className="font-display italic text-brand">Varieties CMS</span>
          </>
        }
        description="Add, edit, reorder, and manage guppy and betta strains persisted directly in Supabase PostgreSQL."
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
              onClick={fetchVarieties}
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
            <span>Add New Variety</span>
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              placeholder="Search strains by name, slug, or genetics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-xs sm:text-sm text-heading placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-border bg-white shadow-sm">
            {["All", "Guppies", "Bettas"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  categoryFilter === cat
                    ? "bg-brand text-white shadow-sm"
                    : "text-body hover:text-heading hover:bg-page"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Varieties Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-border">
            <Loader2 className="h-8 w-8 text-brand animate-spin" />
            <p className="mt-3 text-xs text-muted">Loading strains from database...</p>
          </div>
        ) : filteredVarieties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-border text-center px-4">
            <p className="font-display text-base font-bold text-heading">No strains found</p>
            <p className="mt-1 text-xs text-muted">Try adjusting your search criteria or add a new variety.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-border bg-page text-muted uppercase text-[11px] font-bold tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Fish Strain</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">Availability</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredVarieties.map((v) => (
                    <tr key={v.id || v.slug} className="hover:bg-page/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border bg-page">
                            <Image
                              src={v.image || "/images/varieties/veiltail-zebra-green.jpg"}
                              alt={v.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-display text-sm font-bold text-heading">{v.name}</span>
                              {v.is_popular && (
                                <span className="inline-flex items-center gap-0.5 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold-dark">
                                  <Sparkles className="h-2.5 w-2.5" /> Popular
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-muted font-mono">{v.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="rounded-lg bg-page px-2.5 py-1 text-xs font-semibold text-heading border border-border">
                          {v.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs font-medium text-body">
                        {v.availability || "Enquire for Availability"}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            v.published !== false
                              ? "bg-success/15 text-success"
                              : "bg-muted/15 text-muted"
                          }`}
                        >
                          {v.published !== false ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/varieties/${v.slug}`}
                            target="_blank"
                            className="rounded-lg p-1.5 text-muted hover:text-brand hover:bg-page transition-colors"
                            title="View public page"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleOpenEdit(v)}
                            className="rounded-lg p-1.5 text-body hover:text-brand hover:bg-page transition-colors"
                            title="Edit variety"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(v.id)}
                            className="rounded-lg p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                            title="Delete variety"
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
                  {editingItem.id ? "Edit Fish Variety" : "Add New Fish Variety"}
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                      Strain Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.name || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      onBlur={handleSlugify}
                      placeholder="e.g. Veiltail Zebra Green"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.slug || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                      placeholder="e.g. veiltail-zebra-green"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                      Category
                    </label>
                    <select
                      value={editingItem.category || "Guppies"}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          category: e.target.value as "Guppies" | "Bettas",
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                    >
                      <option value="Guppies">Guppies</option>
                      <option value="Bettas">Bettas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                      Stock Availability
                    </label>
                    <input
                      type="text"
                      value={editingItem.availability || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, availability: e.target.value })}
                      placeholder="e.g. In Stock, Enquire for Availability"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                    Image Path or URL
                  </label>
                  <input
                    type="text"
                    value={editingItem.image || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    placeholder="/images/varieties/your-fish.jpg"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none font-mono"
                  />
                  {editingItem.image && (
                    <div className="mt-2 relative h-16 w-24 overflow-hidden rounded-xl border border-border">
                      <Image src={editingItem.image} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                    Genetics / Line Description
                  </label>
                  <input
                    type="text"
                    value={editingItem.line || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, line: e.target.value })}
                    placeholder="e.g. Pure German Bloodline, High Dorsal"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                    Full Description
                  </label>
                  <textarea
                    rows={4}
                    value={editingItem.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    placeholder="Comprehensive description of colors, finnage, and temperament..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-heading select-none">
                    <input
                      type="checkbox"
                      checked={editingItem.is_popular || false}
                      onChange={(e) => setEditingItem({ ...editingItem, is_popular: e.target.checked })}
                      className="h-4 w-4 rounded border-border text-brand focus:ring-brand accent-brand"
                    />
                    <span>Highlight as Popular</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-heading select-none">
                    <input
                      type="checkbox"
                      checked={editingItem.published !== false}
                      onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                      className="h-4 w-4 rounded border-border text-brand focus:ring-brand accent-brand"
                    />
                    <span>Published to Website</span>
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
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save to Database"}
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
