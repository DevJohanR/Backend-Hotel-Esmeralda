const dotenv = require("dotenv");
dotenv.config();

const APP_ENV = process.env.APP_ENV || "LOCAL";


let DB_CONFIG = {};

if (APP_ENV === "PRODUCTION") {
  DB_CONFIG = {
    DB_NAME: process.env.PRODUCTION_DB_NAME,
    DB_USER: process.env.PRODUCTION_DB_USER,
    DB_PASSWORD: process.env.PRODUCTION_DB_PASSWORD,
    DB_HOST: process.env.PRODUCTION_DB_HOST,
    DB_PORT: process.env.PRODUCTION_PORT,
  };
} else if (APP_ENV === "LOCAL") {
  DB_CONFIG = {
    DB_NAME: process.env.LOCAL_DB_NAME,
    DB_USER: process.env.LOCAL_DB_USER,
    DB_PASSWORD: process.env.LOCAL_DB_PASSWORD,
    DB_HOST: process.env.LOCAL_DB_HOST,
    DB_PORT: process.env.LOCAL_PORT,
  };
}
module.exports = {
    STRIPE_PRIVATE_KEY: process.env.STRIPE_PRIVATE_KEY,
    DB_CONFIG,
} 
