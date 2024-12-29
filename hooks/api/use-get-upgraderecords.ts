import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { getUpgradeRecords, addUpgradeRecord } from "~/api/upgrade-records"
import type { UpgradeRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"

const QUERY_KEY = "upgraderecords"
const _queryClient = queryClient

export const getQueryKey = (
  vehicleId: number,
  requestType?: string,
  upgradeRecord?: UpgradeRecord
) => {
  if (upgradeRecord) return [QUERY_KEY, vehicleId, upgradeRecord]
  return [QUERY_KEY, requestType, vehicleId]
}

export const useUpgradeRecords = (vehicleId: number) => {
  const query = useQuery<UpgradeRecord>({
    queryKey: getQueryKey(vehicleId, "all-upgrade-data"),
    queryFn: async () => await getUpgradeRecords(vehicleId),
  })
  return query
}

export const useAddUpgradeRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      vehicleId,
      upgradeRecord: upgradeRecord,
    }: {
      vehicleId: number
      upgradeRecord: UpgradeRecord
    }) => await addUpgradeRecord(vehicleId, upgradeRecord),
    onError: (err) => console.error("useAddUpgradeRecord error : " + err),
    onSuccess: (_, variables) => {
      const { vehicleId, upgradeRecord } = variables
      _queryClient.invalidateQueries(
        getQueryKey(vehicleId, undefined, upgradeRecord) as InvalidateQueryFilters
      )
    },
  })
  return query
}