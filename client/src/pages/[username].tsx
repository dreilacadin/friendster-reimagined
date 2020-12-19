import { Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Layout from "../components/Layout/Layout"
import { useIsAuth } from "../utils/useIsAuth"

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const router = useRouter()
  const { username } = router.query
  const { data } = useIsAuth()

  if (!data?.me) {
    return <div>loading...</div>
  }

  return (
    <Layout>
      <Heading>{`Welcome ${username}!`}</Heading>
    </Layout>
  )
}

export default Profile
