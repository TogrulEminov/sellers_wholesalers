import type { UpdateProfileInput } from "../db/profileTypes";
import type { CustomerRecord } from "../db/types";
import { updateSessionPhone } from "../repositories/authRepository";
import {
  getCustomerById,
  updateCustomerPassword,
  updateCustomerProfile,
  verifyCustomerPassword,
} from "../repositories/customerRepository";
import { formatPhoneDisplay } from "../utils/phone";

export class ProfileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProfileError";
  }
}

export async function saveCustomerProfile(
  customerId: string,
  input: UpdateProfileInput,
): Promise<CustomerRecord> {
  try {
    const updated = await updateCustomerProfile(customerId, input);

    const displayPhone = updated.phone ?? updated.mobilePhone;
    const normalized = updated.phoneNormalized ?? updated.mobileNormalized;

    if (displayPhone && normalized) {
      await updateSessionPhone(displayPhone, normalized);
    }

    return updated;
  } catch (error) {
    throw new ProfileError(error instanceof Error ? error.message : "Profil yenilənmədi");
  }
}

export async function changeCustomerPassword(
  customerId: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  if (newPassword.length < 6) {
    throw new ProfileError("Yeni şifrə ən azı 6 simvol olmalıdır");
  }

  const isValid = await verifyCustomerPassword(customerId, currentPassword);
  if (!isValid) {
    throw new ProfileError("Cari şifrə yanlışdır");
  }

  await updateCustomerPassword(customerId, newPassword);
}

export async function getCustomerProfile(
  customerId: string,
): Promise<CustomerRecord | undefined> {
  return getCustomerById(customerId);
}

export function getProfileFormValues(customer: CustomerRecord) {
  return {
    name: customer.name.trim(),
    lastName: customer.lastName.trim(),
    phone: customer.phone ?? "",
    mobilePhone: customer.mobilePhone ?? "",
    birthDate: customer.birthDate ?? "",
  };
}

export function formatProfilePhone(customer: CustomerRecord): string {
  const phone = customer.phone ?? customer.mobilePhone;
  if (phone) return phone;

  const normalized = customer.phoneNormalized ?? customer.mobileNormalized;
  return normalized ? formatPhoneDisplay(normalized) : "—";
}
