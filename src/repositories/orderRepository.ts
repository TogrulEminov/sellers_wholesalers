import { db } from "../db";
import type { OrderRecord } from "../db/types";

export async function getOrdersByCustomerId(customerId: string): Promise<OrderRecord[]> {
  const orders = await db.orders.where("customerId").equals(customerId).toArray();
  return orders.sort((a, b) => b.createdAt - a.createdAt);
}
