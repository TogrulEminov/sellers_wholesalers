import { Outlet } from "react-router";
import { Header } from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

export const MainLayout = () => (
  <div className="min-h-screen bg-brand-cream flex flex-col">
    <Header />
    <main className="flex-1 min-w-0">
      <Outlet />
    </main>
    <Footer />
  </div>
);
