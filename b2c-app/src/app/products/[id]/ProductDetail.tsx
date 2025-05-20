import Image from "next/image";
import { CiImageOff } from "react-icons/ci";

type ProductDetailProps = {
  image: string;
  name: string;
  description: string;
};

export default function ProductDetail({
  image,
  name,
  description,
}: ProductDetailProps) {
  return (
    <div className="flex flex-col items-center p-8">
      <div className="relative w-80 h-80 mb-6 flex items-center justify-center bg-gray-100 rounded-lg border">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-lg"
            sizes="320px"
          />
        ) : (
          <CiImageOff className="text-6xl text-gray-400" />
        )}
      </div>
      <h1 className="text-3xl font-bold mb-4">{name}</h1>
      <p className="text-gray-700 text-lg text-center max-w-xl">
        {description}
      </p>
    </div>
  );
}
