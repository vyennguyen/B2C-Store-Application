import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Fetch a product by id
// GET /api/products/[id]
export async function GET(context: { params: { id: string } }) {
  try {
    const id = parseInt(context.params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// Modify a product by id
// api/products/[id]
export async function PATCH(req: Request, context: { params: { id: string } }) {
  try {
    const id = parseInt(context.params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        type: body.type,
        categories: body.categories,
        images: body.images,
        description: body.description,
        price: body.price,
        availability: body.availability,

        // nested updates for related models if included in the request body
        keyboard: body.keyboard
          ? {
              update: {
                switchType: body.keyboard.switchType,
                color: body.keyboard.color,
                layout: body.keyboard.layout,
                backlight: body.keyboard.backlight,
              },
            }
          : undefined,

        keycap: body.keycap
          ? {
              update: {
                material: body.keycap.material,
                profile: body.keycap.profile,
                color: body.keycap.color,
                compatibility: body.keycap.compatibility,
              },
            }
          : undefined,

        switch: body.switch
          ? {
              update: {
                type: body.switch.type,
              },
            }
          : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Error updating product:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// Delete a product (DELETE)
export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    await prisma.product.delete({
      where: { id: body.id },
    });

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
