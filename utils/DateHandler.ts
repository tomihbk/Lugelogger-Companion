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
    ).toLocaleDateString("de-DE", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })
  } else {
    const [MM, DD, YYYY] = date.split("/").map((part) => parseInt(part, 10))
    return new Date(YYYY, MM - 1, DD)
  }
}
export default DateHandler