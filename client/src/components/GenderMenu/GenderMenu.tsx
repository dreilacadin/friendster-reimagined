import { FormControl, FormLabel, SimpleGrid, useRadioGroup } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import { GenderType, GenderValueType } from "../../types"
import CustomGender from "./CustomGender"
import RadioCard from "./RadioCard"

interface GenderMenuProps {
  gender: GenderType
  setGender: Dispatch<SetStateAction<GenderType>>
}

const GenderMenu: React.FC<GenderMenuProps> = ({ gender, setGender }) => {
  const options = ["Male", "Female", "Custom"]

  const { getRootProps, getRadioProps, value } = useRadioGroup({
    name: "gender",
    defaultValue: "Male",
    onChange: (value: string) => setGender({ option: value })
  })

  const group = getRootProps()

  const renderCustomGender = () => {
    if (gender.option !== "Male" && gender.option !== "Female") {
      return <CustomGender setGender={setGender} />
    }
  }

  return (
    <FormControl id="gender" mt={3}>
      <FormLabel>Gender</FormLabel>
      <SimpleGrid columns={3} spacing={4} {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          )
        })}
      </SimpleGrid>
      {renderCustomGender()}
    </FormControl>
  )
}

export default GenderMenu
