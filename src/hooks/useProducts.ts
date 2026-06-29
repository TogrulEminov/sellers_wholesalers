import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import type { ProductRecord } from "../db/types";
import { ALL_CATEGORIES } from "../data/searchParams";
import { productMatchesQuery } from "../repositories/productRepository";

export function useProducts(category: string | null): ProductRecord[] | undefined {
  return useLiveQuery(async () => {
    if (!category || category === ALL_CATEGORIES) {
      return db.products.toArray();
    }
    return db.products.where("unit").equals(category).toArray();
  }, [category]);
}

export function useProductCount(category: string | null): number | undefined {
  return useLiveQuery(async () => {
    if (!category || category === ALL_CATEGORIES) {
      return db.products.count();
    }
    return db.products.where("unit").equals(category).count();
  }, [category]);
}

export function useProductSearch(query: string): ProductRecord[] | undefined {
  const normalized = query.trim();

  return useLiveQuery(async () => {
    if (!normalized) return [];
    const products = await db.products.toArray();
    return products.filter((product) => productMatchesQuery(product, normalized));
  }, [normalized]);
}
