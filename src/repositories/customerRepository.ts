import { db } from "../db";
import type { CustomerRecord } from "../db/types";
import { normalizePhone } from "../utils/phone";

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
