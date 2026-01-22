import { queryClient } from "~/app/_layout"

const ALL_RECORD_KEYS = [
  "fuelrecords",
  "odometerrecords",
  "repairrecords",
  "servicerecords",
  "reminderrecords",
  "taxrecords",
  "upgraderecords",
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
