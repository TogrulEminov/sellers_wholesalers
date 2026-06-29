import { useState } from "react";
import { message, Modal } from "antd";
import WishlistTitle from "../components/Wishlist/WishlistTitle.tsx";
import WishlistFilter from "../components/Wishlist/WishlistFilter.tsx";
import WishlistProduct from "../components/Wishlist/WishlistProduct.tsx";
import WishlistReturnShipping from "../components/Wishlist/WishlistReturnShipping.tsx";
import { ALL_CATEGORIES } from "../data/searchParams";
import { useWishlistUnitOptions } from "../hooks/useWishlist";
import type { WishlistSort } from "../hooks/useWishlist";
import { useWishlistCount, useWishlistStore } from "../stores/useWishlistStore";

export default function WishlistPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [unitFilter, setUnitFilter] = useState(ALL_CATEGORIES);
  const [sortBy, setSortBy] = useState<WishlistSort>("newest");

  const itemCount = useWishlistCount();
  const unitOptions = useWishlistUnitOptions();
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  const handleClearWishlist = () => {
    Modal.confirm({
      title: "İstək siyahısını təmizləmək istəyirsiniz?",
      content: "Bütün seçilmiş məhsullar siyahıdan silinəcək.",
      okText: "Təmizlə",
      cancelText: "Ləğv et",
      okButtonProps: { danger: true },
      onOk: () => {
        clearWishlist();
        setUnitFilter(ALL_CATEGORIES);
        message.success("İstək siyahısı təmizləndi");
      },
    });
  };

  return (
    <section className="min-h-screen py-8 md:py-12">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <WishlistTitle itemCount={itemCount} />
          <WishlistFilter
            viewMode={viewMode}
            setViewMode={setViewMode}
            unitFilter={unitFilter}
            sortBy={sortBy}
            unitOptions={unitOptions}
            itemCount={itemCount}
            onUnitChange={setUnitFilter}
            onSortChange={setSortBy}
            onClearWishlist={handleClearWishlist}
          />
        </div>

        <WishlistProduct viewMode={viewMode} unitFilter={unitFilter} sortBy={sortBy} />
        <WishlistReturnShipping />
      </div>
    </section>
  );
}
