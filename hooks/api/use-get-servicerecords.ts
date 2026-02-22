import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { getServiceRecords, addServiceRecord, updateServiceRecord } from "~/api/service-records"
import type { ServiceRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"
import { deleteServiceRecord } from "~/api/service-records"
import { recordKeys } from "./queryKeys"

const _queryClient = queryClient


export const useServiceRecords = (vehicleId: number) => {
  const query = useQuery<ServiceRecord>({
    queryKey: recordKeys.service.allRecords(vehicleId),
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
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.service.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useUpdateServiceRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
      serviceRecord,
    }: {
      recordID: number
      vehicleId: number
      serviceRecord: ServiceRecord
    }) => await updateServiceRecord(recordID, serviceRecord),
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.service.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useDeleteServiceRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
    }: {
      recordID: number
      vehicleId: number
    }) => await deleteServiceRecord(recordID),
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.service.allRecords(vehicleId),
      })
    },
  })
  return query
}
