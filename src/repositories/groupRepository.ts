import { db } from "../db";
import type { GroupRecord } from "../db/types";
import { isCatalogGroup } from "../data/groupLabels";

export async function getAllGroups(): Promise<GroupRecord[]> {
  return db.groups.orderBy("id").toArray();
}

export async function getCatalogGroups(): Promise<GroupRecord[]> {
  const groups = await getAllGroups();
  return groups.filter(isCatalogGroup);
}
