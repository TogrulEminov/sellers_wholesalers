import { db } from "../db";
import type { CartItemRecord, CartItemWithProduct } from "../db/types";

export async function getCartItems(): Promise<CartItemWithProduct[]> {
  const items = await db.cartItems.orderBy("addedAt").reverse().toArray();
  const result: CartItemWithProduct[] = [];

  for (const item of items) {
    const product = await db.products.get(item.productId);
    if (product) {
      result.push({
        product,
        quantity: item.quantity,
        addedAt: item.addedAt,
      });
    }
  }

  return result;
}

export async function getCartItemCount(): Promise<number> {
  return db.cartItems.count();
}

export async function getCartTotalPrice(): Promise<number> {
  const items = await getCartItems();
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export async function addCartItem(productId: string, quantity = 1): Promise<boolean> {
  const existing = await db.cartItems.get(productId);

  if (existing) {
    return false;
  }

  const record: CartItemRecord = {
    productId,
    quantity,
    addedAt: Date.now(),
  };
  await db.cartItems.put(record);
  return true;
}

export async function updateCartItemQuantity(
  productId: string,
  quantity: number,
): Promise<void> {
  if (quantity <= 0) {
    await db.cartItems.delete(productId);
    return;
  }
  await db.cartItems.update(productId, { quantity });
}

export async function removeCartItem(productId: string): Promise<void> {
  await db.cartItems.delete(productId);
}

export async function clearCart(): Promise<void> {
  await db.cartItems.clear();
}
