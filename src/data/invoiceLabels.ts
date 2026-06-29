import type { OrderRecord } from "../db/types";

export function buildDefaultInvoice(
  orderNumber: string,
  createdAt: number,
): OrderRecord["invoice"] {
  const suffix = orderNumber.replace(/\s/g, "-");
  return {
    fileName: `${suffix}.pdf`,
    issuedAt: createdAt,
  };
}

export function getOrderInvoice(order: OrderRecord): OrderRecord["invoice"] | null {
  return order.invoice ?? null;
}
