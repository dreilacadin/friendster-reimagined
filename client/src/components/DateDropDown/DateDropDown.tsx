import { SimpleGrid } from "@chakra-ui/react"
import { DayPicker, MonthPicker, YearPicker } from "react-dropdown-date"
import { DateObject, MonthsArray } from "../../types"
import CustomSelect from "./CustomSelect"
import styles from "./DateDropDown.module.scss"

interface DateDropDownProps {
  selectedDate: DateObject
  setSelectedDate: Function
}

const DateDropDown: React.FC<DateDropDownProps> = ({ selectedDate, setSelectedDate }) => {
  return (
    <SimpleGrid columns={3} spacing={4}>
      <CustomSelect>
        <DayPicker
          defaultValue={selectedDate.day.toString()}
          year={selectedDate.year} // mandatory
          month={selectedDate.month} // mandatory
          endYearGiven // mandatory if end={} is given in YearPicker
          required={true} // default is false
          value={selectedDate.day} // mandatory
          onChange={(day: number) => {
            // mandatory
            setSelectedDate({ ...selectedDate, day: Number(day) })
          }}
          id={"day"}
          name={"day"}
          classes={styles.select}
        />
      </CustomSelect>
      <CustomSelect>
        <MonthPicker
          defaultValue={MonthsArray[selectedDate.month]}
          short // default is full name
          endYearGiven // mandatory if end={} is given in YearPicker
          year={selectedDate.year} // mandatory
          required={true} // default is false
          value={selectedDate.month} // mandatory
          onChange={(month: string) => {
            setSelectedDate({ ...selectedDate, month: Number(month) })
          }}
          id={"month"}
          name={"month"}
          classes={styles.select}
        />
      </CustomSelect>

      <CustomSelect>
        <YearPicker
          defaultValue={selectedDate.year.toString()}
          start={1905} // default is 1900
          end={new Date().getFullYear()} // default is current year
          reverse // default is ASCENDING
          required={true} // default is false
          value={selectedDate.year} // mandatory
          onChange={(year: number) => {
            setSelectedDate({ ...selectedDate, year: Number(year) })
          }}
          id={"year"}
          name={"year"}
          classes={styles.select}
        />
      </CustomSelect>
    </SimpleGrid>
  )
}

export default DateDropDown
