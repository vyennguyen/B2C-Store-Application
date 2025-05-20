import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

type ProductCardProps = {
  id: number;
  image?: string; // image can be undefined or empty
  name: string;
  categories: string[];
  rating: {
    value: number;
    count: number;
  };
  price: number;
};

export default function ProductCard({
  id,
  image,
  name,
  categories,
  rating,
  price,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="rounded-lg border border-black w-60 h-90 flex flex-col overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="relative h-48 w-full flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="288px"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-md font-semibold">{name}</h3>
        <div className="text-gray-500 text-sm mb-2">
          {categories.join(", ")}
        </div>
        {rating && (
          <div className="text-sm mb-2">
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />{" "}
            {rating.value}{" "}
            <span className="text-gray-400">({rating.count})</span>
          </div>
        )}
        <div className="mt-auto text-lg  text-(--text-dark)">
          From <span className="font-bold">${price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
}
