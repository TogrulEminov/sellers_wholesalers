import { Button, Form, Input, Modal } from "antd";
import { SafetyOutlined } from "@ant-design/icons";
import { DEMO_OTP } from "../../db/customerSeedData";

interface Props {
  open: boolean;
  displayPhone: string;
  loading?: boolean;
  resendLoading?: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  onResend: () => void;
  onChangePhone: () => void;
}

export default function OtpVerificationModal({
  open,
  displayPhone,
  loading,
  resendLoading,
  onClose,
  onVerify,
  onResend,
  onChangePhone,
}: Props) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      destroyOnHidden
      closable
      title={null}
      className="otp-modal"
    >
      <div className="pt-2 pb-1">
        <div className="w-11 h-11 rounded-lg bg-[#eef8fd] flex items-center justify-center mb-4">
          <SafetyOutlined className="text-xl text-[#00A8E8]" />
        </div>

        <h2 className="text-lg font-bold text-[#003459] mb-1">SMS doğrulama</h2>
        <p className="text-sm text-gray-500 mb-1">
          <span className="font-semibold text-[#003459]">{displayPhone}</span> nömrəsinə göndərilən kodu daxil edin
        </p>
        <button
          type="button"
          onClick={onChangePhone}
          className="text-xs font-semibold text-[#00A8E8] hover:underline mb-5 cursor-pointer"
        >
          Nömrəni dəyiş
        </button>

        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-5">
          Demo OTP: <span className="font-mono font-bold">{DEMO_OTP}</span>
        </p>

        <Form layout="vertical" onFinish={(v) => onVerify(v.otp)}>
          <Form.Item
            name="otp"
            rules={[
              { required: true, message: "OTP kodu tələb olunur" },
              { len: 6, message: "OTP 6 rəqəm olmalıdır" },
            ]}
            className="[&_.ant-form-item-control-input-content]:flex [&_.ant-form-item-control-input-content]:justify-center mb-6"
          >
            <Input.OTP length={6} size="large" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            className="h-11 rounded-lg font-semibold bg-[#00A8E8] hover:bg-[#0096D1]! border-none mb-3"
          >
            Kodu təsdiqlə
          </Button>

          <p className="text-center text-sm text-gray-400">
            Kod gəlmədi?{" "}
            <button
              type="button"
              onClick={onResend}
              disabled={resendLoading}
              className="text-[#00A8E8] font-semibold hover:underline cursor-pointer disabled:opacity-50"
            >
              Yenidən göndər
            </button>
          </p>
        </Form>
      </div>
    </Modal>
  );
}
