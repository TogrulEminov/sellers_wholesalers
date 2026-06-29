import React, { useState } from "react";
import { Button, Input, Form, message } from "antd";
import {
  LockOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { DEMO_OTP, DEMO_PASSWORD } from "../../db/customerSeedData";
import type { AuthUser } from "../../db/types";
import { AuthError, login, sendOtp, verifyOtp } from "../../services/authService";

type LoginStep = "phone" | "otp" | "password";

const STEPS: LoginStep[] = ["phone", "otp", "password"];

const STEP_META = {
  phone: {
    title: "Xoş gəlmisiniz",
    subtitle: "Qeydiyyatda olan telefon nömrənizi daxil edin",
    icon: <PhoneOutlined />,
  },
  otp: {
    title: "SMS doğrulama",
    subtitle: "Telefonunuza göndərilən 6 rəqəmli kodu daxil edin",
    icon: <SafetyOutlined />,
  },
  password: {
    title: "Şifrə ilə daxil ol",
    subtitle: "Hesab şifrənizi daxil edin",
    icon: <LockOutlined />,
  },
};

interface Props {
  onSuccess?: (user: AuthUser) => void;
  variant?: "page" | "modal";
  modalTitle?: string;
}

export default function LoginForm({
  onSuccess,
  variant = "page",
  modalTitle = "Sifariş üçün daxil olun",
}: Props) {
  const [currentStep, setCurrentStep] = useState<LoginStep>("phone");
  const [phone, setPhone] = useState("");
  const [displayPhone, setDisplayPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const stepIndex = STEPS.indexOf(currentStep);
  const isModal = variant === "modal";
  const buttonClass = isModal
    ? "h-12 rounded-lg font-bold text-sm bg-[#003459] hover:bg-[#00A8E8]! border-none shadow-sm mt-2"
    : "h-14 rounded-2xl font-bold text-base bg-[#003459] hover:bg-[#00A8E8]! border-none shadow-lg shadow-[#003459]/20 transition-all duration-300 mt-2";

  const handleSendOTP = async (values: { phone: string }) => {
    setLoading(true);
    try {
      const result = await sendOtp(values.phone);
      setPhone(values.phone);
      setDisplayPhone(result.displayPhone);
      setCurrentStep("otp");
      message.success(`Doğrulama kodu ${result.displayPhone} nömrəsinə göndərildi`);
    } catch (error) {
      message.error(error instanceof AuthError ? error.message : "Xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (values: { otp: string }) => {
    setLoading(true);
    try {
      await verifyOtp(phone, values.otp);
      setCurrentStep("password");
      message.success("Nömrə doğrulandı");
    } catch (error) {
      message.error(error instanceof AuthError ? error.message : "OTP doğrulanmadı");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (values: { password: string }) => {
    setLoading(true);
    try {
      const user = await login(phone, values.password);
      message.success(`Xoş gəldiniz, ${user.name}!`);
      onSuccess?.(user);
    } catch (error) {
      message.error(error instanceof AuthError ? error.message : "Daxil olmaq mümkün olmadı");
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case "phone":
        return (
          <Form onFinish={handleSendOTP} layout="vertical">
            <Form.Item
              name="phone"
              label="Telefon nömrəsi"
              rules={[
                { required: true, message: "Telefon nömrəsi tələb olunur" },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    const digits = String(value).replace(/\D/g, "");
                    if (digits.length >= 9) return Promise.resolve();
                    return Promise.reject(new Error("Düzgün telefon nömrəsi daxil edin"));
                  },
                },
              ]}
            >
              <Input
                size="large"
                placeholder="055 375 85 00"
                prefix={<PhoneOutlined className="text-[#00A8E8]" />}
                className="rounded-lg h-12 border-gray-200 bg-gray-50"
              />
            </Form.Item>
            {!isModal && (
              <div className="mb-4 rounded-lg bg-[#F0FAFF] border border-[#00A8E8]/15 px-4 py-3">
                <p className="text-[11px] text-[#003459]/70 leading-relaxed">
                  <span className="font-bold">Test:</span> 055 375 85 00 · 051 305 39 22
                </p>
              </div>
            )}
            <Button type="primary" size="large" block htmlType="submit" loading={loading} className={buttonClass}>
              Kod göndər
            </Button>
          </Form>
        );

      case "otp":
        return (
          <Form onFinish={handleVerifyOTP} layout="vertical">
            <div className="flex items-center gap-3 bg-[#F0FAFF] border border-[#00A8E8]/20 rounded-lg px-4 py-3 mb-4">
              <PhoneOutlined className="text-[#00A8E8]" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 uppercase font-semibold">Nömrə</p>
                <p className="text-[#003459] font-bold text-sm truncate">{displayPhone}</p>
              </div>
              <Button type="link" onClick={() => setCurrentStep("phone")} className="text-[#00A8E8] p-0 h-auto text-xs">
                Dəyiş
              </Button>
            </div>
            {isModal && (
              <div className="mb-4 rounded-lg bg-[#FFFBEB] border border-amber-200/60 px-3 py-2 text-[11px] text-amber-800">
                Demo OTP: <span className="font-mono font-bold">{DEMO_OTP}</span>
              </div>
            )}
            <Form.Item
              name="otp"
              label="Doğrulama kodu"
              rules={[
                { required: true, message: "OTP kodu tələb olunur" },
                { len: 6, message: "OTP 6 rəqəm olmalıdır" },
              ]}
              className="[&_.ant-form-item-control-input-content]:flex [&_.ant-form-item-control-input-content]:justify-center"
            >
              <Input.OTP length={6} size="large" />
            </Form.Item>
            <Button type="primary" size="large" block htmlType="submit" loading={loading} className={buttonClass}>
              Kodu təsdiqlə
            </Button>
          </Form>
        );

      case "password":
        return (
          <Form onFinish={handleLogin} layout="vertical">
            <div className="flex items-center gap-3 bg-[#F0FDF8] border border-[#00D4AA]/30 rounded-lg px-4 py-3 mb-4">
              <CheckCircleOutlined className="text-[#00D4AA] text-lg" />
              <p className="text-[#003459] font-semibold text-sm">{displayPhone} təsdiqləndi</p>
            </div>
            {isModal && (
              <div className="mb-4 rounded-lg bg-[#FFFBEB] border border-amber-200/60 px-3 py-2 text-[11px] text-amber-800">
                Demo şifrə: <span className="font-mono font-bold">{DEMO_PASSWORD}</span>
              </div>
            )}
            <Form.Item
              name="password"
              label="Şifrə"
              rules={[{ required: true, message: "Şifrə tələb olunur" }]}
            >
              <Input.Password
                size="large"
                placeholder="Şifrənizi daxil edin"
                prefix={<LockOutlined className="text-[#00A8E8]" />}
                className="rounded-lg h-12"
              />
            </Form.Item>
            <Button type="primary" size="large" block htmlType="submit" loading={loading} className={buttonClass}>
              Daxil ol
            </Button>
          </Form>
        );
    }
  };

  return (
    <div className={isModal ? "" : "w-full max-w-sm"}>
      {!isModal && (
        <div className="flex items-center justify-center mb-8 gap-0">
          {STEPS.map((step, idx) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                    idx < stepIndex
                      ? "bg-[#00D4AA] text-white"
                      : idx === stepIndex
                        ? "bg-[#003459] text-white scale-110"
                        : "bg-white text-gray-300 border-2 border-gray-200"
                  }`}
                >
                  {idx < stepIndex ? <CheckCircleOutlined /> : idx + 1}
                </div>
                <span className={`text-[10px] font-semibold uppercase ${idx === stepIndex ? "text-[#003459]" : "text-gray-300"}`}>
                  {step === "phone" ? "Nömrə" : step === "otp" ? "OTP" : "Şifrə"}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`h-px w-10 mb-5 mx-1 ${idx < stepIndex ? "bg-[#00D4AA]" : "bg-gray-200"}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {isModal && (
        <div className="mb-5">
          <h2 className="text-[#003459] font-bold text-xl mb-1">{modalTitle}</h2>
          <p className="text-gray-500 text-sm">{STEP_META[currentStep].subtitle}</p>
          <div className="flex gap-2 mt-3">
            {STEPS.map((step, idx) => (
              <div
                key={step}
                className={`h-1 flex-1 rounded-full ${idx <= stepIndex ? "bg-[#00A8E8]" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className={isModal ? "" : "bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"}>
        {!isModal && (
          <div className="px-8 pt-8 pb-6 border-b border-gray-50">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-xl ${
                currentStep === "password" ? "bg-[#00D4AA]/10 text-[#00D4AA]" : "bg-[#00A8E8]/10 text-[#00A8E8]"
              }`}
            >
              {STEP_META[currentStep].icon}
            </div>
            <h1 className="text-[#003459] font-bold text-2xl mb-1">{STEP_META[currentStep].title}</h1>
            <p className="text-gray-400 text-sm">{STEP_META[currentStep].subtitle}</p>
          </div>
        )}
        <div className={isModal ? "" : "px-8 py-7"}>{renderForm()}</div>
      </div>
    </div>
  );
}
