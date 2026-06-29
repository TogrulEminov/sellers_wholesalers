export const SEARCH_PARAMS = {
  group: "group",
  page: "page",
  query: "query",
} as const;

export const ALL_GROUPS = "all";

export { formatGroupLabel, normalizeGroupName, productMatchesGroup } from "./groupLabels";

export function formatUnitLabel(name: string): string {
  const labels: Record<string, string> = {
    EDED: "Ədəd",
    KAROBKA: "Karobka",
    QRAM: "Qram",
    LITR: "Litrl",
    PACKA: "Packa",
  };
  return labels[name] ?? name;
}

/** @deprecated use ALL_GROUPS */
export const ALL_CATEGORIES = ALL_GROUPS;
