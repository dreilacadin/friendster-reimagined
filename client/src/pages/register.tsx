import { Box, Button, Container, Heading } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import InputField from "../components/InputField"
import { useRegisterMutation } from "../generated/graphql"
import { toErrorMap } from "../utils/toErrorMap"
import { useRouter } from "next/router"

const Register = () => {
  const router = useRouter()
  const [register, { loading }] = useRegisterMutation()

  return (
    <Container maxW="lg" mt={10}>
      <Box mb={10}>
        <Heading as="h1" size="xl" textAlign="center">
          Welcome to Friendster v2
        </Heading>
      </Box>
      <Box mb={8}>
        <Heading as="h3" size="lg">
          Register
        </Heading>
      </Box>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values, { setErrors }) => {
          register({ variables: values })
            .then((response) => {
              if (response.data?.register.user) {
                const { username } = response.data.register.user
                router.replace(`/${username}`)
              }
            })
            .catch((error) => setErrors(toErrorMap(error.graphQLErrors[0])))
        }}
      >
        {() => (
          <Form>
            <InputField label="Username" name="username" placeholder="Mark Zuckerberg" />
            <InputField label="Email" name="email" placeholder="friendsterv2@foreal.com" />
            <InputField label="Password" name="password" type="password" placeholder="********" />
            <Button isLoading={loading} type="submit" colorScheme="teal" mt={6} width="100%">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default Register
