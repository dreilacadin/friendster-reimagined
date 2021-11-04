import { Box, Grid, GridItem, Skeleton } from "@chakra-ui/react"
import { useRouter } from "next/router"
import FriendSection from "../components/Friends/FriendSection"
import Layout from "../components/Layout/Layout"
import Bio from "../components/Profile/Bio"
import ProfileHeader from "../components/Profile/ProfileHeader"
import { useGetUserQuery, User } from "../generated/graphql"

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const router = useRouter()
  const profilePagePadding: number = 10
  const { username } = router.query
  const stringUsername = username as string
  const { data, loading, error } = useGetUserQuery({
    variables: { username: stringUsername },
    skip: !username
  })

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    router.push(`404`)
  }

  return (
    <Layout>
      <Skeleton isLoaded={!loading}>
        <Grid h="100vh" templateColumns="1.5fr 1fr">
          {/* Profile: Left Section */}
          <Box p={profilePagePadding}>
            <Grid templateColumns="0.4fr 1fr 4fr" gap={4} templateRows="repeat(3, 1fr)">
              <GridItem rowSpan={2} colStart={2} colSpan={1}>
                <Bio user={data?.getUser as User} />
              </GridItem>
              <GridItem colStart={3}>
                <ProfileHeader user={data?.getUser} />
              </GridItem>
              <GridItem colStart={3}>
                <Box w="100%" h="100%" bg="blue.500" />
              </GridItem>
            </Grid>
          </Box>
          {/* Profile: Right Section */}
          <Box layerStyle="profileLeft" p={profilePagePadding}>
            <FriendSection />
          </Box>
        </Grid>
      </Skeleton>
    </Layout>
  )
}

export default Profile
