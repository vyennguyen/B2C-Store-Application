import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

type ProductCardProps = {
  image?: string; // image can be undefined or empty
  name: string;
  price: number;
  categories: string[];
  rating: {
    value: number;
    count: number;
  };
};

export default function ProductCard({
  image,
  name,
  price,
  categories,
  rating,
}: ProductCardProps) {
  return (
    <div className="rounded-lg w-60 h-90 flex flex-col overflow-hidden shadow-sm bg-white hover:shadow-lg transition-shadow duration-300">
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
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
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
    </div>
  );
}
