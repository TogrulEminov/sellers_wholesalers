import { type MouseEvent } from "react";
import { message } from "antd";
import type { ProductRecord } from "../../db/types";
import { formatMoney } from "../../utils/formatMoney";
import { formatUnitLabel } from "../../data/searchParams";
import { useIsInCart } from "../../hooks/useCart";
import { addToCart } from "../../services/cartService";
import {
  useIsInWishlist,
  useWishlistStore,
} from "../../stores/useWishlistStore";
import { FaCheck, FaHeart, FaShoppingCart } from "react-icons/fa";
import { GiPerfumeBottle } from "react-icons/gi";

interface Props {
  product: ProductRecord;
}

export default function ProductCard({ product }: Props) {
  const groupLabel = product.group ?? null;
  const { inCart } = useIsInCart(product.id);
  const inWishlist = useIsInWishlist(product.id);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

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

  const handleWishlist = (e: MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      toggleWishlist(product);
      message.info(`${product.name} istək siyahısından silindi`);
    } else {
      toggleWishlist(product);
      message.success(`${product.name} istək siyahısına əlavə edildi`);
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border bg-white transition-colors duration-200 cursor-pointer
        ${inCart ? "border-brand-gold/50" : "border-gray-100 hover:border-brand-gold/25"}`}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-brand-sand to-brand-dark/8 flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(26,26,26,0.08) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <GiPerfumeBottle className="relative text-brand-dark/10 group-hover:text-brand-gold/20 transition-colors duration-300 text-[88px]" />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="bg-brand-gold text-brand-dark text-[9.5px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
            {formatUnitLabel(product.unit)}
          </span>
          {product.brand && (
            <span className="bg-brand-dark text-white text-[9.5px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
              {product.brand}
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleWishlist}
            className="w-9 h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:border-red-200 transition-colors cursor-pointer"
            title={
              inWishlist
                ? "İstək siyahısından sil"
                : "İstək siyahısına əlavə et"
            }
          >
            {inWishlist ? (
              <FaHeart className="text-red-500 text-[15px]" />
            ) : (
              <FaHeart className="text-[#aab4be] text-[15px]" />
            )}
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={inCart}
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-200
              ${
                inCart
                  ? "bg-brand-success border-brand-success text-white cursor-default"
                  : "bg-white border-gray-100 hover:border-brand-gold hover:text-brand-gold cursor-pointer"
              }`}
            title={inCart ? "Səbətdədir" : "Səbətə əlavə et"}
          >
            {inCart ? (
              <FaCheck className="text-white! text-[15px]" />
            ) : (
              <FaShoppingCart className="text-[15px] text-brand-muted" />
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-brand-dark font-semibold text-[15px] mb-2 line-clamp-2 group-hover:text-brand-gold transition-colors duration-200">
          {product.name}
        </h3>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center bg-brand-dark/8 text-brand-dark text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full font-mono">
            {product.code}
          </span>
          {inCart && (
            <span className="inline-flex items-center gap-1 bg-brand-success/12 text-brand-success text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              <FaCheck className="text-[10px]" />
              Səbətdədir
            </span>
          )}
        </div>

        {groupLabel && (
          <p className="text-brand-muted text-[11.5px] mb-3 line-clamp-1">
            {groupLabel}
          </p>
        )}

        <div className="h-px bg-brand-border mb-3" />

        <div className="flex items-baseline gap-1.5 mb-4">
          <span className="text-brand-gold font-bold text-[22px] tracking-tight tabular-nums">
            {formatMoney(product.price, product.currencyCode)}
          </span>
          <span className="text-brand-muted text-xs">
            / {formatUnitLabel(product.unit)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={inCart}
          className={`w-full rounded-lg h-11 text-[13px] font-bold transition-colors duration-200 flex items-center justify-center gap-2
            ${
              inCart
                ? "bg-brand-success/12 text-brand-success! cursor-default"
                : "bg-brand-sand hover:bg-brand-gold text-brand-dark hover:text-brand-dark cursor-pointer"
            }`}
        >
          {inCart ? (
            <>
              <FaCheck className="text-[16px]" />
              <span>Səbətdədir</span>
            </>
          ) : (
            <>
              <FaShoppingCart className="text-[16px]" />
              <span>Səbətə əlavə et</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
