import { useQuery } from "@tanstack/react-query"
import type { UserInfo } from "~/api/index-records.types"
import getUserInfo from "~/api/user-info"

const QUERY_KEY = "userinfo"

export const getQueryKey = (
  requestType?: string
) => {
  return [QUERY_KEY, requestType]
}

export const useGetUserInfo = () => {
  const query = useQuery<UserInfo>({
    queryKey: getQueryKey("user-info-data"),
    queryFn: async () => await getUserInfo(),
  })
  return query
}