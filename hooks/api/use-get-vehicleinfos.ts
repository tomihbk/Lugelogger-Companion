import { useQuery } from "@tanstack/react-query"
import type { VehicleInfo } from "~/api/index-records.types"
import { getAllVehicles, getVehicle } from "~/api/vehicle-info"

const QUERY_KEY = "vehiclelist"

export const getQueryKey = (
  requestType?: string,
  vehicleId?: number,
  vehicleInfo?: VehicleInfo,
  imageLocation?: string
) => {
  if (vehicleInfo) return [QUERY_KEY, vehicleInfo]
  if (imageLocation) return [QUERY_KEY, imageLocation]
  if (vehicleId) return [QUERY_KEY, requestType, vehicleId]
  return [QUERY_KEY, requestType]
}

export const useGetAllVehicles = () => {
  const query = useQuery<VehicleInfo>({
    queryKey: getQueryKey("all-vehicules-data"),
    queryFn: async () => await getAllVehicles(),
  })
  return query
}

export const useGetVehicle = (vehicleId: number) => {
  const query = useQuery<VehicleInfo>({
    queryKey: getQueryKey("all-vehicule-data", vehicleId),
    queryFn: async () => await getVehicle(vehicleId),
  })
  return query
}
