import Image from "next/image";

type ProductCardProps = {
  image?: string; // image can be undefined or empty
  name: string;
  price: number;
  categories: string[];
};

export default function ProductCard({
  image,
  name,
  price,
  categories,
}: ProductCardProps) {
  return (
    <div className="rounded-lg w-60 h-90 flex flex-col overflow-hidden ">
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
        <div className="mt-auto text-lg  text-(--text-dark)">
          From <span className="font-bold">${price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
