import {ConfigProvider} from "antd";
import {MainLayout} from "./Layout/MainLayout";
import {createBrowserRouter, RouterProvider} from "react-router";
import {LoginPage} from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage";
import {mainPath} from "./data/constant.tsx";
import WishlistPage from "./pages/WishlistPage.tsx";
import BasketPage from "./pages/BasketPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";

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
        element: <MainLayout/>,
        children: [
            {
                path: mainPath.home.main,
                element: <HomePage/>,
            },
            {
                path: mainPath.wishlistPage.main,
                element: <WishlistPage/>,
            },
            {
                path: mainPath.basket.main,
                element: <BasketPage/>,
            },
            {
                path: mainPath.searchPage.main,
                element: <SearchPage/>,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
]);

function App() {
    return (
        <ConfigProvider theme={theme}>
            <RouterProvider router={router}/>
        </ConfigProvider>
    );
}

export default App;
