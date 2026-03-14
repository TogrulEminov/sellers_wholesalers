export const mainPath = {
    home: {
        main: "/"
    },
    searchPage: {
        main: "/search",
        search: (query: string) => `/search/${query}`,
    },
    wishlistPage: {
        main: "/wishlist",
    },
    basket: {
        main: "/basket",
    }
} as const