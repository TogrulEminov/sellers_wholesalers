export function formatMoney(amount: number, currency = "AZN"): string {
  const code = currency.toUpperCase();
  if (code === "AZN") {
    return `${amount.toFixed(2)} ₼`;
  }
  if (code === "USD") {
    return `$${amount.toFixed(2)}`;
  }
  return `${amount.toFixed(2)} ${code}`;
}
