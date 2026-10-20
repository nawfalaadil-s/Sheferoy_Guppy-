"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Layers,
  FileText,
  Search,
  Phone,
  X,
  ChevronUp,
  ChevronDown,
  Eye,
  Loader2,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import {
  type HomepageContent,
  defaultHomepageContent,
} from "@/lib/cms-types";
import { varieties } from "@/lib/varieties-data";

type TabKey = "hero" | "featured" | "about" | "seo" | "contact" | "preview";

interface ImageItem {
  path: string;
  name: string;
  category: string;
}

export default function AdminContentPage() {
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<TabKey>("hero");

  // Image Picker Modal State
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [imagePickerTarget, setImagePickerTarget] = useState<
    "hero" | { type: "product"; index: number }
  >("hero");
  const [availableImages, setAvailableImages] = useState<ImageItem[]>([]);
  const [imageSearch, setImageSearch] = useState("");
  const [selectedImageCategory, setSelectedImageCategory] = useState("All");
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load CMS content and available images
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [cmsRes, imgRes] = await Promise.all([
          fetch("/api/cms"),
          fetch("/api/cms/images"),
        ]);

        const cmsData = await cmsRes.json();
        if (cmsData.success && cmsData.content) {
          setContent(cmsData.content);
        }

        const imgData = await imgRes.json();
        if (imgData.success && Array.isArray(imgData.images)) {
          setAvailableImages(imgData.images);
        }
      } catch (err) {
        console.error("Failed to load CMS data:", err);
        setFeedback({
          type: "error",
          text: "Could not load current content from server. Using local defaults.",
        });
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Save changes
  const handleSave = async () => {
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: "success",
          text: "Homepage content and images successfully updated on Supabase & Live Website!",
        });
        setTimeout(() => setFeedback(null), 6000);
      } else {
        throw new Error(data.error || "Failed to update content");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save changes";
      setFeedback({ type: "error", text: msg });
    } finally {
      setSaving(false);
    }
  };

  // Reset to default
  const handleReset = async () => {
    if (!window.confirm("Are you sure you want to reset all homepage text and images to default?")) {
      return;
    }
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success && data.content) {
        setContent(data.content);
        setFeedback({
          type: "success",
          text: "Homepage content has been restored to factory defaults.",
        });
      }
    } catch (err) {
      console.error("Reset error:", err);
      setFeedback({ type: "error", text: "Failed to reset content." });
    } finally {
      setSaving(false);
    }
  };

  // Open Image Picker
  const openImagePicker = (target: "hero" | { type: "product"; index: number }) => {
    setImagePickerTarget(target);
    setImageSearch("");
    setIsImagePickerOpen(true);
  };

  // Select an image from modal
  const handleSelectImage = (imagePath: string) => {
    if (imagePickerTarget === "hero") {
      setContent((prev) => ({
        ...prev,
        hero: { ...prev.hero, image: imagePath },
      }));
    } else {
      const idx = imagePickerTarget.index;
      setContent((prev) => {
        const items = [...prev.featured.customItems];
        if (items[idx]) {
          items[idx] = { ...items[idx], image: imagePath };
        }
        return {
          ...prev,
          featured: { ...prev.featured, customItems: items },
        };
      });
    }
    setIsImagePickerOpen(false);
  };

  // Upload an image from device
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/cms/images", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.url) {
        // Add to available images
        setAvailableImages((prev) => [
          { path: data.url, name: file.name, category: "Uploaded Images" },
          ...prev,
        ]);
        // Automatically select the uploaded image
        handleSelectImage(data.url);
      } else {
        alert(data.error || "Failed to upload image.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image. Please check console.");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Filter available images for picker modal
  const filteredImages = availableImages.filter((img) => {
    const matchesCat =
      selectedImageCategory === "All" || img.category === selectedImageCategory;
    const matchesSearch =
      !imageSearch.trim() ||
      img.name.toLowerCase().includes(imageSearch.toLowerCase()) ||
      img.path.toLowerCase().includes(imageSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Reorder product item
  const moveProduct = (index: number, direction: -1 | 1) => {
    setContent((prev) => {
      const items = [...prev.featured.customItems];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= items.length) return prev;
      const temp = items[index];
      items[index] = items[targetIndex];
      items[targetIndex] = temp;
      return {
        ...prev,
        featured: {
          ...prev.featured,
          customItems: items,
          productSlugs: items.map((i) => i.slug),
        },
      };
    });
  };

  // Change catalog selection for product slot
  const handleProductSelection = (index: number, slug: string) => {
    const found = varieties.find((v) => v.slug === slug);
    if (!found) return;

    setContent((prev) => {
      const items = [...prev.featured.customItems];
      const displayName = found.slug === "24k-gold-guppy" ? "24K Gold Guppy" : found.name;
      items[index] = {
        slug: found.slug,
        name: displayName,
        category: found.category,
        image: found.image,
        availability: items[index]?.availability || "Enquire for Availability",
      };
      return {
        ...prev,
        featured: {
          ...prev.featured,
          customItems: items,
          productSlugs: items.map((i) => i.slug),
        },
      };
    });
  };

  if (loading) {
    return (
      <div className="bg-page min-h-screen py-24 text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-brand" />
        <p className="mt-4 font-sans text-sm font-semibold text-heading">
          Loading CMS Content from Supabase...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-page min-h-screen pb-24">
      <PageHeader
        eyebrow="Admin Content Management"
        title={
          <>
            Homepage <span className="font-display italic text-brand">CMS</span>
          </>
        }
        description="Edit the hero section, replace photos, choose the 5 featured fish, and refine About & SEO text."
      />

      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10 -mt-6">
        {/* Top Sticky Toolbar */}
        <div className="sticky top-16 z-30 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-white/95 p-4 shadow-sm backdrop-blur-md mb-8">
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-page px-3 py-1.5 text-xs font-semibold text-body hover:text-brand"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Admin Hub</span>
            </Link>

            <span className="hidden text-xs text-muted sm:inline">•</span>
            <span className="hidden font-sans text-xs font-medium text-body sm:inline">
              Changes sync directly to Supabase
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3.5 py-2 text-xs font-semibold text-body hover:text-error transition-colors"
              title="Reset all content to defaults"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-page px-3.5 py-2 text-xs font-semibold text-heading hover:border-brand hover:text-brand transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View Site</span>
            </Link>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="btn-primary py-2 px-5 text-xs shadow-teal inline-flex items-center gap-1.5"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`mb-6 flex items-center gap-3 rounded-2xl border p-4 text-sm font-medium animate-fade-in ${
              feedback.type === "success"
                ? "border-success/30 bg-success/10 text-success"
                : "border-error/30 bg-error/10 text-error"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0" />
            )}
            <p className="flex-1">{feedback.text}</p>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="text-xs hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Section Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 border-b border-border pb-4 mb-8 scrollbar-none">
          {[
            { id: "hero", label: "1. Hero Section", icon: Sparkles },
            { id: "featured", label: "2. Five Featured Fish", icon: Layers },
            { id: "about", label: "3. About Section", icon: FileText },
            { id: "seo", label: "4. SEO & Educational", icon: Search },
            { id: "contact", label: "5. Contact CTA", icon: Phone },
            { id: "preview", label: "Live Preview", icon: Eye },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
                  active
                    ? "bg-brand text-white shadow-teal"
                    : "border border-border bg-white text-body hover:border-brand/40 hover:text-brand"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: HERO SECTION */}
        {/* ============================================================== */}
        {activeTab === "hero" && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Left Form: Copy & Controls */}
              <div className="space-y-5 rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-card lg:col-span-7">
                <div className="border-b border-border pb-4">
                  <h3 className="font-display text-lg font-bold text-heading">
                    Hero Text &amp; Call To Actions
                  </h3>
                  <p className="text-xs text-body">
                    Update the main visual headline, introductory copy, and primary action buttons.
                  </p>
                </div>

                <div>
                  <label className="mb-1.5 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                    Small Eyebrow Label
                  </label>
                  <input
                    type="text"
                    value={content.hero.badge}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, badge: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-page px-4 py-2.5 text-sm text-heading focus:border-brand focus:outline-none"
                    placeholder="e.g. ORNAMENTAL GUPPIES & BETTAS"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                    Main H1 Headline
                  </label>
                  <input
                    type="text"
                    value={content.hero.title}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, title: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-page px-4 py-2.5 text-sm font-semibold text-heading focus:border-brand focus:outline-none"
                    placeholder="e.g. Premium Ornamental Guppies and Bettas for Aquarium Enthusiasts"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                    Introductory Description
                  </label>
                  <textarea
                    rows={4}
                    value={content.hero.description}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, description: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-page p-4 text-sm text-body leading-relaxed focus:border-brand focus:outline-none"
                    placeholder="Welcome to Sheferoy Guppy..."
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                  <div>
                    <label className="mb-1.5 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                      Primary Button Text
                    </label>
                    <input
                      type="text"
                      value={content.hero.primaryBtnText}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, primaryBtnText: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-border bg-page px-4 py-2 text-sm text-heading focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                      Primary Button Anchor / Link
                    </label>
                    <input
                      type="text"
                      value={content.hero.primaryBtnLink}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, primaryBtnLink: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-border bg-page px-4 py-2 text-sm text-heading focus:border-brand focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                    Secondary Button Text (WhatsApp)
                  </label>
                  <input
                    type="text"
                    value={content.hero.secondaryBtnText}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, secondaryBtnText: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-page px-4 py-2 text-sm text-heading focus:border-brand focus:outline-none"
                  />
                </div>
              </div>

              {/* Right: Hero Image Manager */}
              <div className="space-y-5 rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-card lg:col-span-5">
                <div className="border-b border-border pb-4">
                  <h3 className="font-display text-lg font-bold text-heading">
                    Hero Showcase Image
                  </h3>
                  <p className="text-xs text-body">
                    Select from 70+ authentic farm photos or upload a new picture.
                  </p>
                </div>

                {/* Image Preview Box */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-slate-900 shadow-sm">
                  <Image
                    src={content.hero.image || "/images/varieties/veiltail-zebra-green.jpg"}
                    alt={content.hero.imageTitle}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-display text-sm font-bold">{content.hero.imageTitle}</p>
                    <p className="text-[11px] text-white/80">{content.hero.imageSubtitle}</p>
                  </div>
                </div>

                {/* Image Action Buttons */}
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => openImagePicker("hero")}
                    className="btn-primary flex-1 justify-center py-2.5 text-xs shadow-teal"
                  >
                    <ImageIcon className="h-4 w-4" />
                    <span>Pick From Gallery ({availableImages.length})</span>
                  </button>

                  <label className="btn-secondary flex-1 justify-center py-2.5 text-xs cursor-pointer hover:border-brand">
                    <Upload className="h-4 w-4 text-brand" />
                    <span>Upload New Photo</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleUploadImage}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="space-y-3 pt-2 border-t border-border">
                  <div>
                    <label className="mb-1 block font-sans text-xs font-semibold uppercase tracking-wider text-muted">
                      Direct Image Path / URL
                    </label>
                    <input
                      type="text"
                      value={content.hero.image}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, image: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-border bg-page px-3 py-2 text-xs font-mono text-heading focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block font-sans text-xs font-semibold uppercase tracking-wider text-muted">
                        Caption Title
                      </label>
                      <input
                        type="text"
                        value={content.hero.imageTitle}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            hero: { ...content.hero, imageTitle: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-border bg-page px-3 py-1.5 text-xs text-heading focus:border-brand focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-sans text-xs font-semibold uppercase tracking-wider text-muted">
                        Caption Subtitle
                      </label>
                      <input
                        type="text"
                        value={content.hero.imageSubtitle}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            hero: { ...content.hero, imageSubtitle: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-border bg-page px-3 py-1.5 text-xs text-heading focus:border-brand focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: FIVE FEATURED FISH */}
        {/* ============================================================== */}
        {activeTab === "featured" && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-card">
              <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-heading">
                    Five Featured Fish Strains
                  </h3>
                  <p className="text-xs text-body">
                    Choose which 5 ornamental varieties appear on the homepage. Reorder slots, change display names, and override images.
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                  <Sparkles className="h-3.5 w-3.5" />
                  Exactly 5 Slots Displayed
                </span>
              </div>

              {/* Section Header Controls */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 pb-6 border-b border-border">
                <div>
                  <label className="mb-1 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                    Small Section Badge
                  </label>
                  <input
                    type="text"
                    value={content.featured.badge}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        featured: { ...content.featured, badge: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-page px-3 py-2 text-xs text-heading focus:border-brand focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                    Section Heading (H2)
                  </label>
                  <input
                    type="text"
                    value={content.featured.heading}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        featured: { ...content.featured, heading: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-page px-3 py-2 text-xs font-semibold text-heading focus:border-brand focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                    Supporting Text
                  </label>
                  <input
                    type="text"
                    value={content.featured.subheading}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        featured: { ...content.featured, subheading: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-page px-3 py-2 text-xs text-heading focus:border-brand focus:outline-none"
                  />
                </div>
              </div>

              {/* 5 Product Slots */}
              <div className="mt-6 space-y-4">
                {content.featured.customItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-4 rounded-2xl border border-border bg-page p-4 sm:flex-row sm:items-center sm:justify-between transition-all hover:border-brand/40"
                  >
                    {/* Position & Thumbnail */}
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand text-xs font-bold text-white shadow-sm">
                        #{idx + 1}
                      </span>

                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-slate-900 shadow-sm">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted border border-border">
                            {item.category}
                          </span>
                          <span className="text-xs text-success font-semibold">
                            ● {item.availability}
                          </span>
                        </div>
                        <p className="mt-1 font-display text-sm font-bold text-heading">
                          {item.name}
                        </p>
                        <p className="text-[11px] font-mono text-muted">
                          Slug: {item.slug}
                        </p>
                      </div>
                    </div>

                    {/* Quick Config Inputs */}
                    <div className="grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-3 max-w-xl">
                      {/* Select from catalog */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-0.5">
                          Choose Strain
                        </label>
                        <select
                          value={item.slug}
                          onChange={(e) => handleProductSelection(idx, e.target.value)}
                          className="w-full rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs text-heading focus:border-brand focus:outline-none"
                        >
                          {varieties.map((v) => (
                            <option key={v.slug} value={v.slug}>
                              {v.name} ({v.category})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Display Name Override */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-0.5">
                          Display Name
                        </label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const newItems = [...content.featured.customItems];
                            newItems[idx].name = e.target.value;
                            setContent({
                              ...content,
                              featured: { ...content.featured, customItems: newItems },
                            });
                          }}
                          className="w-full rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs text-heading focus:border-brand focus:outline-none"
                        />
                      </div>

                      {/* Availability status */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-0.5">
                          Status Note
                        </label>
                        <input
                          type="text"
                          value={item.availability}
                          onChange={(e) => {
                            const newItems = [...content.featured.customItems];
                            newItems[idx].availability = e.target.value;
                            setContent({
                              ...content,
                              featured: { ...content.featured, customItems: newItems },
                            });
                          }}
                          className="w-full rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs text-heading focus:border-brand focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Actions: Change Image + Reorder */}
                    <div className="flex items-center gap-1.5 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => openImagePicker({ type: "product", index: idx })}
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-semibold text-heading hover:border-brand hover:text-brand"
                        title="Change photo for this product"
                      >
                        <ImageIcon className="h-3.5 w-3.5 text-brand" />
                        <span>Photo</span>
                      </button>

                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveProduct(idx, -1)}
                          className="rounded p-1 text-muted hover:bg-white hover:text-heading disabled:opacity-30"
                          title="Move up"
                        >
                          <ChevronUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === content.featured.customItems.length - 1}
                          onClick={() => moveProduct(idx, 1)}
                          className="rounded p-1 text-muted hover:bg-white hover:text-heading disabled:opacity-30"
                          title="Move down"
                        >
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: ABOUT SECTION */}
        {/* ============================================================== */}
        {activeTab === "about" && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-card">
              <div className="border-b border-border pb-4 mb-6">
                <h3 className="font-display text-lg font-bold text-heading">
                  About Sheferoy Guppy (SEO Section)
                </h3>
                <p className="text-xs text-body">
                  Edit the concise business background text displayed directly beneath the featured products.
                </p>
              </div>

              <div className="space-y-5 max-w-3xl">
                <div>
                  <label className="mb-1.5 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                    Section Heading (H2)
                  </label>
                  <input
                    type="text"
                    value={content.about.heading}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, heading: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-page px-4 py-2.5 text-sm font-semibold text-heading focus:border-brand focus:outline-none"
                    placeholder="e.g. About Sheferoy Guppy"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                    Paragraph 1 (Specialisation &amp; Fish Types)
                  </label>
                  <textarea
                    rows={3}
                    value={content.about.paragraph1}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, paragraph1: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-page p-4 text-sm text-body leading-relaxed focus:border-brand focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                    Paragraph 2 (Contact &amp; Enquiry Guidance)
                  </label>
                  <textarea
                    rows={3}
                    value={content.about.paragraph2}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, paragraph2: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-page p-4 text-sm text-body leading-relaxed focus:border-brand focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: SEO & EDUCATIONAL SECTION */}
        {/* ============================================================== */}
        {activeTab === "seo" && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-card">
              <div className="border-b border-border pb-4 mb-6">
                <h3 className="font-display text-lg font-bold text-heading">
                  Educational SEO Content Section
                </h3>
                <p className="text-xs text-body">
                  Edit the 3 knowledge blocks highlighting Fancy Guppies, Betta Fish, and Guppy Breeding Pairs.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pb-6 border-b border-border">
                <div>
                  <label className="mb-1 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                    Small Section Badge
                  </label>
                  <input
                    type="text"
                    value={content.seo.badge}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        seo: { ...content.seo, badge: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-page px-3 py-2 text-xs text-heading focus:border-brand focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                    Section Heading (H2)
                  </label>
                  <input
                    type="text"
                    value={content.seo.heading}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        seo: { ...content.seo, heading: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-page px-3 py-2 text-xs font-semibold text-heading focus:border-brand focus:outline-none"
                  />
                </div>
              </div>

              {/* 3 Subsections */}
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Block 1: Fancy Guppies */}
                <div className="rounded-2xl border border-border bg-page p-5 space-y-3">
                  <div>
                    <label className="mb-1 block font-sans text-[11px] font-bold uppercase tracking-wider text-brand">
                      Subsection 1 Title (H3)
                    </label>
                    <input
                      type="text"
                      value={content.seo.fancyGuppies.title}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          seo: {
                            ...content.seo,
                            fancyGuppies: {
                              ...content.seo.fancyGuppies,
                              title: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-bold text-heading focus:border-brand focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-sans text-[11px] font-bold uppercase tracking-wider text-muted">
                      Body Text
                    </label>
                    <textarea
                      rows={6}
                      value={content.seo.fancyGuppies.text}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          seo: {
                            ...content.seo,
                            fancyGuppies: {
                              ...content.seo.fancyGuppies,
                              text: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-lg border border-border bg-white p-3 text-xs text-body leading-relaxed focus:border-brand focus:outline-none"
                    />
                  </div>
                </div>

                {/* Block 2: Betta Fish */}
                <div className="rounded-2xl border border-border bg-page p-5 space-y-3">
                  <div>
                    <label className="mb-1 block font-sans text-[11px] font-bold uppercase tracking-wider text-brand">
                      Subsection 2 Title (H3)
                    </label>
                    <input
                      type="text"
                      value={content.seo.bettaFish.title}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          seo: {
                            ...content.seo,
                            bettaFish: {
                              ...content.seo.bettaFish,
                              title: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-bold text-heading focus:border-brand focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-sans text-[11px] font-bold uppercase tracking-wider text-muted">
                      Body Text
                    </label>
                    <textarea
                      rows={6}
                      value={content.seo.bettaFish.text}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          seo: {
                            ...content.seo,
                            bettaFish: {
                              ...content.seo.bettaFish,
                              text: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-lg border border-border bg-white p-3 text-xs text-body leading-relaxed focus:border-brand focus:outline-none"
                    />
                  </div>
                </div>

                {/* Block 3: Guppy Breeding Pairs */}
                <div className="rounded-2xl border border-border bg-page p-5 space-y-3">
                  <div>
                    <label className="mb-1 block font-sans text-[11px] font-bold uppercase tracking-wider text-brand">
                      Subsection 3 Title (H3)
                    </label>
                    <input
                      type="text"
                      value={content.seo.breedingPairs.title}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          seo: {
                            ...content.seo,
                            breedingPairs: {
                              ...content.seo.breedingPairs,
                              title: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-bold text-heading focus:border-brand focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-sans text-[11px] font-bold uppercase tracking-wider text-muted">
                      Body Text
                    </label>
                    <textarea
                      rows={6}
                      value={content.seo.breedingPairs.text}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          seo: {
                            ...content.seo,
                            breedingPairs: {
                              ...content.seo.breedingPairs,
                              text: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-lg border border-border bg-white p-3 text-xs text-body leading-relaxed focus:border-brand focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: CONTACT CTA */}
        {/* ============================================================== */}
        {activeTab === "contact" && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-card">
              <div className="border-b border-border pb-4 mb-6">
                <h3 className="font-display text-lg font-bold text-heading">
                  Contact Strip Configuration
                </h3>
                <p className="text-xs text-body">
                  Update the bottom call-to-action banner copy and direct phone, WhatsApp, and email addresses.
                </p>
              </div>

              <div className="space-y-5 max-w-2xl">
                <div>
                  <label className="mb-1.5 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={content.contact.badge}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, badge: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-page px-4 py-2.5 text-sm text-heading focus:border-brand focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                    Heading (H2)
                  </label>
                  <input
                    type="text"
                    value={content.contact.heading}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, heading: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-page px-4 py-2.5 text-sm font-semibold text-heading focus:border-brand focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                    Subtitle Text
                  </label>
                  <input
                    type="text"
                    value={content.contact.text}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, text: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-page px-4 py-2.5 text-sm text-heading focus:border-brand focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-3 border-t border-border">
                  <div>
                    <label className="mb-1 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={content.contact.phone}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contact: { ...content.contact, phone: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-border bg-page px-3 py-2 text-xs font-semibold text-heading focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={content.contact.whatsapp}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contact: { ...content.contact, whatsapp: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-border bg-page px-3 py-2 text-xs font-semibold text-heading focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-sans text-xs font-bold uppercase tracking-wider text-heading">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={content.contact.email}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contact: { ...content.contact, email: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-border bg-page px-3 py-2 text-xs font-semibold text-heading focus:border-brand focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: LIVE PREVIEW */}
        {/* ============================================================== */}
        {activeTab === "preview" && (
          <div className="space-y-8 rounded-3xl border border-border bg-white p-6 sm:p-10 shadow-card animate-fade-in">
            <div className="border-b border-border pb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-heading">
                  Simulated Live Preview
                </h3>
                <p className="text-xs text-body">
                  Preview how your updated copy and photos will look on the live homepage.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="btn-primary py-2 px-5 text-xs shadow-teal"
              >
                <Save className="h-4 w-4" />
                <span>Save and Apply Now</span>
              </button>
            </div>

            {/* Hero Simulation */}
            <div className="rounded-2xl border border-border bg-page p-6 sm:p-8">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand">
                {content.hero.badge}
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-heading">
                {content.hero.title}
              </h2>
              <p className="mt-3 text-sm text-body leading-relaxed max-w-2xl">
                {content.hero.description}
              </p>
              <div className="mt-4 flex gap-3">
                <span className="btn-primary py-2 px-4 text-xs">
                  {content.hero.primaryBtnText}
                </span>
                <span className="btn-secondary py-2 px-4 text-xs">
                  {content.hero.secondaryBtnText}
                </span>
              </div>
            </div>

            {/* 5 Products Simulation */}
            <div>
              <h3 className="font-display text-base font-bold text-heading">
                {content.featured.heading}
              </h3>
              <p className="text-xs text-body mb-4">{content.featured.subheading}</p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {content.featured.customItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-border bg-white overflow-hidden shadow-sm"
                  >
                    <div className="relative aspect-square w-full bg-slate-900">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-display text-xs font-bold text-heading line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-success font-semibold mt-1">
                        ● {item.availability}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* IMAGE PICKER MODAL */}
      {/* ============================================================== */}
      {isImagePickerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border p-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white shadow-teal">
                  <ImageIcon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-heading">
                    Select Fish Photography
                  </h3>
                  <p className="text-xs text-body">
                    Choose from {availableImages.length} real hatchery &amp; variety photos or upload a new file.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsImagePickerOpen(false)}
                className="rounded-full bg-page p-2 text-body hover:bg-border hover:text-heading transition-colors"
                aria-label="Close image picker"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Filter & Upload Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-page p-4">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5">
                {["All", "Varieties", "Farm Gallery", "Uploaded Images"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedImageCategory(cat)}
                    className={`rounded-full px-3 py-1 font-sans text-xs font-semibold transition-all ${
                      selectedImageCategory === cat
                        ? "bg-brand text-white shadow-sm"
                        : "border border-border bg-white text-body hover:border-brand/40 hover:text-brand"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search & Upload */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted" />
                  <input
                    type="text"
                    value={imageSearch}
                    onChange={(e) => setImageSearch(e.target.value)}
                    placeholder="Search image..."
                    className="rounded-xl border border-border bg-white py-1.5 pl-8 pr-3 text-xs text-heading placeholder:text-muted focus:border-brand focus:outline-none"
                  />
                </div>

                <label className="btn-primary py-1.5 px-3.5 text-xs shadow-teal cursor-pointer inline-flex items-center gap-1.5">
                  {uploadingImage ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5" />
                  )}
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadImage}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Images Grid */}
            <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
              {filteredImages.length === 0 ? (
                <div className="py-16 text-center text-body">
                  <ImageIcon className="mx-auto h-10 w-10 text-muted opacity-40 mb-2" />
                  <p className="text-sm font-semibold text-heading">No matching images found</p>
                  <p className="text-xs text-muted mt-1">Try another search or upload a new photo.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
                  {filteredImages.map((img) => (
                    <button
                      key={img.path}
                      type="button"
                      onClick={() => handleSelectImage(img.path)}
                      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-page text-left transition-all hover:border-brand hover:shadow-card-hover focus:outline-none"
                    >
                      <div className="relative aspect-square w-full bg-slate-900">
                        <Image
                          src={img.path}
                          alt={img.name}
                          fill
                          sizes="(max-width: 640px) 50vw, 16vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-2 bg-white">
                        <p className="font-display text-[11px] font-bold text-heading line-clamp-1 capitalize">
                          {img.name}
                        </p>
                        <p className="text-[9px] text-muted line-clamp-1">{img.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-border p-3 bg-page text-center text-xs text-muted">
              Click any photo to assign it to{" "}
              <strong className="text-heading">
                {imagePickerTarget === "hero"
                  ? "Hero Image"
                  : `Product Slot #${imagePickerTarget.index + 1}`}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
