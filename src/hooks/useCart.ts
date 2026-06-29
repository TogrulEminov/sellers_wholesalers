import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import {
  getCartItemCount,
  getCartItems,
  getCartTotalPrice,
} from "../repositories/cartRepository";
import type { CartItemWithProduct } from "../db/types";

export function useCartItems(): CartItemWithProduct[] | undefined {
  return useLiveQuery(() => getCartItems(), []);
}

export function useCartItemCount(): number | undefined {
  return useLiveQuery(() => getCartItemCount(), []);
}

export function useCartTotalPrice(): number | undefined {
  return useLiveQuery(() => getCartTotalPrice(), []);
}

export function useCartQuantities(): Record<string, number> | undefined {
  return useLiveQuery(async () => {
    const items = await db.cartItems.toArray();
    return Object.fromEntries(items.map((item) => [item.productId, item.quantity]));
  }, []);
}

export function useIsInCart(productId: string): { inCart: boolean; quantity: number } {
  const quantities = useCartQuantities();
  const quantity = quantities?.[productId] ?? 0;
  return { inCart: quantity > 0, quantity };
}
