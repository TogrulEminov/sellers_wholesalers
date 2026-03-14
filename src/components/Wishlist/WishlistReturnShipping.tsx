import {Button} from "antd";
import {useNavigate} from "react-router";
import {mainPath} from "../../data/constant.tsx";

export default function WishlistReturnShipping() {
    const navigate = useNavigate();
    return (
        <div className="mt-12 text-center">
            <p className="text-slate-500 mb-4">Daha çox məhsul kəşf edin</p>
            <Button onClick={() => navigate(mainPath.home.main)} type="primary" size="large"
                    className="rounded-full px-8 h-12">
                Alış-verişə Davam Et
            </Button>
        </div>
    );
}
 