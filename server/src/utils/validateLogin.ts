import { LoginInput } from "../InputTypes/LoginInput"

export const validateLogin = (options: LoginInput) => {
  const { usernameOrEmail, password } = options

  if (usernameOrEmail.trim().length <= 1) {
    return [
      {
        field: "usernameOrEmail",
        message: "This field must be greater than 2 characters"
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
