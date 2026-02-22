const FUEL_KEY = ["fuelrecords"] as const
const ODOMETER_KEY = ["odometerrecords"] as const
const REMINDER_KEY = ["reminderrecords"] as const
const REPAIR_KEY = ["repairrecords"] as const
const SERVICE_KEY = ["servicerecords"] as const
const TAX_KEY = ["taxrecords"] as const
const UPGRADE_KEY = ["upgraderecords"] as const

export const recordKeys = {
  fuel: {
    root: FUEL_KEY,
    allRecords: (vehicleId: number) =>
      [FUEL_KEY, "allRecords", vehicleId] as const,
  },

  odometer: {
    root: ODOMETER_KEY,
    allRecords: (vehicleId: number) =>
      [ODOMETER_KEY, "allRecords", vehicleId] as const,
    last: (vehicleId: number) => [ODOMETER_KEY, "last", vehicleId] as const,
  },

  reminder: {
    root: REMINDER_KEY,
    allRecords: (vehicleId: number) =>
      [REMINDER_KEY, "allRecords", vehicleId] as const,
  },

  repair: {
    root: REPAIR_KEY,
    allRecords: (vehicleId: number) =>
      [REPAIR_KEY, "allRecords", vehicleId] as const,
  },

  service: {
    root: SERVICE_KEY,
    allRecords: (vehicleId: number) =>
      [SERVICE_KEY, "allRecords", vehicleId] as const,
  },

  tax: {
    root: TAX_KEY,
    allRecords: (vehicleId: number) =>
      [TAX_KEY, "allRecords", vehicleId] as const,
  },

  upgrade: {
    root: UPGRADE_KEY,
    allRecords: (vehicleId: number) =>
      [UPGRADE_KEY, "allRecords", vehicleId] as const,
  },
}
