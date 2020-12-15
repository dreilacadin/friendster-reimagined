export interface DateObject {
  year: number
  month: number
  day: number
}

export const MonthsArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

export type GenderValueType = "Male" | "Female" | string

export interface GenderType {
  option: GenderValueType
}
