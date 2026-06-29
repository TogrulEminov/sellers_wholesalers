import type { GroupRecord } from "./types";
import groupJson from "../json/Group.json";

interface GroupJsonRow {
  Id: number;
  Name: string;
  Module: string;
  IsWebVisible: number | null;
}

export const SEED_GROUPS: GroupRecord[] = (groupJson.Group as GroupJsonRow[]).map(
  (group) => ({
    id: group.Id,
    name: group.Name.trim(),
    module: group.Module,
    isWebVisible: group.IsWebVisible ?? 0,
  }),
);
