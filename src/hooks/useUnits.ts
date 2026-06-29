import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import type { UnitRecord } from "../db/types";
import { ALL_CATEGORIES } from "../data/searchParams";
import { getAllUnits } from "../repositories/unitRepository";

export function useUnits(): UnitRecord[] | undefined {
  return useLiveQuery(() => getAllUnits(), []);
}

export function useProductCountsByUnit(): Record<string, number> | undefined {
  return useLiveQuery(async () => {
    const products = await db.products.toArray();
    const counts: Record<string, number> = { [ALL_CATEGORIES]: products.length };

    for (const product of products) {
      counts[product.unit] = (counts[product.unit] ?? 0) + 1;
    }

    return counts;
  }, []);
}
