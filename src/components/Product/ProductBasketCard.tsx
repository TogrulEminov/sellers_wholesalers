import { Checkbox } from "antd";
import { BsTrash2 } from "react-icons/bs";
import type { CartItemWithProduct } from "../../db/types";
import { formatUnitLabel } from "../../data/searchParams";
import QuantityInput from "../Basket/QuantityInput.tsx";

interface Props {
  item: CartItemWithProduct;
  selected: boolean;
  onSelectChange: (checked: boolean) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

function formatPrice(price: number, currency: string): string {
  const symbol = currency === "USD" ? "$" : currency;
  return `${symbol}${price.toFixed(2)}`;
}

export default function ProductBasketCard({
  item,
  selected,
  onSelectChange,
  onQuantityChange,
  onRemove,
}: Props) {
  const { product, quantity } = item;
  const meta = [product.group, product.brand].filter(Boolean).join(" · ");

  return (
    <article
      className={`rounded-lg border bg-white transition-colors duration-200
        ${selected ? "border-[#00A8E8]" : "border-gray-200"}`}
    >
      <div className="p-4 md:p-5">
        <div className="flex flex-col md:flex-row gap-4 md:gap-5">
          <div className="flex items-start gap-3">
            <Checkbox
              className="mt-1"
              checked={selected}
              onChange={(e) => onSelectChange(e.target.checked)}
            />
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-md bg-[#f8fafc] border border-gray-100 shrink-0 flex flex-col items-center justify-center p-2">
              <span className="font-mono text-[11px] font-bold text-[#003459] text-center leading-tight">
                {product.code}
              </span>
              <span className="text-[9px] mt-1 uppercase tracking-wide text-gray-400 text-center">
                {formatUnitLabel(product.unit)}
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-1">
                  <h3 className="text-base font-semibold text-[#003459] line-clamp-2 flex-1">
                    {product.name}
                  </h3>
                  {selected && (
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-[#00A8E8] bg-[#00A8E8]/8 px-2 py-0.5 rounded">
                      Seçilib
                    </span>
                  )}
                </div>
                {meta && <p className="text-sm text-gray-500 mb-1 line-clamp-1">{meta}</p>}
                <span className="text-xs text-gray-400 font-mono">{product.code}</span>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-3">
                <div className="text-right">
                  <div className="text-lg font-bold text-[#003459]">
                    {formatPrice(product.price * quantity, product.currencyCode)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatPrice(product.price, product.currencyCode)} / {formatUnitLabel(product.unit)}
                  </div>
                </div>
                <QuantityInput
                  value={quantity}
                  onChange={(qty) => onQuantityChange(product.id, qty)}
                />
              </div>
            </div>
          </div>

          <div className="flex md:flex-col items-center justify-end md:justify-start">
            <button
              type="button"
              onClick={() => onRemove(product.id)}
              className="p-2 text-gray-400 hover:text-red-500 rounded-md transition-colors cursor-pointer"
              title="Sil"
            >
              <BsTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
