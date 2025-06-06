// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAdminPath = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminPath) {
    if (!token) {
      return NextResponse.redirect(new URL("/user/login", req.url));
    }

    try {
      const payload = verifyJwt(token);
      if (!payload || payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/user/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // only run on admin routes
};
