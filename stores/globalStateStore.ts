import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { zustandStorage } from "./zustandStorage"

interface GlobalStateStoreProp {
  favoriteCarId: number
  isReturnFromForms: boolean
  selectedTabName: string
  preferredCurrencySymbol: string
  setFavoriteCar: (carId: number) => void
  setIsReturnFromForms: (state: boolean) => void
  setSelectedTabName: (lastSelectedTab: string) => void
  setPreferredCurrencySymbol: (currencyISO4217Symbol: string) => void
}

const GlobalStateStore = create<GlobalStateStoreProp>()(
  persist(
    (set) => ({
      favoriteCarId: 2,
      isReturnFromForms: false,
      isInteractedWithForms: false,
      selectedTabName: "home",
      preferredCurrencySymbol: "CZK",
      setIsReturnFromForms: (state) =>
        set(() => ({ isReturnFromForms: state })),
      setFavoriteCar: (carId) => set(() => ({ favoriteCarId: carId })),
      setPreferredCurrencySymbol: (currencyISO4217Symbol) =>
        set(() => ({ preferredCurrencySymbol: currencyISO4217Symbol })),
      setSelectedTabName: (lastSelectedTab) =>
        set(() => ({ selectedTabName: lastSelectedTab })),
    }),
    {
      name: "global-state-storage", // name of item in the persist store - must be unique
      storage: createJSONStorage(() => zustandStorage),
    }
  )
)

export default GlobalStateStore
