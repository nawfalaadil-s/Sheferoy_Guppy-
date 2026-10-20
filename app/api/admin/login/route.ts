import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  validateAdminCredentials,
  createAdminToken,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { username, password, rememberMe } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Please enter both username and password." },
        { status: 400 }
      );
    }

    const isValid = validateAdminCredentials(String(username), String(password));
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password. Please try again." },
        { status: 401 }
      );
    }

    const token = await createAdminToken(String(username), rememberMe !== false);
    const maxAgeSeconds = rememberMe !== false ? 14 * 24 * 60 * 60 : 24 * 60 * 60;

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: maxAgeSeconds,
    });

    return NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal authentication error";
    console.error("Login API error:", err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
