import { Heading, Box, Button, Flex, Text, Link } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import { useState } from "react"
import InputField from "../components/InputField"
import Layout from "../components/Layout/Layout"
import { useForgotPasswordMutation } from "../generated/graphql"
import * as Yup from "yup"
import NextLink from "next/link"

const ChangePasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required")
})

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation()
  const [complete, setComplete] = useState<boolean>(false)
  return (
    <Layout exclude={["header"]}>
      <Flex align="center" justify="center" height="100%">
        <Box w="400px" mt={10}>
          <Heading as="h3" size="lg">
            Forgot Password
          </Heading>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={ChangePasswordSchema}
            onSubmit={async (values) => {
              try {
                await forgotPassword({ variables: values })
                setComplete(true)
              } catch (err) {
                console.log(err)
              }
            }}
          >
            {({ isSubmitting }) =>
              complete ? (
                <Box mt={3}>
                  If an account with your email exists, you will receive an email with a link to
                  reset your password.
                  <Text mt={3}>
                    Click&nbsp;
                    <NextLink href="/">
                      <Link color="teal.500">here</Link>
                    </NextLink>
                    &nbsp;to go home
                  </Text>
                </Box>
              ) : (
                <Form>
                  <InputField label="Email" name="email" placeholder="john@friendsterv2.com" />
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    colorScheme="teal"
                    mt={6}
                    width="100%"
                  >
                    Change Password
                  </Button>
                </Form>
              )
            }
          </Formik>
        </Box>
      </Flex>
    </Layout>
  )
}

export default ForgotPassword
