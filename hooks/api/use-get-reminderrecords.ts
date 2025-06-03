import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { getReminderRecords, addReminderRecord, updateReminderRecord } from "~/api/reminder-records"
import type { ReminderRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"
import { deleteReminderRecord } from "~/api/reminder-records"

const QUERY_KEY = "reminderrecords"
const _queryClient = queryClient

export const getQueryKey = (
  vehicleId: number,
  requestType?: string,
  reminderRecord?: ReminderRecord
) => {
  if (reminderRecord) return [QUERY_KEY, vehicleId, reminderRecord]
  return [QUERY_KEY, requestType, vehicleId]
}

export const useReminderRecords = (vehicleId: number) => {
  const query = useQuery<ReminderRecord>({
    queryKey: getQueryKey(vehicleId, "all-reminder-data"),
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
    }) => await addReminderRecord(vehicleId, reminderRecord),
    onError: (err) => console.error("useAddReminderRecord error : " + err),
    onSuccess: (_, variables) => {
      const { vehicleId, reminderRecord } = variables
      _queryClient.invalidateQueries(
        getQueryKey(vehicleId, undefined, reminderRecord) as InvalidateQueryFilters
      )
    },
  })
  return query
}

export const useUpdateReminderRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      reminderRecord,
    }: {
      recordID: number
      reminderRecord: ReminderRecord
    }) => await updateReminderRecord(recordID, reminderRecord),
    onSuccess: (_, variables) => {
      const { recordID, reminderRecord } = variables
      _queryClient.invalidateQueries(
        getQueryKey(recordID, undefined, reminderRecord) as InvalidateQueryFilters
      )
    },
  })
  return query
}

export const useDeleteReminderRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
    }: {
      recordID: number
    }) => await deleteReminderRecord(recordID),
    onSuccess: (_, variables) => {
      const { recordID } = variables
      _queryClient.invalidateQueries(
        getQueryKey(recordID, undefined) as InvalidateQueryFilters
      )
    },
  })
  return query
}
