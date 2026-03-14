import {Checkbox} from "antd";
import {BsTrash2} from "react-icons/bs";
import QuantityInput from "../Basket/QuantityInput.tsx";

export interface CartItem {
    id: string | number;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
    sku?: string;
}

interface Props {
    item: CartItem;
}

export default function ProductBasketCard({item}: Props) {
    return (
        <div
            className="group bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:border-slate-200"
        >
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">

                <div className="flex items-start gap-4">
                    <Checkbox className="mt-1"/>
                    <div
                        className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-2">
                                {item.name}
                            </h3>
                            <p className="text-sm text-slate-500 mb-2 line-clamp-1">
                                {item.description}
                            </p>
                            {item.sku && (
                                <span className="text-xs text-slate-400 font-mono">
                                    SKU: {item.sku}
                                </span>
                            )}

                            <div className="mt-2 flex items-center gap-2">
                                <span
                                    className={`w-2 h-2 rounded-full ${item.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}/>
                                <span className="text-xs text-slate-500">
                                    {item.stock > 5 ? 'Stokda var' : `Yalnız ${item.stock} ədəd qaldı`}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-3">
                            <div className="text-right">
                                <div className="text-xl font-bold text-sky-600">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <div className="text-sm text-slate-400">
                                    ${item.price.toFixed(2)} / ədəd
                                </div>
                            </div>
                            <QuantityInput/>
                        </div>
                    </div>
                </div>
                <div
                    className="flex md:flex-col items-center justify-between md:justify-start gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                        className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-300"
                        title="Sil"
                    >
                        <BsTrash2 className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </div>
    );
}