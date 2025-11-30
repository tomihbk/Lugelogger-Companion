import { axios } from "./axios"
import { UserInfo } from "./index-records.types"

export const ENDPOINT = "/api/whoami"

const getUserInfo = async () => {
  const { data } = await axios.get<UserInfo>(ENDPOINT)
  return data
}

export default getUserInfo