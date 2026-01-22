import { useMutation, useQuery } from "@tanstack/react-query"
import {
  getFuelRecords,
  addFuelRecord,
  updateFuelRecord,
  deleteFuelRecord,
} from "~/api/fuel-records"
import type { FuelRecordAdd, FuelRecordGet } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"

const QUERY_KEY = "fuelrecords"
const _queryClient = queryClient

export const fuelRecordKeys = {
  all: (vehicleId: number) => [QUERY_KEY, vehicleId] as const,
  detail: (vehicleId: number, recordId: number) =>
    [QUERY_KEY, vehicleId, recordId] as const,
}

export const useFuelRecords = (vehicleId: number) => {
  const query = useQuery<FuelRecordAdd | FuelRecordGet>({
    queryKey: fuelRecordKeys.all(vehicleId),
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
      const { vehicleId } = variables
      _queryClient.invalidateQueries({
        queryKey: fuelRecordKeys.all(vehicleId),
      })
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
    onSuccess: () => {
      _queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      })
    },
  })
  return query
}

export const useDeleteFuelRecord = () => {
  const query = useMutation({
    mutationFn: async ({ recordID }: { recordID: number }) =>
      await deleteFuelRecord(recordID),
    onSuccess: () => {
      _queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      })
    },
  })
  return query
}
