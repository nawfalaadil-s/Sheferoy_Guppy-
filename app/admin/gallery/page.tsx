"use client";

import { useState, useEffect, useRef } from "react";
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
  Play,
  Upload,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import type { GalleryRecord } from "@/lib/database-service";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<GalleryRecord>>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        setItems(data.items);
      }
    } catch (err) {
      console.error("Failed to load gallery items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem({
      kind: "guppy",
      alt: "",
      caption: "",
      category: "Guppies",
      image: "/images/varieties/veiltail-zebra-green.jpg",
      is_published: true,
      sort_order: (items.length + 1),
    });
    setIsEditing(true);
    setFeedback(null);
  };

  const handleOpenEdit = (g: GalleryRecord) => {
    setEditingItem({ ...g });
    setIsEditing(true);
    setFeedback(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPG, PNG, WebP).");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/cms/images", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.url) {
        setEditingItem((prev) => ({
          ...prev,
          image: data.url,
          thumbnail_url: prev.kind === "video" ? data.url : prev.thumbnail_url,
        }));
      } else {
        alert(data.error || "Upload failed.");
      }
    } catch {
      alert("Connection error during upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.caption || !editingItem.category) {
      setFeedback({ type: "error", text: "Caption and category are required." });
      return;
    }

    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({ type: "success", text: "Exhibit saved to database!" });
        await fetchItems();
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
    if (!window.confirm("Are you sure you want to delete this media item?")) return;

    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(data.error || "Delete failed.");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.caption.toLowerCase().includes(search.toLowerCase()) ||
      item.alt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-page min-h-screen pb-20">
      <PageHeader
        eyebrow="Admin Console"
        title={
          <>
            Media Library &amp;{" "}
            <span className="font-display italic text-brand">Gallery CMS</span>
          </>
        }
        description="Curate fish photography, farm hatchery video clips, captions, and exhibit categorization."
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
              onClick={fetchItems}
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
            <span>Add Media Exhibit</span>
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              placeholder="Search exhibits by caption or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-xs sm:text-sm text-heading placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-border bg-white shadow-sm overflow-x-auto">
            {["All", "Farm Videos", "Guppies", "Plants"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
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

        {/* Media Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-border">
            <Loader2 className="h-8 w-8 text-brand animate-spin" />
            <p className="mt-3 text-xs text-muted">Loading gallery media...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-border text-center px-4">
            <p className="font-display text-base font-bold text-heading">No media found</p>
            <p className="mt-1 text-xs text-muted">Try adjusting your filter or add new photography/videos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item) => {
              const isVideo = item.kind === "video";
              const photo = item.image || item.thumbnail_url || "/images/gallery/farm-clip-06.jpg";

              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[4/3] w-full bg-page">
                    <Image src={photo} alt={item.alt} fill className="object-cover" />
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/85 text-white">
                          <Play className="ml-0.5 h-4 w-4 fill-current" />
                        </span>
                      </div>
                    )}
                    <span className="absolute top-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white uppercase backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-3.5 flex flex-col justify-between flex-1">
                    <div>
                      <p className="font-display text-xs sm:text-sm font-bold text-heading line-clamp-2">
                        {item.caption}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-muted uppercase">
                        #{item.sort_order || 0}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="rounded-lg p-1.5 text-body hover:text-brand hover:bg-page transition-colors"
                          title="Edit exhibit"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Delete exhibit"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Create / Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
            <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="font-display text-xl font-bold text-heading">
                  {editingItem.id ? "Edit Media Exhibit" : "Add Media Exhibit"}
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
                      Media Kind
                    </label>
                    <select
                      value={editingItem.kind || "guppy"}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          kind: e.target.value as "video" | "guppy" | "plant",
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                    >
                      <option value="guppy">Guppy Photograph</option>
                      <option value="plant">Plant Photograph</option>
                      <option value="video">Hatchery Video</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                      Category Tag
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.category || "Guppies"}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      placeholder="e.g. Guppies, Plants, Farm Videos"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                    Caption Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.caption || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                    placeholder="e.g. High-Dorsal Blue Veiltail Bloodline"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                    Alt Text (Accessibility)
                  </label>
                  <input
                    type="text"
                    value={editingItem.alt || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, alt: e.target.value })}
                    placeholder="Clear description of the fish or flora in the photo..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Upload or Image Path */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-heading">
                      Image / Thumbnail URL
                    </label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="text-[11px] font-bold text-brand hover:underline inline-flex items-center gap-1"
                    >
                      <Upload className="h-3 w-3" />
                      <span>{uploading ? "Uploading..." : "Upload New File"}</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                  <input
                    type="text"
                    value={editingItem.image || editingItem.thumbnail_url || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        image: e.target.value,
                        thumbnail_url: e.target.value,
                      })
                    }
                    placeholder="/images/gallery/filename.jpg"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none font-mono"
                  />
                </div>

                {editingItem.kind === "video" && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                      Video File Path (MP4 / WebM)
                    </label>
                    <input
                      type="text"
                      value={editingItem.video_url || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, video_url: e.target.value })}
                      placeholder="/videos/gallery/farm-clip-01.mp4"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none font-mono"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                      Linked Variety / Plant Slug
                    </label>
                    <input
                      type="text"
                      value={editingItem.variety_slug || editingItem.plant_slug || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          variety_slug: e.target.value,
                          plant_slug: e.target.value,
                        })
                      }
                      placeholder="e.g. moscow-blue"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                      Sort Order Position
                    </label>
                    <input
                      type="number"
                      value={editingItem.sort_order || 1}
                      onChange={(e) => setEditingItem({ ...editingItem, sort_order: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                    />
                  </div>
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
