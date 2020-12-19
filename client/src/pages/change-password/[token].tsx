import { Box, Button, Flex, Heading } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import AppAlert from "../../components/AppAlert"
import InputField from "../../components/InputField"
import Layout from "../../components/Layout/Layout"
import { useChangePasswordMutation } from "../../generated/graphql"
import { toErrorMap } from "../../utils/toErrorMap"

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter()
  const [changePassword, { loading }] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState<string>("")

  return (
    <Layout exclude={["header"]}>
      <Flex align="center" justify="center" height="100%">
        <Box w="400px" mt={10}>
          {tokenError && (
            <Box>
              <Link href="/forgot-password">Get another link</Link>
              <AppAlert status="error" title="Token Error" description={tokenError} />{" "}
            </Box>
          )}
          <Heading as="h3" size="lg" mb={4}>
            Change Password
          </Heading>
          <Formik
            initialValues={{ newPassword: "", confirmPassword: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await changePassword({
                variables: {
                  token,
                  options: values
                }
              })
              if (response.data?.changePassword.errors) {
                const { errors } = response.data.changePassword
                const errorMap = toErrorMap(errors)
                if ("token" in errorMap) {
                  setTokenError(errorMap.token)
                }
                setErrors(errorMap)
              } else if (response.data?.changePassword.user) {
                router.replace("/")
              }
            }}
          >
            {() => (
              <Form>
                <InputField
                  label="New password"
                  name="newPassword"
                  type="password"
                  placeholder="********"
                />
                <InputField
                  label="Confirm new password"
                  name="confirmPassword"
                  type="password"
                  placeholder="********"
                />
                <Button isLoading={loading} type="submit" colorScheme="teal" mt={8} width="100%">
                  Change Password
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Layout>
  )
}

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string
  }
}

export default ChangePassword
