import type { AuthUser, CustomerRecord, OrderRecord } from "../db/types";
import { formatMoney, formatOrderDate } from "../data/orderLabels";
import { formatUnitLabel } from "../data/searchParams";

export interface InvoiceViewModel {
  fileName: string;
  orderNumber: string;
  orderDate: string;
  issuedAt: string;
  customerName: string;
  customerCode: string;
  customerGroup: string;
  customerDepartment: string;
  customerPhone: string;
  items: OrderRecord["items"];
  totalAmount: string;
  currencyCode: string;
}

export function buildInvoiceViewModel(
  order: OrderRecord,
  user: AuthUser,
  customer?: CustomerRecord | null,
): InvoiceViewModel {
  const issuedAt = order.invoice?.issuedAt ?? order.createdAt;
  const recipientName =
    `${customer?.name ?? ""} ${customer?.lastName ?? ""}`.trim() || user.name;

  return {
    fileName: order.invoice?.fileName ?? `${order.orderNumber}.pdf`,
    orderNumber: order.orderNumber,
    orderDate: formatOrderDate(order.createdAt),
    issuedAt: formatOrderDate(issuedAt),
    customerName: recipientName,
    customerCode: user.code,
    customerGroup: user.group,
    customerDepartment: user.department,
    customerPhone: user.phone,
    items: order.items,
    totalAmount: formatMoney(order.totalAmount, order.currencyCode),
    currencyCode: order.currencyCode,
  };
}

export function getInvoicePrintHtml(invoice: InvoiceViewModel): string {
  const rows = invoice.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #e5e7eb;font-family:monospace;font-size:12px;">${item.productCode}</td>
        <td style="padding:8px;border-bottom:1px solid #e5e7eb;font-size:12px;">${item.productName}</td>
        <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:center;font-size:12px;">${item.quantity} ${formatUnitLabel(item.unit)}</td>
        <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right;font-size:12px;">${formatMoney(item.price, invoice.currencyCode)}</td>
        <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right;font-size:12px;font-weight:600;">${formatMoney(item.price * item.quantity, invoice.currencyCode)}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="az">
<head>
  <meta charset="UTF-8" />
  <title>${invoice.fileName}</title>
  <style>
    body { font-family: Arial, sans-serif; color: #003459; margin: 32px; }
    h1 { margin: 0 0 4px; font-size: 22px; }
    .muted { color: #6b7280; font-size: 13px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th { text-align: left; font-size: 11px; text-transform: uppercase; color: #6b7280; padding: 8px; border-bottom: 2px solid #003459; }
    .total { margin-top: 16px; text-align: right; font-size: 18px; font-weight: bold; color: #00A8E8; }
  </style>
</head>
<body>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;">
    <div>
      <h1>BulkTrade</h1>
      <div class="muted">B2B topdan satış · Faktura</div>
    </div>
    <div style="text-align:right;">
      <div style="font-weight:700;font-size:16px;">Sifariş fakturası</div>
      <div class="muted">${invoice.fileName}</div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:8px;">
    <div style="background:#f8fafc;padding:12px;border-radius:8px;">
      <div class="muted">Müştəri</div>
      <div style="font-weight:600;">${invoice.customerName}</div>
      <div class="muted">${invoice.customerCode} · ${invoice.customerGroup}</div>
      <div class="muted">${invoice.customerDepartment}</div>
    </div>
    <div style="background:#f8fafc;padding:12px;border-radius:8px;text-align:right;">
      <div class="muted">Sifariş</div>
      <div style="font-weight:600;">${invoice.orderNumber}</div>
      <div class="muted">${invoice.orderDate}</div>
      <div class="muted" style="margin-top:4px;">Verilmə tarixi: ${invoice.issuedAt}</div>
    </div>
  </div>
  <table>
    <thead>
      <tr>
        <th>Kod</th>
        <th>Məhsul</th>
        <th style="text-align:center;">Miqdar</th>
        <th style="text-align:right;">Qiymət</th>
        <th style="text-align:right;">Cəmi</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="total">Ümumi: ${invoice.totalAmount}</div>
</body>
</html>`;
}

export function openInvoicePdf(
  order: OrderRecord,
  user: AuthUser,
  customer?: CustomerRecord | null,
): void {
  const invoice = buildInvoiceViewModel(order, user, customer);
  const html = getInvoicePrintHtml(invoice);
  const tab = window.open("", "_blank", "noopener,noreferrer");
  if (!tab) return;

  tab.document.write(html);
  tab.document.close();
}
