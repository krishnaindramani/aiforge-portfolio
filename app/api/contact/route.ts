import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, project, message } = body;

    // ── Validation ────────────────────────────────────────────────────────────
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    // ── Rate limiting (simple IP check) ───────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    // Check if this IP submitted in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", ip)
      .gte("created_at", fiveMinutesAgo);

    if (count && count >= 3) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a few minutes." },
        { status: 429 }
      );
    }

    // ── Insert into Supabase ──────────────────────────────────────────────────
    const { data, error } = await supabaseAdmin
      .from("contact_messages")
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          project: project?.trim() || null,
          message: message.trim(),
          is_read: false,
          ip_address: ip,
          user_agent: req.headers.get("user-agent") ?? null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("[Contact API] Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save your message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, id: data.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}