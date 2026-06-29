import { useCallback, useState } from "react";
import { message } from "antd";
import type { AuthUser } from "../db/types";
import { AuthError, login, sendOtp, verifyOtp } from "../services/authService";

export function useLoginFlow(onSuccess?: (user: AuthUser) => void) {
  const [phone, setPhone] = useState("");
  const [displayPhone, setDisplayPhone] = useState("");
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const handleSendOtp = useCallback(async (phoneValue: string) => {
    setSendingOtp(true);
    try {
      const result = await sendOtp(phoneValue);
      setPhone(phoneValue);
      setDisplayPhone(result.displayPhone);
      setOtpModalOpen(true);
      message.success(`Kod ${result.displayPhone} nömrəsinə göndərildi`);
    } catch (error) {
      message.error(error instanceof AuthError ? error.message : "Xəta baş verdi");
    } finally {
      setSendingOtp(false);
    }
  }, []);

  const handleVerifyOtp = useCallback(
    async (otp: string) => {
      setVerifyingOtp(true);
      try {
        await verifyOtp(phone, otp);
        setOtpModalOpen(false);
        setOtpVerified(true);
        message.success("Nömrə doğrulandı");
      } catch (error) {
        message.error(error instanceof AuthError ? error.message : "OTP doğrulanmadı");
      } finally {
        setVerifyingOtp(false);
      }
    },
    [phone],
  );

  const handleResendOtp = useCallback(async () => {
    if (!phone) return;
    await handleSendOtp(phone);
  }, [phone, handleSendOtp]);

  const handleLogin = useCallback(
    async (password: string) => {
      setLoggingIn(true);
      try {
        const user = await login(phone, password);
        message.success(`Xoş gəldiniz, ${user.name}!`);
        onSuccess?.(user);
      } catch (error) {
        message.error(error instanceof AuthError ? error.message : "Daxil olmaq mümkün olmadı");
      } finally {
        setLoggingIn(false);
      }
    },
    [phone, onSuccess],
  );

  const resetToPhone = useCallback(() => {
    setOtpModalOpen(false);
    setOtpVerified(false);
    setPhone("");
    setDisplayPhone("");
  }, []);

  const changePhone = useCallback(() => {
    setOtpModalOpen(false);
    setOtpVerified(false);
  }, []);

  return {
    phone,
    displayPhone,
    otpModalOpen,
    otpVerified,
    sendingOtp,
    verifyingOtp,
    loggingIn,
    setOtpModalOpen,
    handleSendOtp,
    handleVerifyOtp,
    handleResendOtp,
    handleLogin,
    resetToPhone,
    changePhone,
  };
}
