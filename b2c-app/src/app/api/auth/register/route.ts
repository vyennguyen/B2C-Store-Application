import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: "Uh oh, it seems some required fields are missing." },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        // role defaults to USER
      },
    });

    return NextResponse.json({ message: "User created", userId: user.id });
  } catch (error: any) {
    if (error.code === "P2002") {
      // Prisma unique constraint violation
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
