import { Modal } from "antd";
import type { AuthUser } from "../../db/types";
import LoginForm from "./LoginForm";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
}

export default function LoginModal({ open, onClose, onSuccess }: Props) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={420}
      centered
      destroyOnHidden
      title={null}
      closable
    >
      <LoginForm
        variant="modal"
        modalTitle="Sifariş üçün daxil olun"
        onSuccess={(user) => {
          onSuccess(user);
          onClose();
        }}
      />
    </Modal>
  );
}
