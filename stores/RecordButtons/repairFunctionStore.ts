import { IsFieldVisible } from "./visible-field.types"

export interface RepairFunctionStoreProp {
  key: string
  buttonColor: string
  visibleFields: IsFieldVisible
  mandatoryFields: IsFieldVisible
}

const RepairFunctionStore: RepairFunctionStoreProp = {
  key: "repair",
  buttonColor: "#00892B",
  visibleFields: {
    date: true,
    initialOdometer: false,
    odometer: true,
    cost: true,
    notes: true,
    description: true,
    fuelConsumed: false,
    isFulltoFill: false,
    missedFuelUp: false,
    tags: true,
  },
  mandatoryFields: {
    date: true,
    initialOdometer: false,
    odometer: true,
    cost: true,
    notes: false,
    description: true,
    fuelConsumed: false,
    isFulltoFill: false,
    missedFuelUp: false,
    tags: false,
  },
}

export default RepairFunctionStore
