import { BiPackage } from "react-icons/bi";
import { AiFillTruck } from "react-icons/ai";
import { Button, Divider } from "antd";
import { FaArrowRight } from "react-icons/fa";
import { formatMoney } from "../../utils/formatMoney";

interface Props {
  selectedCount: number;
  selectedTotal: number;
  onCompleteOrder: () => void;
  loading?: boolean;
}

export default function BasketTotalApply({
  selectedCount,
  selectedTotal,
  onCompleteOrder,
  loading = false,
}: Props) {
  return (
    <div className="lg:w-80">
      <div className="sticky top-8">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="text-base font-semibold text-brand-dark mb-5 flex items-center gap-2">
            <BiPackage className="w-4 h-4 text-brand-gold" />
            Sifariş xülasəsi
          </h3>

          <div className="space-y-3 mb-5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Seçilmiş</span>
              <span className="font-medium text-brand-dark tabular-nums">{selectedCount} ədəd</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Ara cəmi</span>
              <span className="font-medium text-brand-dark tabular-nums">
                {formatMoney(selectedTotal)}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span className="flex items-center gap-1.5">
                <AiFillTruck className="w-3.5 h-3.5" />
                Çatdırılma
              </span>
              <span className="font-medium text-brand-success">Pulsuz</span>
            </div>

            <Divider className="my-3!" />

            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-brand-dark">Cəmi</span>
              <span className="text-xl font-bold text-brand-gold tabular-nums">
                {formatMoney(selectedTotal)}
              </span>
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            block
            loading={loading}
            disabled={selectedCount === 0}
            onClick={onCompleteOrder}
            className="h-12 rounded-lg font-semibold bg-brand-gold hover:bg-brand-copper! border-none text-brand-dark"
          >
            <span className="flex items-center justify-center gap-2">
              Sifarişi tamamla
              <FaArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
