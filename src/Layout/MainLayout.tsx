import { Link, Outlet } from "react-router";
import { Header } from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { mainPath } from "../data/constant";

function MainLayoutContent() {
  const { showSidebar } = useSidebar();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Header />
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
      <footer className="border-t border-gray-100 bg-white mt-auto">
        <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00A8E8] flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <div>
              <p className="text-[#003459] font-semibold text-sm">BulkTrade</p>
              <p className="text-gray-400 text-xs">B2B topdan satış platforması</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <Link to={mainPath.home.main} className="hover:text-[#00A8E8] transition-colors">
              Kataloq
            </Link>
            <Link to={mainPath.basket.main} className="hover:text-[#00A8E8] transition-colors">
              Səbət
            </Link>
            <Link to={mainPath.orders.main} className="hover:text-[#00A8E8] transition-colors">
              Sifarişlər
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const MainLayout = () => (
  <SidebarProvider>
    <MainLayoutContent />
  </SidebarProvider>
);
