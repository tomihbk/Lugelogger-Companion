import { IsFieldVisible } from "./visible-field.types"

export interface ServiceFunctionStoreProp {
  key: string
  buttonColor: string
  visibleFields: IsFieldVisible
  mandatoryFields: IsFieldVisible
}

const ServiceFunctionStore: ServiceFunctionStoreProp = {
  key: "service",
  buttonColor: "#1C06DC",
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
