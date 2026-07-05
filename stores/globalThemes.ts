export const lightTheme = {
  colors: {
    background: {
      default: "#FAFAFA",
      selected: "#eff6ff",
      subtle: "#eff6ff",
    },
    surface: {
      card: "#FFFFFF",
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
    },
  },
}

export const darkTheme = {
  colors: {
    background: {
      default: "#121212",
      selected: "#eff6ff",
      subtle: "#1f2937",
    },
    surface: {
      card: "#161B22",
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
    },
  },
}

export type Theme = typeof lightTheme

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const
