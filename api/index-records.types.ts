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
