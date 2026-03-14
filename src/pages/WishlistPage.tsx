import {useState} from "react";
import WishlistTitle from "../components/Wishlist/WishlistTitle.tsx";
import WishlistFilter from "../components/Wishlist/WishlistFilter.tsx";
import WishlistProduct from "../components/Wishlist/WishlistProduct.tsx";
import WishlistReturnShipping from "../components/Wishlist/WishlistReturnShipping.tsx";

export default function WishlistPage() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    return (
        <section className="min-h-screen bg-linear-to-b from-slate-50 to-white py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
                    <WishlistTitle/>
                    <WishlistFilter viewMode={viewMode} setViewMode={setViewMode}/>
                </div>
                <WishlistProduct viewMode={viewMode}/>
                <WishlistReturnShipping/>
            </div>
        </section>
    );
}