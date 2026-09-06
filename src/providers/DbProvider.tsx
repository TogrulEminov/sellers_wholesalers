import { Spin } from "antd";
import type { ReactNode } from "react";
import { useDbInit } from "../hooks/useDbInit";

interface DbProviderProps {
  children: ReactNode;
}

// DbProvider renders above RouterProvider (see App.tsx), so it can't use
// BrandLogo — that component depends on react-router's Link/route context.
function SplashLogo() {
  return (
    <img
      src="/logo-png.png"
      alt="Hürrem"
      className="h-12 sm:h-14 w-auto object-contain"
    />
  );
}

export function DbProvider({ children }: DbProviderProps) {
  const { ready, error } = useDbInit();

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-brand-cream px-4">
        <SplashLogo />
        <div className="max-w-sm text-center">
          <p className="text-red-500 font-medium">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-brand-dark px-5 py-2 text-sm font-medium text-brand-cream transition-colors hover:bg-brand-darker"
          >
            Yenidən cəhd et
          </button>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-brand-cream">
        <SplashLogo />
        <Spin size="large" />
        <p className="text-sm text-brand-muted">Yüklənir...</p>
      </div>
    );
  }

  return children;
}
