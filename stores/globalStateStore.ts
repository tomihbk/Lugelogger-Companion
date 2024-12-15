import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { zustandStorage } from "./zustandStorage"

interface GlobalStateStoreProp {
  favoriteCarId: number
  selectedTabName: string
  preferredCurrencySymbol: string
  preferredDistanceMeasurement: string
  setFavoriteCar: (carId: number) => void
  setSelectedTabName: (lastSelectedTab: string) => void
  setPreferredCurrencySymbol: (currencyISO4217Symbol: string) => void
  setPreferredDistanceMeasurement: (kmOrMiles: string) => void
}

const GlobalStateStore = create<GlobalStateStoreProp>()(
  persist(
    (set) => ({
      favoriteCarId: 2,
      isInteractedWithForms: false,
      selectedTabName: "home",
      preferredCurrencySymbol: "CZK",
      preferredDistanceMeasurement: "km",
      setFavoriteCar: (carId) => set(() => ({ favoriteCarId: carId })),
      setPreferredCurrencySymbol: (currencyISO4217Symbol) =>
        set(() => ({ preferredCurrencySymbol: currencyISO4217Symbol })),
      setPreferredDistanceMeasurement: (kmOrMiles) =>
        set(() => ({ preferredDistanceMeasurement: kmOrMiles })),
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
