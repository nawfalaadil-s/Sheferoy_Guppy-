import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return NextResponse.json({
      success: true,
      message: "Admin session ended.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error during logout";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
