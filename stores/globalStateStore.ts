import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { zustandStorage } from "./zustandStorage"

interface GlobalStateStoreProp {
  favoriteCarId: number
  setFavoriteCar: (carId: number) => void
}

const GlobalStateStore = create<GlobalStateStoreProp>()(
  persist(
    (set) => ({
      favoriteCarId: 2,
      setFavoriteCar: (carId) => set(() => ({ favoriteCarId: carId })),
    }),
    {
      name: "global-state-storage", // name of item in the persist store - must be unique
      storage: createJSONStorage(() => zustandStorage),
    }
  )
)

export default GlobalStateStore
