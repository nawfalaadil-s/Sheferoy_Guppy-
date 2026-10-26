import { createClient } from "@supabase/supabase-js";

export const DEFAULT_SUPABASE_URL = "https://ifvmvinxctcognyhwbot.supabase.co";
export const DEFAULT_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmdm12aW54Y3Rjb2dueWh3Ym90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0MTUzMTQsImV4cCI6MjEwNzk5MTMxNH0.1CHv-wNc1howJjmxan5x9veTcRcupwCH_KCxsVX3RYs";

function sanitizeKey(raw?: string): string {
  if (!raw) return DEFAULT_ANON_KEY;
  const trimmed = raw.trim().replace(/^["']|["']$/g, "");
  if (!trimmed || trimmed.includes("placeholder") || !trimmed.startsWith("ey")) {
    return DEFAULT_ANON_KEY;
  }
  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    return DEFAULT_ANON_KEY;
  }
  try {
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonStr =
      typeof atob === "function"
        ? atob(b64)
        : Buffer.from(b64, "base64").toString("utf-8");
    const payload = JSON.parse(jsonStr);
    if (payload.iss === "supabase" && payload.ref === "ifvmvinxctcognyhwbot") {
      return trimmed;
    }
  } catch {
    return DEFAULT_ANON_KEY;
  }
  return DEFAULT_ANON_KEY;
}

function sanitizeUrl(raw?: string): string {
  if (!raw) return DEFAULT_SUPABASE_URL;
  const trimmed = raw.trim().replace(/^["']|["']$/g, "").replace(/\/+$/, "");
  if (trimmed.includes("ifvmvinxctcognyhwbot.supabase.co")) {
    return trimmed;
  }
  return DEFAULT_SUPABASE_URL;
}

const supabaseUrl = sanitizeUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = sanitizeKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

