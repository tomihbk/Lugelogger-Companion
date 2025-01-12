import { ApiTypeEnum } from "./api-enum"
import { axios } from "./axios"
import type { FuelRecordAdd, FuelRecordGet } from "./index-records.types"
import GlobalStateStore from "~/stores/globalStateStore"

const ENDPOINT = "/gasrecords"

export const getFuelRecords = async (_vehicleId: number) => {
  const { isUseUKMPG, isUseUSMPG } = GlobalStateStore.getState()

  const { data } = await axios.get<FuelRecordGet | FuelRecordAdd>(ENDPOINT, {
    params: { vehicleId: _vehicleId, useMPG: isUseUSMPG, useUKMPG: isUseUKMPG },
  })
  return data
}

export const addFuelRecord = async (
  _vehicleId: number,
  _fuelRecordData: FuelRecordAdd
) => {
  const { data } = await axios.post(`${ENDPOINT}/${ApiTypeEnum.ADD}`, {
    vehicleId: _vehicleId,
    ..._fuelRecordData[0],
  })
  return data
}
