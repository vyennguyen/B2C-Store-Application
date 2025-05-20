// Display the product cards in a grid layout in the Product Page

import ProductCard from "./ProductCard";
import { mockProducts } from "../data/products";

function ProductPage() {
  return (
    <div className="min-h-screen p-5">
      <div className="flex flex-wrap gap-4 justify-center">
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.images[0]}
            name={product.name}
            price={product.price}
            categories={product.categories}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
