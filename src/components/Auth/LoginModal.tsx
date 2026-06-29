import { Modal } from "antd";
import type { AuthUser } from "../../db/types";
import OtpVerificationModal from "./OtpVerificationModal";
import PasswordLoginStep from "./PasswordLoginStep";
import PhoneLoginStep from "./PhoneLoginStep";
import { useLoginFlow } from "../../hooks/useLoginFlow";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
}

export default function LoginModal({ open, onClose, onSuccess }: Props) {
  const flow = useLoginFlow((user) => {
    onSuccess(user);
    onClose();
  });

  const handleClose = () => {
    flow.resetToPhone();
    onClose();
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={handleClose}
        footer={null}
        width={420}
        centered
        destroyOnHidden
        title={null}
        closable
      >
        {!flow.otpVerified ? (
          <PhoneLoginStep
            compact
            loading={flow.sendingOtp}
            onSubmit={flow.handleSendOtp}
          />
        ) : (
          <PasswordLoginStep
            compact
            displayPhone={flow.displayPhone}
            loading={flow.loggingIn}
            onSubmit={flow.handleLogin}
            onChangePhone={flow.changePhone}
          />
        )}
      </Modal>

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
    </>
  );
}
