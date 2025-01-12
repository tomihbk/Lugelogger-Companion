import { ApiTypeEnum } from "./api-enum"
import { axios } from "./axios"
import type { TaxRecord } from "./index-records.types"

const ENDPOINT = "/taxrecords"

export const getTaxRecords = async (_vehicleId: number) => {
  const { data } = await axios.get<TaxRecord>(ENDPOINT, {
    params: { vehicleId: _vehicleId },
  })
  return data
}

export const addTaxRecord = async (
  _vehicleId: number,
  _taxRecordData: TaxRecord
) => {
  const { data } = await axios.post(`${ENDPOINT}/${ApiTypeEnum.ADD}`, {
    vehicleId: _vehicleId,
    ..._taxRecordData[0],
  })
  return data
}
