import { useSearchParams } from "react-router";
import { ProductGrid } from "../components/Product/ProductGrid";
import CategoryFilter from "../components/Layout/CategoryFilter";
import PageHero from "../components/Layout/PageHero";
import { ALL_GROUPS, formatGroupLabel, SEARCH_PARAMS } from "../data/searchParams";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const group = searchParams.get(SEARCH_PARAMS.group) ?? ALL_GROUPS;

  const pageTitle =
    group === ALL_GROUPS ? "Məhsul kataloqu" : formatGroupLabel(group);

  const pageSubtitle =
    group === ALL_GROUPS
      ? "Topdan satış · yağlar, qablar və aksesuarlar"
      : `${formatGroupLabel(group)} qrupu üzrə məhsullar`;

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      {group === ALL_GROUPS && (
        <PageHero
          title="Parfumeriya və aksesuar topdan satışı"
          subtitle="Kataloqumuzdakı bütün məhsullar topdan satış qiymətləri ilə hesabınıza bağlıdır."
        />
      )}

      <div className="mb-6">
        <p className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">
          Kataloq
        </p>
        <h1 className="text-brand-dark font-bold text-2xl lg:text-3xl mb-1">{pageTitle}</h1>
        <p className="text-gray-500 text-sm">{pageSubtitle}</p>
      </div>

      <CategoryFilter />
      <ProductGrid />
    </div>
  );
}
