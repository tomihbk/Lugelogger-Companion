import DateHandler from "./DateHandler"

const DaysSinceLastEntry = (recordArrays: Array<any[]>) => {
  // Flatten and filter for records with a valid date
  const allRecords = recordArrays.flat().filter(r => r?.date && !isNaN((DateHandler(r.date, true) as Date).getTime()))

  if (allRecords.length === 0) return 0

  // Find the latest record by date
  const latest = allRecords.reduce((a, b) =>
    (DateHandler(a.date, true) as Date) > (DateHandler(b.date, true) as Date) ? a : b
  )
  
  const latestDate = (DateHandler(latest.date, true) as Date)
  if (isNaN(latestDate.getTime())) return 0

  const diff = Math.floor(
    (Date.now() - latestDate.getTime()) / (1000 * 60 * 60 * 24)
  )  
  return diff
}

export default DaysSinceLastEntry