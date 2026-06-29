import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router";
import { mainPath } from "../data/constant";

interface SidebarContextValue {
  mobileOpen: boolean;
  openMobile: () => void;
  closeMobile: () => void;
  showSidebar: boolean;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const showSidebar =
    location.pathname === mainPath.home.main ||
    location.pathname === mainPath.searchPage.main;

  const value = useMemo(
    () => ({
      mobileOpen,
      openMobile: () => setMobileOpen(true),
      closeMobile: () => setMobileOpen(false),
      showSidebar,
    }),
    [mobileOpen, showSidebar],
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return ctx;
}
