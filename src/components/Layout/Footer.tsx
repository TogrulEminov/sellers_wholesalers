import { Link } from "react-router";
import { FiHeart, FiPackage, FiShoppingCart, FiUser } from "react-icons/fi";
import { mainPath } from "../../data/constant";
import BrandLogo from "./BrandLogo";

const FOOTER_LINKS = [
  { to: mainPath.home.main, label: "Kataloq", icon: null },
  { to: mainPath.wishlistPage.main, label: "Seçilmişlər", icon: FiHeart },
  { to: mainPath.basket.main, label: "Səbət", icon: FiShoppingCart },
  { to: mainPath.orders.main, label: "Sifarişlər", icon: FiPackage },
  { to: mainPath.login.main, label: "Daxil ol", icon: FiUser },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-brand-border bg-white">
      <div className="container py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <BrandLogo imageClassName="h-10" />
              <span className="font-semibold text-xl text-brand-gold tracking-wide">
                Hürrem
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Parfumeriya, yağlar və aksesuarlar üzrə B2B topdan satış platforması.
              Sifariş, kataloq və hesab idarəetməsi bir yerdə.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Sürətli keçid
            </p>
            <nav className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-brand-gold transition-colors w-fit"
                >
                  {Icon && <Icon className="w-4 h-4 text-brand-gold/70" />}
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Əlaqə
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <span className="text-brand-dark font-medium">Telefon:</span>{" "}
                +994 12 000 00 00
              </li>
              <li>
                <span className="text-brand-dark font-medium">E-poçt:</span>{" "}
                info@hurrem.az
              </li>
              <li className="text-gray-500 leading-relaxed pt-1">
                Bakı, Azərbaycan
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-border bg-brand-cream/60">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {year} Hürrem. Bütün hüquqlar qorunur.</p>
          <p>B2B topdan satış</p>
        </div>
      </div>
    </footer>
  );
}
