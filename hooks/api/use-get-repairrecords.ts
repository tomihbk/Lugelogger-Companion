import {
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { getRepairRecords, addRepairRecord, updateRepairRecord, deleteRepairRecord } from "~/api/repair-records"
import type { RepairRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"
import { recordKeys } from "./queryKeys"
const _queryClient = queryClient

export const useRepairRecords = (vehicleId: number) => {
  const query = useQuery<RepairRecord>({
    queryKey: recordKeys.repair.allRecords(vehicleId),
    queryFn: async () => await getRepairRecords(vehicleId),
  })
  return query
}

export const useAddRepairRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      vehicleId,
      repairRecord,
    }: {
      vehicleId: number
      repairRecord: RepairRecord
    }) => await addRepairRecord(vehicleId, repairRecord),
    onError: (err) => console.error("useAddRepairRecord error : " + err),
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.repair.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useUpdateRepairRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
      repairRecord,
    }: {
      recordID: number
      vehicleId: number
      repairRecord: RepairRecord
    }) => await updateRepairRecord(recordID, repairRecord),
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.repair.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useDeleteRepairRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
    }: {
      recordID: number
      vehicleId: number
    }) => await deleteRepairRecord(recordID),
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.repair.allRecords(vehicleId),
      })
    },
  })
  return query
}
