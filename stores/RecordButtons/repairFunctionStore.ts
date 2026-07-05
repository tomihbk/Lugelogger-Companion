import { IsFieldVisible } from "./visible-field.types"

export interface RepairFunctionStoreProp {
  key: string
  buttonColor: { light: string; dark: string }
  visibleFields: IsFieldVisible
  mandatoryFields: IsFieldVisible
}

const RepairFunctionStore: RepairFunctionStoreProp = {
  key: "repair",
  buttonColor: {
    light: "#00892B",
    dark: "#34C95E",
  },
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
