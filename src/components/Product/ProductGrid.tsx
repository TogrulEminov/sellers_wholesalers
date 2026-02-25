import { Empty, Pagination } from "antd";
import { ProductCard } from "./ProductCard";
import { mockProducts } from "../../data/mockProducts";

export const ProductGrid = () => {
  if (mockProducts.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <Empty
          description="No products found"
          className="[&_.ant-empty-description]:text-gray-400"
        />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-10 w-full">
        <Pagination defaultCurrent={6} total={500} align="center" />
      </div>
    </>
  );
};
