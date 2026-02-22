import { queryClient } from "~/app/_layout"
import { recordKeys } from "./queryKeys"

const ALL_RECORD_KEYS = [
  ...recordKeys.fuel.root,
  ...recordKeys.odometer.root,
  ...recordKeys.repair.root,
  ...recordKeys.service.root,
  ...recordKeys.reminder.root,
  ...recordKeys.tax.root,
  ...recordKeys.upgrade.root,
  "userinfo",
  "vehiclelist",
] as const

/**
 * Call this after updating server settings
 * Invalidates and refetches all main queries
 */
export const refreshAllQueries = async () => {
  await Promise.all(
    ALL_RECORD_KEYS.map((key) => queryClient.invalidateQueries([key]))
  ).then(() => {
    console.log("All main queries invalidated and refetched.")
  })
}
