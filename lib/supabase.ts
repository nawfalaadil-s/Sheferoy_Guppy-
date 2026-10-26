import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://ifvmvinxctcognyhwbot.supabase.co";
const DEFAULT_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmdm12aW54Y3Rjb2dueWh3Ym90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0MTUzMTQsImV4cCI6MjEwNzk5MTMxNH0.1CHv-wNc1howJjmxan5x9veTcRcupwCH_KCxsVX3RYs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

