// API for logging out

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookie = await cookies();

  // Clear the token cookie
  cookie.set({
    name: "token",
    value: "",
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({ message: "Logged out successfully" });
}
