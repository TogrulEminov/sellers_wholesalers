import { Link } from "react-router";
import { mainPath } from "../../data/constant";

interface Props {
  imageClassName?: string;
  className?: string;
}

export default function BrandLogo({
  imageClassName = "h-10 sm:h-11",
  className = "",
}: Props) {
  return (
    <Link
      to={mainPath.home.main}
      className={`flex items-center gap-2.5 shrink-0 ${className}`}
      aria-label="Hürrem — ana səhifə"
    >
      <img
        src="/logo-png.png"
        alt=""
        aria-hidden
        className={`${imageClassName} w-auto object-contain rounded-md`}
      />
    </Link>
  );
}
