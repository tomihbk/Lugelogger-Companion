import { create } from "zustand"
import { IsFieldVisible } from "./visible-field.types"

export interface OdometerFunctionStoreProp {
  key: string
  buttonColor: string
  visibleFields: IsFieldVisible
  mandatoryFields: IsFieldVisible
  //increase: (by: number) => void
}

const OdometerFunctionStore = create<OdometerFunctionStoreProp>()(
    (set) => ({
      key:"odometer",
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
        initialOdometer: true,
        odometer: true,
        cost: false,
        notes: false,
        description: true,
        fuelConsumed: true,
        isFulltoFill: true,
        missedFuelUp: false,
        tags: false,
      },
    }
  )
)


// mandatoryFields: {
//   date: true,
//   initialOdometer: false,
//   odometer: true,
//   cost: false,
//   notes: false,
//   description: false,
//   fuelConsumed: false,
//   isFulltoFill: false,
//   missedFuelUp: false,
//   tags: false,
// }
export default OdometerFunctionStore
