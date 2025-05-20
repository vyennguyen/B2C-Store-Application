// Display the product cards in a grid layout in the Product Page

import ProductCard from "./ProductCard";
import { mockProducts } from "../data/products";

function ProductPage() {
  return (
    <div className="min-h-screen p-5">
      <h1 className="text-lg font-bold mb-5">All Keyboards</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image="/keyboard.jpg"
            name={product.name}
            price={product.price}
            rating={product.rating}
            categories={product.categories}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
