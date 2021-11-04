import { Image } from "@chakra-ui/react"

const ProfilePicture = () => {
  return (
    <Image
      boxSize="100%"
      objectFit="cover"
      borderRadius="xl"
      src="images/dreilacadin_dp.jpg"
      alt="Profile Picture"
    />
  )
}

export default ProfilePicture
