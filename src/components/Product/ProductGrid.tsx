import { Empty, Pagination, Spin } from "antd";
import { useSearchParams } from "react-router";
import { ALL_GROUPS, formatGroupLabel, SEARCH_PARAMS } from "../../data/searchParams";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "./ProductCard.tsx";

const PAGE_SIZE = 9;

export function ProductGrid() {
  const [searchParams, setSearchParams] = useSearchParams();
  const group = searchParams.get(SEARCH_PARAMS.group) ?? ALL_GROUPS;
  const page = Math.max(1, Number(searchParams.get(SEARCH_PARAMS.page) ?? "1"));

  const products = useProducts(group);

  if (products === undefined) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  const total = products.length;
  const start = (page - 1) * PAGE_SIZE;
  const paginatedProducts = products.slice(start, start + PAGE_SIZE);

  const setPage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    if (nextPage <= 1) {
      next.delete(SEARCH_PARAMS.page);
    } else {
      next.set(SEARCH_PARAMS.page, String(nextPage));
    }
    setSearchParams(next, { replace: true });
  };

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <Empty
          description={
            group === ALL_GROUPS
              ? "Məhsul tapılmadı"
              : `${formatGroupLabel(group)} qrupunda məhsul yoxdur`
          }
          className="[&_.ant-empty-description]:text-gray-400"
        />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {total > PAGE_SIZE && (
        <div className="mt-10 w-full">
          <Pagination
            current={page}
            pageSize={PAGE_SIZE}
            total={total}
            onChange={setPage}
            align="center"
            showSizeChanger={false}
          />
        </div>
      )}
    </>
  );
}
