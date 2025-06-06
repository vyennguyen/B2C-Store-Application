// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Prepare the secret key for verification
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "klicky_dev_secret"
);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAdminPath = req.nextUrl.pathname.startsWith("/admin");

  // Debugger
  console.log("Middleware is running:", req.nextUrl.pathname);

  if (isAdminPath) {
    if (!token) {
      return NextResponse.redirect(new URL("/user/login", req.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);

      if (typeof payload !== "object" || !payload || payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.redirect(new URL("/user/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
