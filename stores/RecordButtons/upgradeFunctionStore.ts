import { IsFieldVisible } from "./visible-field.types"

export interface UpgradeFunctionStoreProp {
  key: string
  buttonColor: { light: string; dark: string }
  visibleFields: IsFieldVisible
  mandatoryFields: IsFieldVisible
}

const UpgradeFunctionStore: UpgradeFunctionStoreProp = {
  key: "upgrade",
    buttonColor: {
    light: "#E00004",
    dark: "#FF4D4F",
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

export default UpgradeFunctionStore
