import Image from "next/image";
import Link from "next/link";
import { CiImageOff } from "react-icons/ci";

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
};

export default function ProductCard({
  id,
  image,
  name,
  price,
  rating,
  categories,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="rounded-lg border border-black w-72 h-96 flex flex-col overflow-hidden bg-white hover:bg-gray-50 transition cursor-pointer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="288px"
          />
        ) : (
          <CiImageOff className="text-4xl text-gray-400" />
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <div className="text-gray-500 text-sm mb-1">
          {categories.join(", ")}
        </div>
        <div className="text-yellow-600 text-sm mb-2">
          ⭐ {rating.value}{" "}
          <span className="text-gray-400">({rating.count})</span>
        </div>
        <div className="mt-auto text-xl font-bold text-blue-600">
          from ${price.toFixed(2)}
        </div>
      </div>
    </Link>
  );
}
