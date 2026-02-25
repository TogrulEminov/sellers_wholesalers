import { useState } from "react";
import { Button } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { ProductGrid } from "../components/Product/ProductGrid";
import Sidebar from "../components/Layout/Sidebar";

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div className="container py-6 lg:py-8 px-4">
        {/* Page title + mobile category button */}
        <div className="flex items-start flex-col sm:flex-row sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-[#003459] font-bold text-2xl lg:text-3xl mb-1">
              Bütün kateqoriyalar
            </h1>
            <p className="text-gray-500 text-sm">B2B məhsul kataloqu</p>
          </div>
          <Button
            icon={<AppstoreOutlined />}
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden flex items-center gap-2 border border-gray-200 bg-white text-[#003459] hover:border-[#00A8E8] hover:text-[#00A8E8] rounded-xl  h-10! px-4 w-full sm:w-fit font-semibold text-sm shadow-sm shrink-0"
          >
            Kateqoriyalar
          </Button>
        </div>

        <ProductGrid />
      </div>
    </>
  );
}
