import { Field, InputType } from "type-graphql"

@InputType()
export class TestimonialInput {
  @Field()
  content: string
}
