// themeStore.ts
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { zustandStorage } from "./zustandStorage"

interface ThemeState {
  colorScheme: "light" | "dark"
  toggleColorScheme: () => void
  setColorScheme: (scheme: "light" | "dark") => void
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      colorScheme: "light",
      toggleColorScheme: () =>
        set((state) => ({
          colorScheme: state.colorScheme === "light" ? "dark" : "light",
        })),
      setColorScheme: (scheme) => set({ colorScheme: scheme }),
    }),
    {
      name: "app-theme-setting",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
)

export default useThemeStore
