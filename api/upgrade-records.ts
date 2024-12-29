import { ApiTypeEnum } from "./api-enum"
import { axios } from "./axios"
import type { UpgradeRecord } from "./index-records.types"

const ENDPOINT = "/upgraderecords"

export const getUpgradeRecords = async (_vehicleId: number) => {
  const { data } = await axios.get<UpgradeRecord>(ENDPOINT, {
    params: { vehicleId: _vehicleId },
  })
  return data
}

export const addUpgradeRecord = async (
  _vehicleId: number,
  _upgradeRecordData: UpgradeRecord
) => {
  const { data } = await axios.post(`${ENDPOINT}/${ApiTypeEnum.ADD}`, {
    vehicleId: _vehicleId,
    ..._upgradeRecordData[0],
  })
  return data
}
