import React from "react";
import { Header } from "../components/Layout/Header";
import { Outlet } from "react-router";

export const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
