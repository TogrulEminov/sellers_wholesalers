import type { SetStateAction } from "react";
import { LuLayoutList, LuSlidersHorizontal } from "react-icons/lu";
import { BsGrid3X3, BsTrash2 } from "react-icons/bs";
import { Button, Select, Badge } from "antd";
import { useState } from "react";

const categoriesOptions = [
    { value: "all", label: "Bütün Kateqoriyalar" },
    { value: "electronics", label: "Elektronika" },
    { value: "tools", label: "Alətlər" },
    { value: "furniture", label: "Mebel" },
    { value: "office_supplies", label: "Ofis Ləvazimatları" }
];

const sortOptions = [
    { value: "newest", label: "Ən Yeni" },
    { value: "price_asc", label: "Qiymət: Ucuzdan Bahaya" },
    { value: "price_desc", label: "Qiymət: Bahadan Ucuza" },
    { value: "name_asc", label: "Ad: A-Z" },
    { value: "name_desc", label: "Ad: Z-A" }
];

interface Props {
    setViewMode: React.Dispatch<SetStateAction<"list" | "grid">>;
    viewMode: "list" | "grid";
    selectedCount?: number;
    onClear?: () => void;
    onCategoryChange?: (value: string) => void;
    onSortChange?: (value: string) => void;
    activeFilters?: number;
}

export default function WishlistFilter({
                                           setViewMode,
                                           viewMode,
                                           selectedCount = 0,
                                           onClear,
                                           onCategoryChange,
                                           onSortChange,
                                           activeFilters = 0
                                       }: Props) {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        onCategoryChange?.(value);
    };

    const handleSortChange = (value: string) => {
        setSortBy(value);
        onSortChange?.(value);
    };

    const handleClear = () => {
        setSelectedCategory("all");
        setSortBy("newest");
        onClear?.();
    };

    return (
        <div className="lg:max-w-3xl w-full space-y-3">
            {/* Main Filter Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 bg-white p-3 lg:p-4 rounded-2xl shadow-sm border border-slate-200/60">

                {/* Left Section: Category & Sort */}
                <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">

                    {/* Category Select */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00A8E8]/10 shrink-0">
                            <LuSlidersHorizontal className="w-4 h-4 text-[#00A8E8]" />
                        </div>
                        <Select
                            placeholder="Kateqoriya"
                            options={categoriesOptions}
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="w-full"
                            popupClassName="rounded-xl"
                            suffixIcon={null}
                        />
                    </div>

                    {/* Divider - Desktop */}
                    <div className="hidden lg:block w-px h-10 bg-slate-200" />

                    {/* Sort Select */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Select
                            placeholder="Sırala"
                            options={sortOptions}
                            value={sortBy}
                            onChange={handleSortChange}
                            className="w-full"
                            popupClassName="rounded-xl"
                        />
                    </div>
                </div>

                {/* Divider - Desktop */}
                <div className="hidden lg:block w-px h-10 bg-slate-200" />

                {/* Right Section: View Toggle & Clear */}
                <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
                        <button
                            type="button"
                            onClick={() => setViewMode("grid")}
                            className={`p-2.5 rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-2 ${
                                viewMode === "grid"
                                    ? "bg-white text-[#00A8E8] shadow-sm"
                                    : "text-slate-400 hover:text-slate-600"
                            }`}
                            aria-label="Grid view"
                        >
                            <BsGrid3X3 className="w-4 h-4" />
                            <span className={`text-sm font-medium ${viewMode === "grid" ? "block" : "hidden sm:block"}`}>
                                Grid
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode("list")}
                            className={`p-2.5 rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-2 ${
                                viewMode === "list"
                                    ? "bg-white text-[#00A8E8] shadow-sm"
                                    : "text-slate-400 hover:text-slate-600"
                            }`}
                            aria-label="List view"
                        >
                            <LuLayoutList className="w-4 h-4" />
                            <span className={`text-sm font-medium ${viewMode === "list" ? "block" : "hidden sm:block"}`}>
                                List
                            </span>
                        </button>
                    </div>

                    {/* Clear Button - Desktop */}
                    <Button
                        type="text"
                        danger
                        icon={<BsTrash2 className="w-4 h-4" />}
                        onClick={handleClear}
                        className="hidden lg:flex items-center gap-2 h-10 px-4 rounded-xl hover:bg-rose-50"
                    >
                        Təmizlə
                    </Button>

                    {/* Mobile Filter Toggle */}
                    <button
                        type="button"
                        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors relative"
                    >
                        <LuSlidersHorizontal className="w-5 h-5" />
                        {activeFilters > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00A8E8] text-white text-xs rounded-full flex items-center justify-center font-bold">
                                {activeFilters}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Expanded Filters */}
            {isMobileFiltersOpen && (
                <div className="lg:hidden bg-white p-4 rounded-2xl shadow-lg border border-slate-200 space-y-3 animate-in slide-in-from-top-2">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900">Filtrlər</span>
                        <button
                            onClick={() => setIsMobileFiltersOpen(false)}
                            className="text-slate-400 hover:text-slate-600"
                        >
                            ✕
                        </button>
                    </div>

                    {selectedCategory !== "all" && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500">Kateqoriya:</span>
                            <Badge className="bg-[#00A8E8]/10 text-[#00A8E8] px-3 py-1 rounded-full">
                                {categoriesOptions.find(c => c.value === selectedCategory)?.label}
                            </Badge>
                        </div>
                    )}

                    <Button
                        type="primary"
                        danger
                        block
                        icon={<BsTrash2 className="w-4 h-4" />}
                        onClick={handleClear}
                        className="h-11 rounded-xl bg-rose-500 hover:bg-rose-600"
                    >
                        Bütün filtrləri təmizlə
                    </Button>
                </div>
            )}

            {/* Active Filters Bar */}
            {(selectedCategory !== "all" || selectedCount > 0) && (
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-slate-500">Aktiv filtrlər:</span>

                    {selectedCategory !== "all" && (
                        <button
                            onClick={() => handleCategoryChange("all")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00A8E8]/10 text-[#00A8E8] rounded-full text-sm font-medium hover:bg-[#00A8E8]/20 transition-colors"
                        >
                            {categoriesOptions.find(c => c.value === selectedCategory)?.label}
                            <span className="text-lg leading-none">×</span>
                        </button>
                    )}

                    {selectedCount > 0 && (
                        <span className="inline-flex items-center px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm">
                            {selectedCount} məhsul seçildi
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}