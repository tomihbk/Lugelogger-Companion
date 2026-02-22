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

const _queryClient = queryClient

export const useTaxRecords = (vehicleId: number) => {
  const query = useQuery<TaxRecord>({
    queryKey: recordKeys.tax.allRecords(vehicleId),
    queryFn: async () => await getTaxRecords(vehicleId),
  })
  return query
}

export const useAddTaxRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      vehicleId,
      taxRecord,
    }: {
      vehicleId: number
      taxRecord: TaxRecord
    }) => await addTaxRecord(vehicleId, taxRecord),
    onError: (err) => console.error("useAddTaxRecord error : " + err),
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.tax.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useUpdateTaxRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
      taxRecord,
    }: {
      recordID: number
      vehicleId: number
      taxRecord: TaxRecord
    }) => await updateTaxRecord(recordID, taxRecord),
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.tax.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useDeleteTaxRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
    }: {
      recordID: number
      vehicleId: number
    }) => await deleteTaxRecord(recordID),
    onSuccess: (_, variables) => {
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: recordKeys.tax.allRecords(vehicleId),
      })
    },
  })
  return query
}
