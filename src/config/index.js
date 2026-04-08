import { configDotenv } from "dotenv";

configDotenv();

export const config = {
  BASE_URL: process.env.BASE_URL || "",
}