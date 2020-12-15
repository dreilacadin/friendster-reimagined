import { ConnectionOptions } from "typeorm"
import { __prod__ } from "./constants"

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
  entities: [`dist/entity/*.js`],
  migrations: [`dist/migration/*.js`],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration"
  }
} as ConnectionOptions
