import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";
import { getDbVarieties, saveDbVariety, deleteDbVariety } from "@/lib/database-service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") === "true";
    const data = await getDbVarieties(publishedOnly);
    return NextResponse.json({ success: true, varieties: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const { valid } = await verifyAdminToken(token);
    if (!valid) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, error: "Name and slug are required" }, { status: 400 });
    }

    const result = await saveDbVariety(body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    // Purge cache for public varieties catalog, detail pages, and homepage
    try {
      revalidatePath("/varieties");
      revalidatePath("/");
      revalidatePath(`/varieties/${body.slug}`);
    } catch (e) {
      console.warn("revalidatePath error:", e);
    }

    return NextResponse.json({ success: true, variety: result.data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const { valid } = await verifyAdminToken(token);
    if (!valid) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id parameter" }, { status: 400 });
    }

    const result = await deleteDbVariety(Number(id));
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    try {
      revalidatePath("/varieties");
      revalidatePath("/");
    } catch (e) {
      console.warn("revalidatePath error:", e);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
