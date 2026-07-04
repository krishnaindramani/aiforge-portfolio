import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/jwt";

// ── Auth guard helper ─────────────────────────────────────────────────────────

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

// ── GET — fetch all messages ──────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter"); // "unread" | "read" | null (all)
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = 20;
  const offset = (page - 1) * limit;

  let query = supabaseAdmin
    .from("contact_messages")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (filter === "unread") query = query.eq("is_read", false);
  if (filter === "read") query = query.eq("is_read", true);

  const { data, error, count } = await query;

  if (error) {
    console.error("[Admin Messages GET] Error:", error);
    return NextResponse.json({ error: "Failed to fetch messages." }, { status: 500 });
  }

  return NextResponse.json({ messages: data, total: count, page, limit });
}

// ── PATCH — mark message as read/unread ──────────────────────────────────────

export async function PATCH(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id, is_read } = await req.json();
  if (!id) return NextResponse.json({ error: "Message ID required." }, { status: 400 });

  const { error } = await supabaseAdmin
    .from("contact_messages")
    .update({ is_read })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to update message." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// ── DELETE — remove a message ─────────────────────────────────────────────────

export async function DELETE(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Message ID required." }, { status: 400 });

  const { error } = await supabaseAdmin
    .from("contact_messages")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to delete message." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}