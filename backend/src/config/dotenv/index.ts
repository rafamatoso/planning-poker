import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
export const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || "1h";
