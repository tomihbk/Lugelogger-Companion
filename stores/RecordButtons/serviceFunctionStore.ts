import { IsFieldVisible } from "./visible-field.types"

export interface ServiceFunctionStoreProp {
  key: string
  buttonColor: { light: string; dark: string }
  visibleFields: IsFieldVisible
  mandatoryFields: IsFieldVisible
}

const ServiceFunctionStore: ServiceFunctionStoreProp = {
  key: "service",
  buttonColor: {
    light: "#1C06DC",
    dark: "#5B7FFF",
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

export default ServiceFunctionStore
