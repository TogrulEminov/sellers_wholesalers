export const brand = {
  dark: "#1A1A1A",
  darker: "#0D0D0D",
  primary: "#D4A843",
  primaryHover: "#C49838",
  success: "#2E7D5A",
  cream: "#FAF8F5",
  surface: "#FFFFFF",
  sand: "#F5F0E8",
  text: "#1A1A1A",
  muted: "#8B8178",
  border: "#E8E2D9",
} as const;

export const antdTheme = {
  token: {
    colorPrimary: brand.primary,
    colorPrimaryHover: brand.primaryHover,
    colorSuccess: brand.success,
    colorInfo: brand.dark,
    colorText: brand.text,
    colorBgContainer: brand.surface,
    colorBgLayout: brand.cream,
    colorBorder: brand.border,
    borderRadius: 8,
    fontFamily: '"DM Sans", Inter, system-ui, sans-serif',
    colorLink: brand.primary,
    colorLinkHover: brand.primaryHover,
  },
  components: {
    Button: {
      primaryShadow: "none",
      primaryColor: brand.dark,
    },
    Dropdown: {
      controlItemBgHover: brand.sand,
    },
    Pagination: {
      itemActiveBg: brand.primary,
    },
    Checkbox: {
      colorPrimary: brand.primary,
    },
  },
};
