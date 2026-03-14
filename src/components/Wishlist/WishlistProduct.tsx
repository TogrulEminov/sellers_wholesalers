import ProductHorizontalCard from "../Product/ProductHorizontalCard.tsx";
import ProductCard from "../Product/ProductCard.tsx";
import type {Product} from "../../types";
import {HeartFilled} from "@ant-design/icons";
import {mockProducts} from "../../data/mockProducts.ts";

interface Props {
    viewMode: "list" | "grid";
}

export default function WishlistProduct({viewMode}: Props) {
    return (
        <>
            {mockProducts.length > 0 ? (
                <div className={`grid gap-6 ${
                    viewMode === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        : "grid-cols-1 lg:grid-cols-2"
                }`}>
                    {mockProducts.map((item: Product) => {
                            return viewMode === "grid" ? <ProductCard
                                    product={item}
                                    key={item.id}
                                />
                                : <ProductHorizontalCard product={item}
                                                         key={item.id}/>
                        }
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <HeartFilled className="w-10 h-10 text-slate-300"/>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        Siyahı boşdur
                    </h3>
                    <p className="text-slate-500 max-w-md">
                        Hələ heç bir məhsulu seçilmişlərə əlavə etməmisiniz. Bəyəndiyiniz məhsulları burada görə
                        bilərsiniz.
                    </p>
                </div>
            )}
        </>
    );
}
