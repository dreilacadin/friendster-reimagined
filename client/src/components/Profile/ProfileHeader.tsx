import { Box, Heading, Text } from "@chakra-ui/react"

interface ProfileHeaderProps {
  user: any
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  if (!user) return null
  return (
    <Box p={4}>
      <Text>{`${user.firstName} ${user.lastName}`}</Text>
      <Heading>{user.username}</Heading>
    </Box>
  )
}

export default ProfileHeader
