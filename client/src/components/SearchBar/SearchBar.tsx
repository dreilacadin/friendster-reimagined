import { SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
  return (
    <InputGroup maxW="250px">
      <InputLeftElement pointerEvents="none" ml={1} children={<SearchIcon color="gray.300" />} />
      <Input borderRadius="3xl" variant="filled" placeholder="Search Friendster" />
    </InputGroup>
  )
}

export default SearchBar
