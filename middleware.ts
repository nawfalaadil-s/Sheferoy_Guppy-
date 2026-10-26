import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const { valid } = await verifyAdminToken(token);

    // If user is trying to access /admin/login while already authenticated, redirect to /admin
    if (isLoginPage) {
      if (valid) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return applySecurityHeaders(NextResponse.next());
    }

    // If not authenticated and trying to access any admin area, redirect to login
    if (!valid) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return applySecurityHeaders(NextResponse.next());
}

/**
 * Appends defense-in-depth HTTP security headers to all responses.
 */
function applySecurityHeaders(response: NextResponse): NextResponse {
  // 1. Prevent Clickjacking
  response.headers.set("X-Frame-Options", "DENY");

  // 2. Prevent MIME-type Sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // 3. Strict Referrer Policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // 4. Cross-Site Scripting (XSS) Legacy Protection
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // 5. Restrict Dangerous Device APIs
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );

  // 6. Enforce HTTPS (HSTS) in production
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // 7. Content Security Policy (CSP)
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; media-src 'self' https: data:; connect-src 'self' https://*.supabase.co; frame-ancestors 'none';"
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
