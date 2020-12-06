import { IsEmail, MinLength } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class RegisterInput {
  @Field()
  @MinLength(2)
  username: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @MinLength(6)
  password: string
}
