import { useMemo } from "react";
import type { WishlistItem } from "../stores/useWishlistStore";
import { useWishlistStore } from "../stores/useWishlistStore";
import { ALL_CATEGORIES } from "../data/searchParams";

export type WishlistSort = "newest" | "price_asc" | "price_desc" | "name_asc" | "name_desc";

export function useFilteredWishlistItems(
  unitFilter: string,
  sortBy: WishlistSort,
): WishlistItem[] {
  const items = useWishlistStore((state) => state.items);

  return useMemo(() => {
    let filtered =
      unitFilter === ALL_CATEGORIES
        ? items
        : items.filter((item) => item.product.unit === unitFilter);

    filtered = [...filtered];

    switch (sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.product.price - b.product.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.product.price - a.product.price);
        break;
      case "name_asc":
        filtered.sort((a, b) => a.product.name.localeCompare(b.product.name, "az"));
        break;
      case "name_desc":
        filtered.sort((a, b) => b.product.name.localeCompare(a.product.name, "az"));
        break;
      default:
        filtered.sort((a, b) => b.addedAt - a.addedAt);
    }

    return filtered;
  }, [items, unitFilter, sortBy]);
}

export function useWishlistUnitOptions(): { value: string; label: string }[] {
  const items = useWishlistStore((state) => state.items);

  return useMemo(() => {
    const units = [...new Set(items.map((item) => item.product.unit))];
    return units.map((unit) => ({ value: unit, label: unit }));
  }, [items]);
}
