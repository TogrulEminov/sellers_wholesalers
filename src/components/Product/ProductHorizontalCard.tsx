import { Button } from "antd";
import { useState } from "react";
import type { Product } from "../../types";
import { BiHeart } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

interface ProductCardProps {
    product: Product;
    inWishlist?: boolean;
    toggleWishlist?: (product: Product) => void;
    inStock?: boolean;
    onAddToCart?: (product: Product) => void;
}

export default function ProductHorizontalCard({
                                                  product,
                                                  inWishlist = false,
                                                  toggleWishlist,
                                                  inStock = true,
                                                  onAddToCart,
                                              }: ProductCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(inWishlist);

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        toggleWishlist?.(product);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (inStock) {
            onAddToCart?.(product);
        }
    };

    return (
        <div className="group bg-white rounded-2xl border border-slate-100 hover:border-[#00A8E8]/30 hover:shadow-lg hover:shadow-[#00A8E8]/5 transition-all duration-300 overflow-hidden">
            <div className="flex flex-col sm:flex-row h-full">

                {/* Image Section - Fixed height */}
                <div className="relative w-full sm:w-48 md:w-52 flex-shrink-0 aspect-square sm:aspect-auto sm:h-56 overflow-hidden bg-slate-50">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1.5 bg-white/95 backdrop-blur text-xs font-medium text-slate-700 rounded-lg shadow-sm">
                        {product.category}
                    </span>

                    {/* Wishlist Button - Hover'da görünür */}
                    <button
                        onClick={handleWishlistToggle}
                        className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/95 backdrop-blur shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 hover:bg-[#00A8E8] hover:text-white ${
                            isWishlisted ? "opacity-100 bg-rose-50 text-rose-500" : "text-slate-600"
                        }`}
                    >
                        <BiHeart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                    </button>

                    {/* Stock Status - Bottom */}
                    <div className="absolute bottom-3 left-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                            inStock
                                ? "bg-emerald-500 text-white"
                                : "bg-rose-500 text-white"
                        }`}>
                            <span className={`w-1.5 h-1.5 rounded-full bg-white ${inStock ? "animate-pulse" : ""}`} />
                            {inStock ? "STOKDA VAR" : "STOKDA YOXDUR"}
                        </span>
                    </div>
                </div>

                {/* Content Section - Compact */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-h-[200px] sm:min-h-0">
                    <div>
                        {/* Title - Primary color hover */}
                        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-2 group-hover:text-[#00A8E8] transition-colors duration-300 cursor-pointer">
                            {product.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Bottom - Price & Button */}
                    <div className="flex items-end justify-between gap-4 mt-4 pt-4 border-t border-slate-50">
                        <div>
                            <span className="text-2xl font-bold text-slate-900">
                                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                            {inStock && (
                                <p className="text-xs text-emerald-600 font-medium mt-0.5">
                                    Stokda var
                                </p>
                            )}
                        </div>

                        <Button
                            type="primary"
                            icon={<FiShoppingCart className="w-4 h-4" />}
                            onClick={handleAddToCart}
                            disabled={!inStock}
                            className={`h-11 px-5 rounded-xl text-sm font-semibold border-0 transition-all duration-200 ${
                                inStock
                                    ? "bg-[#00A8E8] hover:bg-[#0090c7] hover:shadow-lg hover:shadow-[#00A8E8]/25 hover:-translate-y-0.5"
                                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                            }`}
                        >
                            Səbətə əlavə et
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}