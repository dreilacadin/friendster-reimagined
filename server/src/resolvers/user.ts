import { ApolloError } from "apollo-server-express"
import argon2 from "argon2"
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql"
import { COOKIE_NAME } from "../constants"
import { User } from "../entity/User"
import { LoginInput } from "../InputTypes/LoginInput"
import { RegisterInput } from "../InputTypes/RegisterInput"
import { MyContext } from "../types"
import { validateLogin } from "../utils/validateLogin"
import { validateRegister } from "../utils/validateRegister"

@ObjectType()
class FieldError {
  @Field()
  field: string
  @Field()
  message: string
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null
    }

    return User.findOne(req.session.userId)
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options)
    if (errors) return { errors }

    const { email, username, firstName, lastName, dateOfBirth, gender, password } = options

    const hashedPassword = await argon2.hash(password)

    let user

    try {
      user = await User.create({
        email,
        username,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        password: hashedPassword
      }).save()
    } catch (err) {
      // Duplicate username error
      if (err.code === "23505") {
        return {
          errors: [{ field: "email", message: "Email already taken" }]
        }
      } else if (err.code === "22007") {
        return {
          errors: [{ field: "dateOfBirth", message: "Invalid date format" }]
        }
      }
    }

    req.session.userId = user?.id

    return { user }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateLogin(options)
    if (errors) return { errors }

    const { usernameOrEmail, password } = options
    const user = await User.findOne({
      where: usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }
    })
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "That username doesn't exist"
          }
        ]
      }
    }
    const valid = await argon2.verify(user.password, password)
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password"
          }
        ]
      }
    }

    req.session.userId = user.id

    return { user }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME)
        if (err) {
          resolve(false)
          throw new ApolloError("Cookie destroy error", err)
        }

        resolve(true)
      })
    })
  }

  @Mutation(() => Boolean)
  async deleteAllUsers() {
    const response = await User.delete({})
    if (!response) return false
    return true
  }
}
