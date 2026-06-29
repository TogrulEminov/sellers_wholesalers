import { db } from "../db";
import type { CartItemWithProduct, OrderRecord } from "../db/types";
import { buildDefaultInvoice } from "../data/invoiceLabels";

function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const suffix = String(Date.now()).slice(-4);
  return `SIF-${year}-${suffix}`;
}

export async function createOrderFromCart(
  customerId: string,
  items: CartItemWithProduct[],
): Promise<OrderRecord> {
  const orderItems = items.map((item) => ({
    productCode: item.product.code,
    productName: item.product.name,
    quantity: item.quantity,
    unit: item.product.unit,
    price: item.product.price,
  }));

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const orderNumber = generateOrderNumber();
  const createdAt = Date.now();

  const order: OrderRecord = {
    id: `ord-${Date.now()}`,
    customerId,
    orderNumber,
    status: "pending",
    totalAmount,
    currencyCode: items[0]?.product.currencyCode ?? "USD",
    itemCount: orderItems.length,
    items: orderItems,
    createdAt,
    invoice: buildDefaultInvoice(orderNumber, createdAt),
  };

  await db.orders.add(order);
  return order;
}
