import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /admin routes (not /admin/login itself)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const valid = await verifyAdminToken(token);
    if (!valid) {
      // Clear stale/invalid cookie and redirect
      const res = NextResponse.redirect(new URL("/admin/login", req.url));
      res.cookies.delete("admin_token");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};