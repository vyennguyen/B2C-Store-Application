// Entry point for the product detail page

"use client";

import { useParams } from "next/navigation";
import ProductDetail from "../ProductDetail";
import { mockProducts } from "../../data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  // Find the product by id
  const product = mockProducts.find((p) => p.id === id);

  // Use a fallback image if the product has no image
  const image = product?.images[0] || "";

  if (!product) {
    return (
      <div className="p-8 text-center text-red-500">Product not found.</div>
    );
  }

  return (
    <ProductDetail
      image={image}
      name={product.name}
      description={product.description}
    />
  );
}
