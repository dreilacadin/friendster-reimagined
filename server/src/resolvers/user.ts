import { ApolloError } from "apollo-server-express"
import argon2 from "argon2"
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql"
import { v4 } from "uuid"
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../constants"
import { Profile } from "../entity/Profile"
import { User } from "../entity/User"
import { ChangePasswordInput } from "../InputTypes/ChangePasswordInput"
import { LoginInput } from "../InputTypes/LoginInput"
import { RegisterInput } from "../InputTypes/RegisterInput"
import { MyContext } from "../types"
import { forgotPasswordTemplate } from "../utils/EmailTemplates/forgotPasswordTemplate"
import { sendEmail } from "../utils/sendEmail"
import { validateChangePassword } from "../utils/validateChangePassword"
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
  // =======================
  // Queries
  // =======================
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null
    }

    return User.findOne(req.session.userId)
  }

  @Query(() => User)
  async getUser(@Arg("username") username: string) {
    if (!username || typeof username !== "string") {
      return {
        errors: [{ field: "username", message: "invalid username" }]
      }
    }

    return await User.findOne({ where: { username } })
  }

  // ========================
  // Mutations
  // ========================
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
      const profile = await Profile.create().save()
      user = await User.create({
        email,
        username,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        profile,
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

  @Mutation(() => Boolean)
  async forgotPassword(@Ctx() { redis }: MyContext, @Arg("email") email: string) {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      // The email is not in the db. Don't tell the user that the email doesn't exist
      // so that they cannot fish for available emails
      console.log("email not found")
      return true
    }

    const { firstName, lastName } = user
    const token = v4()

    await redis.set(FORGOT_PASSWORD_PREFIX + token, user.id, "ex", 1000 * 60 * 60 * 24 * 3) // 3 days

    await sendEmail(email, forgotPasswordTemplate({ firstName, lastName, token }))

    return true
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("options") options: ChangePasswordInput,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateChangePassword(options)

    if (errors) {
      return { errors }
    }

    const key = FORGOT_PASSWORD_PREFIX + token

    const userId = await redis.get(key)

    if (!userId) {
      return {
        errors: [{ field: "token", message: "Expired or invalid token" }]
      }
    }

    const user = await User.findOne({ where: { id: userId } })

    if (!user) {
      return { errors: [{ field: "token", message: "User no longer exists" }] }
    }

    await User.update(userId, { password: await argon2.hash(options.newPassword) })

    await redis.del(key)

    // login user after they change password
    req.session.userId = user.id

    return { user }
  }
}
