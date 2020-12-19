import { ChangePasswordInput } from "src/InputTypes/ChangePasswordInput"

export const validateChangePassword = (options: ChangePasswordInput) => {
  const { newPassword, confirmPassword } = options

  if (newPassword.length <= 6) {
    return [
      {
        field: "newPassword",
        message: "length must be greater than 6"
      }
    ]
  }

  if (confirmPassword.length <= 2) {
    return [
      {
        field: "confirmPassword",
        message: "length must be greater than 6"
      }
    ]
  }

  if (newPassword !== confirmPassword) {
    return [
      {
        field: "newPassword",
        message: "Passwords do not match"
      }
    ]
  }

  return null
}
