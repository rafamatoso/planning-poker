import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET: string = process.env.JWT_SECRET || "defaultsecret";
export const TOKEN_EXPIRATION: number = parseInt(
  process.env.TOKEN_EXPIRATION || "3600",
  10
);
