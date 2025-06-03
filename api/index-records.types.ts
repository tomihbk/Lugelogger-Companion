import { RecordBase } from "./records-base.types"

export type ServiceRecord = RecordBase
export type OdometerRecord = {
  date: string
  initialOdometer: string
  odometer: string
  notes?: string
  tags?: string
}[]
export type RepairRecord = RecordBase
export type UpgradeRecord = RecordBase
export type TaxRecord = RecordBase
export type FuelRecordGet = {
  useMPG: boolean
  useUKMPG: boolean
}[]
export type FuelRecordAdd = RecordBase &
{
    fuelConsumed: string
    isFillToFull: boolean
    missedFuelUp: boolean
}[]

export type ReminderRecord = {
  description: string
  dueOdometer: string
  dueDate: string
  metric: "Date" | "Odometer" | "Both"
  notes?: string
  tags?: string
  urgency?: string
}[]

export type VehicleInfo = {
  id: number
  imageLocation: string
  year: number
  make: string
  model: string
  licensePlate: string
  purchaseDate: string | null
  soldDate: string | null
  purchasePrice: number
  soldPrice: number
  isElectric: boolean
  isDiesel: boolean
  useHours: boolean
  odometerOptional: boolean
  extraFields: any[]
  tags: string[]
  hasOdometerAdjustment: boolean
  odometerMultiplier: string
  odometerDifference: string
  dashboardMetrics: any[]
  vehicleIdentifier: string
}
export type UserInfo = {
  username: string
  emailAddress: string
  isAdmin: boolean
  isRoot: boolean
}