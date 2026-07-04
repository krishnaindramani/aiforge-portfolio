import { NextRequest, NextResponse } from "next/server";
import { signAdminToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: "Password required." }, { status: 400 });
    }

    // Timing-safe comparison to prevent timing attacks
    const adminPassword = process.env.ADMIN_PASSWORD ?? "";
    if (!adminPassword) {
      console.error("[Admin Login] ADMIN_PASSWORD env var not set.");
      return NextResponse.json({ error: "Server misconfigured." }, { status: 500 });
    }

    // Simple constant-time string comparison
    let mismatch = password.length !== adminPassword.length ? 1 : 0;
    for (let i = 0; i < Math.max(password.length, adminPassword.length); i++) {
      mismatch |= (password.charCodeAt(i) ?? 0) ^ (adminPassword.charCodeAt(i) ?? 0);
    }

    if (mismatch !== 0) {
      // Artificial delay to slow brute force
      await new Promise((r) => setTimeout(r, 800));
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const token = await signAdminToken();

    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,       // Not accessible via JS
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("[Admin Login] Error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}