import { Length } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class TestimonialInput {
  @Field()
  @Length(1, 300)
  content: string
}
