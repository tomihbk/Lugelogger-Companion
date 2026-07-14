export const lightTheme = {
  colors: {
    background: {
      default: "#FAFAFA",
      selected: "#eff6ff",
      subtle: "#eff6ff",
      field: "#FFFFFF",

    },
    surface: {
      card: "#FFFFFF",
      neutral: "#FFFFFF",
    },
    text: {
      primary: "#111111",
      secondary: "#666666",
      selected: "#1e3a8a",
      link: "#007aff",
    },
    border: {
      default: "#E5E5E5",
      selected: "#3b82f6",
      unselected: "#e5e7eb"
    },
    brand: {
      primary: "#2563EB",
    },
    status: {
      danger: "#DC2626",
      successful: "#22c55e",
      remark: "#fefce8"
    },
  },
}

export const darkTheme = {
  colors: {
    background: {
      default: "#121212",
      selected: "#eff6ff",
      subtle: "#1f2937",
      field: "#202020",
    },
    surface: {
      card: "#161B22",
      neutral: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#9CA3AF",
      selected: "#3b82f6",
      link: "#007aff",
    },
    border: {
      default: "#30363D",
      selected: "#3b82f6",
      unselected: "#8d8e8f"
    },
    brand: {
      primary: "#3B82F6",
    },
    status: {
      danger: "#EF4444",
      successful: "#15803d",
      remark: "#453F03"
    },
  },
}

export type Theme = typeof lightTheme

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const
