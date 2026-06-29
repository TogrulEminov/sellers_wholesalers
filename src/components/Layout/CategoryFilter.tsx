import { Spin } from "antd";
import { useSearchParams } from "react-router";
import { ALL_CATEGORIES, formatUnitLabel, SEARCH_PARAMS } from "../../data/searchParams";
import { useProductCountsByUnit, useUnits } from "../../hooks/useUnits";

interface BadgeProps {
  label: string;
  count: number | string;
  active: boolean;
  onClick: () => void;
}

function CategoryBadge({ label, count, active, onClick }: BadgeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border whitespace-nowrap transition-colors cursor-pointer
        ${
          active
            ? "bg-[#00A8E8] text-white border-[#00A8E8]"
            : "bg-white text-[#003459] border-gray-200 hover:border-[#00A8E8] hover:text-[#00A8E8]"
        }`}
    >
      {label}
      <span
        className={`text-xs tabular-nums ${active ? "text-white/75" : "text-gray-400"}`}
      >
        {count}
      </span>
    </button>
  );
}

export default function CategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const units = useUnits();
  const counts = useProductCountsByUnit();

  const selected = searchParams.get(SEARCH_PARAMS.category) ?? ALL_CATEGORIES;

  const setCategory = (category: string) => {
    const next = new URLSearchParams(searchParams);
    if (category === ALL_CATEGORIES) {
      next.delete(SEARCH_PARAMS.category);
    } else {
      next.set(SEARCH_PARAMS.category, category);
    }
    next.delete(SEARCH_PARAMS.page);
    setSearchParams(next, { replace: true });
  };

  if (units === undefined) {
    return (
      <div className="flex justify-center py-4 mb-6">
        <Spin size="small" />
      </div>
    );
  }

  return (
    <div className="mb-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
        Ölçü vahidləri
      </p>
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto category-filter-scroll">
        <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap pb-1">
          <CategoryBadge
            label="Hamısı"
            count={counts?.[ALL_CATEGORIES] ?? "—"}
            active={selected === ALL_CATEGORIES}
            onClick={() => setCategory(ALL_CATEGORIES)}
          />
          {units.map((unit) => (
            <CategoryBadge
              key={unit.name}
              label={formatUnitLabel(unit.name)}
              count={counts?.[unit.name] ?? 0}
              active={selected === unit.name}
              onClick={() => setCategory(unit.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
