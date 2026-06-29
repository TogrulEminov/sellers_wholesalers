export const SEARCH_PARAMS = {
  category: "category",
  page: "page",
  query: "query",
} as const;

export const ALL_CATEGORIES = "all";

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
