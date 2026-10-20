import { NextResponse } from "next/server";
import {
  getHomepageContent,
  saveHomepageContent,
  resetHomepageContent,
  type HomepageContent,
} from "@/lib/cms-service";

export async function GET() {
  try {
    const content = await getHomepageContent();
    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("GET /api/cms error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch CMS content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid content payload" },
        { status: 400 }
      );
    }

    await saveHomepageContent(body as HomepageContent);
    return NextResponse.json({ success: true, message: "Homepage content updated successfully" });
  } catch (error) {
    console.error("PUT /api/cms error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update CMS content" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    if (body.action === "reset") {
      await resetHomepageContent();
      const content = await getHomepageContent();
      return NextResponse.json({
        success: true,
        message: "Homepage content reset to defaults",
        content,
      });
    }

    return NextResponse.json(
      { success: false, error: "Unknown action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("POST /api/cms error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
