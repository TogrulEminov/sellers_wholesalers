import type { ProductRecord } from "../db/types";
import {
  addCartItem,
  clearCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../repositories/cartRepository";

export async function addToCart(product: ProductRecord, quantity = 1): Promise<boolean> {
  return addCartItem(product.id, quantity);
}

export async function removeFromCart(productId: string): Promise<void> {
  await removeCartItem(productId);
}

export async function updateQuantity(productId: string, quantity: number): Promise<void> {
  await updateCartItemQuantity(productId, quantity);
}

export async function clearBasket(): Promise<void> {
  await clearCart();
}
