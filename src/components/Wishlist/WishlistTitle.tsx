import {HeartFilled} from "@ant-design/icons";

interface WishlistTitleProps {
    itemCount?: number;
    className?: string;
}

export default function WishlistTitle({
                                          itemCount = 10,
                                          className = ""
                                      }: WishlistTitleProps) {
    return (
        <div className={`group ${className}`}>
            <div className="flex items-center gap-4">
                {/* Icon Container */}
                <div className="relative">
                    {/* Animated background pulse - primary color */}
                    <div className="absolute inset-0 bg-[#00A8E8] rounded-2xl animate-pulse opacity-20"/>
                    <div
                        className="relative w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#00A8E8]/20 to-[#00A8E8]/5 rounded-2xl shadow-lg shadow-[#00A8E8]/20 border border-[#00A8E8]/20">
                        <HeartFilled
                            className="text-2xl text-[#00A8E8] drop-shadow-sm transition-transform duration-300"
                        />
                        <div
                            className="absolute -top-1 -right-1 w-5 h-5 bg-[#00A8E8] rounded-full flex items-center justify-center shadow-md">
                            <HeartFilled className="text-[10px] text-white"/>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                        Seçilmişlər
                    </h1>

                    <div className="flex items-center gap-2 mt-1.5">
                        <span
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#00A8E8]/10 text-[#00A8E8]">
                            {itemCount} məhsul
                        </span>
                        <span className="text-slate-400 text-sm">siyahıdadır</span>
                    </div>
                </div>
            </div>
        </div>
    );
}