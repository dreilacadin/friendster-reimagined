import { MinLength } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class LoginInput {
  @Field()
  @MinLength(2)
  usernameOrEmail: string

  @Field()
  @MinLength(6)
  password: string
}
