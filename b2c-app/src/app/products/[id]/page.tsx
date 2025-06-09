// Detail page for a product
// Server-side fetching

import { notFound } from "next/navigation";
import Image from "next/image";
import { CiImageOff } from "react-icons/ci";

export default async function ProductDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  // Fetch product data from the API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`
  );

  if (!res.ok) {
    return notFound();
  }

  const product = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="flex items-center justify-center rounded-lg p-4">
        {product.images ? (
          <div className="relative md:w-100 md:h-100 sm:w-70 sm:h-70">
            <Image
              src={product.images[0] || ""}
              alt={product.name}
              fill
              className="object-contain rounded-lg"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        ) : (
          <CiImageOff className="text-6xl text-gray-400" />
        )}
      </div>
      <div className="ml-4 flex-1">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-(--background)">{product.description}</p>
        <p className="text-(--medium-gray) mt-2">SKU: {product.id}</p>
        <p className="text-xl text-blue-600 font-semibold mt-2">
          Price: ${product.price.toFixed(2)}
        </p>
        <div className="mt-4">
          <div>
            <b>Type:</b> {product.type}
          </div>
          <div>
            <b>Categories:</b>{" "}
            {Array.isArray(product.categories)
              ? product.categories.join(", ")
              : product.categories}
          </div>
          <div>
            <b>Availability:</b>{" "}
            {product.availability ? "Available" : "Unavailable"}
          </div>

          {product.keyboard && (
            <div>
              <div>
                <b>Switch Type: </b>
                {Array.isArray(product.keyboard.switchType)
                  ? product.keyboard.switchType.join(", ")
                  : product.keyboard.switchType}
              </div>
              <div>
                <b>Color: </b>
                {Array.isArray(product.keyboard.color)
                  ? product.keyboard.color.join(", ")
                  : product.keyboard.color}
              </div>
              <div>
                <b>Layout: </b> {product.keyboard.layout}
              </div>
              <div>
                <b>Backlight: </b> {product.keyboard.backlight}
              </div>
            </div>
          )}
          {product.keycap && (
            <div>
              <div>
                <b>Material: </b> {product.keycap.material}
              </div>
              <div>
                <b>Profile: </b> {product.keycap.profile}
              </div>
              <div>
                <b>Color: </b>
                {Array.isArray(product.keycap.color)
                  ? product.keycap.color.join(", ")
                  : product.keycap.color}
              </div>
              <div>
                <b>Compatibility: </b>
                {Array.isArray(product.keycap.compatibility)
                  ? product.keycap.compatibility.join(", ")
                  : product.keycap.compatibility}
              </div>
            </div>
          )}
          {product.switch && (
            <div>
              <div>
                <b>Switch Type: </b>
                {Array.isArray(product.switch.type)
                  ? product.switch.type.join(", ")
                  : product.switch.type}
              </div>
            </div>
          )}
          <div>
            <b>Rating:</b> {product.ratingValue ?? 0} (
            {product.ratingCount ?? 0} reviews)
          </div>
          <button className="mt-4 bg-(--background) text-white px-4 py-2 rounded-lg hover:bg-(--background-hover) transition-colors cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
