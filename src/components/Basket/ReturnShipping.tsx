import {Button} from "antd";
import {FaArrowRight} from "react-icons/fa";
import {useNavigate} from "react-router";
import {mainPath} from "../../data/constant.tsx";

export default function ReturnShipping() {
    const navigate = useNavigate();
    return (
        <Button
            type="link"
            onClick={() => navigate(mainPath.home.main)}
            icon={<FaArrowRight className="w-4 h-4 rotate-180"/>}
            className="text-slate-500 hover:text-sky-600 pl-0"
        >
            Alış-verişə davam et
        </Button>
    );
}
 