// Server-side fetching
// Display all product cards

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

export default async function ProductPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store", // disables caching to always fetch latest data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

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
          />
        ))}
      </div>
    </div>
  );
}
