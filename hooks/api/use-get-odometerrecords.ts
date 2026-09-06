import { useMutation, useQuery } from "@tanstack/react-query"
import {
  getOdometerRecords,
  addOdometerRecord,
  getLastOdometerRecord,
  updateOdometerRecord,
  deleteOdometerRecord,
} from "~/api/odometer-records"
import type { OdometerRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"
import { recordKeys } from "./queryKeys"
import { ErrorTracking } from "~/utils/ErrorTracking"

const _queryClient = queryClient

export const useOdometerRecords = (vehicleId: number) => {
  const query = useQuery<OdometerRecord>({
    queryKey: recordKeys.odometer.allRecords(vehicleId),
    queryFn: async () => await getOdometerRecords(vehicleId),
  })
  return query
}

export const useLastOdometerRecord = (vehicleId: number) => {
  const query = useQuery<OdometerRecord>({
    queryKey: recordKeys.odometer.last(vehicleId),
    queryFn: async () => await getLastOdometerRecord(vehicleId),
  })
  return query
}

export const useAddOdometerRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      vehicleId,
      odometerRecord,
    }: {
      vehicleId: number
      odometerRecord: OdometerRecord
    }) => {
      ErrorTracking.addBreadcrumb("Adding odometer record", "records.odometer")
      return await addOdometerRecord(vehicleId, odometerRecord)
    },
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.odometer.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useUpdateOdometerRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
      odometerRecord,
    }: {
      recordID: number
      vehicleId: number
      odometerRecord: OdometerRecord
    }) => {
      ErrorTracking.addBreadcrumb(
        "Updating odometer record",
        "records.odometer",
      )
      return await updateOdometerRecord(recordID, odometerRecord)
    },
    onSuccess: (_, { vehicleId }) => {
      _queryClient.invalidateQueries({
        queryKey: recordKeys.odometer.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useDeleteOdometerRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
    }: {
      recordID: number
      vehicleId: number
    }) => {
      ErrorTracking.addBreadcrumb(
        "Deleting odometer record",
        "records.odometer",
      )
      return await deleteOdometerRecord(recordID)
    },
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.odometer.allRecords(vehicleId),
      })
    },
  })
  return query
}
