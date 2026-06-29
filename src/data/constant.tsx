export const mainPath = {
    home: {
        main: "/"
    },
    searchPage: {
        main: "/search",
        search: (query: string) => `/search?query=${encodeURIComponent(query)}`,
    },
    wishlistPage: {
        main: "/wishlist",
    },
    basket: {
        main: "/basket",
    },
    orders: {
        main: "/orders",
    },
    login: {
        main: "/login",
    },
} as const