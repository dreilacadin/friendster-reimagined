import { Field, InputType } from "type-graphql"

@InputType({ description: "Change password input" })
export class ChangePasswordInput {
  @Field()
  newPassword: string

  @Field()
  confirmPassword: string
}
