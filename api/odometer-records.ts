import { ApiTypeEnum } from "./api-enum"
import { axios } from "./axios"
import type { OdometerRecord } from "./index-records.types"

const ENDPOINT = "/odometerrecords"

export const getOdometerRecords = async (_vehicleId: number) => {
  const { data } = await axios.get<OdometerRecord>(ENDPOINT, {
    params: { vehicleId: _vehicleId },
  })
  return data
}

export const getLastOdometerRecord = async (_vehicleId: number) => {
  const { data } = await axios.get<OdometerRecord>(
    `${ENDPOINT}/${ApiTypeEnum.LATEST}`,
    {
      params: { vehicleId: _vehicleId },
    }
  )
  return data
}

export const addOdometerRecord = async (
  _vehicleId: number,
  _odometerRecordData: OdometerRecord
) => {
  const { data } = await axios.post(`${ENDPOINT}/${ApiTypeEnum.ADD}`, {
    vehicleId: _vehicleId,
    ..._odometerRecordData[0],
  })
  return data
}

export const updateOdometerRecord = async (
  _recordID: number,
  _odometerRecordData: OdometerRecord
) => {
  const { data } = await axios.put(`${ENDPOINT}/${ApiTypeEnum.UPDATE}`, {
    id: _recordID,
    ..._odometerRecordData[0],
  })
  return data
}

export const deleteOdometerRecord = async (
  _recordID: number
) => {
  const { data } = await axios.delete(`${ENDPOINT}/${ApiTypeEnum.DELETE}`, {
    params: { id: _recordID }
  })
  return data
}

