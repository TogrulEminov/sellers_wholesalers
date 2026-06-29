import { useSearchParams } from "react-router";
import { ProductGrid } from "../components/Product/ProductGrid";
import CategoryFilter from "../components/Layout/CategoryFilter";
import { ALL_CATEGORIES, formatUnitLabel, SEARCH_PARAMS } from "../data/searchParams";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get(SEARCH_PARAMS.category) ?? ALL_CATEGORIES;

  const pageTitle =
    category === ALL_CATEGORIES ? "Məhsul kataloqu" : formatUnitLabel(category);

  const pageSubtitle =
    category === ALL_CATEGORIES
      ? "Topdan satış · yağlar, qablar və aksesuarlar"
      : `${formatUnitLabel(category)} vahidi üzrə məhsullar`;

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="mb-6">
        <p className="text-[#00A8E8] text-xs font-bold uppercase tracking-[0.2em] mb-2">
          Kataloq
        </p>
        <h1 className="text-[#003459] font-bold text-2xl lg:text-3xl mb-1">{pageTitle}</h1>
        <p className="text-gray-500 text-sm">{pageSubtitle}</p>
      </div>

      <CategoryFilter />
      <ProductGrid />
    </div>
  );
}
