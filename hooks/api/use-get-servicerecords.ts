import { useMutation, useQuery } from "@tanstack/react-query"
import {
  getServiceRecords,
  addServiceRecord,
  updateServiceRecord,
} from "~/api/service-records"
import type { ServiceRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"
import { deleteServiceRecord } from "~/api/service-records"
import { recordKeys } from "./queryKeys"
import { ErrorTracking } from "~/utils/ErrorTracking"
import { useAnalytics } from "~/utils/Analytics"

const _queryClient = queryClient

export const useServiceRecords = (vehicleId: number) => {
  const query = useQuery<ServiceRecord>({
    queryKey: recordKeys.service.allRecords(vehicleId),
    queryFn: async () => await getServiceRecords(vehicleId),
  })
  return query
}

export const useAddServiceRecord = () => {
  const analytics = useAnalytics()
  const query = useMutation({
    mutationFn: async ({
      vehicleId,
      serviceRecord,
    }: {
      vehicleId: number
      serviceRecord: ServiceRecord
    }) => {
      ErrorTracking.addBreadcrumb("Adding service record", "records.service")
      return await addServiceRecord(vehicleId, serviceRecord)
    },
    onError: (err) => console.error("useAddServiceRecord error : " + err),
    onSuccess: (_, variables) => {
      analytics.recordCreated("service")
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.service.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useUpdateServiceRecord = () => {
  const analytics = useAnalytics()
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
      serviceRecord,
    }: {
      recordID: number
      vehicleId: number
      serviceRecord: ServiceRecord
    }) => {
      ErrorTracking.addBreadcrumb("Updating service record", "records.service")
      return await updateServiceRecord(recordID, serviceRecord)
    },
    onSuccess: (_, variables) => {
      analytics.recordUpdated("service")
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.service.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useDeleteServiceRecord = () => {
  const analytics = useAnalytics()
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
    }: {
      recordID: number
      vehicleId: number
    }) => {
      ErrorTracking.addBreadcrumb("Deleting service record", "records.service")
      return await deleteServiceRecord(recordID)
    },
    onSuccess: (_, variables) => {
      analytics.recordDeleted("service")
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.service.allRecords(vehicleId),
      })
    },
  })
  return query
}
