import type { OrderStatus } from "../db/types";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Gözləyir",
  confirmed: "Təsdiqlənib",
  shipped: "Yoldadır",
  delivered: "Çatdırılıb",
  cancelled: "Ləğv edilib",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-brand-sand text-brand-copper border-brand-border",
  shipped: "bg-blue-100 text-blue-800 border-blue-200",
  delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

export function formatOrderDate(timestamp: number): string {
  return new Intl.DateTimeFormat("az-AZ", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(timestamp));
}

export function formatMoney(amount: number, currency: string): string {
  const symbol = currency === "USD" ? "$" : currency;
  return `${symbol}${amount.toFixed(2)}`;
}
