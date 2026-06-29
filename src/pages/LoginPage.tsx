import { Link, useNavigate } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import OtpVerificationModal from "../components/Auth/OtpVerificationModal";
import PasswordLoginStep from "../components/Auth/PasswordLoginStep";
import PhoneLoginStep from "../components/Auth/PhoneLoginStep";
import { useLoginFlow } from "../hooks/useLoginFlow";
import { mainPath } from "../data/constant";

export function LoginPage() {
  const navigate = useNavigate();
  const flow = useLoginFlow(() => navigate(mainPath.home.main));

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
      {/* Sol panel — brend */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-[45%] bg-[#003459] text-white flex-col justify-between p-12">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-lg bg-[#00A8E8] flex items-center justify-center">
              <span className="font-bold text-lg">B</span>
            </div>
            <span className="font-bold text-xl">BulkTrade</span>
          </div>
          <h2 className="text-3xl xl:text-4xl font-bold leading-tight mb-4">
            Topdan satış platformasına xoş gəlmisiniz
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-md">
            Məhsul kataloqu, sifariş idarəetməsi və hesab məlumatlarınıza təhlükəsiz giriş.
          </p>
        </div>
        <p className="text-white/40 text-sm">© BulkTrade B2B</p>
      </div>

      {/* Sağ panel — form */}
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="px-6 py-5 flex items-center justify-between lg:justify-start">
          <Link
            to={mainPath.home.main}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#003459] transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
              <ArrowLeftOutlined className="text-xs" />
            </span>
            <span className="text-sm font-medium">Ana səhifə</span>
          </Link>

          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[#00A8E8] flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-[#003459]">BulkTrade</span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
              {!flow.otpVerified ? (
                <PhoneLoginStep loading={flow.sendingOtp} onSubmit={flow.handleSendOtp} />
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
              <a href="#" className="text-[#00A8E8] hover:underline">
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
