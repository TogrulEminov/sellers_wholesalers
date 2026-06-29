import { Button } from "antd";
import { useNavigate } from "react-router";
import { mainPath } from "../../data/constant";

export default function WishlistReturnShipping() {
  const navigate = useNavigate();

  return (
    <div className="pt-8 mt-8 border-t border-gray-200 text-center">
      <Button
        onClick={() => navigate(mainPath.home.main)}
        type="default"
        className="rounded-lg px-6 h-10 border-gray-200 text-brand-dark hover:border-brand-gold hover:text-brand-gold"
      >
        Alış-verişə davam et
      </Button>
    </div>
  );
}
