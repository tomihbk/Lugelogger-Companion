import { ApiTypeEnum } from "./api-enum"
import { axios } from "./axios"
import type { ReminderRecord } from "./index-records.types"

const ENDPOINT = "/api/vehicle/reminders"

export const getReminderRecords = async (_vehicleId: number) => {
  const { data } = await axios.get<ReminderRecord>(ENDPOINT, {
    params: { vehicleId: _vehicleId },
  })
  return data
}

export const addReminderRecord = async (
  _vehicleId: number,
  _reminderRecordData: ReminderRecord
) => {
  const { data } = await axios.post(`${ENDPOINT}/${ApiTypeEnum.ADD}`, {
    vehicleId: _vehicleId,
    ..._reminderRecordData[0],
  })
  return data
}

export const updateReminderRecord = async (
  _recordID: number,
  _reminderRecordData: ReminderRecord
) => {
  const { data } = await axios.put(`${ENDPOINT}/${ApiTypeEnum.UPDATE}`, {
    id: _recordID,
    ..._reminderRecordData[0],
  })
  return data
}

export const deleteReminderRecord = async (
  _recordID: number
) => {
  const { data } = await axios.delete(`${ENDPOINT}/${ApiTypeEnum.DELETE}`, {
    params: { id: _recordID }
  })
  return data
}

