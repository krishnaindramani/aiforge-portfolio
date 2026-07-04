-- ─────────────────────────────────────────────────────────────────────────────
-- AIforge Portfolio — Supabase Schema
-- Run this entire file in your Supabase project:
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ─────────────────────────────────────────────────────────────────────────────


-- ── 1. Create the contact_messages table ─────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name        TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  email       TEXT NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  project     TEXT CHECK (char_length(project) <= 500),
  message     TEXT NOT NULL CHECK (char_length(message) BETWEEN 10 AND 5000),
  is_read     BOOLEAN DEFAULT FALSE NOT NULL,
  ip_address  TEXT,
  user_agent  TEXT
);


-- ── 2. Enable Row Level Security ──────────────────────────────────────────────
-- RLS is ON so the anon key cannot read messages from the browser.
-- Only the service role key (used server-side) can access the table.

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;


-- ── 3. RLS Policies ───────────────────────────────────────────────────────────

-- Allow anyone (anon) to INSERT (submit contact form)
CREATE POLICY "allow_public_insert"
  ON public.contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Deny all SELECT/UPDATE/DELETE for anon — only service role can read
-- (No SELECT policy for anon = blocked by default)


-- ── 4. Indexes for dashboard performance ─────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
  ON public.contact_messages (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read
  ON public.contact_messages (is_read);

CREATE INDEX IF NOT EXISTS idx_contact_messages_ip
  ON public.contact_messages (ip_address);


-- ── 5. Verify setup ───────────────────────────────────────────────────────────

SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'contact_messages'
ORDER BY ordinal_position;