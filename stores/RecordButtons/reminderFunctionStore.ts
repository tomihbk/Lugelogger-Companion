import { IsFieldVisible } from "./visible-field.types"

export interface ReminderFunctionStoreProp {
  key: string
  buttonColor: string
  visibleFields: IsFieldVisible
  mandatoryFields: IsFieldVisible
}

const ReminderFunctionStore: ReminderFunctionStoreProp = {
  key: "reminder",
  buttonColor: "#BF0296",
  visibleFields: {
    date: false,
    initialOdometer: false,
    odometer: false,
    cost: false,
    notes: true,
    description: true,
    fuelConsumed: false,
    isFulltoFill: false,
    missedFuelUp: false,
    tags: true,
    dueOdometer: true,
    dueDate: true,
    metric: true
  },
  mandatoryFields: {
    date: false,
    initialOdometer: false,
    odometer: false,
    cost: false,
    notes: false,
    description: true,
    fuelConsumed: false,
    isFulltoFill: false,
    missedFuelUp: false,
    tags: false,
    dueOdometer: false,
    dueDate: false,
    metric: true
  },
}

export default ReminderFunctionStore
