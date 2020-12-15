import { ChevronDownIcon } from "@chakra-ui/icons"
import { Box, useColorModeValue } from "@chakra-ui/react"

const CustomSelect: React.FC = ({ children }) => {
  const color = useColorModeValue("gray.800", "white")
  return (
    <Box width="100%" color={color} position="relative">
      {children}
      <ChevronDownIcon pos="absolute" top="3" right="2" />
    </Box>
  )
}

export default CustomSelect
