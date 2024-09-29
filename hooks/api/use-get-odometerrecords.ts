import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { getOdometerRecords, addOdometerRecord, getLastOdometerRecord } from "~/api/odometer-records"
import type { OdometerRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"

const QUERY_KEY = "odometerrecords"
const _queryClient = queryClient

export const getQueryKey = (
  vehicleId: number,
  serviceRecord?: OdometerRecord
) => {
  if (serviceRecord) return ["QUERY_KEY", vehicleId, serviceRecord]
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


export const useAddOdometerRecord = (
  vehicleId: number,
  serviceRecord: OdometerRecord
) => {
  const query = useMutation<OdometerRecord>({
    mutationFn: async () => await addOdometerRecord(vehicleId, serviceRecord),
    onSuccess: () => {
      _queryClient.invalidateQueries(
        getQueryKey(vehicleId, serviceRecord) as InvalidateQueryFilters
      )
    },
  })
  return query
}
