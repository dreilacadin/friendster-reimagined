import "reflect-metadata"
import express from "express"
import cors from "cors"
import { envPort } from "./helpers/port"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { TryDBConnect } from "./helpers/database"
import { UserResolver } from "./resolvers/user"
import { TestimonialResolver } from "./resolvers/testimonial"
import session from "express-session"
import Redis from "ioredis"
import connectRedis from "connect-redis"

import { COOKIE_NAME, __prod__ } from "./constants"

export const app: express.Application = express()

const main = async () => {
  let RedisStore = connectRedis(session)
  let redis = new Redis()

  redis.on("error", function (error) {
    console.error(error)
  })

  app.set("trust proxy", 1)

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true
    })
  )

  // Redis config should always come before apolloServer config
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // set this to 'none' to allow 3rd party cookies
        secure: __prod__ // cookie only works in https
      },
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  )

  app.use(async (_, __, next) => {
    await TryDBConnect(() => {
      console.log("Database connection error")
    }, next)
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, TestimonialResolver],
      validate: false
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis
    })
  })

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(envPort(), () => {
    console.log(`🚀 Server Started at PORT: ${envPort()}`)
  })
}

main().catch((err) => console.log(err))
