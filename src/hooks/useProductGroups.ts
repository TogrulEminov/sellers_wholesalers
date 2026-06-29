import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import { ALL_GROUPS } from "../data/searchParams";
import {
  formatGroupLabel,
  productMatchesGroup,
} from "../data/groupLabels";
import { getCatalogGroups } from "../repositories/groupRepository";

export interface ProductGroupOption {
  name: string;
  label: string;
}

export function useProductGroups(): ProductGroupOption[] | undefined {
  return useLiveQuery(async () => {
    const groups = await getCatalogGroups();
    return groups.map((group) => ({
      name: group.name,
      label: formatGroupLabel(group.name),
    }));
  }, []);
}

export function useProductCountsByGroup(): Record<string, number> | undefined {
  return useLiveQuery(async () => {
    const [products, groups] = await Promise.all([
      db.products.toArray(),
      getCatalogGroups(),
    ]);

    const counts: Record<string, number> = { [ALL_GROUPS]: products.length };

    for (const group of groups) {
      counts[group.name] = products.filter((product) =>
        productMatchesGroup(product.group, group.name),
      ).length;
    }

    return counts;
  }, []);
}

export function filterProductsByGroup<T extends { group: string | null }>(
  products: T[],
  group: string,
): T[] {
  if (group === ALL_GROUPS) return products;
  return products.filter((product) => productMatchesGroup(product.group, group));
}
