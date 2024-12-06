import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import {
  getOdometerRecords,
  addOdometerRecord,
  getLastOdometerRecord,
} from "~/api/odometer-records"
import type { OdometerRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"

const QUERY_KEY = "odometerrecords"
const _queryClient = queryClient

export const getQueryKey = (
  vehicleId: number,
  odometerRecord?: OdometerRecord
) => {
  if (odometerRecord) return ["QUERY_KEY", vehicleId, odometerRecord]
  return [QUERY_KEY, vehicleId]
}

export const useOdometerRecords = (vehicleId: number) => {
  const query = useQuery<OdometerRecord>({
    queryKey: getQueryKey(vehicleId),
    queryFn: async () => await getOdometerRecords(vehicleId),
  })
  return query
}

export const useLastOdometerRecord = (vehicleId: number) => {
  const query = useQuery<OdometerRecord>({
    queryKey: getQueryKey(vehicleId),
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
    }) => await addOdometerRecord(vehicleId, odometerRecord),
    onSuccess: (_, variables) => {
      const { vehicleId, odometerRecord } = variables
      _queryClient.invalidateQueries(
        getQueryKey(vehicleId, odometerRecord) as InvalidateQueryFilters
      )
    },
  })
  return query
}
