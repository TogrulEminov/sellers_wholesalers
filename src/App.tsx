import { ConfigProvider } from "antd";
import { MainLayout } from "./Layout/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router";
import { LoginPage } from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage";
import { mainPath } from "./data/constant.tsx";
import WishlistPage from "./pages/WishlistPage.tsx";
import BasketPage from "./pages/BasketPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import MyOrdersPage from "./pages/MyOrdersPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import { DbProvider } from "./providers/DbProvider.tsx";
import { antdTheme } from "./data/theme.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: mainPath.home.main,
        element: <HomePage />,
      },
      {
        path: mainPath.wishlistPage.main,
        element: <WishlistPage />,
      },
      {
        path: mainPath.basket.main,
        element: <BasketPage />,
      },
      {
        path: mainPath.searchPage.main,
        element: <SearchPage />,
      },
      {
        path: mainPath.orders.main,
        element: <MyOrdersPage />,
      },
      {
        path: mainPath.profile.main,
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: mainPath.login.main,
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <DbProvider>
        <RouterProvider router={router} />
      </DbProvider>
    </ConfigProvider>
  );
}

export default App;
