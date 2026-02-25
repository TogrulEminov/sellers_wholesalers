import { create } from "zustand";
import type { Product, WishlistItem } from "../types";

interface WishlistState {
  items: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],

  addToWishlist: (product) => {
    set((state) => ({
      items: [...state.items, { product, addedAt: new Date() }],
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
}));
