import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Testimonial } from "../entity/Testimonial"
import { TestimonialInput } from "../InputTypes/TestimonialInput"

@Resolver()
export class TestimonialResolver {
  @Query(() => [Testimonial])
  async testimonials(): Promise<Testimonial[]> {
    return await Testimonial.find()
  }

  @Mutation(() => Testimonial)
  async createTestimonial(@Arg("input") input: TestimonialInput): Promise<Testimonial> {
    return Testimonial.create({
      content: input.content
    }).save()
  }
}
