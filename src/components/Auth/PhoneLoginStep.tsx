import { Button, Form, Input } from "antd";
import { FaPhoneAlt } from "react-icons/fa";

interface Props {
  loading?: boolean;
  onSubmit: (phone: string) => void;
  compact?: boolean;
}

export default function PhoneLoginStep({ loading, onSubmit, compact = false }: Props) {
  return (
    <div>
      <div className={compact ? "mb-5" : "mb-8"}>
        <h1 className={`font-bold text-[#003459] ${compact ? "text-xl mb-1" : "text-2xl mb-2"}`}>
          Daxil ol
        </h1>
        <p className="text-gray-500 text-sm">
          Qeydiyyatda olan telefon nömrənizi daxil edin
        </p>
      </div>

      <Form layout="vertical" onFinish={(v) => onSubmit(v.phone)}>
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
            prefix={<FaPhoneAlt className="text-[#00A8E8]" />}
            className="h-12 rounded-lg"
          />
        </Form.Item>

        {!compact && (
          <p className="text-xs text-gray-400 mb-4">
            Test: <span className="font-mono text-[#003459]">055 375 85 00</span> ·{" "}
            <span className="font-mono text-[#003459]">051 305 39 22</span>
          </p>
        )}

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={loading}
          className="h-12 rounded-lg font-semibold bg-[#00A8E8] hover:bg-[#0096D1]! border-none"
        >
          Davam et
        </Button>
      </Form>
    </div>
  );
}
