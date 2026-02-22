import { useMutation, useQuery } from "@tanstack/react-query"
import {
  getFuelRecords,
  addFuelRecord,
  updateFuelRecord,
  deleteFuelRecord,
} from "~/api/fuel-records"
import type { FuelRecordAdd, FuelRecordGet } from "~/api/index-records.types"
import { queryClient } from "~/app/_layout"
import { recordKeys } from "./queryKeys"

const _queryClient = queryClient

export const useFuelRecords = (vehicleId: number) => {
  const query = useQuery<FuelRecordAdd | FuelRecordGet>({
    queryKey: recordKeys.fuel.allRecords(vehicleId),
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
        queryKey: recordKeys.fuel.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useUpdateFuelRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
      fuelRecord,
    }: {
      recordID: number
      vehicleId: number
      fuelRecord: FuelRecordAdd
    }) => await updateFuelRecord(recordID, fuelRecord),
    onSuccess: (_, { vehicleId }) => {
      _queryClient.invalidateQueries({
        queryKey: recordKeys.fuel.allRecords(vehicleId),
      })
    },
  })
  return query
}

export const useDeleteFuelRecord = () => {
  const query = useMutation({
    mutationFn: async ({
      recordID,
      vehicleId,
    }: {
      recordID: number
      vehicleId: number
    }) => await deleteFuelRecord(recordID),
    onSuccess: (_, { vehicleId }) => {
      _queryClient.invalidateQueries({
        queryKey: recordKeys.fuel.allRecords(vehicleId),
      })
    },
  })
  return query
}
