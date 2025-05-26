import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { getTaxRecords, addTaxRecord, updateTaxRecord, deleteTaxRecord } from "~/api/tax-records"
import type { TaxRecord } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"
import { deleteServiceRecord } from "~/api/service-records"

const QUERY_KEY = "taxrecords"
const _queryClient = queryClient

export const getQueryKey = (
  vehicleId: number,
  requestType?: string,
  taxRecord?: TaxRecord
) => {
  if (taxRecord) return [QUERY_KEY, vehicleId, taxRecord]
  return [QUERY_KEY, requestType, vehicleId]
}

export const useTaxRecords = (vehicleId: number) => {
  const query = useQuery<TaxRecord>({
    queryKey: getQueryKey(vehicleId, "all-tax-data"),
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
      const { vehicleId, taxRecord } = variables
      _queryClient.invalidateQueries(
        getQueryKey(vehicleId, undefined, taxRecord) as InvalidateQueryFilters
      )
    },
  })
  return query
}

export const useUpdateTaxRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      taxRecord,
    }: {
      recordID: number
      taxRecord: TaxRecord
    }) => await updateTaxRecord(recordID, taxRecord),
    onSuccess: (_, variables) => {
      const { recordID, taxRecord } = variables
      _queryClient.invalidateQueries(
        getQueryKey(recordID, undefined, taxRecord) as InvalidateQueryFilters
      )
    },
  })
  return query
}

export const useDeleteTaxRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
    }: {
      recordID: number
    }) => await deleteTaxRecord(recordID),
    onSuccess: (_, variables) => {
      const { recordID } = variables
      _queryClient.invalidateQueries(
        getQueryKey(recordID, undefined) as InvalidateQueryFilters
      )
    },
  })
  return query
}
