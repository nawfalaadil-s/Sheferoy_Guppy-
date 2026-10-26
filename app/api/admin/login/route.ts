import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  validateAdminCredentials,
  createAdminToken,
} from "@/lib/admin-auth";
import { rateLimiter, getClientIp } from "@/lib/rate-limiter";

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimitKey = `admin-login:${clientIp}`;

  // 1. Check rate limit & lockout status
  const limitStatus = rateLimiter.checkLimit(rateLimitKey, 5, 15 * 60 * 1000, 15 * 60 * 1000);
  if (!limitStatus.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `Account temporarily locked due to too many failed attempts. Please retry in ${limitStatus.retryAfterSeconds} seconds.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(limitStatus.retryAfterSeconds || 900),
        },
      }
    );
  }

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
      // Record failure and apply throttle delay to foil automated password guessing
      const failStatus = rateLimiter.recordFailure(rateLimitKey, 5, 15 * 60 * 1000);
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (failStatus.locked) {
        return NextResponse.json(
          {
            success: false,
            error: `Too many failed login attempts. Your IP has been temporarily locked out for 15 minutes.`,
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: `Invalid username or password. ${failStatus.remaining} attempts remaining before temporary lockout.`,
        },
        { status: 401 }
      );
    }

    // Success: Reset rate limiter for this client
    rateLimiter.reset(rateLimitKey);

    const token = await createAdminToken(String(username), rememberMe !== false);
    const maxAgeSeconds = rememberMe !== false ? 7 * 24 * 60 * 60 : 24 * 60 * 60; // 7 days or 1 day

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Strict CSRF protection
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
