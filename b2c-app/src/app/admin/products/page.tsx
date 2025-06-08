// Entry point for the admin product page

import LeftMenu from "../../components/LeftMenu";
import ProductPage from "../../products/ProductPage";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen">
      <div className="w-[25%]">
        <LeftMenu />
      </div>
      <div className="w-[75%] overflow-auto p-6">
        {/* Add Product Button */}
        <div className="flex justify-start mb-4">
          <Link
            href="/admin/products/add-product"
            className="bg-(--foreground) text-(--background) font-semibold px-4 py-2 rounded hover:bg-(--background) hover:text-white transition"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Product
          </Link>
        </div>

        {/* Main product content */}
        <ProductPage />
      </div>
    </div>
  );
}
