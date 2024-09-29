import { RecordBase } from "./records-base.types"

export type ServiceRecord = RecordBase
export type OdometerRecord = RecordBase
export type RepairRecord = RecordBase
export type UpgradeRecord = RecordBase
export type TaxRecord = RecordBase
export type GasRecordAdd = {
  vehicleId: number
  useMPG: boolean
  useUKMPG: boolean
}
export type GasRecordGet = RecordBase & {
  fuelConsumed: string
  isFillToFull: boolean
  missedFuelUp: boolean
}
