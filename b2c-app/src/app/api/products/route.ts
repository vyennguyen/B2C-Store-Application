// Route for getting and adding a product

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get all products
// GET /api/products
// Support search products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("search") || "";

    const where = searchQuery
      ? {
          OR: [
            { name: { contains: searchQuery, mode: "insensitive" as const } },
            {
              description: {
                contains: searchQuery,
                mode: "insensitive" as const,
              },
            },
            { categories: { has: searchQuery } },
          ],
        }
      : {};

    const products = await prisma.product.findMany({ where });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// Adding a new product (POST)
// POST /api/products
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        type: body.type,
        categories: body.categories,
        images: body.images,
        description: body.description,
        price: body.price,
        availability: body.availability,

        // create appropriate nested model based on type
        keyboard:
          body.type === "Keyboard" && body.keyboard
            ? {
                create: {
                  switchType: body.keyboard.switchType,
                  color: body.keyboard.color,
                  layout: body.keyboard.layout,
                  backlight: body.keyboard.backlight,
                },
              }
            : undefined,

        keycap:
          body.type === "Keycap" && body.keycap
            ? {
                create: {
                  material: body.keycap.material,
                  profile: body.keycap.profile,
                  color: body.keycap.color,
                  compatibility: body.keycap.compatibility,
                },
              }
            : undefined,

        switch:
          body.type === "Switch" && body.switch
            ? {
                create: {
                  type: body.switch.type,
                },
              }
            : undefined,
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
