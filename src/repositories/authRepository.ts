import { db } from "../db";
import type { OtpRecord, SessionRecord } from "../db/types";

const SESSION_ID = "current";
const OTP_TTL_MS = 5 * 60 * 1000;

export async function saveOtp(record: Omit<OtpRecord, "expiresAt">): Promise<void> {
  const otp: OtpRecord = {
    ...record,
    expiresAt: Date.now() + OTP_TTL_MS,
  };
  await db.otpCodes.put(otp);
}

export async function getValidOtp(phoneNormalized: string): Promise<OtpRecord | undefined> {
  const otp = await db.otpCodes.get(phoneNormalized);
  if (!otp || otp.expiresAt < Date.now()) {
    if (otp) {
      await db.otpCodes.delete(phoneNormalized);
    }
    return undefined;
  }
  return otp;
}

export async function deleteOtp(phoneNormalized: string): Promise<void> {
  await db.otpCodes.delete(phoneNormalized);
}

export async function createSession(
  session: Omit<SessionRecord, "id" | "loggedInAt">,
): Promise<void> {
  const record: SessionRecord = {
    id: SESSION_ID,
    ...session,
    loggedInAt: Date.now(),
  };
  await db.sessions.put(record);
}

export async function getCurrentSession(): Promise<SessionRecord | undefined> {
  return db.sessions.get(SESSION_ID);
}

export async function clearSession(): Promise<void> {
  await db.sessions.delete(SESSION_ID);
}
