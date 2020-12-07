import { Box, Heading, SimpleGrid } from "@chakra-ui/react"
import LoginForm from "../LoginForm/LoginForm"

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = ({}) => {
  return (
    <SimpleGrid columns={[1, 1, 1, 2]} spacing={10}>
      <Box w="100%" h="10">
        <Heading as="h1" size="xl">
          Friendster reimagined
        </Heading>
      </Box>
      <LoginForm />
    </SimpleGrid>
  )
}

export default LandingPage
