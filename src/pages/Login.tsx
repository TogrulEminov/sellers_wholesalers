import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button, Input, Form, message } from "antd";
import {
  LockOutlined,
  ArrowLeftOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

type LoginStep = "phone" | "otp" | "password";

const STEPS: LoginStep[] = ["phone", "otp", "password"];

const STEP_META = {
  phone: {
    title: "Xoş gəldiniz",
    subtitle: "Telefon nömrənizi daxil edin",
    icon: <PhoneOutlined />,
  },
  otp: {
    title: "Doğrulama",
    subtitle: "6 rəqəmli kodu daxil edin",
    icon: <SafetyOutlined />,
  },
  password: {
    title: "Son addım",
    subtitle: "Şifrənizi daxil edin",
    icon: <LockOutlined />,
  },
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<LoginStep>("phone");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const stepIndex = STEPS.indexOf(currentStep);

  const handleSendOTP = (values: { phone: string }) => {
    setLoading(true);
    setTimeout(() => {
      setPhone(values.phone);
      setCurrentStep("otp");
      setLoading(false);
      message.success("OTP göndərildi!");
    }, 1500);
  };

  const handleVerifyOTP = (values: { otp: string }) => {
    console.log(values);

    setLoading(true);
    setTimeout(() => {
      setCurrentStep("password");
      setLoading(false);
    }, 1000);
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      message.success("Xoş gəldiniz!");
      navigate("/");
    }, 1000);
  };

  const renderForm = () => {
    switch (currentStep) {
      case "phone":
        return (
          <Form onFinish={handleSendOTP} layout="vertical">
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Telefon nömrəsi tələb olunur" },
                {
                  pattern: /^\+?[0-9\s\-()]{10,}$/,
                  message: "Düzgün nömrə daxil edin",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="+994 XX XXX XX XX"
                prefix={<PhoneOutlined className="text-[#00A8E8]" />}
                className="rounded-2xl h-14 border-gray-200 bg-gray-50 hover:border-[#00A8E8] focus:border-[#00A8E8] text-[#003459] font-medium"
              />
            </Form.Item>
            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              loading={loading}
              className="h-14 rounded-2xl font-bold text-base bg-[#003459] hover:bg-[#00A8E8] border-none shadow-lg shadow-[#003459]/20 transition-all duration-300 mt-2"
            >
              Davam et →
            </Button>
          </Form>
        );

      case "otp":
        return (
          <Form onFinish={handleVerifyOTP} layout="vertical">
            {/* Phone display */}
            <div className="flex items-center gap-3 bg-[#F0FAFF] border border-[#00A8E8]/20 rounded-2xl px-4 py-3 mb-5">
              <div className="w-8 h-8 bg-[#00A8E8]/10 rounded-xl flex items-center justify-center">
                <PhoneOutlined className="text-[#00A8E8] text-sm" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Nömrə
                </p>
                <p className="text-[#003459] font-bold text-sm">{phone}</p>
              </div>
              <Button
                type="link"
                onClick={() => setCurrentStep("phone")}
                className="ml-auto text-[#00A8E8] p-0 h-auto text-xs font-semibold"
              >
                Dəyiş
              </Button>
            </div>

            <Form.Item
              name="otp"
              rules={[{ required: true, message: "Kodu daxil edin" }]}
              className="[&_.ant-form-item-control-input-content]:flex [&_.ant-form-item-control-input-content]:justify-center"
            >
              <Input.OTP
                length={6}
                size="large"
                className="gap-2 [&_.ant-otp-input]:rounded-xl [&_.ant-otp-input]:border-gray-200 [&_.ant-otp-input]:bg-gray-50 [&_.ant-otp-input]:font-bold [&_.ant-otp-input]:text-[#003459] [&_.ant-otp-input:focus]:border-[#00A8E8]"
              />
            </Form.Item>

            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              loading={loading}
              className="h-14 rounded-2xl font-bold text-base bg-[#003459] hover:bg-[#00A8E8] border-none shadow-lg shadow-[#003459]/20 transition-all duration-300 mt-2"
            >
              Doğrula →
            </Button>

            <div className="text-center mt-4">
              <span className="text-gray-400 text-sm">Kod gəlmədi? </span>
              <Button
                type="link"
                onClick={() => handleSendOTP({ phone })}
                className="text-[#00A8E8] p-0 h-auto text-sm font-semibold"
              >
                Yenidən göndər
              </Button>
            </div>
          </Form>
        );

      case "password":
        return (
          <Form onFinish={handleLogin} layout="vertical">
            {/* Success indicator */}
            <div className="flex items-center gap-3 bg-[#F0FDF8] border border-[#00D4AA]/30 rounded-2xl px-4 py-3 mb-5">
              <CheckCircleOutlined className="text-[#00D4AA] text-xl" />
              <p className="text-[#003459] font-semibold text-sm">
                Nömrə uğurla doğrulandı
              </p>
            </div>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Şifrə tələb olunur" }]}
            >
              <Input.Password
                size="large"
                placeholder="Şifrənizi daxil edin"
                prefix={<LockOutlined className="text-[#00A8E8]" />}
                className="rounded-2xl h-14 border-gray-200 bg-gray-50 hover:border-[#00A8E8] focus:border-[#00A8E8] font-medium"
              />
            </Form.Item>

            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              loading={loading}
              className="h-14 rounded-2xl font-bold text-base bg-[#003459] hover:bg-[#00A8E8] border-none shadow-lg shadow-[#003459]/20 transition-all duration-300 mt-2"
            >
              Daxil ol →
            </Button>
          </Form>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top bar */}
      <div className="px-6 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#003459] transition-colors group"
        >
          <span className="w-8 h-8 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:border-[#00A8E8] transition-colors">
            <ArrowLeftOutlined className="text-xs" />
          </span>
          <span className="text-sm font-medium hidden sm:inline">Geri</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#003459] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-bold text-[#003459] text-sm hidden sm:inline">
            BulkTrade
          </span>
        </div>
      </div>

      {/* Main card */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">
          {/* Step progress */}
          <div className="flex items-center justify-center mb-8 gap-0">
            {STEPS.map((step, idx) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                      idx < stepIndex
                        ? "bg-[#00D4AA] text-white shadow-md shadow-[#00D4AA]/30"
                        : idx === stepIndex
                          ? "bg-[#003459] text-white shadow-lg shadow-[#003459]/30 scale-110"
                          : "bg-white text-gray-300 border-2 border-gray-200"
                    }`}
                  >
                    {idx < stepIndex ? (
                      <CheckCircleOutlined className="text-base" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                      idx === stepIndex ? "text-[#003459]" : "text-gray-300"
                    }`}
                  >
                    {step === "phone"
                      ? "Nömrə"
                      : step === "otp"
                        ? "Kod"
                        : "Şifrə"}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={`h-[2px] w-12 mb-5 mx-1 rounded-full transition-all duration-500 ${
                      idx < stepIndex ? "bg-[#00D4AA]" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-[#003459]/6 border border-gray-100 overflow-hidden">
            {/* Card header */}
            <div className="px-8 pt-8 pb-6 border-b border-gray-50">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-xl transition-all duration-300 ${
                  currentStep === "password"
                    ? "bg-[#00D4AA]/10 text-[#00D4AA]"
                    : "bg-[#00A8E8]/10 text-[#00A8E8]"
                }`}
              >
                {STEP_META[currentStep].icon}
              </div>
              <h1 className="text-[#003459] font-bold text-2xl mb-1">
                {STEP_META[currentStep].title}
              </h1>
              <p className="text-gray-400 text-sm">
                {STEP_META[currentStep].subtitle}
              </p>
            </div>

            {/* Card body */}
            <div className="px-8 py-7">{renderForm()}</div>
          </div>

          {/* Footer note */}
          <p className="text-center text-gray-400 text-xs mt-6 leading-relaxed">
            Daxil olmaqla{" "}
            <a href="#" className="text-[#00A8E8] hover:underline font-medium">
              İstifadə Şərtlərini
            </a>{" "}
            qəbul etmiş olursunuz.
          </p>
        </div>
      </div>
    </div>
  );
};
