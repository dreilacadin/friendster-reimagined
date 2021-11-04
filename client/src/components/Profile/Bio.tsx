import { Box, Button, List, ListIcon, ListItem } from "@chakra-ui/react"
import ProfilePicture from "./ProfilePicture"
import { IoMaleSharp } from "@react-icons/all-files/io5/IoMaleSharp"
import { IoFemaleSharp } from "@react-icons/all-files/io5/IoFemaleSharp"
import { FaGenderless } from "@react-icons/all-files/fa/FaGenderLess"

import { RiCake2Line } from "@react-icons/all-files/ri/RiCake2Line"
import { User } from "../../generated/graphql"

interface BioProps {
  user: User | null
}

const Bio: React.FC<BioProps> = ({ user }) => {
  if (!user) return null

  const renderGender = () => {
    if (user.gender === "Male") {
      return IoMaleSharp
    } else if (user.gender === "Female") {
      return IoFemaleSharp
    } else {
      return FaGenderless
    }
  }

  return (
    <Box>
      <ProfilePicture />
      <List spacing={3}>
        <ListItem mt={4}>
          <ListIcon as={renderGender()} color="#ACACAC" />
          {user.gender}
        </ListItem>
        <ListItem>
          <ListIcon as={RiCake2Line} color="#ACACAC" />
          {new Date(user.dateOfBirth).toDateString()}
        </ListItem>
        <ListItem>
          <Button size="sm" isFullWidth colorScheme="teal" textTransform="capitalize">
            View Bio
          </Button>
        </ListItem>
      </List>
    </Box>
  )
}

export default Bio
