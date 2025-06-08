"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CiImageOff } from "react-icons/ci";
import { useState } from "react";

type ProductCardProps = {
  id: string;
  image?: string;
  name: string;
  price: number;
  rating: {
    value: number;
    count: number;
  };
  categories: string[];
  onDeleted?: () => void; // Optional callback
};

export default function ProductCard({
  id,
  image,
  name,
  price,
  rating,
  categories,
  onDeleted,
}: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const role = session?.user?.role;
  const isAdmin = role?.toUpperCase() === "ADMIN";

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete product");
      }

      if (onDeleted) onDeleted(); // Refresh list
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative rounded-lg border border-gray-100 w-67 h-auto flex flex-col overflow-hidden bg-gray-50">
      {/* Product Content */}
      <div className="flex-1">
        <Link
          href={`/products/${id}`}
          aria-label={`View details for ${name}`}
          className="cursor-pointer block h-full"
        >
          {/* Image Section */}
          <div className="relative h-48 w-full flex items-center justify-center">
            {image ? (
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                sizes="200px"
              />
            ) : (
              <CiImageOff className="text-4xl text-gray-400" />
            )}
          </div>

          {/* Text Section with Background Wave */}
          <div className="relative z-0 h-full">
            <div className="absolute inset-0 before:absolute before:left-[-100%] before:top-0 before:h-full before:w-full before:bg-gradient-to-r before:from-gray-800 before:to-(--background) before:z-0 group-hover:before:left-0 before:transition-all before:duration-500 before:ease-in-out rounded-b-lg" />
            <div className="p-4 relative z-10 h-full flex flex-col transition-colors duration-500 group-hover:text-white">
              <h3 className="text-(--background) text-xl font-bold mb-1 group-hover:text-white">
                {name}
              </h3>
              <div className="text-(--medium-gray) text-lg font-light mb-1 group-hover:text-white">
                {categories.join(", ")}
              </div>
              <div className="text-(--star-yellow) text-md mb-2 group-hover:text-yellow-300">
                ⭐ {rating.value}{" "}
                <span className="text-gray-400 group-hover:text-white">
                  ({rating.count})
                </span>
              </div>
              <div className="mt-auto text-md font-bold text-(--background) group-hover:text-white">
                <span className="font-light group-hover:text-(--foreground)">
                  From
                </span>{" "}
                ${price.toFixed(2)}
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Admin-only controls */}
      {isAdmin && (
        <div className="flex justify-between gap-2 p-2 bg-(--background) text-white z-20 relative">
          <Link href={`/admin/products/modify-product/${id}`}>
            <button
              className="font-bold border border-white rounded-lg px-3 py-1 text-sm hover:bg-(--background-hover) cursor-pointer"
              disabled={loading}
            >
              Modify
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className=" font-bold text-white bg-(--error) rounded px-3 py-1 text-sm hover:bg-(--e-hover) cursor-pointer"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
}
