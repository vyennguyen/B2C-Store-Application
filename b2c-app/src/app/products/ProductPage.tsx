"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  categories: string[];
  ratingValue?: number;
  ratingCount?: number;
};

export default function ProductListClientWrapper() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="min-h-screen p-5">
      <h1 className="text-xl font-bold mb-5">
        All Products{" "}
        <span className="text-md text-(--medium-gray)">
          ({products.length})
        </span>
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.images?.[0]}
            name={product.name}
            price={product.price}
            rating={{
              value: product.ratingValue ?? 0,
              count: product.ratingCount ?? 0,
            }}
            categories={product.categories}
            onDeleted={() =>
              setProducts((prev) => prev.filter((p) => p.id !== product.id))
            }
          />
        ))}
      </div>
    </div>
  );
}
