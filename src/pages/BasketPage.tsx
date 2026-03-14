import BasketTotalApply from "../components/Basket/BasketTotalApply.tsx";
import BasketTitle from "../components/Basket/BasketTitle.tsx";
import SelectAll from "../components/Basket/SelectAll.tsx";
import ReturnShipping from "../components/Basket/ReturnShipping.tsx";
import BasketGrid from "../components/Basket/BasketGrid.tsx";

export default function BasketPage() {


    return (
        <section className="min-h-screen bg-linear-to-b from-slate-50 to-white py-8 md:py-16">
            <div className="container mx-auto">
                <BasketTitle/>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                        <SelectAll/>
                        <BasketGrid/>
                        <ReturnShipping/>
                    </div>
                    <BasketTotalApply/>
                </div>
            </div>
        </section>
    );
}