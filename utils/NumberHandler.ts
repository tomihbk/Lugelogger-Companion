const locale = Intl.DateTimeFormat().resolvedOptions().locale
const fmt = new Intl.NumberFormat(locale, {
  useGrouping:  true,          // thousand separators
  minimumFractionDigits: 0,    // adjust as needed
  maximumFractionDigits: 2
})

const NumberHandler = (
  number: number,
): string => {
  return fmt.format(number)
}
export default NumberHandler