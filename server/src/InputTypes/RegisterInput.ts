import { Field, InputType } from "type-graphql"
import { User } from "../entity/User"
import { UserGender } from "../enums"

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  username: string

  @Field()
  email: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  dateOfBirth: Date

  @Field()
  gender: UserGender

  @Field()
  password: string
}
