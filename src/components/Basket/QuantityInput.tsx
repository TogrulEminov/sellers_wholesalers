import {useState} from "react";
import {BiMinus, BiPlus} from "react-icons/bi";

interface Props {
    initialQuantity?: number;
    min?: number;
    max?: number;
    onChange?: (quantity: number) => void;
}

export default function QuantityInput({
                                          initialQuantity = 1,
                                          min = 1,
                                          max = 99,
                                          onChange
                                      }: Props) {
    const [count, setCount] = useState(initialQuantity);

    const handleIncrement = () => {
        if (count < max) {
            const newCount = count + 1;
            setCount(newCount);
            onChange?.(newCount);
        }
    };

    const handleDecrement = () => {
        if (count > min) {
            const newCount = count - 1;
            setCount(newCount);
            onChange?.(newCount);
        }
    };

    return (
        <div className="flex items-center gap-3">
            {/* Azaltma düyməsi */}
            <button
                onClick={handleDecrement}
                disabled={count <= min}
                className="w-10 h-10 rounded-xl border-2 border-slate-200 flex items-center justify-center text-slate-600
                           hover:border-[#00A8E8] hover:text-[#00A8E8] active:bg-slate-50
                           disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                <BiMinus className="w-4 h-4"/>
            </button>

            {/* Miqdar */}
            <span className="w-12 text-center font-bold text-slate-900 text-lg select-none">
                {count}
            </span>
            <button
                onClick={handleIncrement}
                disabled={count >= max}
                className="w-10 h-10 rounded-xl border-2 border-slate-200 flex items-center justify-center text-slate-600
                           hover:border-[#00A8E8] hover:text-[#00A8E8] active:bg-slate-50
                           disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                <BiPlus className="w-4 h-4"/>
            </button>
        </div>
    );
}