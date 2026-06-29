import { Checkbox } from "antd";

interface Props {
  checked: boolean;
  indeterminate: boolean;
  onChange: (checked: boolean) => void;
  selectedCount: number;
  totalCount: number;
}

export default function SelectAll({
  checked,
  indeterminate,
  onChange,
  selectedCount,
  totalCount,
}: Props) {
  if (totalCount === 0) return null;

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        onChange={(e) => onChange(e.target.checked)}
        className="text-brand-dark font-medium"
      >
        Hamısını seç
      </Checkbox>
      <span className="text-sm text-gray-500 tabular-nums">
        {selectedCount} / {totalCount}
      </span>
    </div>
  );
}
