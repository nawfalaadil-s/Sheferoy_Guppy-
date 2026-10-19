import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ifvmvinxctcognyhwbot.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmdm12aW54Y3Rjb2dueWh3Ym90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0MTUzMTQsImV4cCI6MjEwNzk5MTMxNH0.1CHv-wNc1howJjmxan5x9veTcRcupwCH_KCxsVX3RYs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
