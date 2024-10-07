import { create } from "zustand"
import { persist } from "zustand/middleware"
import { IsFieldVisible } from "./visible-field.types"

interface OdometerButtonStoreProp {
  buttonColor: string
  visibleFields: IsFieldVisible
  mandatoryFields: IsFieldVisible
  //increase: (by: number) => void
}

const OdometerButtonStore = create<OdometerButtonStoreProp>()(
  persist(
    (set) => ({
      buttonColor: "#C09F1A",
      visibleFields: {
        date: true,
        initialOdometer: true,
        odometer: true,
        cost: false,
        notes: true,
        description: false,
        fuelConsumed: false,
        isFulltoFill: false,
        missedFuelUp: false,
        tags: true,
      },
      mandatoryFields: {
        date: true,
        initialOdometer: false,
        odometer: true,
        cost: false,
        notes: false,
        description: false,
        fuelConsumed: false,
        isFulltoFill: false,
        missedFuelUp: false,
        tags: false,
      },
    }),
    {
      name: "odometer-button-storage", // name of item in the persist store - must be unique
    }
  )
)

export default OdometerButtonStore
