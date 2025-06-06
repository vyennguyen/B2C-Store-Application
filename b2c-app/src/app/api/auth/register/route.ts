// API for registration

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    const errors: Record<string, string> = {};

    if (!email) {
      errors.email = "Email is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    if (!name) {
      errors.name = "Name is required";
    }

    return NextResponse.json(
      {
        fields: errors,
      },
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

    console.log(`User created: ${user.email} (ID: ${user.id})`);

    return NextResponse.json({ message: "User created", userId: user.id });
  } catch (error: any) {
    if (error.code === "P2002") {
      // Prisma unique constraint violation
      console.log(
        `Registration failed: Email "${email}" is already registered.`
      );
      return NextResponse.json(
        { error: "There's already an account with that email." },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
