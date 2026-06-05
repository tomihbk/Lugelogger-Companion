import { axios } from "./axios"
import type { VehicleInfo } from "./index-records.types"

const ENDPOINT_vehicles = "/api/vehicles"
const ENDPOINT_vehicle = "/api/vehicle/info"

export const getAllVehicles = async () => {
  const { data } = await axios.get<VehicleInfo>(ENDPOINT_vehicles)
  return data
}

export const getVehicle = async (_vehicleId: number) => {
  const { data } = await axios.get<VehicleInfo>(ENDPOINT_vehicle, {
    params: { vehicleId: _vehicleId },
  })
  return data
}
