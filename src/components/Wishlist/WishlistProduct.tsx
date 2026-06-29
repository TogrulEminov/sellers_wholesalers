import ProductHorizontalCard from "../Product/ProductHorizontalCard.tsx";
import ProductCard from "../Product/ProductCard.tsx";
import { useFilteredWishlistItems } from "../../hooks/useWishlist";
import type { WishlistSort } from "../../hooks/useWishlist";
import { ALL_CATEGORIES } from "../../data/searchParams";
import { Link } from "react-router";
import { mainPath } from "../../data/constant";
import { FaHeart } from "react-icons/fa";

interface Props {
  viewMode: "list" | "grid";
  unitFilter: string;
  sortBy: WishlistSort;
}

export default function WishlistProduct({ viewMode, unitFilter, sortBy }: Props) {
  const items = useFilteredWishlistItems(unitFilter, sortBy);

  if (items.length === 0) {
    const isFiltered = unitFilter !== ALL_CATEGORIES;

    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-brand-sand rounded-xl flex items-center justify-center mb-4">
          <FaHeart className="size-7 text-brand-gold/40" />
        </div>
        <h3 className="text-lg font-semibold text-brand-dark mb-2">
          {isFiltered ? "Bu filtrə uyğun məhsul yoxdur" : "Siyahı boşdur"}
        </h3>
        <p className="text-gray-500 text-sm max-w-md mb-6">
          {isFiltered
            ? "Başqa vahid seçin və ya filtri təmizləyin"
            : "Bəyəndiyiniz məhsulları ürək ikonu ilə istək siyahısına əlavə edin"}
        </p>
        {!isFiltered && (
          <Link
            to={mainPath.home.main}
            className="text-sm font-semibold text-brand-gold hover:underline"
          >
            Kataloqa keç
          </Link>
        )}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-4 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1"
      }`}
    >
      {items.map((item) =>
        viewMode === "grid" ? (
          <ProductCard key={item.product.id} product={item.product} />
        ) : (
          <ProductHorizontalCard key={item.product.id} product={item.product} />
        ),
      )}
    </div>
  );
}
