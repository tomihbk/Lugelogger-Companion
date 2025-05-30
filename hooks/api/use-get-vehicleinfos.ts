import { useQuery } from "@tanstack/react-query"
import type { VehicleInfo } from "~/api/index-records.types"
import { getAllVehicles } from "~/api/vehicle-info"

const QUERY_KEY = "vehiclelist"

export const getQueryKey = (
  requestType?: string,
  vehicleInfo?: VehicleInfo,
  imageLocation?: string
) => {
  if (vehicleInfo) return [QUERY_KEY, vehicleInfo]
  if (imageLocation) return [QUERY_KEY, imageLocation]
  return [QUERY_KEY, requestType]
}

export const useGetAllVehicles = () => {
  const query = useQuery<VehicleInfo>({
    queryKey: getQueryKey("all-upgrade-data"),
    queryFn: async () => await getAllVehicles(),
  })
  return query
}