import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { Empty, Pagination, Spin } from "antd";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../components/Product/ProductCard";
import { mainPath } from "../data/constant";
import { SEARCH_PARAMS } from "../data/searchParams";
import { useProductSearch } from "../hooks/useProducts";

const PAGE_SIZE = 9;

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SEARCH_PARAMS.query)?.trim() ?? "";
  const page = Math.max(1, Number(searchParams.get(SEARCH_PARAMS.page) ?? "1"));

  const products = useProductSearch(query);

  const { paginatedProducts, total } = useMemo(() => {
    if (!products) return { paginatedProducts: [], total: 0 };
    const start = (page - 1) * PAGE_SIZE;
    return {
      total: products.length,
      paginatedProducts: products.slice(start, start + PAGE_SIZE),
    };
  }, [products, page]);

  const setPage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    if (nextPage <= 1) {
      next.delete(SEARCH_PARAMS.page);
    } else {
      next.set(SEARCH_PARAMS.page, String(nextPage));
    }
    setSearchParams(next, { replace: true });
  };

  return (
    <section className="py-6 lg:py-8">
      <div className="container">
        <div className="mb-6">
          <p className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">
            Axtarış
          </p>
          {query ? (
            <>
              <h1 className="text-brand-dark font-bold text-2xl lg:text-3xl mb-1">
                &ldquo;{query}&rdquo; üzrə nəticələr
              </h1>
              <p className="text-gray-500 text-sm">
                {products === undefined
                  ? "Axtarılır..."
                  : total === 0
                    ? "Heç bir məhsul tapılmadı"
                    : `${total} məhsul tapıldı`}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-brand-dark font-bold text-2xl lg:text-3xl mb-1">
                Məhsul axtarışı
              </h1>
              <p className="text-gray-500 text-sm">
                Ad, kod, brend və ya qrup üzrə axtarın
              </p>
            </>
          )}
        </div>

        {!query && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-lg bg-brand-sand flex items-center justify-center mb-4">
              <FaSearch className="w-7 h-7 text-brand-gold" />
            </div>
            <p className="text-gray-500 mb-2">Axtarış sorğusu daxil edin</p>
            <p className="text-gray-400 text-sm max-w-md">
              Yuxarıdakı axtarış sahəsindən məhsul adı, kodu, brendi və ya qrupu
              yazın
            </p>
          </div>
        )}

        {query && products === undefined && (
          <div className="flex items-center justify-center h-96">
            <Spin size="large" />
          </div>
        )}

        {query && products !== undefined && total === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Empty
              description={
                <span className="text-gray-500">
                  &ldquo;{query}&rdquo; sorğusuna uyğun məhsul tapılmadı
                </span>
              }
              className="[&_.ant-empty-description]:text-gray-400"
            />
            <Link
              to={mainPath.home.main}
              className="mt-6 text-sm font-semibold text-brand-gold hover:underline"
            >
              Kataloqa qayıt
            </Link>
          </div>
        )}

        {query && products !== undefined && total > 0 && (
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
        )}
      </div>
    </section>
  );
}
