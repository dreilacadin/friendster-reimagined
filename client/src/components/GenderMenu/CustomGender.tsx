import { Box, FormControl, FormHelperText, Input, Select } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import { GenderType } from "../../types"
import { capitalize } from "../../utils/capitalize"

interface CustomGenderProps {
  setGender: Dispatch<SetStateAction<GenderType>>
}

const CustomGender: React.FC<CustomGenderProps> = ({ setGender }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { value } = event.target
    setGender({ option: capitalize(value) })
  }
  return (
    <Box>
      <FormControl id="customGender" mt={4}>
        <Select placeholder="Select your pronoun" isRequired onChange={handleChange}>
          <option value="She">She: "Wish her a happy birthday!"</option>
          <option value="He">He: "Wish him a happy birthday!"</option>
          <option value="They">They: "Wish them a happy birthday!"</option>
        </Select>
        <FormHelperText>Your pronoun is visible to everyone.</FormHelperText>
        <Input mt={3} variant="filled" placeholder="Gender (optional)" onChange={handleChange} />
        <FormHelperText>This will take precedence if it has value.</FormHelperText>
      </FormControl>
    </Box>
  )
}

export default CustomGender
