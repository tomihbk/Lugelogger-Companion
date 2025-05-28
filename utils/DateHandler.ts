const locale = Intl.DateTimeFormat().resolvedOptions().locale

const DateHandler = (
  date: string,
  getISODate: boolean = false
): Date | string => {
  if (!getISODate) {
    const [MM, DD, YYYY] = date.split("/")
    // Months start by 0 and not 1, don't ask me why
    return new Date(
      parseInt(YYYY),
      parseInt(MM) - 1,
      parseInt(DD)
    ).toLocaleDateString(locale, {
      //year: "2-digit",
      month: "short",
      day: "2-digit",
    })
  } else {
    const [MM, DD, YYYY] = date.split("/").map((part) => parseInt(part, 10))
    return new Date(YYYY, MM - 1, DD)
  }
}

const GetWeekday = (date: string) => {
  return (DateHandler(date, true) as Date).toLocaleDateString(Intl.DateTimeFormat().resolvedOptions().locale, { weekday: 'long' }).replace(/^./, c => c.toUpperCase())
} 

export { GetWeekday }
export default DateHandler