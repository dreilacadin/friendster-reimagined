import { ConnectionOptions } from "typeorm"
import path from "path"
import { __prod__ } from "./constants"

const isCompiled = path.extname(__filename).includes("js")

export default {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "node_project",
  synchronize: !process.env.DB_NO_SYNC,
  logging: !__prod__,
  autoReconnect: true,
  entities: [`dist/entity/*.${isCompiled ? "js" : "ts"}`],
  migrations: [`dist/migration/*.${isCompiled ? "js" : "ts"}`],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration"
  }
} as ConnectionOptions
