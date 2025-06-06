"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import routes from "@/app/api/route";

// Normal user routes
const userCategories = [
  { name: "Shop", path: routes.products },
  { name: "Philosophy", path: routes.philosophy },
  { name: "About Us", path: routes.about },
  { name: "Contact", path: routes.contact },
];

const adminCategories = [
  { name: "Products", path: "/admin/products" },
  { name: "Orders", path: "/admin/orders" },
];

export default function MiddleMenu() {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");
  const categories = isAdmin ? adminCategories : userCategories;

  return (
    <nav aria-label="Middle Menu">
      <div
        className={`flex justify-center items-center gap-4 w-auto ${
          isAdmin ? "bg-gray-100 px-4 py-2 rounded" : ""
        }`}
      >
        {categories.map((category) => {
          const isActive = pathname === category.path;
          return (
            <Link
              key={category.name}
              href={category.path}
              className={`hover:underline ${
                isActive ? "font-bold underline" : ""
              } ${isAdmin ? "text-sm text-gray-800" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
