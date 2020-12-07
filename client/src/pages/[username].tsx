import { Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const router = useRouter()
  const { username } = router.query

  return <Heading>{`Welcome ${username}!`}</Heading>
}

export default Profile
