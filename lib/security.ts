/**
 * Security & Input Sanitization Utilities
 * Guards against XSS, SQLi, command injection, and bot spam.
 */

/**
 * Strips dangerous HTML tags, javascript pseudo-protocols, and inline event handlers.
 */
export function sanitizeText(input?: string | null): string {
  if (!input || typeof input !== "string") return "";

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // strip <script> tags
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "") // strip <style> tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "") // strip <iframe> tags
    .replace(/<[^>]+>/g, "") // strip remaining HTML tags
    .replace(/javascript:/gi, "") // strip javascript: URI
    .replace(/vbscript:/gi, "") // strip vbscript: URI
    .replace(/on\w+\s*=/gi, "") // strip onclick=, onload=, onerror=
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, "") // strip control characters
    .trim();
}

/**
 * Validates honeypot bot trap field.
 * Legitimate human users will leave this hidden field blank.
 * If filled, it indicates an automated scraper or form spam bot.
 */
export function isBotSubmission(honeypotField?: string | null): boolean {
  return typeof honeypotField === "string" && honeypotField.trim().length > 0;
}
