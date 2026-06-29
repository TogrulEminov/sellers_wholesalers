import { db } from "../db";
import type { UpdateProfileInput } from "../db/profileTypes";
import type { CustomerRecord } from "../db/types";
import { formatPhoneDisplay, isValidPhoneInput, normalizePhone } from "../utils/phone";

export async function findCustomerByPhone(phone: string): Promise<CustomerRecord | undefined> {
  const normalized = normalizePhone(phone);
  const customers = await db.customers.toArray();

  return customers.find(
    (customer) =>
      customer.phoneNormalized === normalized || customer.mobileNormalized === normalized,
  );
}

export async function getCustomerById(id: string): Promise<CustomerRecord | undefined> {
  return db.customers.get(id);
}

export async function verifyCustomerPassword(
  customerId: string,
  password: string,
): Promise<boolean> {
  const credential = await db.customerCredentials.get(customerId);
  return credential?.password === password;
}

export async function updateCustomerPassword(
  customerId: string,
  newPassword: string,
): Promise<void> {
  await db.customerCredentials.put({ customerId, password: newPassword });
}

export async function isPhoneUsedByOtherCustomer(
  phone: string,
  excludeCustomerId: string,
): Promise<boolean> {
  const normalized = normalizePhone(phone);
  const customers = await db.customers.toArray();

  return customers.some(
    (customer) =>
      customer.id !== excludeCustomerId &&
      (customer.phoneNormalized === normalized || customer.mobileNormalized === normalized),
  );
}

export async function updateCustomerProfile(
  customerId: string,
  input: UpdateProfileInput,
): Promise<CustomerRecord> {
  const customer = await getCustomerById(customerId);
  if (!customer) {
    throw new Error("İstifadəçi tapılmadı");
  }

  const phoneTrimmed = input.phone.trim();
  const mobileTrimmed = input.mobilePhone.trim();

  if (!phoneTrimmed && !mobileTrimmed) {
    throw new Error("Ən azı bir telefon nömrəsi tələb olunur");
  }

  let phoneNormalized: string | null = null;
  let mobileNormalized: string | null = null;

  if (phoneTrimmed) {
    if (!isValidPhoneInput(phoneTrimmed)) {
      throw new Error("Düzgün telefon nömrəsi daxil edin");
    }
    phoneNormalized = normalizePhone(phoneTrimmed);
    if (await isPhoneUsedByOtherCustomer(phoneTrimmed, customerId)) {
      throw new Error("Bu telefon nömrəsi başqa müştəriyə aid edilib");
    }
  }

  if (mobileTrimmed) {
    if (!isValidPhoneInput(mobileTrimmed)) {
      throw new Error("Düzgün mobil nömrə daxil edin");
    }
    mobileNormalized = normalizePhone(mobileTrimmed);
    if (await isPhoneUsedByOtherCustomer(mobileTrimmed, customerId)) {
      throw new Error("Bu mobil nömrə başqa müştəriyə aid edilib");
    }
  }

  const updated: CustomerRecord = {
    ...customer,
    name: input.name.trim(),
    lastName: input.lastName.trim(),
    phone: phoneTrimmed ? formatPhoneDisplay(phoneNormalized!) : null,
    mobilePhone: mobileTrimmed ? formatPhoneDisplay(mobileNormalized!) : null,
    phoneNormalized,
    mobileNormalized,
    birthDate: input.birthDate || null,
  };

  await db.customers.put(updated);
  return updated;
}
