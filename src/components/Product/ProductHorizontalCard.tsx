import { type MouseEvent } from "react";
import {
  CheckCircleFilled,
  HeartFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import type { ProductRecord } from "../../db/types";
import { formatUnitLabel } from "../../data/searchParams";
import { useIsInCart } from "../../hooks/useCart";
import { addToCart } from "../../services/cartService";
import { useWishlistStore } from "../../stores/useWishlistStore";

interface Props {
  product: ProductRecord;
}

function formatPrice(price: number, currency: string): string {
  const symbol = currency === "USD" ? "$" : currency;
  return `${symbol}${price.toFixed(2)}`;
}

export default function ProductHorizontalCard({ product }: Props) {
  const { inCart } = useIsInCart(product.id);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const meta = [product.group, product.brand].filter(Boolean).join(" · ");

  const handleAddToCart = async (e: MouseEvent) => {
    e.stopPropagation();
    if (inCart) return;

    try {
      const added = await addToCart(product);
      if (added) {
        message.success(`${product.name} səbətə əlavə edildi`);
      }
    } catch {
      message.error("Səbətə əlavə edilə bilmədi");
    }
  };

  const handleRemove = (e: MouseEvent) => {
    e.stopPropagation();
    removeFromWishlist(product.id);
    message.info(`${product.name} istək siyahısından silindi`);
  };

  return (
    <article className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-36 md:w-40 shrink-0 aspect-4/3 sm:aspect-auto sm:min-h-[140px] bg-[#f8fafc] border-b sm:border-b-0 sm:border-r border-gray-100 flex flex-col items-center justify-center p-4">
          <span className="font-mono text-xs font-bold text-[#003459]">{product.code}</span>
          <span className="text-[10px] text-gray-400 mt-1 uppercase">{formatUnitLabel(product.unit)}</span>
        </div>

        <div className="flex-1 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-[#003459] font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
            {meta && <p className="text-xs text-gray-500 line-clamp-1">{meta}</p>}
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="text-right">
              <div className="text-lg font-bold text-[#00A8E8] tabular-nums">
                {formatPrice(product.price, product.currencyCode)}
              </div>
              <div className="text-[10px] text-gray-400">/ {formatUnitLabel(product.unit)}</div>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="p-2 text-red-400 hover:text-red-500 rounded-md transition-colors cursor-pointer"
              title="İstək siyahısından sil"
            >
              <HeartFilled className="text-base" />
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={inCart}
              className={`h-10 px-4 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors
                ${
                  inCart
                    ? "bg-gray-50 text-[#00A8E8] border border-[#00A8E8]/30 cursor-default"
                    : "bg-[#00A8E8] hover:bg-[#0096D1] text-white cursor-pointer"
                }`}
            >
              {inCart ? (
                <>
                  <CheckCircleFilled />
                  Səbətdədir
                </>
              ) : (
                <>
                  <ShoppingCartOutlined />
                  Səbətə əlavə et
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
