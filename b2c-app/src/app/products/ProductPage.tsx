"use client";

import { useEffect, useState } from "react";
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

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="min-h-screen p-5">
      <h1 className="text-xl font-bold mb-5">All Keyboards</h1>
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
          />
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
