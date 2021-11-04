import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react"
import FriendCard from "./FriendCard"

interface FriendSectionProps {}

const FriendSection: React.FC<FriendSectionProps> = ({}) => {
  const friends = [
    { name: "Telkian" },
    { name: "Little Lion Heart" },
    { name: "Lena" },
    { name: "venuscharity" },
    { name: "itsMeTrizia" }
  ]

  return (
    <Box>
      <Flex>
        <Heading mr={2}>Friends</Heading>
        <Heading color="teal.500">3,775</Heading>
      </Flex>

      <SimpleGrid columns={5} spacing={6} mt={4}>
        {friends.map((friend, index) => (
          <FriendCard key={index} friend={friend} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default FriendSection
