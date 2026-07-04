import { createClient } from "@supabase/supabase-js";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  project: string | null;
  message: string;
  created_at: string;
  is_read: boolean;
  ip_address: string | null;
  user_agent: string | null;
}

// ─── Browser client (public anon key) ────────────────────────────────────────
// Safe to use in Client Components — anon key only has RLS-gated access

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── Server client (service role key) ────────────────────────────────────────
// NEVER import this in Client Components — service role bypasses all RLS

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);