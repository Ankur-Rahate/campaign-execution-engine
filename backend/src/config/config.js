import { config as conf } from "dotenv"
conf();
const _config = {
  port : process.env.PORT,
  dbConnectionString : process.env.DB_STRING,
  env : process.env.Env

}

export const config = Object.freeze(_config)