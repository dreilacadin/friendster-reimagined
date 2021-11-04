import { Box, Text } from "@chakra-ui/react"

interface FriendCardProps {
  friend: any
}
const FriendCard: React.FC<FriendCardProps> = ({ friend }) => {
  return (
    <Box>
      <Box height="150px" borderRadius="md" bg="teal.500"></Box>
      <Text mt={2}>{friend.name}</Text>
    </Box>
  )
}

export default FriendCard
