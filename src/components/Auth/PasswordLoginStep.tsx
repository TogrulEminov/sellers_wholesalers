import { Button, Form, Input } from "antd";
import { CheckCircleOutlined, LockOutlined } from "@ant-design/icons";
import { DEMO_PASSWORD } from "../../db/customerSeedData";

interface Props {
  displayPhone: string;
  loading?: boolean;
  onSubmit: (password: string) => void;
  onChangePhone: () => void;
  compact?: boolean;
}

export default function PasswordLoginStep({
  displayPhone,
  loading,
  onSubmit,
  onChangePhone,
  compact = false,
}: Props) {
  return (
    <div>
      <div className={compact ? "mb-5" : "mb-8"}>
        <h1 className={`font-bold text-[#003459] ${compact ? "text-xl mb-1" : "text-2xl mb-2"}`}>
          Şifrənizi daxil edin
        </h1>
        <p className="text-gray-500 text-sm">Hesab şifrənizlə daxil olun</p>
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-[#00D4AA]/30 bg-[#00D4AA]/5 px-4 py-3 mb-6">
        <CheckCircleOutlined className="text-[#00D4AA] text-lg shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-gray-400 uppercase font-medium">Təsdiqlənmiş nömrə</p>
          <p className="text-sm font-semibold text-[#003459] truncate">{displayPhone}</p>
        </div>
        <button
          type="button"
          onClick={onChangePhone}
          className="text-xs font-semibold text-[#00A8E8] hover:underline shrink-0 cursor-pointer"
        >
          Dəyiş
        </button>
      </div>

      <Form layout="vertical" onFinish={(v) => onSubmit(v.password)}>
        <Form.Item
          name="password"
          label="Şifrə"
          rules={[{ required: true, message: "Şifrə tələb olunur" }]}
        >
          <Input.Password
            size="large"
            placeholder="Şifrənizi daxil edin"
            prefix={<LockOutlined className="text-[#00A8E8]" />}
            className="h-12 rounded-lg"
          />
        </Form.Item>

        {!compact && (
          <p className="text-xs text-gray-400 mb-4">
            Demo şifrə: <span className="font-mono font-semibold text-[#003459]">{DEMO_PASSWORD}</span>
          </p>
        )}

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={loading}
          className="h-12 rounded-lg font-semibold bg-[#003459] hover:bg-[#00A8E8]! border-none"
        >
          Daxil ol
        </Button>
      </Form>
    </div>
  );
}
