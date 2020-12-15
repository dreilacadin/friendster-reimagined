import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  SimpleGrid,
  Text
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { parse } from "path"
import { off } from "process"
import { useEffect, useState } from "react"
import DateDropDown from "../components/DateDropDown/DateDropDown"
import GenderMenu from "../components/GenderMenu/GenderMenu"
import InputField from "../components/InputField"
import Layout from "../components/Layout/Layout"
import { useRegisterMutation } from "../generated/graphql"
import { DateObject, GenderType } from "../types"
import { formatDate } from "../utils/formatDate"
import { toErrorMap } from "../utils/toErrorMap"

const Register = () => {
  const router = useRouter()
  const [register, { loading }] = useRegisterMutation()
  const dateToday = formatDate(new Date())
  const [selectedDate, setSelectedDate] = useState<DateObject>(dateToday)
  const [parsedDate, setParsedDate] = useState<string>("")
  const [gender, setGender] = useState<GenderType>({ option: "Male" })

  useEffect(() => {
    const { year, month, day } = selectedDate
    const ISODateString = new Date(year, month, day).toISOString()
    setParsedDate(ISODateString)
  }, [selectedDate])

  useEffect(() => {
    console.log(gender)
  }, [gender])

  return (
    <Layout exclude={["header"]}>
      <Container maxW="lg" my={8}>
        <Box mb={2}>
          <Heading as="h3" size="lg">
            Register
          </Heading>
          <Text mt={1}>It's quick and easy</Text>
        </Box>
        <Formik
          initialValues={{
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            gender: "",
            password: ""
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              variables: { options: { ...values, dateOfBirth: parsedDate, gender: gender.option } }
            })
            if (response.data?.register.errors) {
              const { errors } = response.data.register
              setErrors(toErrorMap(errors))
            } else if (response.data?.register.user) {
              const { username } = response.data.register.user
              router.replace(`/${username}`)
            }
          }}
        >
          {() => (
            <Form>
              <SimpleGrid columns={2} spacing={4}>
                <InputField label="First Name" name="firstName" placeholder="John" />
                <InputField label="Last Name" name="lastName" placeholder="Doe" />
              </SimpleGrid>
              <InputField label="Email" name="email" placeholder="friendsterv2@foreal.com" />
              <InputField
                label="Username"
                name="username"
                placeholder="markzuckerberg"
                autoComplete="off"
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="New Password"
              />
              <FormControl id="dateOfBirth" mt={3}>
                <FormLabel>Date of birth</FormLabel>
                <DateDropDown selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
              </FormControl>
              <GenderMenu gender={gender} setGender={setGender} />
              <Button isLoading={loading} type="submit" colorScheme="teal" mt={6} width="100%">
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  )
}

export default Register
