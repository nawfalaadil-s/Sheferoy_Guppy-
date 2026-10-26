import { supabase } from "./supabase";

export interface VarietyRecord {
  id?: number;
  name: string;
  slug: string;
  line?: string;
  category: "Guppies" | "Bettas";
  description: string;
  availability: string;
  is_popular?: boolean;
  published?: boolean;
  image: string;
  created_at?: string;
  updated_at?: string;
}

export interface PlantRecord {
  id?: string;
  name: string;
  slug: string;
  scientific_name?: string;
  short_description?: string;
  description: string;
  care_lighting?: string;
  care_growth?: string;
  care_difficulty?: string;
  care_placement?: string;
  aquarium_uses?: string[];
  is_featured?: boolean;
  is_published?: boolean;
  image: string;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryRecord {
  id?: number;
  kind: "video" | "guppy" | "plant";
  alt: string;
  caption: string;
  category: string;
  image?: string | null;
  video_url?: string | null;
  thumbnail_url?: string | null;
  variety_slug?: string | null;
  plant_slug?: string | null;
  video_category?: string | null;
  is_published?: boolean;
  sort_order?: number;
  created_at?: string;
}

export interface BlogPostRecord {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author?: string;
  image?: string;
  published_at?: string;
  is_published?: boolean;
  read_time?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OfferRecord {
  id?: number;
  title: string;
  description: string;
  image?: string;
  start_date?: string | null;
  end_date?: string | null;
  is_active?: boolean;
  is_featured?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface DashboardStats {
  varietiesCount: number;
  plantsCount: number;
  galleryCount: number;
  blogCount: number;
  offersCount: number;
  pendingEnquiriesCount: number;
}

// ================= VARIETIES CRUD =================
export async function getDbVarieties(publishedOnly = false): Promise<VarietyRecord[]> {
  try {
    let query = supabase.from("varieties").select("*").order("id", { ascending: true });
    if (publishedOnly) {
      query = query.eq("published", true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn("getDbVarieties error:", err);
    return [];
  }
}

export async function getDbVarietyBySlug(slug: string): Promise<VarietyRecord | null> {
  try {
    const { data, error } = await supabase
      .from("varieties")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (!error && data) return data;
  } catch (err) {
    console.warn("getDbVarietyBySlug error:", err);
  }
  return null;
}

export async function saveDbVariety(record: VarietyRecord): Promise<{ success: boolean; data?: VarietyRecord; error?: string }> {
  try {
    const payload = {
      ...record,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from("varieties")
      .upsert(payload)
      .select()
      .single();
    if (error) throw error;
    return { success: true, data };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return { success: false, error: msg };
  }
}

export async function deleteDbVariety(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("varieties").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return { success: false, error: msg };
  }
}

// ================= PLANTS CRUD =================
export async function getDbPlants(publishedOnly = false): Promise<PlantRecord[]> {
  try {
    let query = supabase.from("plants").select("*").order("created_at", { ascending: true });
    if (publishedOnly) {
      query = query.eq("is_published", true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn("getDbPlants error:", err);
    return [];
  }
}

export async function getDbPlantBySlug(slug: string): Promise<PlantRecord | null> {
  try {
    const { data, error } = await supabase
      .from("plants")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (!error && data) return data;
  } catch (err) {
    console.warn("getDbPlantBySlug error:", err);
  }
  return null;
}

export async function saveDbPlant(record: PlantRecord): Promise<{ success: boolean; data?: PlantRecord; error?: string }> {
  try {
    const payload = {
      ...record,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from("plants")
      .upsert(payload)
      .select()
      .single();
    if (error) throw error;
    return { success: true, data };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return { success: false, error: msg };
  }
}

export async function deleteDbPlant(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("plants").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return { success: false, error: msg };
  }
}

// ================= GALLERY CRUD =================
export async function getDbGalleryItems(publishedOnly = false): Promise<GalleryRecord[]> {
  try {
    let query = supabase.from("gallery_items").select("*").order("sort_order", { ascending: true });
    if (publishedOnly) {
      query = query.eq("is_published", true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn("getDbGalleryItems error:", err);
    return [];
  }
}

export async function saveDbGalleryItem(record: GalleryRecord): Promise<{ success: boolean; data?: GalleryRecord; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("gallery_items")
      .upsert(record)
      .select()
      .single();
    if (error) throw error;
    return { success: true, data };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return { success: false, error: msg };
  }
}

export async function deleteDbGalleryItem(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("gallery_items").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return { success: false, error: msg };
  }
}

// ================= BLOG POSTS CRUD =================
export async function getDbBlogPosts(publishedOnly = false): Promise<BlogPostRecord[]> {
  try {
    let query = supabase.from("blog_posts").select("*").order("published_at", { ascending: false });
    if (publishedOnly) {
      query = query.eq("is_published", true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn("getDbBlogPosts error:", err);
    return [];
  }
}

export async function getDbBlogPostBySlug(slug: string): Promise<BlogPostRecord | null> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (!error && data) return data;
  } catch (err) {
    console.warn("getDbBlogPostBySlug error:", err);
  }
  return null;
}

export async function saveDbBlogPost(record: BlogPostRecord): Promise<{ success: boolean; data?: BlogPostRecord; error?: string }> {
  try {
    const payload = {
      ...record,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from("blog_posts")
      .upsert(payload)
      .select()
      .single();
    if (error) throw error;
    return { success: true, data };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return { success: false, error: msg };
  }
}

export async function deleteDbBlogPost(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return { success: false, error: msg };
  }
}

// ================= OFFERS CRUD =================
export async function getDbOffers(activeOnly = false): Promise<OfferRecord[]> {
  try {
    let query = supabase.from("offers").select("*").order("sort_order", { ascending: true });
    if (activeOnly) {
      query = query.eq("is_active", true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn("getDbOffers error:", err);
    return [];
  }
}

export async function saveDbOffer(record: OfferRecord): Promise<{ success: boolean; data?: OfferRecord; error?: string }> {
  try {
    const payload = {
      ...record,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from("offers")
      .upsert(payload)
      .select()
      .single();
    if (error) throw error;
    return { success: true, data };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return { success: false, error: msg };
  }
}

export async function deleteDbOffer(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("offers").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return { success: false, error: msg };
  }
}

// ================= DASHBOARD STATS =================
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [
      varietiesRes,
      plantsRes,
      galleryRes,
      blogRes,
      offersRes,
      enquiriesRes,
    ] = await Promise.all([
      supabase.from("varieties").select("id", { count: "exact", head: true }),
      supabase.from("plants").select("id", { count: "exact", head: true }),
      supabase.from("gallery_items").select("id", { count: "exact", head: true }),
      supabase.from("blog_posts").select("id", { count: "exact", head: true }),
      supabase.from("offers").select("id", { count: "exact", head: true }),
      supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "pending"),
    ]);

    return {
      varietiesCount: varietiesRes.count ?? 0,
      plantsCount: plantsRes.count ?? 0,
      galleryCount: galleryRes.count ?? 0,
      blogCount: blogRes.count ?? 0,
      offersCount: offersRes.count ?? 0,
      pendingEnquiriesCount: enquiriesRes.count ?? 0,
    };
  } catch (err) {
    console.warn("getDashboardStats error:", err);
    return {
      varietiesCount: 20,
      plantsCount: 6,
      galleryCount: 15,
      blogCount: 3,
      offersCount: 3,
      pendingEnquiriesCount: 0,
    };
  }
}
