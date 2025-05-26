import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { getFuelRecords, addFuelRecord, updateFuelRecord, deleteFuelRecord } from "~/api/fuel-records"
import type { FuelRecordAdd, FuelRecordGet } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"

const QUERY_KEY = "fuelrecords"
const _queryClient = queryClient

export const getQueryKey = (
  vehicleId: number,
  requestType?: string,
  fuelRecord?: FuelRecordGet | FuelRecordAdd
) => {
  if (fuelRecord) return [QUERY_KEY, vehicleId, fuelRecord]
  return [QUERY_KEY, requestType, vehicleId]
}

export const useFuelRecords = (vehicleId: number) => {
  const query = useQuery<FuelRecordAdd | FuelRecordGet>({
    queryKey: getQueryKey(vehicleId, "all-fuel-data"),
    queryFn: async () => await getFuelRecords(vehicleId),
  })
  return query
}

export const useAddFuelRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      vehicleId,
      fuelRecord,
    }: {
      vehicleId: number
      fuelRecord: FuelRecordAdd
    }) => await addFuelRecord(vehicleId, fuelRecord),
    onError: (err) => console.error("useAddFuelRecord error : " + err),
    onSuccess: (_, variables) => {
      const { vehicleId, fuelRecord } = variables
      _queryClient.invalidateQueries(
        getQueryKey(vehicleId, undefined, fuelRecord) as InvalidateQueryFilters
      )
    },
  })
  return query
}

export const useUpdateFuelRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      fuelRecord,
    }: {
      recordID: number
      fuelRecord: FuelRecordAdd
    }) => await updateFuelRecord(recordID, fuelRecord),
    onSuccess: (_, variables) => {
      const { recordID, fuelRecord } = variables
      _queryClient.invalidateQueries(
        getQueryKey(recordID, undefined, fuelRecord) as InvalidateQueryFilters
      )
    },
  })
  return query
}

export const useDeleteFuelRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
    }: {
      recordID: number
    }) => await deleteFuelRecord(recordID),
    onSuccess: (_, variables) => {
      const { recordID } = variables
      _queryClient.invalidateQueries(
        getQueryKey(recordID, undefined) as InvalidateQueryFilters
      )
    },
  })
  return query
}
