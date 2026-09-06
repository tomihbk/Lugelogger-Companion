import { useMutation, useQuery } from "@tanstack/react-query"
import {
  getUpgradeRecords,
  addUpgradeRecord,
  updateUpgradeRecord,
  deleteUpgradeRecord,
} from "~/api/upgrade-records"
import type { UpgradeRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"
import { recordKeys } from "./queryKeys"
import { ErrorTracking } from "~/utils/ErrorTracking"

const _queryClient = queryClient

export const useUpgradeRecords = (vehicleId: number) => {
  const query = useQuery<UpgradeRecord>({
    queryKey: recordKeys.upgrade.allRecords(vehicleId),
    queryFn: async () => await getUpgradeRecords(vehicleId),
  })
  return query
}

export const useAddUpgradeRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      vehicleId,
      upgradeRecord,
    }: {
      vehicleId: number
      upgradeRecord: UpgradeRecord
    }) => {
      ErrorTracking.addBreadcrumb("Adding upgrade record", "records.upgrade")
      return await addUpgradeRecord(vehicleId, upgradeRecord)
    },
    onError: (err) => console.error("useAddUpgradeRecord error : " + err),
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.upgrade.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useUpdateUpgradeRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
      upgradeRecord,
    }: {
      recordID: number
      vehicleId: number
      upgradeRecord: UpgradeRecord
    }) => {
      ErrorTracking.addBreadcrumb("Updating upgrade record", "records.upgrade")
      return await updateUpgradeRecord(recordID, upgradeRecord)
    },
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.upgrade.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useDeleteUpgradeRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
    }: {
      recordID: number
      vehicleId: number
    }) => {
      ErrorTracking.addBreadcrumb("Deleting upgrade record", "records.upgrade")
      return await deleteUpgradeRecord(recordID)
    },
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.upgrade.allRecords(vehicleId),
      })
    },
  })
  return query
}
