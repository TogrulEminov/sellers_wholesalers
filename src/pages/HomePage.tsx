import { Button } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router";
import { ProductGrid } from "../components/Product/ProductGrid";
import { useSidebar } from "../context/SidebarContext";
import { ALL_CATEGORIES, formatUnitLabel, SEARCH_PARAMS } from "../data/searchParams";

export default function HomePage() {
  const { openMobile } = useSidebar();
  const [searchParams] = useSearchParams();
  const category = searchParams.get(SEARCH_PARAMS.category) ?? ALL_CATEGORIES;

  const pageTitle =
    category === ALL_CATEGORIES ? "Məhsul kataloqu" : formatUnitLabel(category);

  const pageSubtitle =
    category === ALL_CATEGORIES
      ? "Topdan satış · yağlar, qablar və aksesuarlar"
      : `${formatUnitLabel(category)} vahidi üzrə məhsullar`;

  return (
    <div className="container py-6 lg:py-8">
      <div className="flex items-start flex-col sm:flex-row sm:justify-between mb-8 gap-4">
        <div>
          <p className="text-[#00A8E8] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            Kataloq
          </p>
          <h1 className="text-[#003459] font-bold text-2xl lg:text-3xl mb-1">{pageTitle}</h1>
          <p className="text-gray-500 text-sm">{pageSubtitle}</p>
        </div>
        <Button
          icon={<AppstoreOutlined />}
          onClick={openMobile}
          className="lg:hidden flex items-center gap-2 border border-gray-200 bg-white text-[#003459] hover:border-[#00A8E8] hover:text-[#00A8E8] rounded-lg h-10 px-4 w-full sm:w-fit font-semibold text-sm shrink-0"
        >
          Kateqoriyalar
        </Button>
      </div>

      <ProductGrid />
    </div>
  );
}
