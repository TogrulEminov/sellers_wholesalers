import { DEMO_OTP } from "../db/customerSeedData";
import type { AuthUser, CustomerRecord } from "../db/types";
import {
  clearSession,
  createSession,
  deleteOtp,
  getCurrentSession,
  getValidOtp,
  saveOtp,
} from "../repositories/authRepository";
import {
  findCustomerByPhone,
  getCustomerById,
  verifyCustomerPassword,
} from "../repositories/customerRepository";
import { formatPhoneDisplay, isValidPhoneInput, normalizePhone } from "../utils/phone";

function mapCustomerToAuthUser(customer: CustomerRecord, phone: string): AuthUser {
  return {
    id: customer.id,
    code: customer.code,
    name: `${customer.name.trim()} ${customer.lastName.trim()}`,
    phone,
    group: customer.group,
    department: customer.department,
  };
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export async function sendOtp(phone: string): Promise<{ displayPhone: string }> {
  if (!isValidPhoneInput(phone)) {
    throw new AuthError("Düzgün telefon nömrəsi daxil edin (məs: 055 375 85 00)");
  }

  const customer = await findCustomerByPhone(phone);
  if (!customer) {
    throw new AuthError("Bu nömrə sistemdə qeydiyyatda deyil");
  }

  if (customer.isActive !== 1) {
    throw new AuthError("Hesabınız aktiv deyil. Satış nümayəndəsi ilə əlaqə saxlayın");
  }

  const phoneNormalized = normalizePhone(phone);

  await saveOtp({
    phoneNormalized,
    code: DEMO_OTP,
    customerId: customer.id,
  });

  return {
    displayPhone: formatPhoneDisplay(phoneNormalized),
  };
}

export async function verifyOtp(phone: string, otp: string): Promise<void> {
  const phoneNormalized = normalizePhone(phone);
  const record = await getValidOtp(phoneNormalized);

  if (!record) {
    throw new AuthError("OTP kodunun vaxtı bitib. Yenidən göndərin");
  }

  if (record.code !== otp.trim()) {
    throw new AuthError("OTP kodu yanlışdır");
  }
}

export async function login(phone: string, password: string): Promise<AuthUser> {
  const phoneNormalized = normalizePhone(phone);
  const otp = await getValidOtp(phoneNormalized);

  if (!otp) {
    throw new AuthError("OTP doğrulaması tələb olunur");
  }

  const customer = await getCustomerById(otp.customerId);
  if (!customer) {
    throw new AuthError("İstifadəçi tapılmadı");
  }

  const isValidPassword = await verifyCustomerPassword(customer.id, password);
  if (!isValidPassword) {
    throw new AuthError("Şifrə yanlışdır");
  }

  await createSession({
    customerId: customer.id,
    phone: formatPhoneDisplay(phoneNormalized),
    phoneNormalized,
  });

  await deleteOtp(phoneNormalized);

  return mapCustomerToAuthUser(customer, formatPhoneDisplay(phoneNormalized));
}

export async function logout(): Promise<void> {
  await clearSession();
}

export async function getAuthState(): Promise<{
  isAuthenticated: boolean;
  user: AuthUser | null;
}> {
  const session = await getCurrentSession();
  if (!session) {
    return { isAuthenticated: false, user: null };
  }

  const customer = await getCustomerById(session.customerId);
  if (!customer || customer.isActive !== 1) {
    await clearSession();
    return { isAuthenticated: false, user: null };
  }

  return {
    isAuthenticated: true,
    user: mapCustomerToAuthUser(customer, session.phone),
  };
}
