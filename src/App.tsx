import { ConfigProvider } from "antd";
import { MainLayout } from "./Layout/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router";
import { LoginPage } from "./pages/Login";
import HomePage from "./pages/HomePage";

const theme = {
  token: {
    colorPrimary: "#00A8E8",
    colorSuccess: "#00D4AA",
    colorInfo: "#003459",
    borderRadius: 8,
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  },
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
