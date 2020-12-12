import { RegisterInput } from "../InputTypes/RegisterInput"

export const validateRegister = (options: RegisterInput) => {
  const { email, username, password } = options
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

  return null
}
