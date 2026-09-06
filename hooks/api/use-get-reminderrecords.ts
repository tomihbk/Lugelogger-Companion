import { useMutation, useQuery } from "@tanstack/react-query"
import {
  getReminderRecords,
  addReminderRecord,
  updateReminderRecord,
} from "~/api/reminder-records"
import type { ReminderRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"
import { deleteReminderRecord } from "~/api/reminder-records"
import { recordKeys } from "./queryKeys"
import { ErrorTracking } from "~/utils/ErrorTracking"

const _queryClient = queryClient

export const useReminderRecords = (vehicleId: number) => {
  const query = useQuery<ReminderRecord>({
    queryKey: recordKeys.reminder.allRecords(vehicleId),
    queryFn: async () => await getReminderRecords(vehicleId),
  })
  return query
}

export const useAddReminderRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      vehicleId,
      reminderRecord,
    }: {
      vehicleId: number
      reminderRecord: ReminderRecord
    }) => {
      ErrorTracking.addBreadcrumb("Adding reminder record", "records.reminder")
      return await addReminderRecord(vehicleId, reminderRecord)
    },
    onError: (err) => console.error("useAddReminderRecord error : " + err),
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.reminder.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useUpdateReminderRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
      reminderRecord,
    }: {
      recordID: number
      vehicleId: number
      reminderRecord: ReminderRecord
    }) => {
      ErrorTracking.addBreadcrumb(
        "Updating reminder record",
        "records.reminder",
      )
      return await updateReminderRecord(recordID, reminderRecord)
    },
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.reminder.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useDeleteReminderRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
    }: {
      recordID: number
      vehicleId: number
    }) => {
      ErrorTracking.addBreadcrumb(
        "Deleting reminder record",
        "records.reminder",
      )
      return await deleteReminderRecord(recordID)
    },
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.reminder.allRecords(vehicleId),
      })
    },
  })
  return query
}
