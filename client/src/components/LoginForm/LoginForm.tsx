import { Box, Button, Divider } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { toErrorMap } from "../../utils/toErrorMap"
import InputField from "../InputField"
import Card from "../Card/Card"
import { useLoginMutation } from "../../generated/graphql"
import { useRouter } from "next/router"
import Link from "next/link"

const LoginForm = () => {
  const router = useRouter()
  const [login, { loading }] = useLoginMutation()

  return (
    <Card>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ variables: values })
          if (response.data?.login.errors) {
            const { errors } = response.data.login
            setErrors(toErrorMap(errors))
          } else if (response.data?.login.user) {
            const { username } = response.data.login.user
            router.replace(`/${username}`)
          }
        }}
      >
        {() => (
          <Form>
            <InputField
              label="Username or email"
              name="usernameOrEmail"
              placeholder="markzuckerberg"
            />
            <InputField label="Password" name="password" type="password" placeholder="********" />
            <Button isLoading={loading} colorScheme="teal" type="submit" mt={6} width="100%">
              Log In
            </Button>
          </Form>
        )}
      </Formik>
      <Box textAlign="center" my={3} color="blue.500" fontSize="sm">
        <Link href="/forgot-password">Forgotten password?</Link>
      </Box>
      <Divider />
      <Box textAlign="center" mt={4}>
        <Link href="/register">
          <Button colorScheme="blue">Create New Account</Button>
        </Link>
      </Box>
    </Card>
  )
}

export default LoginForm
