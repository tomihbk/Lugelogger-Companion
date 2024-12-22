import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { getRepairRecords, addRepairRecord } from "~/api/repair-records"
import type { RepairRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"

const QUERY_KEY = "repairrecords"
const _queryClient = queryClient

export const getQueryKey = (
  vehicleId: number,
  requestType?: string,
  repairRecord?: RepairRecord
) => {
  if (repairRecord) return [QUERY_KEY, vehicleId, repairRecord]
  return [QUERY_KEY, requestType, vehicleId]
}

export const useRepairRecords = (vehicleId: number) => {
  const query = useQuery<RepairRecord>({
    queryKey: getQueryKey(vehicleId, "all-repair-data"),
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
      const { vehicleId, repairRecord } = variables
      _queryClient.invalidateQueries(
        getQueryKey(vehicleId, undefined, repairRecord) as InvalidateQueryFilters
      )
    },
  })
  return query
}