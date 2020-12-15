import { DateObject } from "../types"

export const formatDate = (date: Date): DateObject => {
  // formats a JS date to 'yyyy-mm-dd'
  let d = new Date(date),
    month = "" + d.getMonth(),
    day = "" + d.getDate(),
    year = "" + d.getFullYear()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  return {
    year: Number(year),
    month: Number(month),
    day: Number(day)
  }
}
