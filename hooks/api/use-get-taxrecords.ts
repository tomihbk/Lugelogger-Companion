import { useMutation, useQuery } from "@tanstack/react-query"
import {
  getTaxRecords,
  addTaxRecord,
  updateTaxRecord,
  deleteTaxRecord,
} from "~/api/tax-records"
import type { TaxRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"
import { recordKeys } from "./queryKeys"
import { ErrorTracking } from "~/utils/ErrorTracking"
import { useAnalytics } from "~/utils/Analytics"

const _queryClient = queryClient

export const useTaxRecords = (vehicleId: number) => {
  const query = useQuery<TaxRecord>({
    queryKey: recordKeys.tax.allRecords(vehicleId),
    queryFn: async () => await getTaxRecords(vehicleId),
  })
  return query
}

export const useAddTaxRecord = () => {
  const analytics = useAnalytics()
  const query = useMutation({
    mutationFn: async ({
      vehicleId,
      taxRecord,
    }: {
      vehicleId: number
      taxRecord: TaxRecord
    }) => {
      ErrorTracking.addBreadcrumb("Adding tax record", "records.tax")
      return await addTaxRecord(vehicleId, taxRecord)
    },
    onError: (err) => console.error("useAddTaxRecord error : " + err),
    onSuccess: (_, variables) => {
      analytics.recordCreated("tax")
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.tax.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useUpdateTaxRecord = () => {
  const analytics = useAnalytics()
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
      taxRecord,
    }: {
      recordID: number
      vehicleId: number
      taxRecord: TaxRecord
    }) => {
      ErrorTracking.addBreadcrumb("Updating tax record", "records.tax")
      return await updateTaxRecord(recordID, taxRecord)
    },
    onSuccess: (_, variables) => {
      analytics.recordUpdated("tax")
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.tax.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useDeleteTaxRecord = () => {
  const analytics = useAnalytics()
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
    }: {
      recordID: number
      vehicleId: number
    }) => {
      ErrorTracking.addBreadcrumb("Deleting tax record", "records.tax")
      return await deleteTaxRecord(recordID)
    },
    onSuccess: (_, variables) => {
      analytics.recordDeleted("tax")
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.tax.allRecords(vehicleId),
      })
    },
  })
  return query
}
