// middleware.ts
// Protects admin routes

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  const isAdminPath = req.nextUrl.pathname.startsWith("/admin");

  console.log("Middleware running:", req.nextUrl.pathname);

  if (isAdminPath) {
    if (!token || token.role !== "ADMIN") {
      const redirectTo = token ? "/unauthorized" : "/user/login";
      return NextResponse.redirect(new URL(redirectTo, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
