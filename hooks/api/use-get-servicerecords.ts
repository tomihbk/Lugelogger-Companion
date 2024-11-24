import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { getServiceRecords, addServiceRecord } from "~/api/service-records"
import type { ServiceRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"

const QUERY_KEY = "servicerecords"
const _queryClient = queryClient

export const getQueryKey = (
  vehicleId: number,
  serviceRecord?: ServiceRecord
) => {
  if (serviceRecord) return ["QUERY_KEY", vehicleId, serviceRecord]
  return [QUERY_KEY, vehicleId]
}

export const useServiceRecords = (vehicleId: number) => {
  const query = useQuery<ServiceRecord>({
    queryKey: getQueryKey(vehicleId),
    queryFn: async () => await getServiceRecords(vehicleId),
  })
  return query
}

export const useAddServiceRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      vehicleId,
      serviceRecord,
    }: {
      vehicleId: number
      serviceRecord: ServiceRecord
    }) => await addServiceRecord(vehicleId, serviceRecord),
    onError: (err) => console.error(err),
    onSuccess: (_, variables) => {
      const { vehicleId, serviceRecord } = variables
      _queryClient.invalidateQueries(
        getQueryKey(vehicleId, serviceRecord) as InvalidateQueryFilters
      )
    },
  })
  return query
}