import React from "react";
import { Link } from "react-router";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiLogOut,
  FiPackage,
  FiRefreshCw,
  FiMenu,
} from "react-icons/fi";

interface HeaderProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    company?: string;
    role: string;
  } | null;
}

export const Header: React.FC<HeaderProps> = ({
  isAuthenticated = false,
  user = null,
}) => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00A8E8] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-[#003459] font-bold text-xl hidden sm:block">
              BulkTrade
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to={"/wishlist"}
              className="relative p-2 text-gray-600 hover:text-[#00A8E8] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <FiHeart className="text-xl" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#00D4AA] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            <Link
              to={"/basket"}
              className="relative p-2 text-gray-600 hover:text-[#00A8E8] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <FiShoppingCart className="text-xl" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#00D4AA] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                5
              </span>
            </Link>

            <div className="w-px h-6 bg-gray-200 mx-2" />
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* User Info */}
                <div className="hidden md:flex items-center gap-3 pl-2 pr-3 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-8 h-8 bg-[#00A8E8] rounded-full flex items-center justify-center text-white">
                    <FiUser className="text-sm" />
                  </div>
                  <div className="text-left">
                    <p className="text-gray-900 text-sm font-semibold leading-none">
                      {user?.name || "John Doe"}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {user?.company || "Tech Corp"}
                    </p>
                  </div>
                  <FiChevronDown className="text-gray-400 text-sm" />
                </div>

                {/* Quick Actions */}
                <div className="hidden lg:flex items-center gap-1 border-l border-gray-200 pl-3">
                  <Link
                    to={"/profiles/my-orders"}
                    className="p-2 text-gray-500 hover:text-[#00A8E8] hover:bg-gray-50 rounded-lg transition-colors"
                    title="My Orders"
                  >
                    <FiPackage className="text-lg" />
                  </Link>
                  <button
                    type="button"
                    className="p-2 cursor-pointer text-gray-500 hover:text-[#00A8E8] hover:bg-gray-50 rounded-lg transition-colors"
                    title="Sync Role"
                  >
                    <FiRefreshCw className="text-lg" />
                  </button>
                  <button
                    type="button"
                    className="p-2 cursor-pointer text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <FiLogOut className="text-lg" />
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="flex items-center gap-2 px-4 py-2 bg-[#00A8E8] hover:bg-[#0096D1] text-white rounded-lg font-medium text-sm transition-colors"
              >
                <FiUser className="text-lg" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}

            {/* Mobile Menu */}
            <button type="button" className="cursor-pointer lg:hidden p-2 text-gray-600 hover:text-[#00A8E8] hover:bg-gray-50 rounded-lg transition-colors ml-2">
              <FiMenu className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
