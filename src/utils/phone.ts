export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("994")) {
    return digits;
  }

  if (digits.startsWith("0")) {
    return `994${digits.slice(1)}`;
  }

  if (digits.length === 9) {
    return `994${digits}`;
  }

  return digits;
}

export function formatPhoneDisplay(normalized: string): string {
  if (normalized.startsWith("994") && normalized.length === 12) {
    const local = normalized.slice(3);
    return `+994 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5, 7)} ${local.slice(7)}`;
  }

  return normalized;
}

export function isValidPhoneInput(phone: string): boolean {
  const normalized = normalizePhone(phone);
  return /^994\d{9}$/.test(normalized);
}
