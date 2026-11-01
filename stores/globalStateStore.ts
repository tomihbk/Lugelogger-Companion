import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { zustandStorage } from "./zustandStorage"

interface GlobalStateStoreProp {
  favoriteCarId: number
  selectedTabName: string
  preferredCurrencySymbol: string
  preferredDistanceMeasurement: string
  preferredLiquidMeasurement: string
  isUseUSMPG: boolean
  isUseUKMPG: boolean
  optInCrashReports: boolean
  telemetryUserId: string | null,
  setFavoriteCar: (carId: number) => void
  setSelectedTabName: (lastSelectedTab: string) => void
  setPreferredCurrencySymbol: (currencyISO4217Symbol: string) => void
  setPreferredDistanceMeasurement: (kmOrMiles: "km" | "mi") => void
  setPreferredDLiquidMeasurement: (LOrGal: string) => void
  setUseUSMPG: (useUSMPG: boolean) => void
  setUseUKMPG: (useUKMPG: boolean) => void
  setOptInCrashReports: (optInCrashReports: boolean) => void
  setTelemetryUserId: (telemetryUserId: string | null) => void
}

const GlobalStateStore = create<GlobalStateStoreProp>()(
  persist(
    (set) => ({
      favoriteCarId: 1,
      isInteractedWithForms: false,
      selectedTabName: "home",
      preferredCurrencySymbol: "USD",
      preferredDistanceMeasurement: "km",
      preferredLiquidMeasurement: "L",
      isUseUSMPG: false,
      isUseUKMPG: false,
      optInCrashReports: true,
      telemetryUserId: null,
      setFavoriteCar: (carId) => set(() => ({ favoriteCarId: carId })),
      setPreferredCurrencySymbol: (currencyISO4217Symbol) =>
        set(() => ({ preferredCurrencySymbol: currencyISO4217Symbol })),
      setPreferredDistanceMeasurement: (kmOrMiles) =>
        set(() => ({ preferredDistanceMeasurement: kmOrMiles })),
      setPreferredDLiquidMeasurement: (LOrGal) =>
        set(() => ({ preferredLiquidMeasurement: LOrGal })),
      setSelectedTabName: (lastSelectedTab) =>
        set(() => ({ selectedTabName: lastSelectedTab })),
      setUseUSMPG: (useUSMPG) => set(() => ({ isUseUSMPG: useUSMPG })),
      setUseUKMPG: (useUKMPG) => set(() => ({ isUseUKMPG: useUKMPG })),
      setTelemetryUserId: (telemetryUserId: string | null) => set(() => ({ telemetryUserId })),
      setOptInCrashReports: (optInCrashReports) =>
        set(() => ({ optInCrashReports })),
    }),

    {
      name: "global-state-storage", // name of item in the persist store - must be unique
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)

export default GlobalStateStore
