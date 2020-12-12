import { Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Layout from "../components/Layout/Layout"

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const router = useRouter()
  const { username } = router.query

  return (
    <Layout>
      <Heading>{`Welcome ${username}!`}</Heading>
    </Layout>
  )
}

export default Profile
