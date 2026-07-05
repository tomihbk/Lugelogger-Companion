import { IsFieldVisible } from "./visible-field.types"
export interface OdometerFunctionStoreProp {
  key: string
  buttonColor: { light: string; dark: string }
  visibleFields: IsFieldVisible
  mandatoryFields: IsFieldVisible
}

const OdometerFunctionStore: OdometerFunctionStoreProp = {
  key: "odometer",
  buttonColor: {
    light: "#C09F1A",
    dark: "#D4B84A",
  },
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
}

export default OdometerFunctionStore
