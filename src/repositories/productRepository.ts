import { db } from "../db";
import type { ProductRecord } from "../db/types";
import { formatUnitLabel } from "../data/searchParams";

function normalizeSearchText(value: string): string {
  return value.trim().toLowerCase();
}

export function productMatchesQuery(product: ProductRecord, rawQuery: string): boolean {
  const query = normalizeSearchText(rawQuery);
  if (!query) return false;

  const haystack = [
    product.name,
    product.code,
    product.unit,
    formatUnitLabel(product.unit),
    product.group,
    product.brand,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

export async function searchProducts(query: string): Promise<ProductRecord[]> {
  const normalized = normalizeSearchText(query);
  if (!normalized) return [];

  const products = await db.products.toArray();
  return products.filter((product) => productMatchesQuery(product, normalized));
}

export async function getAllProducts(): Promise<ProductRecord[]> {
  return db.products.toArray();
}

export async function getProductsByUnit(unit: string): Promise<ProductRecord[]> {
  return db.products.where("unit").equals(unit).toArray();
}

export async function getProductById(id: string): Promise<ProductRecord | undefined> {
  return db.products.get(id);
}
