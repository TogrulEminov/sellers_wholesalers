import { FiExternalLink } from "react-icons/fi";
import type { AuthUser, CustomerRecord, OrderRecord } from "../../db/types";
import { getOrderInvoice } from "../../data/invoiceLabels";
import { openInvoicePdf } from "../../services/invoiceService";

interface Props {
  order: OrderRecord;
  user: AuthUser;
  customer?: CustomerRecord | null;
}

export default function OrderInvoiceActions({ order, user, customer }: Props) {
  const invoice = getOrderInvoice(order);
  if (!invoice) return null;

  return (
    <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/60 flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
        Faktura
      </span>
      <button
        type="button"
        onClick={() => openInvoicePdf(order, user, customer)}
        className="inline-flex items-center gap-1.5 text-sm text-[#00A8E8] hover:text-[#0096D1] hover:underline cursor-pointer"
      >
        <FiExternalLink className="w-3.5 h-3.5 shrink-0" />
        <span>Fakturaya bax</span>
        <span className="text-gray-400 font-mono text-xs">({invoice.fileName})</span>
      </button>
    </div>
  );
}
