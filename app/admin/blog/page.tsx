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
  BookOpen,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import type { BlogPostRecord } from "@/lib/database-service";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<BlogPostRecord>>({});
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error("Failed to load blog posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Guppy Care",
      author: "Sheferoy Guppy",
      image: "/images/varieties/veiltail-zebra-green.jpg",
      read_time: "5 min read",
      is_published: true,
    });
    setIsEditing(true);
    setFeedback(null);
  };

  const handleOpenEdit = (p: BlogPostRecord) => {
    setEditingItem({ ...p });
    setIsEditing(true);
    setFeedback(null);
  };

  const handleSlugify = () => {
    if (editingItem.title && !editingItem.slug) {
      const s = editingItem.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setEditingItem((prev) => ({ ...prev, slug: s }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.title || !editingItem.slug || !editingItem.content) {
      setFeedback({ type: "error", text: "Title, slug, and content are required." });
      return;
    }

    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({ type: "success", text: "Blog post saved successfully!" });
        await fetchPosts();
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
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(data.error || "Delete failed.");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredPosts = posts.filter((p) => {
    return (
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="bg-page min-h-screen pb-20">
      <PageHeader
        eyebrow="Admin Console"
        title={
          <>
            Blog &amp; Knowledge{" "}
            <span className="font-display italic text-brand">CMS</span>
          </>
        }
        description="Publish and edit educational guppy care guides, selective breeding articles, and aquarium knowledge."
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
              onClick={fetchPosts}
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
            <span>Write New Article</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search articles by title, slug, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-xs sm:text-sm text-heading placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand shadow-sm"
          />
        </div>

        {/* Blog Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-border">
            <Loader2 className="h-8 w-8 text-brand animate-spin" />
            <p className="mt-3 text-xs text-muted">Loading articles from database...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-border text-center px-4">
            <p className="font-display text-base font-bold text-heading">No articles found</p>
            <p className="mt-1 text-xs text-muted">Try adjusting your search criteria or write a new article.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-border bg-page text-muted uppercase text-[11px] font-bold tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Article Title</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">Author</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredPosts.map((p) => (
                    <tr key={p.id || p.slug} className="hover:bg-page/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                            <BookOpen className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-display text-sm font-bold text-heading line-clamp-1">{p.title}</span>
                            <span className="text-xs text-muted font-mono">{p.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="rounded-lg bg-page px-2.5 py-1 text-xs font-semibold text-heading border border-border">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-body">
                        {p.author || "Sheferoy Guppy"}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            p.is_published !== false
                              ? "bg-success/15 text-success"
                              : "bg-muted/15 text-muted"
                          }`}
                        >
                          {p.is_published !== false ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/blog/${p.slug}`}
                            target="_blank"
                            className="rounded-lg p-1.5 text-muted hover:text-brand hover:bg-page transition-colors"
                            title="View public article"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="rounded-lg p-1.5 text-body hover:text-brand hover:bg-page transition-colors"
                            title="Edit article"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="rounded-lg p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                            title="Delete article"
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
            <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="font-display text-xl font-bold text-heading">
                  {editingItem.id ? "Edit Article" : "Write New Article"}
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
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.title || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      onBlur={handleSlugify}
                      placeholder="e.g. Complete Guide to Guppy Care"
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
                      placeholder="e.g. complete-guide-guppy-care"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={editingItem.category || "Guppy Care"}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      placeholder="Guppy Care, Breeding, Varieties"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      value={editingItem.author || "Sheferoy Guppy"}
                      onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                      Estimated Read Time
                    </label>
                    <input
                      type="text"
                      value={editingItem.read_time || "5 min read"}
                      onChange={(e) => setEditingItem({ ...editingItem, read_time: e.target.value })}
                      placeholder="5 min read"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                    Short Excerpt / Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingItem.excerpt || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                    placeholder="Brief 1-2 sentence overview for article cards and Google search..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-heading mb-1">
                    Article Content (Markdown Supported) *
                  </label>
                  <textarea
                    rows={10}
                    required
                    value={editingItem.content || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                    placeholder="Full guide content with headers (##), bullet points, and care steps..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm focus:border-brand focus:bg-white focus:outline-none font-mono"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-heading select-none">
                    <input
                      type="checkbox"
                      checked={editingItem.is_published !== false}
                      onChange={(e) => setEditingItem({ ...editingItem, is_published: e.target.checked })}
                      className="h-4 w-4 rounded border-border text-brand focus:ring-brand accent-brand"
                    />
                    <span>Publish Article Immediately</span>
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
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Article"}
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
