import { axios } from "./axios"
import type { VehicleInfo } from "./index-records.types"

const ENDPOINT = "/api/vehicles"

export const getAllVehicles = async () => {
  const { data } = await axios.get<VehicleInfo>(ENDPOINT)
  return data
}