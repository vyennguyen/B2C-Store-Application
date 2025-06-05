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
      aria-label={`View details for ${name}`}
      className="group relative rounded-lg border border-gray-100 w-72 h-96 flex flex-col overflow-hidden bg-gray-50 cursor-pointer transition-colors"
    >
      {/* Image Section */}
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
          <CiImageOff className="text-4xl text-gray-400" />
        )}
      </div>

      {/* Text Section with Background Wave */}
      <div className="relative z-0 flex-1">
        {/* Wavy Transition Layer */}
        <div className="absolute inset-0 before:absolute before:left-[-100%] before:top-0 before:h-full before:w-full before:bg-gradient-to-r before:from-gray-800 before:to-(--background) before:z-0 group-hover:before:left-0 before:transition-all before:duration-500 before:ease-in-out rounded-b-lg" />
        {/* Actual Text */}
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
  );
}
