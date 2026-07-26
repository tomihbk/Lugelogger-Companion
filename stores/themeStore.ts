// themeStore.ts
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { zustandStorage } from "./zustandStorage"
import { themes, Theme } from "~/stores/globalThemes"

interface ThemeState {
  colorScheme: "light" | "dark"
  theme: Theme
  toggleColorScheme: () => void
  setColorScheme: (scheme: "light" | "dark") => void
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      colorScheme: "light",
      theme: themes.light,
      toggleColorScheme: () =>
        set((state) => {
          const next = state.colorScheme === "light" ? "dark" : "light"
          return { colorScheme: next, theme: themes[next] }
        }),
      setColorScheme: (scheme) =>
        set({ colorScheme: scheme, theme: themes[scheme] }),
    }),
    {
      name: "app-theme-setting",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({ colorScheme: state.colorScheme }),
      onRehydrateStorage: () => (state) => {
        if (state) state.theme = themes[state.colorScheme]
      },
    },
  ),
)

export default useThemeStore
