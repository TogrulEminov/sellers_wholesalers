import {BiPackage} from "react-icons/bi";
import {AiFillTruck} from "react-icons/ai";
import {Button, Divider} from "antd";
import {FaArrowRight} from "react-icons/fa";
import {BsShieldCheck} from "react-icons/bs";

export default function BasketTotalApply() {
    return (
        <div className="lg:w-96">
            <div className="sticky top-8 space-y-4">

                <div
                    className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <BiPackage className="w-5 h-5 text-sky-500"/>
                        Sifariş Xülasəsi
                    </h3>

                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-slate-600">
                            <span>Ara cəmi</span>
                            <span className="font-medium">0.00 ₼</span>
                        </div>

                        <div className="flex justify-between text-slate-600">
                                        <span className="flex items-center gap-2">
                                            <AiFillTruck className="w-4 h-4"/>
                                            Çatdırılma
                                        </span>
                            <span className="font-medium text-emerald-600">Pulsuz</span>
                        </div>

                        <Divider className="my-4"/>

                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-slate-900">Ümumi cəmi</span>
                            <span className="text-2xl font-bold text-sky-600">0.00 ₼</span>
                        </div>
                    </div>

                    <Button
                        type="primary"
                        size="large"
                        block
                        className="h-14 rounded-xl text-base font-bold bg-sky-500 hover:bg-sky-600 shadow-lg"
                    >
                                    <span className="flex items-center justify-center gap-2">
                                        Sifarişi Tamamla
                                        <FaArrowRight className="w-5 h-5"/>
                                    </span>
                    </Button>

                    <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                        <BsShieldCheck className="w-3 h-3"/>
                        Təhlükəsiz ödəniş sistemi
                    </p>
                </div>

                {/* Üstünlüklər */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        {icon: AiFillTruck, label: "Sürətli Çatdırılma"},
                        {icon: BsShieldCheck, label: "Təhlükəsiz Ödəniş"},
                        {icon: BiPackage, label: "Asan Qaytarma"}
                    ].map((badge, idx) => (
                        <div key={idx}
                             className="bg-white rounded-xl p-3 text-center border border-slate-100">
                            <badge.icon className="w-6 h-6 text-sky-500 mx-auto mb-2"/>
                            <span className="text-xs text-slate-600 font-medium">{badge.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
