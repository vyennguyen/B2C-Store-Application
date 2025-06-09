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

interface Props {
  searchParams?: {
    search?: string;
  };
}

export default async function ProductPage({ searchParams }: Props) {
  const searchQuery = searchParams?.search || "";

  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  if (searchQuery) {
    url.searchParams.append("search", searchQuery);
  }

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  return (
    <div className="min-h-screen p-5">
      <h1 className="text-xl font-bold mb-5">
        Products {searchQuery ? `matching "${searchQuery}"` : " "}{" "}
        <span className="text-md text-(--medium-gray)">
          ({products.length})
        </span>
      </h1>
      {/* Place your SearchBar here if you want it inside ProductPage */}
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product) => (
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
          ))
        )}
      </div>
    </div>
  );
}
