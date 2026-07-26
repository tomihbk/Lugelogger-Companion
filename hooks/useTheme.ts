import useThemeStore from "~/stores/themeStore"

export const useTheme = () =>
  useThemeStore((state) => state.theme)