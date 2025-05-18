import Image from "next/image";

type ProductCardProps = {
  image: string;
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow duration-200 w-72">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="288px"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <div className="text-gray-500 text-sm mb-2">
          {categories.join(", ")}
        </div>
        <div className="text-xl font-bold text-blue-600">
          ${price.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
