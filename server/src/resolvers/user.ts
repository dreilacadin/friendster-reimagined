import { ApolloError, UserInputError } from "apollo-server-express"
import argon2 from "argon2"
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql"
import { COOKIE_NAME } from "../constants"
import { User } from "../entity/User"
import { RegisterInput } from "../InputTypes/RegisterInput"
import { MyContext } from "../types"

@ObjectType()
class UserResponse {
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
    console.log(req)
    const { email, username, password } = options

    const hashedPassword = await argon2.hash(password)

    let user

    try {
      user = await User.create({ email, username, password: hashedPassword }).save()
    } catch (err) {
      // Duplicate username error
      if (err.code === "23505" || err.detail.includes("already exists")) {
        throw new UserInputError("Email already taken", {
          invalid_input: email
        })
      }
    }

    req.session.userId = user?.id

    return { user }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({
      where: usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }
    })
    if (!user) {
      throw new UserInputError("That username or email doesn't exist", {
        invalid_input: usernameOrEmail
      })
    }
    const valid = await argon2.verify(user.password, password)
    if (!valid) {
      throw new UserInputError("Password is incorrect", {
        invalid_input: password
      })
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
}
