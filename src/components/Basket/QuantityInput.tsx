import { BiMinus, BiPlus } from "react-icons/bi";

interface Props {
  value: number;
  min?: number;
  max?: number;
  onChange?: (quantity: number) => void;
}

export default function QuantityInput({ value, min = 1, max = 99, onChange }: Props) {
  const handleIncrement = () => {
    if (value < max) onChange?.(value + 1);
  };

  const handleDecrement = () => {
    if (value > min) onChange?.(value - 1);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="w-8 h-8 rounded-md border border-gray-200 flex items-center justify-center text-gray-600
                   hover:border-brand-gold hover:text-brand-gold
                   disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <BiMinus className="w-3.5 h-3.5" />
      </button>

      <span className="w-8 text-center font-semibold text-brand-dark text-sm tabular-nums select-none">
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className="w-8 h-8 rounded-md border border-gray-200 flex items-center justify-center text-gray-600
                   hover:border-brand-gold hover:text-brand-gold
                   disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <BiPlus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
