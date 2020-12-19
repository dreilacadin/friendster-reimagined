import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react"
import LoginForm from "./LoginForm"

const Login = () => {
  return (
    <Flex align="center" justify="center" grow={1}>
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={10}>
        <Box w="100%" h="10">
          <Heading as="h1" size="xl">
            Friendster reimagined
          </Heading>
        </Box>
        <LoginForm />
      </SimpleGrid>
    </Flex>
  )
}

export default Login
