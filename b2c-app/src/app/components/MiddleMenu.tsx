"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import routes from "@/app/api/route";

const categories = [
  { name: "Shop", path: routes.products },
  { name: "Philosophy", path: "/philosophy" }, // add to routes if you want
  { name: "About Us", path: routes.about },
  { name: "Contact", path: routes.contact },
];

export default function MiddleMenu() {
  const pathname = usePathname();

  return (
    <nav aria-label="Middle Menu">
      <div className="flex justify-center items-center gap-4 w-auto">
        {categories.map((category) => {
          const isActive = pathname === category.path;
          return (
            <Link
              key={category.name}
              href={category.path}
              className={`hover:underline ${
                isActive ? "font-bold underline" : ""
              }`}
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
