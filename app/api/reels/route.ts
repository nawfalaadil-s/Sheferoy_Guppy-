import { NextResponse } from "next/server";
import { z } from "zod";
import {
  extractInstagramInfo,
  verifiedSheferoyReels,
  type InstagramReel,
  type ReelItemCategory,
} from "@/lib/reels-data";
import {
  getActiveReels,
  getStoredReels,
  saveStoredReels,
  isInstagramApiConfigured,
} from "@/lib/instagram-service";

const reelCreateSchema = z.object({
  url: z.string().min(5, "Instagram URL is required"),
  caption: z.string().min(3, "Caption must be at least 3 characters").max(300, "Caption is too long"),
  category: z.enum(["Breeding", "Feeding", "Strains", "Nursery", "Fish Room"]).default("Fish Room"),
  varietyName: z.string().optional(),
  varietySlug: z.string().optional(),
  featured: z.boolean().default(false),
  videoUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
});

const reelUpdateSchema = z.object({
  id: z.string().min(1, "Reel ID is required"),
  url: z.string().optional(),
  caption: z.string().min(3).max(300).optional(),
  category: z.enum(["Breeding", "Feeding", "Strains", "Nursery", "Fish Room"]).optional(),
  varietyName: z.string().optional(),
  varietySlug: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().int().optional(),
  videoUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
});

export async function GET() {
  try {
    const data = await getActiveReels();
    return NextResponse.json({
      success: true,
      source: data.source,
      isApiConfigured: isInstagramApiConfigured(),
      reels: data.reels,
    });
  } catch (error) {
    console.error("GET /api/reels error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve reels", reels: verifiedSheferoyReels },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = reelCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message || "Invalid input data" },
        { status: 400 }
      );
    }

    const info = extractInstagramInfo(parsed.data.url);
    if (!info) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid Instagram URL. Please provide a canonical link such as https://www.instagram.com/reel/CODE/ or https://www.instagram.com/p/CODE/",
        },
        { status: 400 }
      );
    }

    const currentReels = getStoredReels();

    // Check if reel with this code already exists
    const existingIndex = currentReels.findIndex((r) => r.code === info.code);
    if (existingIndex >= 0) {
      return NextResponse.json(
        { success: false, error: `A reel with code ${info.code} is already in the collection.` },
        { status: 409 }
      );
    }

    const newReel: InstagramReel = {
      id: info.code,
      code: info.code,
      url: info.canonicalUrl,
      type: info.type,
      caption: parsed.data.caption,
      category: parsed.data.category as ReelItemCategory,
      varietyName: parsed.data.varietyName || undefined,
      varietySlug: parsed.data.varietySlug || undefined,
      featured: parsed.data.featured,
      order: 1, // new reel placed at the top
      date: new Date().toISOString().split("T")[0],
      author: "sheferoyguppy",
      videoUrl: parsed.data.videoUrl || undefined,
      thumbnailUrl: parsed.data.thumbnailUrl || undefined,
    };

    // Increment orders of existing items
    const updated = [newReel, ...currentReels.map((r, i) => ({ ...r, order: i + 2 }))];
    saveStoredReels(updated);

    return NextResponse.json({ success: true, reel: newReel, reels: updated }, { status: 201 });
  } catch (error) {
    console.error("POST /api/reels error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add Instagram reel" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const parsed = reelUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message || "Invalid input data" },
        { status: 400 }
      );
    }

    const currentReels = getStoredReels();
    const index = currentReels.findIndex((r) => r.id === parsed.data.id || r.code === parsed.data.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Reel not found" },
        { status: 404 }
      );
    }

    const existing = currentReels[index];
    let code = existing.code;
    let url = existing.url;
    let type = existing.type;

    if (parsed.data.url && parsed.data.url !== existing.url) {
      const info = extractInstagramInfo(parsed.data.url);
      if (!info) {
        return NextResponse.json(
          { success: false, error: "Invalid updated Instagram URL" },
          { status: 400 }
        );
      }
      code = info.code;
      url = info.canonicalUrl;
      type = info.type;
    }

    const updatedReel: InstagramReel = {
      ...existing,
      code,
      url,
      type,
      caption: parsed.data.caption !== undefined ? parsed.data.caption : existing.caption,
      category: (parsed.data.category as ReelItemCategory) || existing.category,
      varietyName: parsed.data.varietyName !== undefined ? parsed.data.varietyName : existing.varietyName,
      varietySlug: parsed.data.varietySlug !== undefined ? parsed.data.varietySlug : existing.varietySlug,
      featured: parsed.data.featured !== undefined ? parsed.data.featured : existing.featured,
      order: parsed.data.order !== undefined ? parsed.data.order : existing.order,
    };

    currentReels[index] = updatedReel;
    saveStoredReels(currentReels);

    return NextResponse.json({ success: true, reel: updatedReel, reels: currentReels });
  } catch (error) {
    console.error("PUT /api/reels error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update Instagram reel" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing reel id parameter" }, { status: 400 });
    }

    const currentReels = getStoredReels();
    const filtered = currentReels.filter((r) => r.id !== id && r.code !== id);

    if (filtered.length === currentReels.length) {
      return NextResponse.json({ success: false, error: "Reel not found" }, { status: 404 });
    }

    // Reindex orders
    const reordered = filtered.map((r, i) => ({ ...r, order: i + 1 }));
    saveStoredReels(reordered);

    return NextResponse.json({ success: true, removedId: id, reels: reordered });
  } catch (error) {
    console.error("DELETE /api/reels error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete reel" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    // Reset action
    if (body.action === "reset") {
      saveStoredReels(verifiedSheferoyReels);
      return NextResponse.json({
        success: true,
        message: "Reset to verified Sheferoy Guppy defaults",
        reels: verifiedSheferoyReels,
      });
    }

    // Reorder action
    if (Array.isArray(body.orderedIds)) {
      const current = getStoredReels();
      const reelMap = new Map(current.map((r) => [r.id, r]));
      const reordered: InstagramReel[] = [];

      body.orderedIds.forEach((id: string, index: number) => {
        const item = reelMap.get(id);
        if (item) {
          reordered.push({ ...item, order: index + 1 });
          reelMap.delete(id);
        }
      });

      // append any unmentioned items to end
      reelMap.forEach((item) => {
        reordered.push({ ...item, order: reordered.length + 1 });
      });

      saveStoredReels(reordered);
      return NextResponse.json({ success: true, reels: reordered });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action or missing orderedIds array" },
      { status: 400 }
    );
  } catch (error) {
    console.error("PATCH /api/reels error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update reels configuration" },
      { status: 500 }
    );
  }
}
