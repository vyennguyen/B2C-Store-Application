// Entry point for the admin product page

import LeftMenu from "../../components/LeftMenu";
import ProductPage from "../../products/ProductPage";

export default function ProductsPage() {
  return (
    <>
      {/* Main content for the product page */}
      <div className="flex min-h-screen">
        <div className="w-[25%]">
          <LeftMenu />
        </div>
        <div className="w-[75%] overflow-auto">
          <ProductPage />
        </div>
      </div>
    </>
  );
}
