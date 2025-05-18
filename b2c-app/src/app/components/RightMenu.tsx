"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";

const categories = [
  { name: "Cart", path: "/cart", icon: faBagShopping },
  { name: "Account", path: "/account", icon: faUser },
];

export default function RightMenu() {
  return (
    <nav aria-label="Right Menu">
      <div className="flex justify-center items-center gap-4 w-auto">
        <SearchBar />
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.path}
            className="flex items-center gap-2"
          >
            <FontAwesomeIcon icon={category.icon} />
            <span className="sr-only">{category.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
