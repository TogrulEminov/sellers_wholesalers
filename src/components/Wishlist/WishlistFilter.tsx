import type { SetStateAction } from "react";
import { LuLayoutList } from "react-icons/lu";
import { BsGrid3X3, BsTrash2 } from "react-icons/bs";
import { Button, Select } from "antd";
import { formatUnitLabel, ALL_CATEGORIES } from "../../data/searchParams";
import type { WishlistSort } from "../../hooks/useWishlist";

const sortOptions = [
  { value: "newest", label: "Ən yeni" },
  { value: "price_asc", label: "Qiymət: aşağıdan yuxarı" },
  { value: "price_desc", label: "Qiymət: yuxarıdan aşağı" },
  { value: "name_asc", label: "Ad: A-Z" },
  { value: "name_desc", label: "Ad: Z-A" },
];

interface Props {
  setViewMode: React.Dispatch<SetStateAction<"list" | "grid">>;
  viewMode: "list" | "grid";
  unitFilter: string;
  sortBy: WishlistSort;
  unitOptions: { value: string; label: string }[];
  itemCount: number;
  onUnitChange: (value: string) => void;
  onSortChange: (value: WishlistSort) => void;
  onClearWishlist: () => void;
}

export default function WishlistFilter({
  setViewMode,
  viewMode,
  unitFilter,
  sortBy,
  unitOptions,
  itemCount,
  onUnitChange,
  onSortChange,
  onClearWishlist,
}: Props) {
  const categoryOptions = [
    { value: ALL_CATEGORIES, label: "Bütün vahidlər" },
    ...unitOptions.map((opt) => ({
      value: opt.value,
      label: formatUnitLabel(opt.value),
    })),
  ];

  if (itemCount === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
      <Select
        value={unitFilter}
        onChange={onUnitChange}
        options={categoryOptions}
        className="w-full sm:w-44"
        disabled={unitOptions.length === 0}
      />

      <Select
        value={sortBy}
        onChange={onSortChange}
        options={sortOptions}
        className="w-full sm:w-48"
      />

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-colors cursor-pointer ${
              viewMode === "grid" ? "bg-white text-[#00A8E8]" : "text-gray-400"
            }`}
            aria-label="Grid"
          >
            <BsGrid3X3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-colors cursor-pointer ${
              viewMode === "list" ? "bg-white text-[#00A8E8]" : "text-gray-400"
            }`}
            aria-label="List"
          >
            <LuLayoutList className="w-4 h-4" />
          </button>
        </div>

        <Button
          type="text"
          danger
          icon={<BsTrash2 />}
          onClick={onClearWishlist}
          className="h-10 px-3 rounded-lg"
        >
          Təmizlə
        </Button>
      </div>
    </div>
  );
}
