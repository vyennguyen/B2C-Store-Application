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

// Admin routes
const adminCategories = [
  { name: "Products", path: "/admin/products" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Users", path: "/admin/users" },
];

export default function MiddleMenu() {
  const pathname = usePathname();

  // Route-based component rendering
  const isAdmin = pathname.startsWith("/admin");
  const categories = isAdmin ? adminCategories : userCategories;

  return (
    <nav aria-label="Middle Menu">
      <div
        className={`flex justify-center items-center gap-4 w-auto ${
          isAdmin ? "bg-white px-4 py-2 rounded-full" : ""
        }`}
      >
        {categories.map((category) => {
          const isActive = pathname === category.path;
          return (
            <Link
              key={category.name}
              href={category.path}
              className={`${
                isActive
                  ? "font-bold bg-(--background) text-white rounded-full"
                  : ""
              } ${
                isAdmin ? "text-sm text-(--background)" : ""
              } hover:bg-(--background) hover:text-white px-4 py-1 rounded-full transition`}
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
