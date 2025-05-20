"use client";

import LeftMenu from "./LeftMenu";
import ProductPage from "../products/ProductPage";

export default function Main() {
  return (
    <main className="flex min-h-screen">
      <div className="w-[25%]">
        <LeftMenu />
      </div>
      <div className="w-[75%] overflow-auto">
        <ProductPage />
      </div>
    </main>
  );
}
