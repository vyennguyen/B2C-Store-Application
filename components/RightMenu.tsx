"use client";
import Link from "next/link";

const categories = [
  { name: "Cart", path: "/cart" },
  { name: "Account", path: "/account" },
];

export default function RightMenu() {
  return (
    <nav aria-label="Right Menu">
      <div className="flex justify-center items-center gap-4 w-auto">
        {categories.map((category) => (
          <Link key={category.name} href={category.path}>
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
