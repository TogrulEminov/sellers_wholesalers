import React from "react";
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useWishlistStore } from "../../stores/useWishlistStore";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 hover:border-[#00A8E8]/30 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00A8E8]/10 cursor-pointer">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          alt={product.name}
          src={product.image}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-[#00A8E8] text-white text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded">
          {product.category}
        </span>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute cursor-pointer duration-300 transition-all top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110"
        >
          {inWishlist ? (
            <HeartFilled className="text-red-500 text-base" />
          ) : (
            <HeartOutlined className="text-gray-400 text-base group-hover:text-red-400 transition-colors duration-200" />
          )}
        </button>

        {/* Quick add button - slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button className="w-full bg-white/95 cursor-alias backdrop-blur text-[#003459] hover:bg-[#00A8E8] hover:text-white! rounded-lg h-10 font-semibold shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
            <ShoppingCartOutlined />
            <span>Səbətə əlavə et</span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-[#003459] font-semibold text-base mb-1 line-clamp-1 group-hover:text-[#00A8E8] transition-colors duration-200">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-xs mb-3 line-clamp-1">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-3">
          <span className="text-[#00A8E8] font-bold text-xl">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-gray-400 text-[10px] ml-2">
            / {product.unit}
          </span>
        </div>

        {/* Min order info */}
        <p className="text-gray-400 text-[10px] mb-3">
          Min. sifariş:{" "}
          <span className="text-gray-600 font-medium">
            {product.minOrderQuantity} {product.unit}
          </span>
        </p>

        {/* Main CTA Button */}
        <button
          type="button"
          className="w-full bg-[#003459] hover:bg-[#00A8E8] cursor-pointer duration-300 transform-colors text-white! rounded-xl h-12 text-sm font-bold shadow-md shadow-[#003459]/20 hover:shadow-lg hover:shadow-[#00A8E8]/30 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingCartOutlined className="text-current!" />
          <span className="text-current!">Sifariş ver</span>
        </button>
      </div>
    </div>
  );
};
