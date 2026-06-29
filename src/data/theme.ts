export const brand = {
  dark: "#003459",
  darker: "#002840",
  primary: "#00A8E8",
  primaryHover: "#0096D1",
  success: "#00D4AA",
  cream: "#F8FAFC",
  surface: "#FFFFFF",
  sand: "#EEF8FD",
  text: "#003459",
  muted: "#8B9AA8",
  border: "#E5E7EB",
} as const;

export const antdTheme = {
  token: {
    colorPrimary: brand.primary,
    colorSuccess: brand.success,
    colorInfo: brand.dark,
    colorText: brand.text,
    colorBgContainer: brand.surface,
    colorBgLayout: brand.cream,
    colorBorder: brand.border,
    borderRadius: 8,
    fontFamily: '"DM Sans", Inter, system-ui, sans-serif',
  },
  components: {
    Button: {
      primaryShadow: "none",
    },
    Dropdown: {
      controlItemBgHover: brand.sand,
    },
  },
};
