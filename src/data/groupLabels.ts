import type { GroupRecord } from "../db/types";

export const CATALOG_GROUP_MODULE = "STOK";

export function normalizeGroupName(name: string | null | undefined): string {
  return (name ?? "").trim().toUpperCase();
}

export function isCatalogGroup(group: GroupRecord): boolean {
  return group.module === CATALOG_GROUP_MODULE && group.isWebVisible === 1;
}

export function formatGroupLabel(name: string): string {
  const labels: Record<string, string> = {
    YAGLAR: "Yağlar",
    QABLAR: "Qablar",
    DIFFUZERLER: "Diffuzorlar",
    DIGER: "Digər",
  };
  return labels[normalizeGroupName(name)] ?? name.trim();
}

export function productMatchesGroup(
  productGroup: string | null,
  filterGroup: string,
): boolean {
  return normalizeGroupName(productGroup) === normalizeGroupName(filterGroup);
}
