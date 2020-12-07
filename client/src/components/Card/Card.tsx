import { Box, useColorModeValue } from "@chakra-ui/react"

interface CardProps {}

const Card: React.FC<CardProps> = ({ children }) => {
  const boxShadow = "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);"
  const bg = useColorModeValue("white", "gray.600")
  return (
    <Box borderRadius="lg" boxShadow={boxShadow} bg={bg} pt={3} pb={6} px={4}>
      {children}
    </Box>
  )
}

export default Card
