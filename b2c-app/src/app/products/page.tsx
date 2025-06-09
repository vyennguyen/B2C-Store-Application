import LeftMenu from "../components/LeftMenu";
import ProductPage from "../products/ProductPage";

interface Props {
  searchParams?: {
    search?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-[25%]">
          <LeftMenu />
        </div>
        <div className="w-[75%] overflow-auto">
          {/* Pass searchParams down to ProductPage */}
          <ProductPage searchParams={searchParams} />
        </div>
      </div>
    </>
  );
}
