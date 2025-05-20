// Entry point for the product detail page

"use client";

import { useParams } from "next/navigation";

export default function ProductDetail() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="p-4">
      <h1>Product Detail Page</h1>
      <p>Product ID: {id}</p>
    </div>
  );
}
