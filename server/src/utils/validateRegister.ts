import { RegisterInput } from "../InputTypes/RegisterInput"

export const validateRegister = (options: RegisterInput) => {
  const { email, username, firstName, lastName, dateOfBirth, gender, password } = options
  if (firstName.trim().length <= 2) {
    return [
      {
        field: "firstName",
        message: "First name must be greater than 2 characters"
      }
    ]
  }

  if (firstName.includes("@")) {
    return [
      {
        field: "firstName",
        message: "@ symbol is reserved for email"
      }
    ]
  }

  if (lastName.trim().length <= 2) {
    return [
      {
        field: "lastName",
        message: "Last name must be greater than 2 characters"
      }
    ]
  }

  if (lastName.includes("@")) {
    return [
      {
        field: "lastName",
        message: "@ symbol is reserved for email"
      }
    ]
  }

  if (!email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email"
      }
    ]
  }

  if (username.trim().length <= 2) {
    return [
      {
        field: "username",
        message: "Username must be greater than 2 characters"
      }
    ]
  }

  if (username.includes("@")) {
    return [
      {
        field: "username",
        message: "@ symbol is reserved for email"
      }
    ]
  }

  if (password.trim().length <= 6) {
    return [
      {
        field: "password",
        message: "Password must be greater than 6 characters"
      }
    ]
  }

  if (dateOfBirth instanceof Date === false) {
    console.log("called")
    return [
      {
        field: "dateOfBirth",
        message: "Enter your date of birth"
      }
    ]
  }

  if (gender.trim().length <= 1) {
    return [
      {
        field: "gender",
        message: "Invalid gender value"
      }
    ]
  }

  return null
}
