import { db } from "../db";
import type { UnitRecord } from "../db/types";

export async function getAllUnits(): Promise<UnitRecord[]> {
  const units = await db.units.toArray();
  return units.sort((a, b) => a.name.localeCompare(b.name));
}
