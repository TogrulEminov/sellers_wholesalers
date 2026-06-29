import { Button } from "antd";
import { useNavigate } from "react-router";
import { mainPath } from "../../data/constant";

export default function ReturnShipping() {
  const navigate = useNavigate();

  return (
    <div className="pt-6 mt-4 border-t border-gray-200 text-center">
      <Button
        onClick={() => navigate(mainPath.home.main)}
        type="default"
        size="middle"
        className="rounded-lg px-6 h-10 border-gray-200 text-[#003459] hover:border-[#00A8E8] hover:text-[#00A8E8]"
      >
        Alış-verişə davam et
      </Button>
    </div>
  );
}
