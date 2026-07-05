import { IsFieldVisible } from "./visible-field.types"

export interface FuelFunctionStoreProp {
  key: string
  buttonColor: { light: string; dark: string }
  visibleFields: IsFieldVisible
  mandatoryFields: IsFieldVisible
}

const FuelFunctionStore: FuelFunctionStoreProp = {
  key: "fuel",
    buttonColor: {
    light: "#009476",
    dark: "#00C49A",
  },
  visibleFields: {
    date: true,
    initialOdometer: false,
    odometer: true,
    cost: true,
    notes: true,
    description: false,
    fuelConsumed: true,
    isFulltoFill: true,
    missedFuelUp: true,
    tags: true,
  },
  mandatoryFields: {
    date: true,
    initialOdometer: false,
    odometer: true,
    cost: true,
    notes: false,
    description: false,
    fuelConsumed: true,
    isFulltoFill: true,
    missedFuelUp: true,
    tags: false,
  },
}

export default FuelFunctionStore
