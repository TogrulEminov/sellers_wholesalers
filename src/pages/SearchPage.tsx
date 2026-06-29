import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { Button, Empty, Pagination, Spin } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../components/Product/ProductCard";
import { mainPath } from "../data/constant";
import { useSidebar } from "../context/SidebarContext";
import { ALL_CATEGORIES, formatUnitLabel, SEARCH_PARAMS } from "../data/searchParams";
import { useProductSearch } from "../hooks/useProducts";

const PAGE_SIZE = 9;

export default function SearchPage() {
  const { openMobile } = useSidebar();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SEARCH_PARAMS.query)?.trim() ?? "";
  const category = searchParams.get(SEARCH_PARAMS.category) ?? ALL_CATEGORIES;
  const page = Math.max(1, Number(searchParams.get(SEARCH_PARAMS.page) ?? "1"));

  const products = useProductSearch(query);

  const filteredProducts = useMemo(() => {
    if (!products) return undefined;
    if (category === ALL_CATEGORIES) return products;
    return products.filter((product) => product.unit === category);
  }, [products, category]);

  const { paginatedProducts, total } = useMemo(() => {
    if (!filteredProducts) return { paginatedProducts: [], total: 0 };
    const start = (page - 1) * PAGE_SIZE;
    return {
      total: filteredProducts.length,
      paginatedProducts: filteredProducts.slice(start, start + PAGE_SIZE),
    };
  }, [filteredProducts, page]);

  const setPage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    if (nextPage <= 1) {
      next.delete(SEARCH_PARAMS.page);
    } else {
      next.set(SEARCH_PARAMS.page, String(nextPage));
    }
    setSearchParams(next, { replace: true });
  };

  const categoryLabel =
    category !== ALL_CATEGORIES ? formatUnitLabel(category) : null;

  return (
    <div className="container py-6 lg:py-8">
      <div className="flex items-start flex-col sm:flex-row sm:justify-between mb-8 gap-4">
        <div>
          <p className="text-[#00A8E8] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            Axtarış
          </p>
          {query ? (
            <>
              <h1 className="text-[#003459] font-bold text-2xl lg:text-3xl mb-1">
                &ldquo;{query}&rdquo; üzrə nəticələr
              </h1>
              <p className="text-gray-500 text-sm">
                {filteredProducts === undefined
                  ? "Axtarılır..."
                  : total === 0
                    ? "Heç bir məhsul tapılmadı"
                    : `${total} məhsul tapıldı${categoryLabel ? ` · ${categoryLabel}` : ""}`}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-[#003459] font-bold text-2xl lg:text-3xl mb-1">
                Məhsul axtarışı
              </h1>
              <p className="text-gray-500 text-sm">Ad, kod, brend və ya qrup üzrə axtarın</p>
            </>
          )}
        </div>
        <Button
          icon={<AppstoreOutlined />}
          onClick={openMobile}
          className="lg:hidden flex items-center gap-2 border border-gray-200 bg-white text-[#003459] hover:border-[#00A8E8] hover:text-[#00A8E8] rounded-lg h-10 px-4 w-full sm:w-fit font-semibold text-sm shrink-0"
        >
          Kateqoriyalar
        </Button>
      </div>

      {!query && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-lg bg-[#eef8fd] flex items-center justify-center mb-4">
            <FaSearch className="w-7 h-7 text-[#00A8E8]" />
          </div>
          <p className="text-gray-500 mb-2">Axtarış sorğusu daxil edin</p>
          <p className="text-gray-400 text-sm max-w-md">
            Yuxarıdakı axtarış sahəsindən məhsul adı, kodu, brendi və ya qrupu yazın
          </p>
        </div>
      )}

      {query && filteredProducts === undefined && (
        <div className="flex items-center justify-center h-96">
          <Spin size="large" />
        </div>
      )}

      {query && filteredProducts !== undefined && total === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <Empty
            description={
              <span className="text-gray-500">
                &ldquo;{query}&rdquo; sorğusuna uyğun məhsul tapılmadı
                {categoryLabel ? ` (${categoryLabel})` : ""}
              </span>
            }
            className="[&_.ant-empty-description]:text-gray-400"
          />
          <Link
            to={mainPath.home.main}
            className="mt-6 text-sm font-semibold text-[#00A8E8] hover:underline"
          >
            Kataloqa qayıt
          </Link>
        </div>
      )}

      {query && filteredProducts !== undefined && total > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
      )}
    </div>
  );
}
