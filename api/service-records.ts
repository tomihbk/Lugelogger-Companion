import { ApiTypeEnum } from "./api-enum"
import { axios } from "./axios"
import type { ServiceRecord } from "./service-record.types"

const ENDPOINT = "/servicerecords"

export const getServiceRecords = async (_vehicleId: number) => {
  const { data } = await axios.get<ServiceRecord>(ENDPOINT, {
    params: { vehicleId: _vehicleId },
  })
  return data
}

export const addServiceRecord = async (
  _vehicleId: number,
  _serviceRecordData: ServiceRecord
) => {
  console.log(
    `${ENDPOINT}/${ApiTypeEnum.ADD} : ` +
      JSON.stringify({
        vehicleId: _vehicleId,
        ..._serviceRecordData[0],
      })
  )

  const { data } = await axios.post(`${ENDPOINT}/${ApiTypeEnum.ADD}`, {
    vehicleId: _vehicleId,
    ..._serviceRecordData[0],
  })

  return data
}
