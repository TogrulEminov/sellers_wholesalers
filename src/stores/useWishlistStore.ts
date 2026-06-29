import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductRecord } from "../db/types";

export interface WishlistItem {
  product: ProductRecord;
  addedAt: number;
}

interface WishlistState {
  items: WishlistItem[];
  addToWishlist: (product: ProductRecord) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: ProductRecord) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) => {
        if (get().isInWishlist(product.id)) return;
        set((state) => ({
          items: [...state.items, { product, addedAt: Date.now() }],
        }));
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.product.id === productId);
      },

      toggleWishlist: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeFromWishlist(product.id);
        } else {
          get().addToWishlist(product);
        }
      },

      clearWishlist: () => set({ items: [] }),
    }),
    { name: "sellers-wishlist" },
  ),
);

export function useIsInWishlist(productId: string): boolean {
  return useWishlistStore((state) =>
    state.items.some((item) => item.product.id === productId),
  );
}

export function useWishlistCount(): number {
  return useWishlistStore((state) => state.items.length);
}
