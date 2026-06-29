import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiPackage,
  FiMenu,
  FiChevronDown,
  FiPhone,
} from "react-icons/fi";
import { Dropdown, message } from "antd";
import SearchComponent from "./Search.tsx";
import { mainPath } from "../../data/constant.tsx";
import { useCartItemCount } from "../../hooks/useCart.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import { logout } from "../../services/authService.ts";
import type { AuthUser } from "../../db/types";
import { useSidebar } from "../../context/SidebarContext";

function NavIconLink({
  to,
  icon,
  label,
  badge,
  active,
}: {
  to: string;
  icon: ReactNode;
  label: string;
  badge?: number;
  active?: boolean;
}) {
  return (
    <Link
      to={to}
      title={label}
      className={`relative flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
        ${
          active
            ? "bg-[#eef8fd] text-[#00A8E8]"
            : "text-gray-600 hover:text-[#00A8E8] hover:bg-gray-50"
        }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="hidden xl:inline">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="absolute top-0.5 right-0.5 min-w-4 h-4 px-1 bg-[#00D4AA] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  );
}

function UserDropdownPanel({
  user,
  onOrders,
  onBasket,
  onLogout,
}: {
  user: AuthUser;
  onOrders: () => void;
  onBasket: () => void;
  onLogout: () => void;
}) {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const menuItems = [
    { icon: <FiPackage className="text-base" />, label: "Sifarişlərim", onClick: onOrders },
    { icon: <FiShoppingCart className="text-base" />, label: "Səbətim", onClick: onBasket },
    { icon: <FiLogOut className="text-base" />, label: "Çıxış", onClick: onLogout, danger: true },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden min-w-[272px]">
      <div className="px-4 py-4  border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#00A8E8] flex items-center justify-center text-white font-bold text-sm shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-[#003459] text-sm truncate">{user.name}</p>
            <p className="text-gray-500 text-xs mt-0.5">{user.code}</p>
          </div>
        </div>
        <div className="mt-3 space-y-1.5 text-xs text-gray-500">
          <p>
            <span className="font-medium text-[#003459]">Qrup:</span> {user.group}
          </p>
          <p>
            <span className="font-medium text-[#003459]">Filial:</span> {user.department}
          </p>
          <p className="flex items-center gap-2">
            <FiPhone className="shrink-0" />
            {user.phone}
          </p>
        </div>
      </div>

      <div className="p-1.5">
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer
              ${item.danger ? "text-red-500 hover:bg-red-50" : "text-[#003459] hover:bg-gray-50"}`}
          >
            <span className={item.danger ? "text-red-400" : "text-[#00A8E8]"}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = useCartItemCount();
  const { isAuthenticated, user, loading } = useAuth();
  const { showSidebar, openMobile } = useSidebar();

  const handleLogout = async () => {
    try {
      await logout();
      message.success("Hesabdan çıxış edildi");
      navigate(mainPath.home.main);
    } catch {
      message.error("Çıxış zamanı xəta baş verdi");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="container px-4 sm:px-6">
        <div className="flex items-center justify-between gap-6 py-4 min-h-[4.5rem]">
          <Link to={mainPath.home.main} className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-[#00A8E8] flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-[#003459] font-bold text-xl hidden sm:block">BulkTrade</span>
          </Link>

          <div className="flex-1 max-w-lg hidden md:block px-2">
            <SearchComponent />
          </div>

          <nav className="flex items-center gap-1">
            <NavIconLink
              to={mainPath.wishlistPage.main}
              icon={<FiHeart />}
              label="Seçilmişlər"
              active={location.pathname === mainPath.wishlistPage.main}
            />
            <NavIconLink
              to={mainPath.basket.main}
              icon={<FiShoppingCart />}
              label="Səbət"
              badge={cartCount ?? 0}
              active={location.pathname === mainPath.basket.main}
            />

            <div className="w-px h-6 bg-gray-200 mx-2 hidden sm:block" />

            {!loading && isAuthenticated && user ? (
              <Dropdown
                trigger={["click"]}
                placement="bottomRight"
                popupRender={() => (
                  <UserDropdownPanel
                    user={user}
                    onOrders={() => navigate(mainPath.orders.main)}
                    onBasket={() => navigate(mainPath.basket.main)}
                    onLogout={handleLogout}
                  />
                )}
              >
                <button
                  type="button"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#00A8E8] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {user.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div className="hidden md:block text-left space-y-1">
                    <p className="text-gray-900 text-sm font-semibold leading-none max-w-[7rem] truncate">
                      {user.name.split(" ")[0]}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{user.group}</p>
                  </div>
                  <FiChevronDown className="text-gray-400 text-sm hidden md:block" />
                </button>
              </Dropdown>
            ) : (
              <Link
                to={mainPath.login.main}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#00A8E8] hover:bg-[#0096D1] text-white font-medium text-sm transition-colors"
              >
                <FiUser className="text-lg" />
                <span className="hidden sm:inline">Daxil ol</span>
              </Link>
            )}

            <button
              type="button"
              onClick={openMobile}
              className={`lg:hidden p-2.5 text-gray-600 hover:text-[#00A8E8] hover:bg-gray-50 rounded-lg transition-colors cursor-pointer ml-1 ${showSidebar ? "" : "hidden"}`}
              aria-label="Kateqoriyalar"
            >
              <FiMenu className="text-xl" />
            </button>
          </nav>
        </div>
      </div>

      <div className="md:hidden px-4 sm:px-6 pb-4 border-t border-gray-100 pt-3">
        <SearchComponent />
      </div>
    </header>
  );
};
