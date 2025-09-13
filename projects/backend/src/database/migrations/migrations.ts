import { DatabaseMigration } from "./DatabaseMigration.js"

const { DB_NAME, DB_USER, DB_PASS } = process.env

const databaseMigration = new DatabaseMigration(DB_USER, DB_PASS, DB_NAME)
await databaseMigration.migrate()