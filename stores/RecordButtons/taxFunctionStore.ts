import { IsFieldVisible } from "./visible-field.types"

export interface TaxFunctionStoreProp {
  key: string
  buttonColor: { light: string; dark: string }
  visibleFields: IsFieldVisible
  mandatoryFields: IsFieldVisible
}

const TaxFunctionStore: TaxFunctionStoreProp = {
  key: "tax",
    buttonColor: {
    light: "#5e636e",
    dark: "#5B7FFF",
  },
  visibleFields: {
    date: true,
    initialOdometer: false,
    odometer: false,
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
    odometer: false,
    cost: true,
    notes: false,
    description: true,
    fuelConsumed: false,
    isFulltoFill: false,
    missedFuelUp: false,
    tags: false,
  },
}

export default TaxFunctionStore
