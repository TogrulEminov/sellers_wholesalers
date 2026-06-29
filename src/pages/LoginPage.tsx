import { Link, useNavigate } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import BrandLogo from "../components/Layout/BrandLogo";
import OtpVerificationModal from "../components/Auth/OtpVerificationModal";
import PasswordLoginStep from "../components/Auth/PasswordLoginStep";
import PhoneLoginStep from "../components/Auth/PhoneLoginStep";
import { useLoginFlow } from "../hooks/useLoginFlow";
import { mainPath } from "../data/constant";

export function LoginPage() {
  const navigate = useNavigate();
  const flow = useLoginFlow(() => navigate(mainPath.home.main));

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-[42%] xl:w-[45%] bg-brand-dark text-white flex-col justify-between p-12">
        <div>
          <div className="mb-16 flex items-center gap-3">
            <BrandLogo imageClassName="h-14" />
          </div>
          <h2 className="text-3xl xl:text-4xl font-bold leading-tight mb-4 text-brand-gold">
            Topdan satış platformasına xoş gəlmisiniz
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-md">
            Hürrem məhsul kataloqu, sifariş idarəetməsi və hesab məlumatlarınıza
            təhlükəsiz giriş.
          </p>
        </div>
        <p className="text-white/40 text-sm">© Hürrem B2B</p>
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <div className="px-6 py-5 flex items-center justify-between lg:justify-start">
          <Link
            to={mainPath.home.main}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-dark transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-white border border-brand-border flex items-center justify-center">
              <ArrowLeftOutlined className="text-xs" />
            </span>
            <span className="text-sm font-medium">Ana səhifə</span>
          </Link>

          <Link
            to={mainPath.home.main}
            className="flex items-center gap-2 lg:hidden"
          >
            <BrandLogo imageClassName="h-9" />
            <span className="font-semibold text-brand-gold">Hürrem</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-sm">
              {!flow.otpVerified ? (
                <PhoneLoginStep
                  loading={flow.sendingOtp}
                  onSubmit={flow.handleSendOtp}
                />
              ) : (
                <PasswordLoginStep
                  displayPhone={flow.displayPhone}
                  loading={flow.loggingIn}
                  onSubmit={flow.handleLogin}
                  onChangePhone={flow.changePhone}
                />
              )}
            </div>

            <p className="text-center text-gray-400 text-xs mt-6 leading-relaxed">
              Daxil olmaqla{" "}
              <a href="#" className="text-brand-gold hover:underline">
                istifadə şərtlərini
              </a>{" "}
              qəbul etmiş olursunuz.
            </p>
          </div>
        </div>
      </div>

      <OtpVerificationModal
        open={flow.otpModalOpen}
        displayPhone={flow.displayPhone}
        loading={flow.verifyingOtp}
        resendLoading={flow.sendingOtp}
        onClose={() => flow.setOtpModalOpen(false)}
        onVerify={flow.handleVerifyOtp}
        onResend={flow.handleResendOtp}
        onChangePhone={flow.changePhone}
      />
    </div>
  );
}
