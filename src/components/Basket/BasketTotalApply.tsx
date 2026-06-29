import { BiPackage } from "react-icons/bi";
import { AiFillTruck } from "react-icons/ai";
import { Button, Divider } from "antd";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  selectedCount: number;
  selectedTotal: number;
  onCompleteOrder: () => void;
  loading?: boolean;
}

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
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
          <h3 className="text-base font-semibold text-[#003459] mb-5 flex items-center gap-2">
            <BiPackage className="w-4 h-4 text-[#00A8E8]" />
            Sifariş xülasəsi
          </h3>

          <div className="space-y-3 mb-5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Seçilmiş</span>
              <span className="font-medium text-[#003459] tabular-nums">{selectedCount} ədəd</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Ara cəmi</span>
              <span className="font-medium text-[#003459] tabular-nums">{formatPrice(selectedTotal)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span className="flex items-center gap-1.5">
                <AiFillTruck className="w-3.5 h-3.5" />
                Çatdırılma
              </span>
              <span className="font-medium text-[#00D4AA]">Pulsuz</span>
            </div>

            <Divider className="my-3!" />

            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-[#003459]">Cəmi</span>
              <span className="text-xl font-bold text-[#00A8E8] tabular-nums">{formatPrice(selectedTotal)}</span>
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            block
            loading={loading}
            disabled={selectedCount === 0}
            onClick={onCompleteOrder}
            className="h-12 rounded-lg font-semibold bg-[#00A8E8] hover:bg-[#0096D1]! border-none"
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
