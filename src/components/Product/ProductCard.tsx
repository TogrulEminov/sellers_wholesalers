import {HeartFilled, HeartOutlined, ShoppingCartOutlined, ShoppingOutlined} from "@ant-design/icons";
import type {Product} from "../../types";

interface Props {
    product: Product,
    inWishlist?: boolean,
    toggleWishlist?: (product:Product) => void,
    inStock?: boolean
}

export default function ProductCard({product, inStock = true, toggleWishlist, inWishlist}: Props) {
    return (
        <div className={`group relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 ease-out
      ${inStock
            ? "border-gray-100 hover:border-[#00A8E8]/30  hover:shadow-[#00A8E8]/12 cursor-pointer"
            : "border-gray-100 opacity-70 cursor-not-allowed"
        }`}
        >
            <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                <img
                    alt={product.name}
                    src={product.image}
                    loading={"lazy"}
                    width={400}
                    className={`w-full h-full object-cover transition-transform duration-500 ease-out ${inStock ? "group-hover:scale-[1.07]" : ""}`}
                />
                <div
                    className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"/>
                <span
                    className="absolute top-3 left-3 bg-[#00A8E8] text-white text-[9.5px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
          {product.category}
        </span>
                <div className={`absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-wider text-white backdrop-blur-sm
          ${inStock ? "bg-emerald-500/88" : "bg-red-500/88"}`}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0"/>
                    {inStock ? "Stokda var" : "Stokda yox"}
                </div>
                {!inStock && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="bg-red-500/90 text-white text-xs font-bold px-5 py-2 rounded-xl tracking-wide">
              Stokda yoxdur
            </span>
                    </div>
                )}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist?.(product);
                        }}
                        disabled={!inStock}
                        className="w-8.5 h-8.5 bg-white/93 backdrop-blur rounded-full flex items-center justify-center shadow-md
              hover:scale-110 hover:bg-white transition-all duration-200 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
                        title="İstək siyahısına əlavə et"
                    >
                        {inWishlist
                            ? <HeartFilled className="text-red-500 text-[15px]"/>
                            :
                            <HeartOutlined className="text-[#aab4be] text-[15px] hover:text-red-400 transition-colors"/>
                        }
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); /* quick basket logic */
                        }}
                        disabled={!inStock}
                        className="w-8.5 h-8.5 bg-white/93 backdrop-blur rounded-full flex items-center justify-center shadow-md
              hover:bg-[#00A8E8] hover:scale-110 transition-all duration-200 cursor-pointer group/qb
              disabled:opacity-45 disabled:cursor-not-allowed"
                        title="Səbətə əlavə et"
                    >
                        <ShoppingCartOutlined
                            className="text-[#8b9aa8] text-[15px] group-hover/qb:text-white transition-colors duration-200"/>
                    </button>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-[#003459] font-semibold text-[15px] mb-1 line-clamp-1 group-hover:text-[#00A8E8] transition-colors duration-200">
                    {product.name}
                </h3>
                <p className="text-gray-400 text-[11.5px] mb-3 line-clamp-1 leading-relaxed">
                    {product.description}
                </p>


                <div className="h-px bg-gray-100 mb-3"/>
                <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-[#00A8E8] font-bold text-[22px] tracking-tight">
            ${product.price.toFixed(2)}
          </span>
                </div>

                <p className="text-gray-300 text-[10.5px] mb-4">
                    Min. sifariş: <span
                    className="text-gray-500 font-semibold">{product.minOrderQuantity} {product.unit}</span>
                </p>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        disabled={!inStock}
                        onClick={(e) => {
                            e.stopPropagation(); /* order logic */
                        }}
                        className="w-11.5 h-11.5 bg-[#003459] text-white! hover:bg-[#00A8E8] rounded-[13px] flex items-center justify-center
              shadow-md shadow-[#003459]/20 hover:shadow-lg hover:shadow-[#00A8E8]/30
              transition-all duration-300 cursor-pointer shrink-0
              disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Sifariş ver"
                    >
                        <ShoppingOutlined className=" text-xl"/>
                    </button>

                    <button
                        type="button"
                        disabled={!inStock}
                        onClick={(e) => {
                            e.stopPropagation(); /* cart logic */
                        }}
                        className="flex-1 bg-[#eef8fd] hover:bg-[#00A8E8] text-[#003459] hover:text-white!
              rounded-[13px] h-11.5 text-[13px] font-bold transition-all duration-300
              flex items-center justify-center gap-2 cursor-pointer
              disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <ShoppingCartOutlined className="text-[16px]"/>
                        <span>Səbətə əlavə et</span>
                    </button>
                </div>
            </div>
        </div>
    );
}