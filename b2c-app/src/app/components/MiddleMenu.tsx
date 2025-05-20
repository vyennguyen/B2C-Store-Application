"use  client";
import { useState } from "react";
import Link from "next/link";

const categories = [
  { name: "Shop", path: "/products" },
  { name: "Philosophy", path: "/philosophy" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function MiddleMenu() {
  const [selected, setSelected] = useState(false);
  return (
    <nav aria-label="Middle Menu">
      <div className="flex justify-center items-center gap-4 w-auto">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.path}
            className="hover:cursor-pointer hover:underline"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
