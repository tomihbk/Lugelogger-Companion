import { ApiTypeEnum } from "./api-enum"
import { axios } from "./axios"
import type { RepairRecord } from "./index-records.types"

const ENDPOINT = "/repairrecords"

export const getRepairRecords = async (_vehicleId: number) => {
  const { data } = await axios.get<RepairRecord>(ENDPOINT, {
    params: { vehicleId: _vehicleId },
  })
  return data
}

export const addRepairRecord = async (
  _vehicleId: number,
  _repairRecordData: RepairRecord
) => {
  const { data } = await axios.post(`${ENDPOINT}/${ApiTypeEnum.ADD}`, {
    vehicleId: _vehicleId,
    ..._repairRecordData[0],
  })
  return data
}
