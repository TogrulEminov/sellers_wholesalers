import { Spin } from "antd";
import { useSearchParams } from "react-router";
import { ALL_GROUPS, normalizeGroupName, SEARCH_PARAMS } from "../../data/searchParams";
import { useProductCountsByGroup, useProductGroups } from "../../hooks/useProductGroups";

interface BadgeProps {
  label: string;
  count: number | string;
  active: boolean;
  onClick: () => void;
}

function GroupBadge({ label, count, active, onClick }: BadgeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border whitespace-nowrap transition-colors cursor-pointer
        ${
          active
            ? "bg-brand-gold text-brand-dark border-brand-gold"
            : "bg-white text-brand-dark border-gray-200 hover:border-brand-gold hover:text-brand-gold"
        }`}
    >
      {label}
      <span
        className={`text-xs tabular-nums ${active ? "text-brand-dark/70" : "text-gray-400"}`}
      >
        {count}
      </span>
    </button>
  );
}

export default function CategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const groups = useProductGroups();
  const counts = useProductCountsByGroup();

  const selected = searchParams.get(SEARCH_PARAMS.group) ?? ALL_GROUPS;

  const setGroup = (group: string) => {
    const next = new URLSearchParams(searchParams);
    if (group === ALL_GROUPS) {
      next.delete(SEARCH_PARAMS.group);
    } else {
      next.set(SEARCH_PARAMS.group, group);
    }
    next.delete(SEARCH_PARAMS.page);
    setSearchParams(next, { replace: true });
  };

  if (groups === undefined) {
    return (
      <div className="flex justify-center py-4 mb-6">
        <Spin size="small" />
      </div>
    );
  }

  return (
    <div className="mb-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
        Qruplar
      </p>
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto category-filter-scroll">
        <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap pb-1">
          <GroupBadge
            label="Hamısı"
            count={counts?.[ALL_GROUPS] ?? "—"}
            active={selected === ALL_GROUPS}
            onClick={() => setGroup(ALL_GROUPS)}
          />
          {groups.map((group) => (
            <GroupBadge
              key={group.name}
              label={group.label}
              count={counts?.[group.name] ?? 0}
              active={normalizeGroupName(selected) === normalizeGroupName(group.name)}
              onClick={() => setGroup(group.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
