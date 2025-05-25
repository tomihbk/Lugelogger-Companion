import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { getServiceRecords, addServiceRecord, updateServiceRecord } from "~/api/service-records"
import type { ServiceRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"
import { deleteServiceRecord } from "~/api/service-records"

const QUERY_KEY = "servicerecords"
const _queryClient = queryClient

export const getQueryKey = (
  vehicleId: number,
  requestType?: string,
  serviceRecord?: ServiceRecord
) => {
  if (serviceRecord) return [QUERY_KEY, vehicleId, serviceRecord]
  return [QUERY_KEY, requestType, vehicleId]
}

export const useServiceRecords = (vehicleId: number) => {
  const query = useQuery<ServiceRecord>({
    queryKey: getQueryKey(vehicleId, "all-service-data"),
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
    onError: (err) => console.error("useAddServiceRecord error : " + err),
    onSuccess: (_, variables) => {
      const { vehicleId, serviceRecord } = variables
      _queryClient.invalidateQueries(
        getQueryKey(vehicleId, undefined, serviceRecord) as InvalidateQueryFilters
      )
    },
  })
  return query
}

export const useUpdateServiceRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      serviceRecord,
    }: {
      recordID: number
      serviceRecord: ServiceRecord
    }) => await updateServiceRecord(recordID, serviceRecord),
    onSuccess: (_, variables) => {
      const { recordID, serviceRecord } = variables
      _queryClient.invalidateQueries(
        getQueryKey(recordID, undefined, serviceRecord) as InvalidateQueryFilters
      )
    },
  })
  return query
}

export const useDeleteServiceRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
    }: {
      recordID: number
    }) => await deleteServiceRecord(recordID),
    onSuccess: (_, variables) => {
      const { recordID } = variables
      _queryClient.invalidateQueries(
        getQueryKey(recordID, undefined) as InvalidateQueryFilters
      )
    },
  })
  return query
}
