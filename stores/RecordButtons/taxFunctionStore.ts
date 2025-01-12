import { IsFieldVisible } from "./visible-field.types"

export interface TaxFunctionStoreProp {
  key: string
  buttonColor: string
  visibleFields: IsFieldVisible
  mandatoryFields: IsFieldVisible
}

const TaxFunctionStore: TaxFunctionStoreProp = {
  key: "tax",
  buttonColor: "#5e636e",
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
