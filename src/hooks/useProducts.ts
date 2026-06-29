import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import type { ProductRecord } from "../db/types";
import { ALL_GROUPS } from "../data/searchParams";
import { productMatchesGroup } from "../data/groupLabels";
import { productMatchesQuery } from "../repositories/productRepository";

export function useProducts(group: string | null): ProductRecord[] | undefined {
  return useLiveQuery(async () => {
    const products = await db.products.toArray();
    if (!group || group === ALL_GROUPS) {
      return products;
    }
    return products.filter((product) => productMatchesGroup(product.group, group));
  }, [group]);
}

export function useProductCount(group: string | null): number | undefined {
  return useLiveQuery(async () => {
    const products = await db.products.toArray();
    if (!group || group === ALL_GROUPS) {
      return products.length;
    }
    return products.filter((product) => productMatchesGroup(product.group, group)).length;
  }, [group]);
}

export function useProductSearch(query: string): ProductRecord[] | undefined {
  const normalized = query.trim();

  return useLiveQuery(async () => {
    if (!normalized) return [];
    const products = await db.products.toArray();
    return products.filter((product) => productMatchesQuery(product, normalized));
  }, [normalized]);
}
