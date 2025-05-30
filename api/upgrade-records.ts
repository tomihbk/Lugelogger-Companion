import { ApiTypeEnum } from "./api-enum"
import { axios } from "./axios"
import type { UpgradeRecord } from "./index-records.types"

const ENDPOINT = "/api/vehicle/upgraderecords"

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

export const updateUpgradeRecord = async (
  _recordID: number,
  _upgradeRecordData: UpgradeRecord
) => {
  const { data } = await axios.put(`${ENDPOINT}/${ApiTypeEnum.UPDATE}`, {
    id: _recordID,
    ..._upgradeRecordData[0],
  })
  return data
}

export const deleteUpgradeRecord = async (
  _recordID: number
) => {
  const { data } = await axios.delete(`${ENDPOINT}/${ApiTypeEnum.DELETE}`, {
    params: { id: _recordID }
  })
  return data
}
