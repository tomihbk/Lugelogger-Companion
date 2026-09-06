import { useMutation, useQuery } from "@tanstack/react-query"
import {
  getRepairRecords,
  addRepairRecord,
  updateRepairRecord,
  deleteRepairRecord,
} from "~/api/repair-records"
import type { RepairRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"
import { recordKeys } from "./queryKeys"
import { ErrorTracking } from "~/utils/ErrorTracking"
import { useAnalytics } from "~/utils/Analytics"

const _queryClient = queryClient

export const useRepairRecords = (vehicleId: number) => {
  const query = useQuery<RepairRecord>({
    queryKey: recordKeys.repair.allRecords(vehicleId),
    queryFn: async () => await getRepairRecords(vehicleId),
  })
  return query
}

export const useAddRepairRecord = () => {
  const analytics = useAnalytics()
  const query = useMutation({
    mutationFn: async ({
      vehicleId,
      repairRecord,
    }: {
      vehicleId: number
      repairRecord: RepairRecord
    }) => {
      ErrorTracking.addBreadcrumb("Adding repair record", "records.repair")
      return await addRepairRecord(vehicleId, repairRecord)
    },
    onError: (err) => console.error("useAddRepairRecord error : " + err),
    onSuccess: (_, variables) => {
      analytics.recordCreated("repair")
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.repair.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useUpdateRepairRecord = () => {
  const analytics = useAnalytics()
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
      repairRecord,
    }: {
      recordID: number
      vehicleId: number
      repairRecord: RepairRecord
    }) => {
      ErrorTracking.addBreadcrumb("Updating repair record", "records.repair")
      return await updateRepairRecord(recordID, repairRecord)
    },
    onSuccess: (_, variables) => {
      analytics.recordUpdated("repair")
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.repair.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useDeleteRepairRecord = () => {
  const analytics = useAnalytics()
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
    }: {
      recordID: number
      vehicleId: number
    }) => {
      ErrorTracking.addBreadcrumb("Deleting repair record", "records.repair")
      return await deleteRepairRecord(recordID)
    },
    onSuccess: (_, variables) => {
      analytics.recordDeleted("repair")
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.repair.allRecords(vehicleId),
      })
    },
  })
  return query
}
