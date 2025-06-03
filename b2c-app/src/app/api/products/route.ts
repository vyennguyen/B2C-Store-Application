// Route for adding, modifying and deleting a product

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get all products
// GET /api/products
export async function GET() {
  try {
    const products = await prisma.product.findMany();
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
        categories: body.categories,
        images: body.images,
        description: body.description,
        price: body.price,
        color: body.color,
        switchType: body.switchType,
        availability: body.availability,
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
